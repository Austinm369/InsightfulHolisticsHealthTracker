import { createTrackerContainer } from './TrackerContainer.js';
import { initializeTracker } from './TrackerInitializer.js';
import { initializeWaterTracker } from '../widgets/WaterTracker.js';
import { initializeStepTracker } from '../widgets/StepTracker.js';
import { initializeMacroTracker } from '../widgets/MacroTracker.js';

/**
 * Creates and initializes all trackers
 */
export function createTrackers() {
  const container = createTrackerContainer();
  
  const trackers = [
    { id: 'water-tracker', init: initializeWaterTracker },
    { id: 'step-tracker', init: initializeStepTracker },
    { id: 'macro-tracker', init: initializeMacroTracker }
  ];

  trackers.forEach(tracker => initializeTracker(container, tracker));
  
  return container;
}