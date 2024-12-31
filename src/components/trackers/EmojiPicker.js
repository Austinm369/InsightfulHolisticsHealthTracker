import { createElement } from '../../utils/dom.js';

export class EmojiPicker {
  constructor(onSelect) {
    this.onSelect = onSelect;
    this.element = this.createPicker();
  }

  createPicker() {
    const container = createElement('div', 'emoji-picker-field');
    
    const label = createElement('label');
    label.htmlFor = 'tracker-emoji';
    label.textContent = 'Icon:';
    
    const input = createElement('input');
    input.type = 'text';
    input.id = 'tracker-emoji';
    input.className = 'emoji-input';
    input.placeholder = '📊';
    input.maxLength = 2;
    
    const suggestions = createElement('div', 'emoji-suggestions');
    const commonEmojis = ['📊', '📈', '🎯', '⭐', '🔥', '💪', '🏃', '🧘', '🥗', '💧', '😴', '🎨'];
    
    commonEmojis.forEach(emoji => {
      const button = createElement('button', 'emoji-suggestion');
      button.textContent = emoji;
      button.type = 'button';
      button.addEventListener('click', () => {
        input.value = emoji;
        this.onSelect(emoji);
      });
      suggestions.appendChild(button);
    });
    
    input.addEventListener('input', () => {
      this.onSelect(input.value || '📊');
    });
    
    container.appendChild(label);
    container.appendChild(input);
    container.appendChild(suggestions);
    
    return container;
  }

  render() {
    return this.element;
  }
}