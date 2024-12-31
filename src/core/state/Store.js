/**
 * Core state store with persistence
 */
export class Store {
  constructor(initialState = {}) {
    this.state = this.loadState(initialState);
    this.listeners = new Map();
  }

  loadState(initialState) {
    try {
      const saved = localStorage.getItem('app-state');
      return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
    } catch (error) {
      console.error('Failed to load state:', error);
      return initialState;
    }
  }

  saveState() {
    try {
      localStorage.setItem('app-state', JSON.stringify(this.state));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;
    this.saveState();
    this.notify(key, value, oldValue);
    return value;
  }

  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);
    return () => this.unsubscribe(key, callback);
  }

  unsubscribe(key, callback) {
    const listeners = this.listeners.get(key);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  notify(key, value, oldValue) {
    const listeners = this.listeners.get(key);
    if (listeners) {
      listeners.forEach(callback => callback(value, oldValue));
    }
  }
}