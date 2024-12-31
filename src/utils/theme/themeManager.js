/**
 * Theme management system
 */
import { THEME_STORAGE_KEY } from './constants.js';

export class ThemeManager {
  constructor() {
    this.isDark = this.getInitialTheme();
    this.init();
  }

  getInitialTheme() {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  init() {
    this.applyTheme();
    this.listenForSystemChanges();
  }

  applyTheme() {
    document.documentElement.classList.toggle('dark-mode', this.isDark);
    localStorage.setItem(THEME_STORAGE_KEY, this.isDark ? 'dark' : 'light');
  }

  toggle() {
    this.isDark = !this.isDark;
    this.applyTheme();
  }

  listenForSystemChanges() {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          this.isDark = e.matches;
          this.applyTheme();
        }
      });
  }
}