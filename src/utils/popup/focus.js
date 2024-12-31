/**
 * Focus management for popups
 * Handles focus trapping and accessibility
 */
export class PopupFocus {
  constructor(popup) {
    this.popup = popup;
    this.previousFocus = null;
    this.focusableSelector = [
      'button',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
  }

  /**
   * Trap focus within popup
   */
  trap() {
    this.previousFocus = document.activeElement;
    this.popup.setAttribute('tabindex', '-1');
    this.popup.focus();
    
    this.popup.addEventListener('keydown', this.handleTab);
  }

  /**
   * Release focus trap
   */
  release() {
    this.popup.removeEventListener('keydown', this.handleTab);
    if (this.previousFocus?.focus) {
      this.previousFocus.focus();
    }
  }

  /**
   * Get focusable elements within popup
   */
  getFocusableElements() {
    return Array.from(this.popup.querySelectorAll(this.focusableSelector))
      .filter(el => !el.hasAttribute('disabled'));
  }

  /**
   * Handle tab key to keep focus trapped
   */
  handleTab = (e) => {
    if (e.key !== 'Tab') return;

    const focusable = this.getFocusableElements();
    if (!focusable.length) return;
    
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };
}