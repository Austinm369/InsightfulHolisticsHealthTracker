/**
 * Error boundary for catching and handling runtime errors
 */
export class ErrorBoundary {
  constructor() {
    this.errorHandlers = new Set();
  }

  addHandler(handler) {
    this.errorHandlers.add(handler);
  }

  removeHandler(handler) {
    this.errorHandlers.delete(handler);
  }

  handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    this.errorHandlers.forEach(handler => handler(error, context));
  }

  wrapFunction(fn, context) {
    return (...args) => {
      try {
        return fn(...args);
      } catch (error) {
        this.handleError(error, context);
        return null;
      }
    };
  }
}

// Export singleton instance
export const errorBoundary = new ErrorBoundary();