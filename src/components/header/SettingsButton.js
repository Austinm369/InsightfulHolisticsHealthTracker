import { createElement } from '../../utils/dom.js';

export class SettingsButton {
  constructor() {
    this.button = this.createButton();
  }

  createButton() {
    const button = createElement('button', 'settings-button');
    button.textContent = '⚙️';
    button.setAttribute('aria-label', 'Open settings');
    
    button.addEventListener('click', () => {
      // Dispatch custom event for settings
      document.dispatchEvent(new CustomEvent('openSettings'));
    });
    
    return button;
  }

  render() {
    return this.button;
  }
}