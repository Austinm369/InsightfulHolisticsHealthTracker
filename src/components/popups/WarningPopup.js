import { popupManager } from './core/PopupManager';
import { PopupSizes } from './types/PopupTypes';
import { WarningMessages } from '../../constants/warningMessages';

export class WarningPopup {
  static show(type) {
    const warning = WarningMessages[type];
    if (!warning) {
      console.error(`Warning type "${type}" not found`);
      return;
    }

    const content = `
      <div class="warning-popup-content">
        <h2 class="warning-title">${warning.title}</h2>
        <p class="warning-message">${warning.message}</p>
      </div>
    `;
    
    popupManager.showPopup('warning', content, {
      size: PopupSizes.SMALL
    });
  }
}