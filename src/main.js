import { initializeTheme } from './utils/theme.js';
import { initializeQuotes } from './components/quotes/QuoteList.js';
import { initializeWaterTracker } from './components/widgets/WaterTracker.js';
import { initializeStepTracker } from './components/widgets/StepTracker.js';
import { initializeMacroTracker } from './components/widgets/MacroTracker.js';
import { ExerciseManager } from './components/trackers/ExerciseManager.js';
import { ManageTrackersButton } from './components/trackers/ManageTrackersButton.js';
import { GoalsCalendarButton } from './components/goals/GoalsCalendarButton.js';
import { visibilityStorage } from './utils/storage/VisibilityStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialize theme
    initializeTheme();

    // Initialize calendar button
    const goalsCalendarButton = new GoalsCalendarButton();
    goalsCalendarButton.mount();

    // Initialize core trackers
    initializeQuotes('quotes');
    initializeWaterTracker('water-tracker');
    initializeStepTracker('step-tracker');
    initializeMacroTracker('macro-tracker');
    
    // Initialize exercise manager
    const exerciseManager = new ExerciseManager();
    exerciseManager.mount();

    // Add manage trackers button
    const manageTrackersBtn = new ManageTrackersButton();
    const grid = document.querySelector('.trackers-grid');
    grid.appendChild(manageTrackersBtn.element);

    // Apply saved visibility settings
    document.querySelectorAll('.widget').forEach(widget => {
      if (widget.id && visibilityStorage.isHidden(widget.id)) {
        widget.style.display = 'none';
      }
    });

  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
});