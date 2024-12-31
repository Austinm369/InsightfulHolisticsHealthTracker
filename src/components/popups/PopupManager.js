/**
 * Manages popup creation and lifecycle
 */
export class PopupManager {
  constructor() {
    this.activePopups = new Map();
  }

  createPopup(id, content) {
    // Only create if doesn't exist
    if (!this.activePopups.has(id)) {
      const popup = document.createElement('div');
      popup.className = 'popup-overlay';
      popup.style.display = 'none';
      
      popup.innerHTML = `
        <div class="popup-content">
          <button class="popup-close" aria-label="Close popup">×</button>
          <div class="popup-inner-content"></div>
        </div>
      `;

      this.setupPopupEvents(popup, id);
      this.setPopupContent(popup, content);
      this.activePopups.set(id, popup);
    }
    
    return this.activePopups.get(id);
  }

  setupPopupEvents(popup, id) {
    // Close button
    popup.querySelector('.popup-close').addEventListener('click', () => {
      this.hidePopup(id);
    });

    // Click outside
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        this.hidePopup(id);
      }
    });
  }

  setPopupContent(popup, content) {
    const container = popup.querySelector('.popup-inner-content');
    container.innerHTML = '';
    
    if (content instanceof HTMLElement) {
      container.appendChild(content);
    } else {
      container.innerHTML = content;
    }
  }

  showPopup(id, content) {
    const popup = this.createPopup(id, content);
    document.body.appendChild(popup);
    
    // Trigger reflow
    popup.offsetHeight;
    
    requestAnimationFrame(() => {
      popup.style.display = 'flex';
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  hidePopup(id) {
    const popup = this.activePopups.get(id);
    if (popup) {
      popup.classList.remove('active');
      
      popup.addEventListener('transitionend', () => {
        popup.style.display = 'none';
        document.body.removeChild(popup);
        this.activePopups.delete(id);
        
        // Only unlock scroll if no other popups
        if (this.activePopups.size === 0) {
          document.body.style.overflow = '';
        }
      }, { once: true });
    }
  }
}

// Export singleton instance
export const popupManager = new PopupManager();