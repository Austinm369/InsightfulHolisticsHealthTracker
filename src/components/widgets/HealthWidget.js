import { createProgressBar } from './ProgressBar.js';

export function createHealthWidget(title, value, goal, unit, onIncrement, onDecrement) {
  const widget = document.createElement('div');
  widget.className = 'widget fade-in';
  
  widget.innerHTML = `
    <div class="widget-header">
      <h2>${title}</h2>
      <span class="widget-value">${value} / ${goal} ${unit}</span>
    </div>
    <div class="widget-controls">
      <button class="btn-decrement" aria-label="Decrease ${title}">-</button>
      <button class="btn-increment" aria-label="Increase ${title}">+</button>
    </div>
  `;
  
  // Add progress bar
  const progressBar = createProgressBar(value, goal);
  widget.insertBefore(progressBar, widget.querySelector('.widget-controls'));
  
  // Attach event handlers
  widget.querySelector('.btn-increment').addEventListener('click', onIncrement);
  widget.querySelector('.btn-decrement').addEventListener('click', onDecrement);
  
  return widget;
}