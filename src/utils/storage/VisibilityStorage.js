/**
 * Manages tracker visibility preferences
 */
export class VisibilityStorage {
  constructor() {
    this.STORAGE_KEY = 'tracker-visibility';
    this.hiddenTrackers = this.loadHiddenTrackers();
  }

  loadHiddenTrackers() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load hidden trackers:', error);
      return [];
    }
  }

  saveHiddenTrackers() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.hiddenTrackers));
    } catch (error) {
      console.error('Failed to save hidden trackers:', error);
    }
  }

  isHidden(trackerId) {
    return this.hiddenTrackers.includes(trackerId);
  }

  toggleVisibility(trackerId) {
    const index = this.hiddenTrackers.indexOf(trackerId);
    if (index === -1) {
      this.hiddenTrackers.push(trackerId);
    } else {
      this.hiddenTrackers.splice(index, 1);
    }
    this.saveHiddenTrackers();
    return this.isHidden(trackerId);
  }
}

// Export singleton instance
export const visibilityStorage = new VisibilityStorage();