// Ported from prototype/src/solar/greeting.js.
const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export type TimeOfDay = 'morning' | 'day' | 'sunset' | 'night';

export function timeOfDayFor(date: Date = new Date()): TimeOfDay {
  const h = date.getHours();
  if (h >= 5 && h < 11) return 'morning';
  if (h >= 11 && h < 17) return 'day';
  if (h >= 17 && h < 21) return 'sunset'; // was < 20 — "good night" at 8:37pm read as too early for most people
  return 'night';
}

export function greetingLineFor(state: TimeOfDay): string {
  switch (state) {
    case 'morning': return 'Good morning';
    case 'day': return 'Good afternoon';
    case 'sunset': return 'Good evening';
    default: return 'Good night';
  }
}

export function isWeekday(date: Date = new Date()): boolean {
  const d = date.getDay();
  return d >= 1 && d <= 5;
}

function formatDate(date: Date): string {
  return `${WEEKDAY_NAMES[date.getDay()]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
}

function formatTime(date: Date): string {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ampm}`;
}

export function finishOnTransitionOrTimeout(target: EventTarget, onDone: () => void, fallbackMs: number): () => void {
  let finished = false;
  let fallback: ReturnType<typeof setTimeout>;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(fallback);
    target.removeEventListener('transitionend', finish);
    onDone();
  };
  target.addEventListener('transitionend', finish, { once: true });
  fallback = setTimeout(finish, fallbackMs);
  return () => {
    finished = true;
    clearTimeout(fallback);
    target.removeEventListener('transitionend', finish);
  };
}

export function showGreeting(container: HTMLElement, opts: { name?: string; holdMs?: number; onDone?: (info: { state: TimeOfDay; isWeekday: boolean }) => void } = {}): () => void {
  const now = new Date();
  const state = timeOfDayFor(now);
  const line = `${greetingLineFor(state)}, ${opts.name || 'there'}`;

  const overlay = document.createElement('div');
  overlay.className = `cs-greeting cs-sky-${state}`;
  overlay.innerHTML = `
    <div class="cs-greeting-text">
      <div class="cs-greeting-line">${line}</div>
      <div class="cs-greeting-sub">${formatDate(now)} · ${formatTime(now)}</div>
    </div>
  `;
  container.appendChild(overlay);

  if (state === 'night') {
    const stars = document.createElement('div');
    stars.className = 'cs-greeting-stars';
    for (let i = 0; i < 40; i++) {
      const star = document.createElement('div');
      star.className = 'cs-star' + (Math.random() > 0.88 ? ' cs-star-big' : '');
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 70 + '%';
      star.style.animationDelay = Math.random() * 2.5 + 's';
      stars.appendChild(star);
    }
    overlay.insertBefore(stars, overlay.firstChild);
  }

  void overlay.offsetWidth;
  overlay.classList.add('is-visible');

  let cancelFinish = () => {};
  const timer = setTimeout(() => {
    cancelFinish = finishOnTransitionOrTimeout(overlay, () => {
      overlay.remove();
      opts.onDone?.({ state, isWeekday: isWeekday(now) });
    }, 520);
    overlay.classList.add('is-leaving');
  }, opts.holdMs ?? 2200);

  return () => {
    clearTimeout(timer);
    cancelFinish();
    overlay.remove();
  };
}
