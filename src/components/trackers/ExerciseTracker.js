import { createElement } from '../../utils/dom.js';
import { trackerStorage } from '../../utils/storage/trackerInstance.js';
import { calculateTotalCaloriesBurned } from '../../utils/calorieCalculations.js';

export class ExerciseTracker {
  constructor() {
    this.element = this.createTracker();
    this.initialize();
  }

  createTracker() {
    const container = createElement('section', 'widget exercise-tracker');
    container.id = 'exercise-tracker';
    
    container.innerHTML = `
      <div class="widget-content">
        <div class="widget-header">
          <h2>🏋️‍♂️ Exercise Tracking</h2>
          <span class="total-calories">0 calories burned</span>
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
      </div>
    `;

    return container;
  }

  initialize() {
    this.updateExercises();
    this.subscribeToChanges();
  }

  updateExercises() {
    const grid = this.element.querySelector('.exercises-grid');
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

    this.updateSummary(exercises);
  }

  updateSummary(exercises) {
    const totalCalories = calculateTotalCaloriesBurned(exercises);
    this.element.querySelector('.exercises-count').textContent = exercises.length;
    this.element.querySelector('.calories-total').textContent = totalCalories;
    this.element.querySelector('.total-calories').textContent = `${totalCalories} calories burned`;
  }

  subscribeToChanges() {
    document.addEventListener('exerciseUpdated', () => this.updateExercises());
  }
}