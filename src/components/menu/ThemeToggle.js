import { BaseButton } from './BaseButton.js';
import { MENU_ICONS, MENU_LABELS } from './constants.js';

export class ThemeToggle extends BaseButton {
  constructor() {
    super(
      MENU_LABELS.THEME_LIGHT,
      MENU_ICONS.THEME_LIGHT,
      () => this.toggle()
    );
    this.isDark = false;
  }

  toggle() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark-mode');
    this.button.innerHTML = this.isDark ? MENU_ICONS.THEME_DARK : MENU_ICONS.THEME_LIGHT;
    this.button.setAttribute('aria-label', 
      this.isDark ? MENU_LABELS.THEME_DARK : MENU_LABELS.THEME_LIGHT
    );
  }
}