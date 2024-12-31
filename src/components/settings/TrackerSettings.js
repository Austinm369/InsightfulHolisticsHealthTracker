/**
 * TrackerSettings Component
 * Manages settings for health tracking widgets
 */
import { createElement } from '../../utils/dom.js';
import { state, updateState } from '../../utils/state.js';
import { createCustomTracker } from '../widgets/CustomTracker.js';
import { defaultTrackers } from '../../data/defaultTrackers.js';

export class TrackerSettings {
  constructor() {
    this.element = this.createSettings();
    this.bindEvents();
  }

  createSettings() {
    const container = createElement('div', 'tracker-settings');
    
    container.innerHTML = `
      <div class="settings-section">
        <h3 class="settings-subtitle">Default Trackers</h3>
        <div class="settings-field">
          <label for="stepIncrement">Steps increment:</label>
          <input type="number" id="stepIncrement" value="${state.stepIncrement || 500}" min="100" step="100">
        </div>
        <div class="settings-field">
          <label for="waterIncrement">Water increment:</label>
          <input type="number" id="waterIncrement" value="${state.waterIncrement || 1}" min="1" step="1">
        </div>
      </div>

      <div class="settings-section">
        <h3 class="settings-subtitle">Quick Add Trackers</h3>
        <div class="quick-trackers">
          ${defaultTrackers.map(tracker => `
            <button class="quick-tracker-btn" data-tracker='${JSON.stringify(tracker)}'>
              <span class="tracker-icon">${tracker.icon}</span>
              ${tracker.name}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="settings-section">
        <h3 class="settings-subtitle">Add Custom Tracker</h3>
        <form id="customTrackerForm">
          <div class="settings-field">
            <label for="trackerName">Tracker Name:</label>
            <input type="text" id="trackerName" required placeholder="e.g., Meditation Minutes">
          </div>
          <div class="settings-field">
            <label for="trackerUnit">Unit:</label>
            <input type="text" id="trackerUnit" required placeholder="e.g., minutes">
          </div>
          <div class="settings-field">
            <label for="trackerGoal">Daily Goal:</label>
            <input type="number" id="trackerGoal" required min="1" placeholder="e.g., 30">
          </div>
          <div class="settings-field">
            <label for="trackerIncrement">Increment By:</label>
            <input type="number" id="trackerIncrement" required min="1" value="1">
          </div>
          <div class="settings-actions">
            <button type="submit" class="btn-primary">Add Tracker</button>
          </div>
        </form>
      </div>
    `;

    return container;
  }

  bindEvents() {
    // Handle increment changes
    const stepIncrement = this.element.querySelector('#stepIncrement');
    const waterIncrement = this.element.querySelector('#waterIncrement');

    stepIncrement.addEventListener('change', (e) => {
      updateState('stepIncrement', parseInt(e.target.value, 10));
    });

    waterIncrement.addEventListener('change', (e) => {
      updateState('waterIncrement', parseInt(e.target.value, 10));
    });

    // Handle quick add tracker buttons
    const quickTrackers = this.element.querySelectorAll('.quick-tracker-btn');
    quickTrackers.forEach(btn => {
      btn.addEventListener('click', () => {
        const tracker = JSON.parse(btn.dataset.tracker);
        this.createNewTracker(
          tracker.name,
          tracker.unit,
          tracker.goal,
          tracker.increment,
          tracker.icon
        );
        btn.disabled = true;
        btn.classList.add('added');
      });
    });

    // Handle custom tracker form
    const form = this.element.querySelector('#customTrackerForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = e.target.trackerName.value;
      const unit = e.target.trackerUnit.value;
      const goal = parseInt(e.target.trackerGoal.value, 10);
      const increment = parseInt(e.target.trackerIncrement.value, 10);

      this.createNewTracker(name, unit, goal, increment);
      form.reset();
    });
  }

  createNewTracker(name, unit, goal, increment, icon = '📊') {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    
    // Initialize tracker state
    updateState(id, 0);
    updateState(`${id}Goal`, goal);
    updateState(`${id}Increment`, increment);
    updateState(`${id}Unit`, unit);
    updateState(`${id}Icon`, icon);

    // Create and add the tracker widget
    createCustomTracker(id, name, unit, goal, increment, icon);
  }

  render() {
    return this.element;
  }
}