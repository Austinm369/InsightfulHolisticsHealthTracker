import { createElement } from '../../utils/dom.js';
import { showCalendarPopup } from './CalendarPopup.js';

export function createCalendarButton() {
  const button = createElement('button', 'header-button calendar-button');
  button.setAttribute('aria-label', 'View progress calendar');
  button.textContent = '📆';
  
  button.addEventListener('click', () => {
    showCalendarPopup();
  });
  
  return button;
}