import { createElement } from '../../utils/dom.js';
import { ManageTrackersPopup } from './ManageTrackersPopup.js';

export class ManageTrackersButton {
  constructor() {
    this.popup = new ManageTrackersPopup();
    this.element = this.createButton();
  }

  createButton() {
    const section = createElement('section', 'widget manage-trackers');
    section.id = 'manage-trackers';
    
    const button = createElement('button', 'manage-trackers-btn');
    button.innerHTML = '⚙️ Manage Trackers';
    button.addEventListener('click', () => this.popup.show());
    
    section.appendChild(button);
    return section;
  }
}