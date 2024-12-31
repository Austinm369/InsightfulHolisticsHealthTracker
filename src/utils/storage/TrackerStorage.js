/**
 * Handles storage and retrieval of tracker data
 */
export class TrackerStorage {
  constructor() {
    this.STORAGE_KEY = 'custom-trackers';
    this.trackers = this.loadTrackers();
  }

  loadTrackers() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load trackers:', error);
      return {};
    }
  }

  saveTrackers() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.trackers));
    } catch (error) {
      console.error('Failed to save trackers:', error);
    }
  }

  saveTracker(tracker) {
    this.trackers[tracker.id] = tracker;
    this.saveTrackers();
  }

  getTracker(id) {
    return this.trackers[id];
  }

  getValue(id) {
    return this.trackers[id]?.value || 0;
  }

  updateValue(id, increment) {
    const tracker = this.trackers[id];
    if (tracker) {
      tracker.value = Math.max(0, (tracker.value || 0) + increment);
      this.saveTrackers();
      return tracker.value;
    }
    return 0;
  }

  getAllTrackers() {
    return Object.values(this.trackers);
  }

  deleteTracker(id) {
    delete this.trackers[id];
    this.saveTrackers();
  }
}