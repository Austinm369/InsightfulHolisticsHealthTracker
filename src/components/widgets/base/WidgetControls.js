import { createElement } from '../../../utils/dom.js';

export function createWidgetControls(title, onIncrement, onDecrement) {
  const controls = createElement('div', 'widget-controls');
  
  const decrementBtn = createElement('button', 'btn-decrement');
  decrementBtn.setAttribute('aria-label', `Decrease ${title}`);
  decrementBtn.textContent = '-';
  decrementBtn.addEventListener('click', onDecrement);
  
  const incrementBtn = createElement('button', 'btn-increment');
  incrementBtn.setAttribute('aria-label', `Increase ${title}`);
  incrementBtn.textContent = '+';
  incrementBtn.addEventListener('click', onIncrement);
  
  controls.appendChild(decrementBtn);
  controls.appendChild(incrementBtn);
  
  return controls;
}