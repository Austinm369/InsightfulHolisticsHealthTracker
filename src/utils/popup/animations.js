/**
 * Popup animation utilities
 * Handles animation timing and transitions
 */
export const PopupAnimations = {
  // Animation durations in ms
  DURATIONS: {
    FADE: 300,
    SLIDE: 300
  },

  // CSS classes for animations
  CLASSES: {
    ACTIVE: 'active',
    ENTERING: 'entering',
    LEAVING: 'leaving'
  },

  /**
   * Animate element entry
   * @param {HTMLElement} element - Element to animate
   * @returns {Promise} Resolves when animation completes
   */
  enter(element) {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        element.classList.add(this.CLASSES.ENTERING);
        element.addEventListener('transitionend', () => {
          element.classList.remove(this.CLASSES.ENTERING);
          element.classList.add(this.CLASSES.ACTIVE);
          resolve();
        }, { once: true });
      });
    });
  },

  /**
   * Animate element exit
   * @param {HTMLElement} element - Element to animate
   * @returns {Promise} Resolves when animation completes
   */
  exit(element) {
    return new Promise(resolve => {
      element.classList.add(this.CLASSES.LEAVING);
      element.classList.remove(this.CLASSES.ACTIVE);
      element.addEventListener('transitionend', () => {
        element.classList.remove(this.CLASSES.LEAVING);
        resolve();
      }, { once: true });
    });
  }
};