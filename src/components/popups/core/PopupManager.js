import { PopupDOM } from './PopupDOM.js';
import { validateElement } from '../../../utils/validators/domChecks.js';
import { isString } from '../../../utils/validators/typeChecks.js';

class PopupManager {
  constructor() {
    this.activePopups = new Map();
  }

  createPopupElement() {
    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.innerHTML = `
      <div class="popup-content">
        <button class="popup-close" aria-label="Close popup">×</button>
        <div class="popup-inner-content"></div>
      </div>
    `;
    return popup;
  }

  showPopup(id, content, options = {}) {
    if (!isString(id)) {
      throw new Error('Popup id must be a string');
    }

    const popup = this.createPopupElement();
    validateElement(popup, 'Popup element');
    
    PopupDOM.setContent(popup, content);
    
    if (options.size) {
      PopupDOM.setSize(popup, options.size);
    }

    document.body.appendChild(popup);
    this.activePopups.set(id, popup);
    
    requestAnimationFrame(() => {
      popup.style.display = 'flex';
      popup.classList.add('active');
    });
  }

  hidePopup(id) {
    const popup = this.activePopups.get(id);
    if (!popup) return;

    popup.classList.remove('active');
    popup.addEventListener('transitionend', () => {
      if (document.body.contains(popup)) {
        document.body.removeChild(popup);
      }
      this.activePopups.delete(id);
    }, { once: true });
  }
}

// Export singleton instance
export const popupManager = new PopupManager();