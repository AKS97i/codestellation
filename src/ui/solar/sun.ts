// Ported from prototype/src/solar/sun.js.
export function createSun(wrap: HTMLElement, opts: { name?: string } = {}): { sun: HTMLElement; label: HTMLElement } {
  const sun = document.createElement('div');
  sun.className = 'cs-sun';
  sun.setAttribute('role', 'button');
  sun.setAttribute('aria-label', opts.name ? `${opts.name} (you)` : 'You');
  wrap.appendChild(sun);

  const label = document.createElement('div');
  label.className = 'cs-sun-label';
  label.textContent = opts.name || 'You';
  wrap.appendChild(label);

  return { sun, label };
}
