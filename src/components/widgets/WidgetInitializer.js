import { createElement } from '../../utils/dom.js';
import { handleError } from '../../utils/errorHandler.js';

export function initializeWidget(containerId, content) {
  try {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container ${containerId} not found`);
    }

    const widget = createElement('div', 'widget-content fade-in');
    widget.appendChild(content);
    container.appendChild(widget);

    return widget;
  } catch (error) {
    handleError(error, `initializing widget ${containerId}`);
    return null;
  }
}