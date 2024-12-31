import { createElement } from '../../utils/dom.js';
import { trackerStorage } from '../../utils/storage/trackerInstance.js';

export function createCustomTracker(id, name, unit, goal, increment, icon) {
  const container = createElement('section', 'widget');
  container.id = id;
  
  const widget = createElement('div', 'widget-content');
  widget.innerHTML = `
    <div class="widget-header">
      <h2><span class="widget-icon">${icon}</span> ${name}</h2>
      <span class="widget-value">0/${goal} ${unit}</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: 0%"></div>
    </div>
    <div class="widget-controls">
      <button class="btn-decrement" aria-label="Decrease ${name}">-${increment}</button>
      <button class="btn-increment" aria-label="Increase ${name}">+${increment}</button>
    </div>
  `;

  // Save tracker configuration
  trackerStorage.saveTracker({
    id,
    name,
    unit,
    goal,
    increment,
    icon,
    value: 0
  });

  // Add event listeners
  const incrementBtn = widget.querySelector('.btn-increment');
  const decrementBtn = widget.querySelector('.btn-decrement');

  incrementBtn.addEventListener('click', () => {
    const newValue = trackerStorage.updateValue(id, increment);
    updateDisplay(widget, newValue, goal, unit);
  });

  decrementBtn.addEventListener('click', () => {
    const currentValue = trackerStorage.getValue(id);
    if (currentValue >= increment) {
      const newValue = trackerStorage.updateValue(id, -increment);
      updateDisplay(widget, newValue, goal, unit);
    }
  });

  container.appendChild(widget);
  
  // Add to trackers grid
  const trackersGrid = document.querySelector('.trackers-grid');
  const addTrackerBtn = document.getElementById('add-tracker');
  trackersGrid.insertBefore(container, addTrackerBtn);
}

function updateDisplay(widget, value, goal, unit) {
  const display = widget.querySelector('.widget-value');
  display.textContent = `${value}/${goal} ${unit}`;
  
  const progressBar = widget.querySelector('.progress-fill');
  progressBar.style.width = `${(value / goal) * 100}%`;
}