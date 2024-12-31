import { state, updateState } from '../../state/state.js';

export class TrackerGoalsSection {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (this.container) {
      this.render();
    }
  }

  render() {
    const trackers = [...(state.customTrackers || []), {
      id: 'water',
      name: 'Water Intake',
      goal: 8,
      unit: 'glasses'
    }, {
      id: 'steps',
      name: 'Daily Steps', 
      goal: 10000,
      unit: 'steps'
    }];

    this.container.innerHTML = `
      <div class="goals-grid">
        ${trackers.map(tracker => this.createGoalInput(tracker)).join('')}
      </div>
    `;

    this.attachEventListeners();
  }

  createGoalInput(tracker) {
    return `
      <div class="goal-input" data-id="${tracker.id}">
        <label for="goal-${tracker.id}">${tracker.name}</label>
        <div class="input-group">
          <input 
            type="number" 
            id="goal-${tracker.id}"
            value="${tracker.goal}"
            min="1"
          >
          <span class="unit">${tracker.unit}</span>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    this.container.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', (e) => {
        const id = e.target.closest('.goal-input').dataset.id;
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
          updateState(`${id}Goal`, value);
        }
      });
    });
  }
}