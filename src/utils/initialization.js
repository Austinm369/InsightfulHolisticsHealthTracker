/**
 * Handles safe initialization of application components
 */
export function initializeComponents(config) {
  const components = [
    { id: 'quotes-section', init: () => initializeQuotes(config.quotes) },
    { id: 'water-tracker', init: () => initializeWaterTracker() },
    { id: 'steps-tracker', init: () => initializeStepTracker() },
    { id: 'macro-tracker', init: () => initializeMacroTracker() }
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