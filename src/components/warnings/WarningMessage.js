import { createElement } from '../../utils/dom.js';

export function createWarningMessage(title, message) {
  const container = createElement('div', 'warning-content');
  
  const titleElement = createElement('h2', 'popup-title warning-title');
  titleElement.textContent = title;
  
  const messageElement = createElement('p', 'warning-message');
  messageElement.textContent = message;
  
  container.appendChild(titleElement);
  container.appendChild(messageElement);
  
  return container;
}