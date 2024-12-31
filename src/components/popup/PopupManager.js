/**
 * Manages popup lifecycle and prevents duplicates
 */
export class PopupManager {
  constructor() {
    this.activePopups = new Map();
    this.cleanup();
  }

  cleanup() {
    // Remove duplicate popups
    const popupIds = new Set();
    document.querySelectorAll('.popup-overlay').forEach(popup => {
      const id = popup.dataset.popupId;
      if (popupIds.has(id) || !this.activePopups.has(id)) {
        popup.remove();
      } else {
        popupIds.add(id);
      }
    });
  }

  show(id, PopupClass, ...args) {
    // Clean up any existing popups first
    this.cleanup();

    // Don't create duplicate popups
    if (this.activePopups.has(id)) {
      return this.activePopups.get(id);
    }

    try {
      const popup = new PopupClass(...args);
      popup.popup.dataset.popupId = id;
      this.activePopups.set(id, popup);
      popup.show();
      return popup;
    } catch (error) {
      console.error(`Failed to create popup ${id}:`, error);
      return null;
    }
  }

  hide(id) {
    const popup = this.activePopups.get(id);
    if (popup) {
      popup.hide();
      this.activePopups.delete(id);
    }
  }

  hideAll() {
    this.activePopups.forEach((popup, id) => this.hide(id));
  }
}

// Export singleton instance
export const popupManager = new PopupManager();