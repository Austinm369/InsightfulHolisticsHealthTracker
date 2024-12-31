import { createElement } from '../../utils/dom.js';

/**
 * Creates and returns the main container for all trackers
 */
export function createTrackerContainer() {
  const container = createElement('div', 'trackers-container');
  return container;
}