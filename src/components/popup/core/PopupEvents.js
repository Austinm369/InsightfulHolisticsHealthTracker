/**
 * Manages popup event handling
 */
export class PopupEvents {
  static setup(popup, { onClose }) {
    this.setupCloseButton(popup, onClose);
    this.setupOutsideClick(popup, onClose);
    this.setupKeyboardEvents(popup, onClose);
  }

  static setupCloseButton(popup, onClose) {
    const closeBtn = popup.querySelector('.popup-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', onClose);
    }
  }

  static setupOutsideClick(popup, onClose) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        onClose();
      }
    });
  }

  static setupKeyboardEvents(popup, onClose) {
    const handler = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handler);
    
    // Cleanup when popup is removed
    popup.addEventListener('remove', () => {
      document.removeEventListener('keydown', handler);
    });
  }
}