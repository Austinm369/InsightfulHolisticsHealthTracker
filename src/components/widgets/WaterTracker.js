import { createElement } from '../../utils/dom.js';
import { state, updateState } from '../../utils/state.js';

export function initializeWaterTracker(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const widget = createElement('div', 'widget-content');
  
  widget.innerHTML = `
    <div class="widget-header">
      <h2>🥤 Water Intake</h2>
      <span class="widget-value">${state.water} / ${state.waterGoal} glasses</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${(state.water / state.waterGoal) * 100}%"></div>
    </div>
    <div class="widget-controls">
      <button class="btn-decrease">-</button>
      <button class="btn-increase">+</button>
    </div>
  `;

  // Add event listeners
  widget.querySelector('.btn-increase').addEventListener('click', () => {
    const newValue = updateState('water', state.water + 1);
    updateDisplay(widget, newValue);
  });

  widget.querySelector('.btn-decrease').addEventListener('click', () => {
    if (state.water > 0) {
      const newValue = updateState('water', state.water - 1);
      updateDisplay(widget, newValue);
    }
  });

  container.appendChild(widget);
}

function updateDisplay(widget, value) {
  widget.querySelector('.widget-value').textContent = `${value} / ${state.waterGoal} glasses`;
  widget.querySelector('.progress-fill').style.width = `${(value / state.waterGoal) * 100}%`;
}