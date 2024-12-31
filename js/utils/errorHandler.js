export class ErrorHandler {
  static retryDelays = [1000, 2000, 5000]; // Retry delays in milliseconds
  
  constructor() {
    this.retryAttempts = new Map();
    this.retryTimers = new Map();
  }

  handleError(componentId, error, retryFn) {
    console.error(`Error in component ${componentId}:`, error);
    
    const attempts = this.retryAttempts.get(componentId) || 0;
    const maxRetries = ErrorHandler.retryDelays.length;
    
    if (attempts < maxRetries) {
      this.scheduleRetry(componentId, attempts, retryFn);
    } else {
      this.showFinalError(componentId, retryFn);
    }
  }

  scheduleRetry(componentId, attempts, retryFn) {
    // Clear any existing retry timer
    this.clearRetryTimer(componentId);
    
    // Show retry status
    this.showRetryStatus(componentId, attempts + 1);
    
    // Schedule retry
    const timer = setTimeout(() => {
      this.retryComponent(componentId, retryFn);
    }, ErrorHandler.retryDelays[attempts]);
    
    this.retryTimers.set(componentId, timer);
    this.retryAttempts.set(componentId, attempts + 1);
  }

  retryComponent(componentId, retryFn) {
    try {
      retryFn();
      this.clearRetryState(componentId);
    } catch (error) {
      this.handleError(componentId, error, retryFn);
    }
  }

  clearRetryState(componentId) {
    this.retryAttempts.delete(componentId);
    this.clearRetryTimer(componentId);
  }

  clearRetryTimer(componentId) {
    const timer = this.retryTimers.get(componentId);
    if (timer) {
      clearTimeout(timer);
      this.retryTimers.delete(componentId);
    }
  }

  showRetryStatus(componentId, attempt) {
    const element = document.getElementById(componentId);
    if (!element) return;

    element.innerHTML = `
      <div class="error-state">
        <p>Retrying... (Attempt ${attempt}/${ErrorHandler.retryDelays.length})</p>
        <button onclick="window.errorHandler.manualRetry('${componentId}')">
          Retry Now
        </button>
      </div>
    `;
  }

  showFinalError(componentId, retryFn) {
    const element = document.getElementById(componentId);
    if (!element) return;

    element.innerHTML = `
      <div class="error-state error-state--final">
        <p>Component failed to load</p>
        <button onclick="window.errorHandler.manualRetry('${componentId}')">
          Try Again
        </button>
      </div>
    `;

    // Store retry function for manual retry
    this.retryFunctions = this.retryFunctions || new Map();
    this.retryFunctions.set(componentId, retryFn);
  }

  manualRetry(componentId) {
    const retryFn = this.retryFunctions?.get(componentId);
    if (retryFn) {
      this.clearRetryState(componentId);
      this.retryComponent(componentId, retryFn);
    }
  }

  cleanup() {
    // Clean up all timers
    for (const [componentId] of this.retryTimers) {
      this.clearRetryTimer(componentId);
    }
    this.retryAttempts.clear();
    this.retryFunctions?.clear();
  }
}