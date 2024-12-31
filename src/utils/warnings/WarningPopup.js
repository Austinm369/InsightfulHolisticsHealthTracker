import { popupManager } from '../../components/popups/PopupManager.js';

export function showWarning(title, message) {
  const content = `
    <div class="warning-content">
      <h2 class="warning-title">${title}</h2>
      <p class="warning-message">${message}</p>
    </div>
  `;
  
  popupManager.showPopup(`warning-${Date.now()}`, content);
}