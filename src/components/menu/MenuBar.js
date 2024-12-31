import { createElement } from '../../utils/dom.js';
import { CalendarButton } from './CalendarButton.js';
import { SettingsButton } from './SettingsButton.js';
import { ThemeToggle } from './ThemeToggle.js';
import { MENU_ICONS } from './constants.js';

export class MenuBar {
  constructor() {
    this.isExpanded = true;
    this.element = this.createMenuBar();
  }

  createMenuBar() {
    const menuBar = createElement('nav', 'menu-bar');
    
    // Create toggle button
    const toggleButton = createElement('button', 'menu-toggle');
    toggleButton.setAttribute('aria-label', 'Toggle menu');
    toggleButton.innerHTML = MENU_ICONS.COLLAPSE;
    toggleButton.addEventListener('click', () => this.toggleMenu());
    
    // Create buttons container
    const buttonsContainer = createElement('div', 'menu-buttons');
    
    const calendarButton = new CalendarButton();
    const settingsButton = new SettingsButton();
    const themeToggle = new ThemeToggle();
    
    buttonsContainer.appendChild(calendarButton.render());
    buttonsContainer.appendChild(settingsButton.render());
    buttonsContainer.appendChild(themeToggle.render());
    
    menuBar.appendChild(toggleButton);
    menuBar.appendChild(buttonsContainer);
    
    return menuBar;
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
    this.element.classList.toggle('collapsed');
    const toggle = this.element.querySelector('.menu-toggle');
    toggle.innerHTML = this.isExpanded ? MENU_ICONS.COLLAPSE : MENU_ICONS.EXPAND;
  }

  render() {
    return this.element;
  }
}