/**
 * Theme management system
 */
export class ThemeManager {
  constructor() {
    this.isDark = this.getInitialTheme();
    this.init();
  }

  getInitialTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  init() {
    this.applyTheme();
    this.listenForSystemChanges();
  }

  applyTheme() {
    document.documentElement.classList.toggle('dark', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  toggle() {
    this.isDark = !this.isDark;
    this.applyTheme();
    return this.isDark;
  }

  listenForSystemChanges() {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.isDark = e.matches;
          this.applyTheme();
        }
      });
  }
}