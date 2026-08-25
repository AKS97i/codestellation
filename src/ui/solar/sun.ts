// Ported from prototype/src/solar/sun.js.
export function createSun(wrap: HTMLElement, opts: { name?: string } = {}): { sun: HTMLElement; label: HTMLElement } {
  const sun = document.createElement('div');
  sun.className = 'cs-sun';
  sun.setAttribute('role', 'button');
  sun.setAttribute('aria-label', opts.name ? `${opts.name} (you)` : 'You');
  const mark = document.createElement('span');
  mark.className = 'cs-sun-mark';
  mark.textContent = (opts.name || 'You').trim().slice(0, 1).toUpperCase();
  sun.appendChild(mark);
  wrap.appendChild(sun);

  const label = document.createElement('div');
  label.className = 'cs-sun-label';
  label.textContent = opts.name || 'You';
  wrap.appendChild(label);

  return { sun, label };
}
