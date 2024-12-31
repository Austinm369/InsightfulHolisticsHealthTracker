/**
 * Application entry point
 */
import { App } from './App';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.initialize();
});