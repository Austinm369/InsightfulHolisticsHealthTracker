import { state, updateState } from '../state/state.js';

export function initializeCustomTrackerForm() {
  const form = document.getElementById('custom-tracker-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    const tracker = {
      id: formData.get('name').toLowerCase().replace(/\s+/g, '-'),
      name: formData.get('name'),
      unit: formData.get('unit'),
      goal: parseInt(formData.get('goal'), 10),
      icon: formData.get('icon') || '📊',
      value: 0
    };

    addCustomTracker(tracker);
    form.reset();
    $('#custom-tracker-panel').slideUp();
  });
}

function addCustomTracker(tracker) {
  const customTrackers = [...(state.customTrackers || []), tracker];
  updateState('customTrackers', customTrackers);
  
  const container = document.querySelector('.trackers-grid');
  if (container) {
    container.appendChild(createCustomTrackerElement(tracker));
  }
}

function createCustomTrackerElement(tracker) {
  const element = document.createElement('div');
  element.className = 'tracker custom-tracker';
  element.dataset.id = tracker.id;
  
  element.innerHTML = `
    <div class="tracker-header">
      <h3>${tracker.icon} ${tracker.name}</h3>
      <span class="tracker-value">0/${tracker.goal} ${tracker.unit}</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: 0%"></div>
    </div>
    <div class="tracker-controls">
      <button class="btn-decrease">-</button>
      <button class="btn-increase">+</button>
    </div>
  `;

  // Add event listeners
  element.querySelector('.btn-increase').addEventListener('click', () => 
    updateTrackerValue(tracker.id, (state[tracker.id] || 0) + 1, tracker.goal));
  
  element.querySelector('.btn-decrease').addEventListener('click', () => {
    if (state[tracker.id] > 0) {
      updateTrackerValue(tracker.id, state[tracker.id] - 1, tracker.goal);
    }
  });

  return element;
}

function updateTrackerValue(id, value, goal) {
  updateState(id, value);
  const tracker = document.querySelector(`[data-id="${id}"]`);
  if (!tracker) return;

  tracker.querySelector('.tracker-value').textContent = `${value}/${goal}`;
  tracker.querySelector('.progress-fill').style.width = `${(value / goal) * 100}%`;
}