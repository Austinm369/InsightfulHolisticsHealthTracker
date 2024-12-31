/**
 * Enhanced Popup Manager with error recovery
 */
import { PopupRecovery } from './recovery.js';
import { PopupAnimations } from './animations.js';
import { PopupFocus } from './focus.js';

export class PopupManager {
  constructor() {
    this.activePopups = new Map();
    this.cleanup();
  }

  cleanup() {
    // Remove duplicate popups and recover stuck ones
    const popupIds = new Set();
    document.querySelectorAll('.popup-overlay').forEach(popup => {
      const id = popup.dataset.popupId;
      if (popupIds.has(id) || !this.activePopups.has(id)) {
        PopupRecovery.recoverStuckPopup(popup);
      } else {
        popupIds.add(id);
      }
    });
  }

  async show(id, PopupClass, ...args) {
    try {
      // Clean up any existing popups first
      this.cleanup();

      // Don't create duplicate popups
      if (this.activePopups.has(id)) {
        return this.activePopups.get(id);
      }

      const popup = new PopupClass(...args);
      
      // Verify popup structure
      if (!PopupRecovery.verifyPopup(popup.popup)) {
        PopupRecovery.regeneratePopup(popup.popup);
      }

      popup.popup.dataset.popupId = id;
      this.activePopups.set(id, popup);

      // Setup focus management
      const focusManager = new PopupFocus(popup.popup);
      focusManager.trap();

      // Show with animation
      await PopupAnimations.enter(popup.popup);
      return popup;

    } catch (error) {
      console.error(`Failed to create popup ${id}:`, error);
      return null;
    }
  }

  async hide(id) {
    const popup = this.activePopups.get(id);
    if (popup) {
      try {
        await PopupAnimations.exit(popup.popup);
        popup.hide();
        this.activePopups.delete(id);
      } catch (error) {
        // Force cleanup if normal hide fails
        PopupRecovery.forceCleanup(popup.popup);
        this.activePopups.delete(id);
      }
    }
  }

  hideAll() {
    return Promise.all(
      Array.from(this.activePopups.keys()).map(id => this.hide(id))
    );
  }
}

// Export singleton instance
export const popupManager = new PopupManager();