/**
 * Main application initialization module for Insightful Holistics Health Tracker
 */
import { createHeader } from './components/core/Header.js';
import { initializeQuotes } from './components/quotes/QuoteList.js';
import { initializeWaterTracker } from './components/widgets/WaterTracker.js';
import { initializeStepTracker } from './components/widgets/StepTracker.js';
import { initializeMacroTracker } from './components/widgets/MacroTracker.js';
import { safeQuerySelector } from './utils/dom.js';
import { healthQuotes } from './data/quotes.js';

/**
 * Initializes the entire application
 */
export function initializeApp() {
  const app = safeQuerySelector('#app');
  if (!app) return;

  // Initialize header
  const header = createHeader();
  app.appendChild(header);

  // Initialize tracking components
  const components = [
    { id: 'quotes', init: () => initializeQuotes('quotes', healthQuotes) },
    { id: 'water-tracker', init: () => initializeWaterTracker('water-tracker') },
    { id: 'step-tracker', init: () => initializeStepTracker('step-tracker') },
    { id: 'macro-tracker', init: () => initializeMacroTracker('macro-tracker') }
  ];

  components.forEach(({ id, init }) => {
    const container = document.getElementById(id);
    if (container) {
      try {
        init();
      } catch (error) {
        console.error(`Failed to initialize ${id}:`, error);
      }
    }
  });
}