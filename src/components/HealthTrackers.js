/**
 * Health tracking components container
 */
import { TrackerWidget } from './widgets/TrackerWidget.js';
import { store } from '../core/state/store.js';

export class HealthTrackers {
  constructor() {
    this.trackers = [
      { id: 'water', name: 'Water Intake', icon: '🥤', unit: 'glasses', goal: 8 },
      { id: 'steps', name: 'Daily Steps', icon: '👣', unit: 'steps', goal: 10000 }
    ];
  }

  render() {
    const container = document.createElement('div');
    container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8';

    this.trackers.forEach(tracker => {
      const widget = new TrackerWidget(tracker);
      container.appendChild(widget.render());
    });

    return container;
  }
}