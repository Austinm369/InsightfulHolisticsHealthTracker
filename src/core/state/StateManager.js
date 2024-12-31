import { ErrorHandler } from '../error/ErrorHandler.js';

export class StateManager {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.listeners = new Map();
    this.errorHandler = new ErrorHandler();
    this.backupState = null;
  }

  get(key) {
    try {
      return this.state[key];
    } catch (error) {
      this.errorHandler.handleError(
        'state-get',
        error,
        () => this.recoverState()
      );
      return this.backupState?.[key];
    }
  }

  set(key, value) {
    try {
      this.backupState = { ...this.state };
      const oldValue = this.state[key];
      this.state[key] = value;
      
      if (oldValue !== value) {
        this.notify(key, value, oldValue);
      }
      
      return value;
    } catch (error) {
      this.errorHandler.handleError(
        'state-set',
        error,
        () => this.recoverState()
      );
      return this.backupState?.[key];
    }
  }

  subscribe(key, callback) {
    try {
      if (!this.listeners.has(key)) {
        this.listeners.set(key, new Set());
      }
      this.listeners.get(key).add(callback);
      return () => this.unsubscribe(key, callback);
    } catch (error) {
      this.errorHandler.handleError(
        'state-subscribe',
        error,
        () => this.cleanupListeners()
      );
      return () => {};
    }
  }

  recoverState() {
    if (this.backupState) {
      this.state = { ...this.backupState };
      return true;
    }
    return false;
  }

  cleanupListeners() {
    for (const [key, listeners] of this.listeners.entries()) {
      const validListeners = new Set();
      
      listeners.forEach(callback => {
        try {
          callback(this.state[key], this.state[key]);
          validListeners.add(callback);
        } catch (error) {
          console.warn(`Removing invalid listener for ${key}`);
        }
      });

      this.listeners.set(key, validListeners);
    }
  }
}