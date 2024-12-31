import { createElement } from '../../utils/dom.js';
import { state, updateState } from '../../utils/state.js';
import { calculateCaloriesFromSteps } from '../../utils/calorieCalculations.js';
import { eventBus } from '../../utils/events.js';

export function initializeStepTracker(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const widget = createElement('div', 'widget-content');
  
  widget.innerHTML = `
    <div class="widget-header">
      <h2>👣 Daily Steps</h2>
      <span class="widget-value">${state.steps} / ${state.stepsGoal} steps</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${(state.steps / state.stepsGoal) * 100}%"></div>
    </div>
    <div class="calories-burned">
      Calories Burned: ${calculateCaloriesFromSteps(state.steps)}
    </div>
    <div class="widget-controls">
      <button class="btn-decrease">-500</button>
      <button class="btn-increase">+500</button>
    </div>
  `;

  // Add event listeners
  widget.querySelector('.btn-increase').addEventListener('click', () => {
    const newValue = updateState('steps', state.steps + 500);
    updateDisplay(widget, newValue);
  });

  widget.querySelector('.btn-decrease').addEventListener('click', () => {
    if (state.steps >= 500) {
      const newValue = updateState('steps', state.steps - 500);
      updateDisplay(widget, newValue);
    }
  });

  container.appendChild(widget);
}

function updateDisplay(widget, value) {
  widget.querySelector('.widget-value').textContent = `${value} / ${state.stepsGoal} steps`;
  widget.querySelector('.progress-fill').style.width = `${(value / state.stepsGoal) * 100}%`;
  
  const caloriesBurned = calculateCaloriesFromSteps(value);
  widget.querySelector('.calories-burned').textContent = `Calories Burned: ${caloriesBurned}`;
  
  // Emit calories burned update event
  eventBus.emit('caloriesBurnedUpdated', caloriesBurned);
}