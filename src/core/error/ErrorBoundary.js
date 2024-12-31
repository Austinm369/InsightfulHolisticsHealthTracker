/**
 * Error boundary for catching and handling runtime errors
 */
export class ErrorBoundary {
  constructor() {
    this.errorHandlers = new Set();
    this.retryDelays = [1000, 2000, 5000];
    this.maxRetries = 3;
  }

  addHandler(handler) {
    this.errorHandlers.add(handler);
  }

  removeHandler(handler) {
    this.errorHandlers.delete(handler);
  }

  handleError(error, context, retryFn) {
    console.error(`Error in ${context}:`, error);
    
    // Notify all error handlers
    this.errorHandlers.forEach(handler => handler(error, context));
    
    if (retryFn) {
      this.retryOperation(context, retryFn);
    }
  }

  retryOperation(context, operation, attempt = 0) {
    if (attempt >= this.maxRetries) {
      console.error(`Max retries reached for ${context}`);
      return;
    }

    const delay = this.retryDelays[attempt];
    console.log(`Retrying ${context} in ${delay}ms (attempt ${attempt + 1}/${this.maxRetries})`);

    setTimeout(() => {
      try {
        operation();
      } catch (error) {
        this.retryOperation(context, operation, attempt + 1);
      }
    }, delay);
  }
}