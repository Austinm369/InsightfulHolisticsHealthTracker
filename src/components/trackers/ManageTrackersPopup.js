import { BasePopup } from '../popup/BasePopup.js';
import { createElement } from '../../utils/dom.js';
import { trackerStorage } from '../../utils/storage/trackerInstance.js';
import { visibilityStorage } from '../../utils/storage/VisibilityStorage.js';

export class ManageTrackersPopup extends BasePopup {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    const content = createElement('div', 'manage-trackers-content');
    
    // Get all trackers including defaults
    const defaultTrackers = [
      { id: 'water-tracker', name: 'Water Intake', icon: '🥤' },
      { id: 'step-tracker', name: 'Daily Steps', icon: '👣' },
      { id: 'macro-tracker', name: 'Macronutrients', icon: '📊' }
    ];
    
    const customTrackers = trackerStorage.getAllTrackers();
    const allTrackers = [...defaultTrackers, ...customTrackers];

    content.innerHTML = `
      <h2 class="popup-title">Manage Trackers</h2>
      <div class="trackers-list">
        ${allTrackers.map(tracker => `
          <div class="tracker-item" data-id="${tracker.id}">
            <div class="tracker-info">
              <span class="tracker-icon">${tracker.icon}</span>
              <span class="tracker-name">${tracker.name}</span>
            </div>
            <div class="tracker-actions">
              <button class="btn-visibility" data-visible="${!visibilityStorage.isHidden(tracker.id)}">
                ${visibilityStorage.isHidden(tracker.id) ? '👁️' : '👁️‍🗨️'}
              </button>
              ${!defaultTrackers.find(t => t.id === tracker.id) ? `
                <button class="btn-delete">🗑️</button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.setContent(content);
    this.attachEventListeners(content);
  }

  attachEventListeners(content) {
    // Handle visibility toggles
    content.querySelectorAll('.btn-visibility').forEach(btn => {
      btn.addEventListener('click', () => {
        const trackerId = btn.closest('.tracker-item').dataset.id;
        const isHidden = visibilityStorage.toggleVisibility(trackerId);
        
        // Update button state
        btn.textContent = isHidden ? '👁️' : '👁️‍🗨️';
        btn.dataset.visible = !isHidden;

        // Update tracker visibility
        const tracker = document.getElementById(trackerId);
        if (tracker) {
          tracker.style.display = isHidden ? 'none' : '';
        }
      });
    });

    // Handle tracker deletion
    content.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const trackerId = btn.closest('.tracker-item').dataset.id;
        if (confirm('Are you sure you want to delete this tracker?')) {
          trackerStorage.deleteTracker(trackerId);
          const tracker = document.getElementById(trackerId);
          if (tracker) {
            tracker.remove();
          }
          btn.closest('.tracker-item').remove();
        }
      });
    });
  }
}