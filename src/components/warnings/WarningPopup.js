import { BasePopup } from '../popup/BasePopup.js';
import { WARNING_MESSAGES } from '../../constants/messages.js';

export class WarningPopup extends BasePopup {
  constructor(type) {
    super();
    this.type = type;
    this.initialize();
  }

  initialize() {
    const warning = WARNING_MESSAGES[this.type];
    if (!warning) {
      throw new Error(`Warning type "${this.type}" not found`);
    }

    const content = `
      <div class="warning-popup-content">
        <h2 class="warning-title">${warning.title}</h2>
        <p class="warning-message">${warning.message}</p>
      </div>
    `;

    this.setContent(content);
  }

  static show(type) {
    const popup = new WarningPopup(type);
    popup.show();
    return popup;
  }
}