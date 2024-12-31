/**
 * Core Application Component
 */
import { ThemeManager } from './core/theme/ThemeManager.js';
import { Header } from './components/Header.js';
import { HealthTrackers } from './components/HealthTrackers.js';
import { QuoteList } from './components/quotes/QuoteList.js';
import { MenuBar } from './components/menu/MenuBar.js';

export class App {
  constructor() {
    this.themeManager = new ThemeManager();
    this.initialize();
  }

  initialize() {
    const root = document.getElementById('root');
    if (!root) {
      throw new Error('Root element not found');
    }

    // Create main container
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-gray-100 dark:bg-gray-900';

    const content = document.createElement('div');
    content.className = 'container mx-auto px-4 py-8 pt-16';

    // Initialize components
    const menuBar = new MenuBar();
    const header = new Header();
    const quoteList = new QuoteList();
    const healthTrackers = new HealthTrackers();

    // Append components
    content.appendChild(header.render());
    content.appendChild(quoteList.render());
    content.appendChild(healthTrackers.render());

    container.appendChild(menuBar.render());
    container.appendChild(content);
    root.appendChild(container);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});