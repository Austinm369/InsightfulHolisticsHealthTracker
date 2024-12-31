import { CreateTrackerButton } from './CreateTrackerButton.js';
import { handleError } from '../../utils/errorHandler.js';
import { createElement } from '../../utils/dom.js';

export class CustomTrackersManager {
  constructor() {
    try {
      this.element = this.initialize();
    } catch (error) {
      handleError(error, 'custom trackers manager');
    }
  }

  initialize() {
    const container = createElement('div', 'custom-trackers-manager');
    
    try {
      const createButton = new CreateTrackerButton();
      container.appendChild(createButton.render());
    } catch (error) {
      handleError(error, 'tracker creation button');
    }

    return container;
  }

  render() {
    return this.element;
  }
}