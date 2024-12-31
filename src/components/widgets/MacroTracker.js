import { createElement } from '../../utils/dom.js';
import { state, updateState } from '../../utils/state.js';
import { calculateTotalCalories } from '../../utils/calorieCalculations.js';
import { eventBus } from '../../utils/events.js';
import { initializeExpandableSection } from '../common/ExpandableSection.js';

export function initializeMacroTracker(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const widget = createElement('div', 'widget-content macro-widget');
  
  widget.innerHTML = `
    <div class="widget-header">
      <h2><span class="widget-icon">📊</span>Nutrition Tracker</h2>
      <button class="expand-toggle" aria-label="Toggle content">🔽</button>
    </div>
    
    <div class="macro-grid">
      ${createMacroCard('protein', '🥩', 'Protein')}
      ${createMacroCard('carbs', '🍚', 'Carbs')}
      ${createMacroCard('fats', '🥑', 'Fats')}
    </div>

    <div class="calories-summary">
      <div class="calorie-card consumed">
        <div class="calorie-label">Calories Consumed</div>
        <div class="calorie-value">0</div>
      </div>
      <div class="calorie-card burned">
        <div class="calorie-label">Calories Burned</div>
        <div class="calorie-value">0</div>
      </div>
      <div class="calorie-card net">
        <div class="calorie-label">Net Calories</div>
        <div class="calorie-value">0</div>
      </div>
    </div>

    <div class="expandable-content" style="display: none;">
      <div class="action-buttons">
        <button class="action-button" id="add-tracker">
          ➕ Add Custom Tracker
        </button>
        <button class="action-button" id="manage-trackers">
          ⚙️ Manage Trackers
        </button>
      </div>
    </div>
  `;

  // Initialize expandable section
  initializeExpandableSection(widget);

  // Add event listeners for macro controls
  attachMacroListeners(widget);

  // Update initial display
  updateCalorieDisplay(widget);

  // Subscribe to calories burned updates
  eventBus.on('caloriesBurnedUpdated', (caloriesBurned) => {
    updateState('caloriesBurned', caloriesBurned);
    updateCalorieDisplay(widget);
  });

  container.appendChild(widget);
}

function createMacroCard(type, icon, label) {
  return `
    <div class="macro-card ${type}">
      <div class="macro-icon">${icon}</div>
      <div class="macro-label">${label}</div>
      <div class="macro-value">${state[type] || 0}/${state[`${type}Goal`]}g</div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${((state[type] || 0) / state[`${type}Goal`]) * 100}%"></div>
      </div>
      <div class="macro-controls">
        <button class="btn-decrease">-5g</button>
        <button class="btn-increase">+5g</button>
      </div>
    </div>
  `;
}

function attachMacroListeners(widget) {
  ['protein', 'carbs', 'fats'].forEach(type => {
    const card = widget.querySelector(`.${type}`);
    if (!card) return;

    card.querySelector('.btn-increase').addEventListener('click', () => {
      const newValue = updateState(type, (state[type] || 0) + 5);
      updateMacroDisplay(card, type, newValue);
      updateCalorieDisplay(widget);
    });

    card.querySelector('.btn-decrease').addEventListener('click', () => {
      if ((state[type] || 0) >= 5) {
        const newValue = updateState(type, state[type] - 5);
        updateMacroDisplay(card, type, newValue);
        updateCalorieDisplay(widget);
      }
    });
  });
}

function updateMacroDisplay(card, type, value) {
  const goal = state[`${type}Goal`];
  card.querySelector('.macro-value').textContent = `${value}/${goal}g`;
  card.querySelector('.progress-fill').style.width = `${(value / goal) * 100}%`;
}

function updateCalorieDisplay(widget) {
  const calories = {
    consumed: calculateTotalCalories({
      protein: state.protein || 0,
      carbs: state.carbs || 0,
      fats: state.fats || 0
    }),
    burned: state.caloriesBurned || 0
  };
  
  calories.net = calories.consumed - calories.burned;

  Object.entries(calories).forEach(([type, value]) => {
    const card = widget.querySelector(`.calorie-card.${type}`);
    if (card) {
      card.querySelector('.calorie-value').textContent = value;
    }
  });
}