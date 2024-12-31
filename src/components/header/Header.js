import { createElement } from '../../utils/dom.js';
import { ThemeToggle } from './ThemeToggle.js';
import { SettingsButton } from './SettingsButton.js';

export class Header {
  constructor() {
    this.element = this.createHeader();
  }

  createHeader() {
    const header = createElement('header', 'app-header');
    
    // Create title
    const title = createElement('h1', 'header-title');
    title.textContent = 'Health Tracker';
    
    // Create controls container
    const controls = createElement('div', 'header-controls');
    
    // Add theme toggle and settings buttons
    const themeToggle = new ThemeToggle();
    const settingsButton = new SettingsButton();
    
    controls.appendChild(themeToggle.render());
    controls.appendChild(settingsButton.render());
    
    header.appendChild(title);
    header.appendChild(controls);
    
    return header;
  }

  render() {
    return this.element;
  }
}