import { createElement } from '../../utils/dom.js';
import { trackerStorage } from '../../utils/storage/trackerInstance.js';
import { calculateTotalCaloriesBurned } from '../../utils/calorieCalculations.js';

export function initializeExerciseTracker(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const widget = createElement('div', 'widget-content');
  
  widget.innerHTML = `
    <div class="widget-header">
      <h2><span class="widget-icon">📊</span>Exercise Tracking</h2>
      <button class="expand-toggle" aria-label="Toggle content">🔽</button>
    </div>
    
    <div class="exercises-grid">
      <!-- Exercise entries will be added here -->
    </div>
    
    <div class="exercise-summary">
      <div class="summary-item">
        <span class="summary-label">Total Exercises</span>
        <span class="summary-value exercises-count">0</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Total Calories Burned</span>
        <span class="summary-value calories-total">0</span>
      </div>
    </div>

    <div class="expandable-content" style="display: none;">
      <div class="action-buttons">
        <button id="add-exercise" class="action-button">
          🏋️‍♂️ Add Exercise
        </button>
        <button id="manage-exercises" class="action-button">
          ⚙️ Manage Exercises
        </button>
      </div>
    </div>
  `;

  // Add toggle functionality
  const toggle = widget.querySelector('.expand-toggle');
  const content = widget.querySelector('.expandable-content');
  
  toggle.addEventListener('click', () => {
    const isExpanded = content.style.display !== 'none';
    content.style.display = isExpanded ? 'none' : 'block';
    toggle.textContent = isExpanded ? '🔽' : '🔼';
  });

  // Initialize exercise tracking
  updateExercises(widget);
  
  container.appendChild(widget);
}

function updateExercises(widget) {
  const grid = widget.querySelector('.exercises-grid');
  const exercises = trackerStorage.getAllTrackers().filter(t => t.caloriesPerIncrement);
  
  grid.innerHTML = exercises.map(exercise => `
    <div class="exercise-entry" data-id="${exercise.id}">
      <div class="exercise-info">
        <span class="exercise-icon">${exercise.icon}</span>
        <span class="exercise-name">${exercise.name}</span>
      </div>
      <div class="exercise-stats">
        <span class="exercise-value">${exercise.value} ${exercise.unit}</span>
        <span class="calories-burned">${exercise.value * exercise.caloriesPerIncrement} cal</span>
      </div>
    </div>
  `).join('');

  updateSummary(widget, exercises);
}

function updateSummary(widget, exercises) {
  const totalCalories = calculateTotalCaloriesBurned(exercises);
  widget.querySelector('.exercises-count').textContent = exercises.length;
  widget.querySelector('.calories-total').textContent = totalCalories;
}