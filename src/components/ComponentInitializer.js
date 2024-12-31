import { safeQuerySelector } from '../utils/dom';

export function initializeComponent(id, initFn) {
  try {
    let container = safeQuerySelector(`#${id}`);
    if (!container) {
      container = document.createElement('section');
      container.id = id;
      container.className = 'widget';
      safeQuerySelector('#app')?.appendChild(container);
    }
    initFn();
  } catch (error) {
    console.error(`Failed to initialize ${id}:`, error);
  }
}