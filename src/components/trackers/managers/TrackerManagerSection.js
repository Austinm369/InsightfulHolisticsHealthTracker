import { createElement } from '../../../utils/dom.js';
import { handleError } from '../../../utils/errorHandler.js';
import { CreateTrackerPopup } from '../CreateTrackerPopup.js';

export class TrackerManagerSection {
  constructor() {
    try {
      this.popup = new CreateTrackerPopup();
      this.element = this.createSection();
    } catch (error) {
      handleError(error, 'tracker manager section');
    }
  }

  createSection() {
    const section = createElement('section', 'tracker-manager-section');
    section.appendChild(this.createButton());
    section.appendChild(this.createMotto());
    return section;
  }

  createButton() {
    const button = createElement('button', 'tracker-manager-button');
    button.innerHTML = '➕ Create Custom Health Tracker';
    button.addEventListener('click', () => this.popup.show());
    return button;
  }

  createMotto() {
    const motto = createElement('p', 'tracker-motto');
    motto.textContent = '🏆 What gets measured gets improved!';
    return motto;
  }

  render() {
    return this.element;
  }
}