/**
 * Handles scroll locking functionality
 */
export class ScrollLock {
  constructor() {
    this.scrollPosition = 0;
    this.isLocked = false;
  }

  lock() {
    if (this.isLocked) return;
    
    this.scrollPosition = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = '100%';
    
    this.isLocked = true;
  }

  unlock() {
    if (!this.isLocked) return;
    
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, this.scrollPosition);
    
    this.isLocked = false;
  }
}