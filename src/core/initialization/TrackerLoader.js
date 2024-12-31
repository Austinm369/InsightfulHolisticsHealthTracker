import { initializeWaterTracker } from '../../components/widgets/WaterTracker.js';
import { initializeStepTracker } from '../../components/widgets/StepTracker.js';
import { initializeMacroTracker } from '../../components/widgets/MacroTracker.js';
import { initializeCustomTrackers } from '../../components/trackers/initializeTrackers.js';
import { visibilityStorage } from '../../utils/storage/VisibilityStorage.js';
import { createElement } from '../../utils/dom.js';

export async function initializeTrackers(container) {
  try {
    const grid = createElement('div', 'trackers-grid');
    container.appendChild(grid);

    // Initialize default trackers
    const defaultTrackers = [
      { id: 'water-tracker', init: initializeWaterTracker },
      { id: 'step-tracker', init: initializeStepTracker },
      { id: 'macro-tracker', init: initializeMacroTracker }
    ];

    // Create tracker sections
    defaultTrackers.forEach(({ id }) => {
      const section = createElement('section', 'widget');
      section.id = id;
      grid.appendChild(section);
    });

    // Initialize trackers
    await Promise.all(defaultTrackers.map(({ id, init }) => init(id)));

    // Initialize custom trackers
    await initializeCustomTrackers(grid);

    // Apply visibility settings
    applyVisibilitySettings();

    return true;
  } catch (error) {
    console.error('Failed to initialize trackers:', error);
    return false;
  }
}

function applyVisibilitySettings() {
  document.querySelectorAll('.widget').forEach(widget => {
    if (widget.id && visibilityStorage.isHidden(widget.id)) {
      widget.style.display = 'none';
    }
  });
}