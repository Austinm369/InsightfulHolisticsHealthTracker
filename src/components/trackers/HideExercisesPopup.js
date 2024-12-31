import { BasePopup } from '../popup/BasePopup.js';
import { createElement } from '../../utils/dom.js';
import { trackerStorage } from '../../utils/storage/trackerInstance.js';
import { visibilityStorage } from '../../utils/storage/VisibilityStorage.js';

export class HideExercisesPopup extends BasePopup {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    const content = createElement('div', 'hide-exercises-content');
    
    content.innerHTML = `
      <h2 class="popup-title">Manage Exercise Trackers</h2>
      <div class="exercises-list">
        ${this.getExercisesList()}
      </div>
    `;

    this.setContent(content);
    this.attachEventListeners(content);
  }

  getExercisesList() {
    const exercises = trackerStorage.getAllTrackers().filter(t => t.caloriesPerIncrement);
    
    return exercises.map(exercise => `
      <div class="exercise-item" data-id="${exercise.id}">
        <div class="exercise-info">
          <span class="exercise-icon">${exercise.icon}</span>
          <span class="exercise-name">${exercise.name}</span>
        </div>
        <div class="exercise-actions">
          <button class="btn-visibility" data-visible="${!visibilityStorage.isHidden(exercise.id)}">
            ${visibilityStorage.isHidden(exercise.id) ? '👁️' : '👁️‍🗨️'}
          </button>
          <button class="btn-delete">🗑️</button>
        </div>
      </div>
    `).join('');
  }

  attachEventListeners(content) {
    // Visibility toggle
    content.querySelectorAll('.btn-visibility').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('.exercise-item').dataset.id;
        const isHidden = visibilityStorage.toggleVisibility(id);
        
        btn.textContent = isHidden ? '👁️' : '👁️‍🗨️';
        btn.dataset.visible = !isHidden;

        const tracker = document.getElementById(id);
        if (tracker) {
          tracker.style.display = isHidden ? 'none' : '';
        }
      });
    });

    // Delete exercise
    content.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('.exercise-item').dataset.id;
        if (confirm('Are you sure you want to delete this exercise tracker?')) {
          trackerStorage.deleteTracker(id);
          const tracker = document.getElementById(id);
          if (tracker) {
            tracker.remove();
          }
          btn.closest('.exercise-item').remove();
          document.dispatchEvent(new CustomEvent('exerciseUpdated'));
        }
      });
    });
  }
}