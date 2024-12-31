import { handleError } from '../utils/errorHandler.js';
import { createElement } from '../utils/dom.js';

export class ComponentLoader {
  constructor(container) {
    this.container = container;
    this.components = new Map();
    this.retryAttempts = new Map();
    this.retryTimers = new Map();
    this.maxRetries = 3;
  }

  loadComponent(id, initializer) {
    try {
      // Clear any existing retry timer
      this.clearRetryTimer(id);
      
      let section = document.getElementById(id);
      
      if (!section) {
        section = createElement('section', 'widget fade-in');
        section.id = id;
        this.container.appendChild(section);
      }

      this.components.set(id, { initializer, section });
      this.initializeComponent(id);

    } catch (error) {
      this.handleComponentError(id, error);
    }
  }

  clearRetryTimer(id) {
    const timer = this.retryTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.retryTimers.delete(id);
    }
  }

  initializeComponent(id) {
    const component = this.components.get(id);
    if (!component) return;

    try {
      component.section.innerHTML = '';
      component.initializer();
      this.retryAttempts.delete(id);
      this.clearRetryTimer(id);
    } catch (error) {
      this.handleComponentError(id, error);
    }
  }

  handleComponentError(id, error) {
    const attempts = this.retryAttempts.get(id) || 0;
    
    if (attempts < this.maxRetries) {
      this.retryAttempts.set(id, attempts + 1);
      this.showErrorState(id, attempts + 1);
      
      // Set up retry timer
      const timer = setTimeout(() => {
        this.initializeComponent(id);
      }, Math.min(1000 * Math.pow(2, attempts), 5000));
      
      this.retryTimers.set(id, timer);
      
    } else {
      this.showFinalErrorState(id);
    }
    
    console.error(`Error loading component ${id}:`, error);
  }

  showErrorState(id, attempt) {
    const component = this.components.get(id);
    if (!component) return;

    component.section.innerHTML = `
      <div class="component-error">
        <p>Error loading component. Retrying... (Attempt ${attempt}/${this.maxRetries})</p>
        <button class="btn-retry" onclick="window.componentLoader.reloadComponent('${id}')">
          Retry Now
        </button>
      </div>
    `;
  }

  showFinalErrorState(id) {
    const component = this.components.get(id);
    if (!component) return;

    component.section.innerHTML = `
      <div class="component-error">
        <p>Failed to load component after multiple attempts.</p>
        <button class="btn-retry" onclick="window.componentLoader.reloadComponent('${id}')">
          Try Again
        </button>
      </div>
    `;
  }

  reloadComponent(id) {
    this.retryAttempts.delete(id);
    this.clearRetryTimer(id);
    this.initializeComponent(id);
  }

  cleanup() {
    // Clean up all timers when component loader is destroyed
    for (const id of this.retryTimers.keys()) {
      this.clearRetryTimer(id);
    }
  }
}