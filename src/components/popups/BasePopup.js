/**
 * Base Popup Component
 * Provides core popup functionality for all popup types
 */
export class BasePopup {
  constructor() {
    this.popup = this.createPopup();
    this.isVisible = false;
    this.addEventListeners();
  }

  createPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.style.display = 'none';
    
    popup.innerHTML = `
      <div class="popup-content">
        <button class="popup-close" aria-label="Close popup">×</button>
        <div class="popup-inner-content"></div>
      </div>
    `;

    return popup;
  }

  addEventListeners() {
    // Close button handler
    const closeBtn = this.popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => this.hide());

    // Close on overlay click
    this.popup.addEventListener('click', (e) => {
      if (e.target === this.popup) {
        this.hide();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });
  }

  setContent(content) {
    const innerContent = this.popup.querySelector('.popup-inner-content');
    innerContent.innerHTML = '';
    
    if (content instanceof HTMLElement) {
      innerContent.appendChild(content);
    } else {
      innerContent.innerHTML = content;
    }
  }

  show() {
    if (!this.isVisible) {
      // Add to DOM first
      document.body.appendChild(this.popup);
      
      // Trigger reflow before showing
      this.popup.offsetHeight;
      
      requestAnimationFrame(() => {
        this.popup.style.display = 'flex';
        this.popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isVisible = true;
      });
    }
  }

  hide() {
    if (this.isVisible) {
      this.popup.classList.remove('active');
      this.popup.addEventListener('transitionend', () => {
        if (!this.isVisible) {
          this.popup.style.display = 'none';
          document.body.removeChild(this.popup);
        }
      }, { once: true });
      
      document.body.style.overflow = '';
      this.isVisible = false;
    }
  }
}