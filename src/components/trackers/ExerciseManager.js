import { createElement } from '../../utils/dom.js';
import { ExerciseTracker } from './ExerciseTracker.js';
import { ExerciseTrackerPopup } from './ExerciseTrackerPopup.js';

export class ExerciseManager {
  constructor() {
    this.tracker = new ExerciseTracker();
    this.addExercisePopup = new ExerciseTrackerPopup();
    this.initializeTracker();
  }

  initializeTracker() {
    const section = createElement('section', 'widget exercise-tracker');
    section.id = 'exercise-tracker';
    
    section.innerHTML = `
      <div class="widget-header">
        <h2>🏋️‍♂️ Exercise Tracking</h2>
        <button class="add-exercise-btn" aria-label="Add exercise">
          🏋️‍♂️🤸‍♀️ Add Exercise
        </button>
      </div>
      <div class="exercises-grid"></div>
      <div class="exercise-summary"></div>
    `;

    section.querySelector('.add-exercise-btn').addEventListener('click', () => {
      this.addExercisePopup.show();
    });

    this.tracker.initialize(section);
    return section;
  }

  mount() {
    const grid = document.querySelector('.trackers-grid');
    const macroTracker = document.getElementById('macro-tracker');
    if (macroTracker) {
      grid.insertBefore(this.tracker.element, macroTracker.nextSibling);
    } else {
      grid.appendChild(this.tracker.element);
    }
  }
}