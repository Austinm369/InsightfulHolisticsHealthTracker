/**
 * Error handling system with retry capabilities
 */
export class ErrorHandler {
  constructor() {
    this.retryAttempts = new Map();
    this.maxRetries = 3;
    this.retryDelays = [1000, 2000, 5000];
  }

  handleError(componentId, error, retryFn) {
    console.error(`Error in component ${componentId}:`, error);
    
    const attempts = this.retryAttempts.get(componentId) || 0;
    if (attempts < this.maxRetries) {
      this.scheduleRetry(componentId, attempts, retryFn);
    } else {
      console.error(`Max retries reached for ${componentId}`);
      this.retryAttempts.delete(componentId);
    }
  }

  scheduleRetry(componentId, attempts, retryFn) {
    const delay = this.retryDelays[attempts];
    console.log(`Retrying ${componentId} in ${delay}ms (attempt ${attempts + 1}/${this.maxRetries})`);
    
    setTimeout(() => {
      try {
        retryFn();
        this.retryAttempts.delete(componentId);
      } catch (error) {
        this.retryAttempts.set(componentId, attempts + 1);
        this.handleError(componentId, error, retryFn);
      }
    }, delay);
  }

  reset(componentId) {
    this.retryAttempts.delete(componentId);
  }
}