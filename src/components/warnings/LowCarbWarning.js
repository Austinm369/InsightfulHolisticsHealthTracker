import { BasePopup } from '../popup/BasePopup.js';
import { WARNING_MESSAGES } from '../../constants/messages.js';
import { createWarningMessage } from './WarningMessage.js';

export class LowCarbWarning extends BasePopup {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    const content = this.getContent();
    content.classList.add('warning-popup-content');
    
    const { title, message } = WARNING_MESSAGES.LOW_CARB;
    const warningContent = createWarningMessage(title, message);
    content.appendChild(warningContent);
  }
}