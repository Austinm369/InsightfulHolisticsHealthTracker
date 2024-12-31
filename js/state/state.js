// Simple state management
const state = {
  waterGlasses: 0,
  steps: 0,
  customTrackers: [],
  settings: {
    theme: 'light',
    hiddenTrackers: []
  }
};

// Load state from localStorage
function loadState() {
  const saved = localStorage.getItem('healthTrackerState');
  if (saved) {
    Object.assign(state, JSON.parse(saved));
  }
}

// Save state to localStorage
function saveState() {
  localStorage.setItem('healthTrackerState', JSON.stringify(state));
}

// Update state and trigger save
function updateState(key, value) {
  if (typeof key === 'string') {
    state[key] = value;
  } else {
    Object.assign(state, key);
  }
  saveState();
  return state[key];
}

export { state, loadState, updateState };