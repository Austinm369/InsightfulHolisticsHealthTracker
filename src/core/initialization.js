import { initializeQuotes } from '../components/quotes/QuoteList.js';
import { initializeWaterTracker } from '../components/widgets/WaterTracker.js';
import { initializeStepTracker } from '../components/widgets/StepTracker.js';
import { initializeMacroTracker } from '../components/widgets/MacroTracker.js';
import { createCalendarButton } from '../components/calendar/CalendarButton.js';
import { handleError } from '../utils/errorHandler.js';

export function initializeComponents() {
  // Initialize header controls
  try {
    const headerControls = document.querySelector('.header-controls');
    if (headerControls) {
      const calendarButton = createCalendarButton();
      const themeToggle = headerControls.querySelector('#theme-toggle');
      headerControls.insertBefore(calendarButton, themeToggle);
    }
  } catch (error) {
    handleError(error, 'header controls');
  }

  // Initialize main components
  const components = [
    { id: 'quotes', init: initializeQuotes },
    { id: 'water-tracker', init: initializeWaterTracker },
    { id: 'step-tracker', init: initializeStepTracker },
    { id: 'macro-tracker', init: initializeMacroTracker }
  ];

  components.forEach(({ id, init }) => {
    try {
      const container = document.getElementById(id);
      if (container) {
        init(id);
      }
    } catch (error) {
      handleError(error, id);
    }
  });
}