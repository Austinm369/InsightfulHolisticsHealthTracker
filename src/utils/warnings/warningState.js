// Export the warningState singleton instance
const warningStateInstance = {
  // Warning flags - reset on page load
  shownWarnings: new Set(),

  // Check if warning was shown
  wasShown(warningType) {
    return this.shownWarnings.has(warningType);
  },

  // Mark warning as shown
  markShown(warningType) {
    this.shownWarnings.add(warningType);
  },

  // Reset all warning states
  reset() {
    this.shownWarnings.clear();
  }
};

export const warningState = warningStateInstance;