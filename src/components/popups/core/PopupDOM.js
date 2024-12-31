/**
 * Handles DOM manipulation for popups
 */
export class PopupDOM {
  static setContent(popup, content) {
    const container = popup.querySelector('.popup-inner-content');
    if (!container) return;
    
    if (content instanceof HTMLElement) {
      container.innerHTML = '';
      container.appendChild(content);
    } else {
      container.innerHTML = content;
    }
  }

  static setSize(popup, size) {
    const content = popup.querySelector('.popup-content');
    if (content) {
      content.dataset.size = size;
    }
  }
}