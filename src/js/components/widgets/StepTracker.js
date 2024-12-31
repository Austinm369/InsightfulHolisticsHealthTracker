import { state, updateState } from '../../utils/state.js';
import { createHealthWidget } from '../HealthWidget.js';

export function initializeStepTracker(containerId) {
  const stepTracker = createHealthWidget(
    'Daily Steps',
    state.steps,
    'steps',
    () => {
      const newValue = updateState('steps', state.steps + 500);
      updateWidget(containerId, newValue);
    },
    () => {
      if (state.steps >= 500) {
        const newValue = updateState('steps', state.steps - 500);
        updateWidget(containerId, newValue);
      }
    }
  );
  
  document.getElementById(containerId).appendChild(stepTracker);
}

function updateWidget(containerId, value) {
  const widget = document.getElementById(containerId);
  const valueElement = widget.querySelector('.value');
  valueElement.textContent = value;
}