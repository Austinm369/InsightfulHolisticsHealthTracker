/**
 * Theme toggle component for Insightful Holistics
 */
import { createElement } from '../../utils/dom.js';
import { ICONS } from './icons.js';

export class ThemeToggle {
  constructor() {
    this.isDark = false;
    this.button = this.createButton();
    this.updateIcon();
  }

  createButton() {
    const button = createElement('button', 'theme-toggle');
    button.setAttribute('aria-label', 'Toggle theme');
    button.addEventListener('click', () => this.toggle());
    return button;
  }

  toggle() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark-mode');
    this.updateIcon();
  }

  updateIcon() {
    this.button.innerHTML = this.isDark ? ICONS.moon : ICONS.sun;
    this.button.setAttribute('aria-label', 
      this.isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  render() {
    return this.button;
  }
}