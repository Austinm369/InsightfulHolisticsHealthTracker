import { createElement } from '../../utils/dom.js';
import { CreateTrackerPopup } from './CreateTrackerPopup.js';

export class TrackerManagerButton {
  constructor() {
    this.popup = new CreateTrackerPopup();
    this.element = this.createButton();
  }

  createButton() {
    const container = createElement('div', 'tracker-manager-section');
    
    const button = createElement('button', 'tracker-manager-button');
    button.innerHTML = '➕ Create Custom Health Tracker';
    button.addEventListener('click', () => this.popup.show());
    
    const motto = createElement('p', 'tracker-motto');
    motto.textContent = '🏆 What gets measured gets improved!';
    
    container.appendChild(button);
    container.appendChild(motto);
    
    return container;
  }

  render() {
    return this.element;
  }
}