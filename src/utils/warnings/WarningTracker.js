/**
 * Tracks shown warnings to prevent duplicates
 */
class WarningTracker {
  constructor() {
    this.shownWarnings = new Set();
  }

  /**
   * Check if warning was already shown
   */
  wasShown(warningType) {
    return this.shownWarnings.has(warningType);
  }

  /**
   * Mark warning as shown
   */
  markShown(warningType) {
    this.shownWarnings.add(warningType);
  }

  /**
   * Reset tracking state
   */
  reset() {
    this.shownWarnings.clear();
  }
}

// Export singleton instance
export const warningTracker = new WarningTracker();