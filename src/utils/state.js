import { isNumber } from './validators/typeChecks.js';
import { validateStateValue } from './validators/stateChecks.js';

export const state = {
  theme: localStorage.getItem('theme') || 'light',
  water: 0,
  steps: 0,
  protein: 0,
  carbs: 0,
  fats: 0,
  waterGoal: 8,
  stepsGoal: 10000,
  proteinGoal: 150,
  carbsGoal: 175,
  fatsGoal: 78
};

export function updateState(key, value) {
  // Validate numeric values
  if (key.endsWith('Goal') || ['water', 'steps', 'protein', 'carbs', 'fats'].includes(key)) {
    if (!isNumber(value) || value < 0) {
      throw new Error(`Invalid value for ${key}: must be a positive number`);
    }
  }

  state[key] = value;
  saveState();
  return value;
}

export function saveState() {
  try {
    localStorage.setItem('health-tracker-state', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state:', error);
  }
}