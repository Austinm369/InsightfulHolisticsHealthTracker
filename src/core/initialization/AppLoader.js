import { initializeTheme } from '../../utils/theme.js';
import { initializeTrackers } from './TrackerLoader.js';
import { initializeQuotes } from './QuoteLoader.js';
import { MenuBar } from '../../components/menu/MenuBar.js';
import { createElement } from '../../utils/dom.js';

export class AppLoader {
  constructor() {
    this.container = null;
    this.menuBar = null;
  }

  async initialize() {
    try {
      // Initialize theme first
      initializeTheme();
      
      // Create main container
      this.createMainContainer();
      
      // Initialize components in order
      await Promise.all([
        this.initializeMenu(),
        this.initializeQuotes(),
        this.initializeTrackers()
      ]);

      return true;
    } catch (error) {
      console.error('App initialization failed:', error);
      this.handleInitializationError();
      return false;
    }
  }

  createMainContainer() {
    this.container = createElement('div', 'app-container');
    document.body.appendChild(this.container);
  }

  async initializeMenu() {
    this.menuBar = new MenuBar();
    document.body.insertBefore(this.menuBar.render(), document.body.firstChild);
  }

  async initializeQuotes() {
    const quotesSection = createElement('section', 'quotes-section');
    quotesSection.id = 'quotes';
    this.container.appendChild(quotesSection);
    await initializeQuotes();
  }

  async initializeTrackers() {
    const widgetsContainer = createElement('div', 'widgets-container');
    this.container.appendChild(widgetsContainer);
    await initializeTrackers(widgetsContainer);
  }

  handleInitializationError() {
    const errorMessage = createElement('div', 'initialization-error');
    errorMessage.innerHTML = `
      <h2>Failed to Initialize App</h2>
      <p>Please try refreshing the page</p>
      <button onclick="window.location.reload()">Refresh</button>
    `;
    document.body.appendChild(errorMessage);
  }
}

// Export initialization function
export async function initializeApp() {
  const loader = new AppLoader();
  return loader.initialize();
}