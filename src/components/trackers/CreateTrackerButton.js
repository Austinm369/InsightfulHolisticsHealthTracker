import { createElement } from '../../utils/dom.js';
import { CreateTrackerPopup } from './CreateTrackerPopup.js';

export class CreateTrackerButton {
  constructor() {
    this.popup = new CreateTrackerPopup();
    this.element = this.createButton();
  }

  createButton() {
    const container = createElement('div', 'create-tracker-container');
    
    const button = createElement('button', 'create-tracker-button');
    button.innerHTML = '➕ Create Custom Tracker';
    button.addEventListener('click', () => this.popup.show());
    
    const motto = createElement('p', 'tracker-motto');
    motto.textContent = '✨ What gets measured, gets improved';
    
    container.appendChild(button);
    container.appendChild(motto);
    return container;
  }

  render() {
    return this.element;
  }
}