import { trackerStorage } from '../../utils/storage/trackerInstance.js';
import { createCustomTracker } from '../widgets/CustomTracker.js';

export function initializeTrackers() {
  // Get all saved trackers
  const savedTrackers = trackerStorage.getAllTrackers();
  
  // Initialize each saved tracker
  savedTrackers.forEach(tracker => {
    if (!document.getElementById(tracker.id)) {
      createCustomTracker(
        tracker.id,
        tracker.name,
        tracker.unit,
        tracker.goal,
        tracker.increment,
        tracker.icon
      );
    }
  });
}