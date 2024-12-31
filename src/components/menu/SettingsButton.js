import { BaseButton } from './BaseButton.js';
import { SettingsPopup } from '../settings/SettingsPopup.js';
import { MENU_ICONS, MENU_LABELS } from './constants.js';

export class SettingsButton extends BaseButton {
  constructor() {
    const popup = new SettingsPopup();
    super(
      MENU_LABELS.SETTINGS,
      MENU_ICONS.SETTINGS,
      () => popup.show()
    );
  }
}