// Core state store with type safety
const initialState = {
  trackers: {
    water: { value: 0, goal: 8, unit: 'glasses' },
    steps: { value: 0, goal: 10000, unit: 'steps' }
  },
  customTrackers: [],
  settings: {
    theme: 'light',
    hiddenTrackers: []
  }
};

class Store {
  constructor() {
    this.state = this.loadState();
    this.listeners = new Set();
  }

  loadState() {
    try {
      const saved = localStorage.getItem('healthTrackerState');
      return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
    } catch (error) {
      console.error('Failed to load state:', error);
      return initialState;
    }
  }

  saveState() {
    try {
      localStorage.setItem('healthTrackerState', JSON.stringify(this.state));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }

  getState() {
    return this.state;
  }

  setState(updater) {
    const newState = typeof updater === 'function' 
      ? updater(this.state)
      : { ...this.state, ...updater };
    
    this.state = newState;
    this.saveState();
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export const store = new Store();