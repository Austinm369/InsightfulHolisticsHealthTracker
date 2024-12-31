import { BasePopup } from '../popup/index.js';
import { createElement } from '../../utils/dom.js';
import { createCustomTracker } from '../widgets/CustomTracker.js';

export class ExerciseTrackerPopup extends BasePopup {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    const content = createElement('div', 'exercise-tracker-content');
    
    content.innerHTML = `
      <h2 class="popup-title">Add Exercise Tracker</h2>
      <div class="exercise-presets">
        ${this.getExercisePresets().map(preset => `
          <button class="exercise-preset" data-preset='${JSON.stringify(preset)}'>
            <span class="preset-icon">${preset.icon}</span>
            <span class="preset-name">${preset.name}</span>
          </button>
        `).join('')}
      </div>
    `;

    this.setContent(content);
    this.attachEventListeners(content);
  }

  getExercisePresets() {
    return [
      { name: 'Running', icon: '🏃', unit: 'minutes', goal: 30, increment: 5, caloriesPerIncrement: 50 },
      { name: 'Cycling', icon: '🚴', unit: 'minutes', goal: 45, increment: 5, caloriesPerIncrement: 40 },
      { name: 'Swimming', icon: '🏊', unit: 'minutes', goal: 30, increment: 5, caloriesPerIncrement: 60 },
      { name: 'Weight Training', icon: '🏋️', unit: 'minutes', goal: 45, increment: 5, caloriesPerIncrement: 45 },
      { name: 'Yoga', icon: '🧘', unit: 'minutes', goal: 20, increment: 5, caloriesPerIncrement: 25 },
      { name: 'Push-ups', icon: '💪', unit: 'reps', goal: 50, increment: 5, caloriesPerIncrement: 5 },
      { name: 'Squats', icon: '🦵', unit: 'reps', goal: 30, increment: 5, caloriesPerIncrement: 7 },
      { name: 'Planks', icon: '🏋️‍♀️', unit: 'seconds', goal: 60, increment: 10, caloriesPerIncrement: 3 }
    ];
  }

  attachEventListeners(content) {
    content.querySelectorAll('.exercise-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = JSON.parse(btn.dataset.preset);
        const id = preset.name.toLowerCase().replace(/\s+/g, '-');
        
        createCustomTracker(
          id,
          preset.name,
          preset.unit,
          preset.goal,
          preset.increment,
          preset.icon,
          preset.caloriesPerIncrement
        );
        
        this.hide();
      });
    });
  }
}