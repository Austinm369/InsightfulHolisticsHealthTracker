/**
 * Popup error recovery system
 * Handles error cases and provides fallback behaviors
 */
export class PopupRecovery {
  /**
   * Attempt to recover a stuck popup
   * @param {HTMLElement} popup - Popup element to recover
   */
  static recoverStuckPopup(popup) {
    if (!popup) return;

    // Try graceful cleanup first
    try {
      popup.style.opacity = '0';
      popup.style.pointerEvents = 'none';
      
      // Remove after fade
      setTimeout(() => {
        if (document.body.contains(popup)) {
          document.body.removeChild(popup);
        }
      }, 300);
    } catch (error) {
      // Force cleanup as fallback
      this.forceCleanup(popup);
    }
  }

  /**
   * Force popup cleanup when normal methods fail
   * @param {HTMLElement} popup - Popup to clean up
   */
  static forceCleanup(popup) {
    try {
      // Make popup invisible but keep in DOM
      popup.style.cssText = `
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        position: fixed;
        z-index: -9999;
        transform: scale(0.0001);
        width: 1px;
        height: 1px;
      `;
    } catch (error) {
      console.error('Force cleanup failed:', error);
    }
  }

  /**
   * Verify popup state and structure
   * @param {HTMLElement} popup - Popup to verify
   * @returns {boolean} True if popup is valid
   */
  static verifyPopup(popup) {
    if (!popup) return false;

    const required = [
      '.popup-content',
      '.popup-close',
      '.popup-inner-content'
    ];

    return required.every(selector => popup.querySelector(selector));
  }

  /**
   * Regenerate invalid popup structure
   * @param {HTMLElement} popup - Popup to regenerate
   */
  static regeneratePopup(popup) {
    if (!popup) return;

    const content = popup.querySelector('.popup-inner-content')?.innerHTML || '';
    
    popup.innerHTML = `
      <div class="popup-content">
        <button class="popup-close" aria-label="Close popup">×</button>
        <div class="popup-inner-content">${content}</div>
      </div>
    `;
  }
}