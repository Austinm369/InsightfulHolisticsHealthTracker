/**
 * Manages popup lifecycle and cleanup
 */
export class PopupManager {
  static instance = null;
  
  constructor() {
    if (PopupManager.instance) {
      return PopupManager.instance;
    }
    this.activePopups = new Map();
    this.containerEl = this.createContainer();
    PopupManager.instance = this;
  }

  createContainer() {
    let container = document.getElementById('popup-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'popup-container';
      container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(container);
    }
    return container;
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

  register(popup, id) {
    this.cleanup();
    this.activePopups.set(id, popup);
    popup.element.dataset.popupId = id;
    this.containerEl.appendChild(popup.element);
  }

  unregister(id) {
    this.activePopups.delete(id);
    this.cleanup();
  }
}

export const popupManager = new PopupManager();