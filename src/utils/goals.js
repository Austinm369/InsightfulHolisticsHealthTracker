// Default goals for trackers
export const DEFAULT_GOALS = {
  water: { value: 8, unit: 'glasses', icon: '🥤', name: 'Water Intake' },
  steps: { value: 10000, unit: 'steps', icon: '👣', name: 'Daily Steps' },
  meditation: { value: 20, unit: 'minutes', icon: '🧘', name: 'Meditation' },
  sleep: { value: 8, unit: 'hours', icon: '😴', name: 'Sleep' },
  exercise: { value: 30, unit: 'minutes', icon: '💪', name: 'Exercise' }
};

// Get current goals from localStorage or use defaults
export function getGoals() {
  const stored = localStorage.getItem('tracker-goals');
  return stored ? JSON.parse(stored) : DEFAULT_GOALS;
}

// Update goals and save to localStorage
export function updateGoal(trackerId, newValue) {
  const goals = getGoals();
  goals[trackerId] = { ...goals[trackerId], value: newValue };
  localStorage.setItem('tracker-goals', JSON.stringify(goals));
  document.dispatchEvent(new CustomEvent('goalUpdated', { 
    detail: { trackerId, value: newValue }
  }));
  return goals[trackerId];
}