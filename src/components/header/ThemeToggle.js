import { createElement } from '../../utils/dom.js';

export class ThemeToggle {
  constructor() {
    this.isDark = this.getInitialTheme();
    this.button = this.createButton();
  }

  getInitialTheme() {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  createButton() {
    const button = createElement('button', 'theme-toggle');
    button.setAttribute('aria-label', this.isDark ? 'Switch to light mode' : 'Switch to dark mode');
    
    this.updateButtonIcon(button);
    
    button.addEventListener('click', () => {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark', this.isDark);
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
      this.updateButtonIcon(button);
    });
    
    return button;
  }

  updateButtonIcon(button) {
    button.textContent = this.isDark ? '🌙' : '🌞';
    button.setAttribute('aria-label', this.isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  render() {
    return this.button;
  }
}