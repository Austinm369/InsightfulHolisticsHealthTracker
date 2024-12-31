import { createElement } from '../../utils/dom.js';
import { CreateTrackerPopup } from './CreateTrackerPopup.js';

export class TrackerManager {
  constructor() {
    this.popup = new CreateTrackerPopup();
    this.element = this.createManager();
  }

  createManager() {
    const container = createElement('div', 'tracker-manager');
    
    const button = createElement('button', 'create-tracker-button');
    button.innerHTML = '➕ Create Custom Tracker';
    button.addEventListener('click', () => this.popup.show());
    
    const motto = createElement('p', 'tracker-motto');
    motto.textContent = '✨ Track it to improve it';
    
    container.appendChild(button);
    container.appendChild(motto);
    return container;
  }

  render() {
    return this.element;
  }
}