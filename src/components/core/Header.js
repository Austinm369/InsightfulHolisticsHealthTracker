/**
 * Header component with controls
 */
import { createElement } from '../../utils/dom.js';
import { ThemeToggle } from '../theme/ThemeToggle.js';
import { SettingsButton } from '../settings/SettingsButton.js';

export function createHeader() {
  const header = createElement('header', 'header');
  
  // Create title
  const title = createElement('h1');
  title.textContent = 'Insightful Holistics Health Tracker';
  
  // Create controls container
  const controls = createElement('div', 'header-controls');
  
  // Add controls
  const themeToggle = new ThemeToggle();
  const settingsButton = new SettingsButton();
  
  controls.appendChild(themeToggle.render());
  controls.appendChild(settingsButton.render());
  
  header.appendChild(title);
  header.appendChild(controls);
  
  return header;
}