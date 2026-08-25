import type { CodestellationSettings } from '../types';

export function applyCodestellationAppearance(element: HTMLElement, settings: CodestellationSettings) {
  element.dataset.csFont = settings.interfaceFont;
  element.dataset.csIntensity = settings.sceneIntensity;
  element.style.setProperty('--cs-galaxy-hue', String(settings.galaxyAccentHue));
}
