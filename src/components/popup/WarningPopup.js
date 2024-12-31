/**
 * Warning Popup Component
 * Displays critical health warnings to users
 */
import { BasePopup } from './BasePopup.js';

export class WarningPopup extends BasePopup {
  constructor(message) {
    super();
    this.message = message;
    this.initialize();
  }

  initialize() {
    const content = this.getContent();
    content.classList.add('warning-popup-content');
    
    const title = document.createElement('h2');
    title.className = 'popup-title warning-title';
    title.textContent = 'Health Warning';
    
    const messageEl = document.createElement('p');
    messageEl.className = 'warning-message';
    messageEl.textContent = this.message;
    
    content.appendChild(title);
    content.appendChild(messageEl);
  }
}