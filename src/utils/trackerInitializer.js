import { state } from './state.js';
import { defaultTrackers } from '../data/defaultTrackers.js';
import { createCustomTracker } from '../components/widgets/CustomTracker.js';
import { validateContainer } from './validators/domChecks.js';
import { errorBoundary } from './error/errorBoundary.js';

export function initializeAllTrackers() {
  try {
    const container = validateContainer('trackers-grid');

    // Initialize default trackers
    defaultTrackers.forEach(tracker => {
      const id = tracker.name.toLowerCase().replace(/\s+/g, '-');
      if (!document.getElementById(id)) {
        errorBoundary.wrapFunction(() => {
          createCustomTracker(
            id,
            tracker.name,
            tracker.unit,
            tracker.goal,
            tracker.increment,
            tracker.icon
          );
        }, `initializing tracker ${id}`)();
      }
    });

    // Initialize custom trackers from state
    const customTrackers = state.customTrackers || [];
    customTrackers.forEach(tracker => {
      if (!document.getElementById(tracker.id)) {
        errorBoundary.wrapFunction(() => {
          createCustomTracker(
            tracker.id,
            tracker.name,
            tracker.unit,
            tracker.goal,
            tracker.increment,
            tracker.icon
          );
        }, `initializing custom tracker ${tracker.id}`)();
      }
    });

    // Apply visibility settings
    const hiddenTrackers = state.hiddenTrackers || [];
    hiddenTrackers.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.add('hidden');
      }
    });
  } catch (error) {
    console.error('Failed to initialize trackers:', error);
  }
}