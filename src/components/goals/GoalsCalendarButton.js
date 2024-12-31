import { createElement } from '../../utils/dom.js';
import { GoalsCalendarPopup } from './GoalsCalendarPopup.js';

export class GoalsCalendarButton {
  constructor() {
    this.popup = new GoalsCalendarPopup();
    this.button = this.createButton();
  }

  createButton() {
    const button = createElement('button', 'goals-calendar-button');
    button.setAttribute('aria-label', 'View goals calendar');
    button.textContent = '📆';
    
    button.addEventListener('click', () => {
      this.popup.show();
    });

    return button;
  }

  mount() {
    const headerControls = document.querySelector('.header-controls');
    if (headerControls) {
      headerControls.insertBefore(this.button, headerControls.firstChild);
    }
  }
}