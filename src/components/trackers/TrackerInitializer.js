import { createElement } from '../../utils/dom.js';

/**
 * Creates a tracker element with proper structure
 */
export function createTrackerElement(id) {
  const tracker = createElement('div', 'tracker');
  tracker.id = id;
  return tracker;
}

/**
 * Initializes a tracker with proper error handling
 */
export function initializeTracker(container, { id, init }) {
  try {
    const trackerElement = createTrackerElement(id);
    container.appendChild(trackerElement);
    init(id);
  } catch (error) {
    console.error(`Failed to initialize tracker ${id}:`, error);
  }
}