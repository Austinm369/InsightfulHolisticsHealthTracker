import { createElement } from '../../utils/dom.js';

export class BaseButton {
  constructor(label, icon, onClick) {
    this.label = label;
    this.icon = icon;
    this.onClick = onClick;
    this.button = this.createButton();
  }

  createButton() {
    const button = createElement('button', 'menu-button');
    button.setAttribute('aria-label', this.label);
    button.innerHTML = this.icon;
    button.addEventListener('click', this.onClick);
    return button;
  }

  render() {
    return this.button;
  }
}