import { state, updateState } from '../../utils/state.js';
import { createElement } from '../../utils/dom.js';

export class TrackerVisibilityManager {
  constructor() {
    this.element = this.createVisibilityControls();
  }

  createVisibilityControls() {
    const container = createElement('div', 'tracker-visibility-controls');
    const title = createElement('h3', 'settings-subtitle');
    title.textContent = 'Visible Trackers';

    const trackerList = createElement('div', 'tracker-visibility-list');
    
    // Get all available trackers
    const trackers = this.getAllTrackers();
    
    trackers.forEach(tracker => {
      const toggle = this.createTrackerToggle(tracker);
      trackerList.appendChild(toggle);
    });

    container.appendChild(title);
    container.appendChild(trackerList);
    return container;
  }

  getAllTrackers() {
    const defaultTrackers = [
      { id: 'water', name: 'Water Intake', icon: '🥤' },
      { id: 'steps', name: 'Daily Steps', icon: '👣' },
      { id: 'meditation', name: 'Meditation', icon: '🧘' },
      { id: 'sleep', name: 'Sleep', icon: '😴' },
      { id: 'exercise', name: 'Exercise', icon: '💪' }
    ];

    // Get custom trackers from state
    const customTrackers = state.customTrackers || [];
    
    return [...defaultTrackers, ...customTrackers];
  }

  createTrackerToggle(tracker) {
    const container = createElement('div', 'tracker-visibility-item');
    
    const checkbox = createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `visibility-${tracker.id}`;
    checkbox.checked = !state.hiddenTrackers?.includes(tracker.id);
    
    const label = createElement('label');
    label.htmlFor = `visibility-${tracker.id}`;
    label.innerHTML = `${tracker.icon} ${tracker.name}`;
    
    checkbox.addEventListener('change', () => {
      const hiddenTrackers = state.hiddenTrackers || [];
      if (checkbox.checked) {
        updateState('hiddenTrackers', hiddenTrackers.filter(id => id !== tracker.id));
        document.getElementById(tracker.id)?.classList.remove('hidden');
      } else {
        updateState('hiddenTrackers', [...hiddenTrackers, tracker.id]);
        document.getElementById(tracker.id)?.classList.add('hidden');
      }
    });
    
    container.appendChild(checkbox);
    container.appendChild(label);
    return container;
  }

  render() {
    return this.element;
  }
}