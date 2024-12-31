/**
 * Goal scoring system
 * Calculates daily scores based on goal completion
 */
import { state } from '../state.js';

// Goal weights must sum to 1
const GOAL_WEIGHTS = {
  water: 0.2,    // 20% - Basic hydration
  steps: 0.3,    // 30% - Physical activity
  protein: 0.2,  // 20% - Essential macronutrient
  carbs: 0.15,   // 15% - Energy source
  fats: 0.15     // 15% - Hormone function
};

export function calculateDailyScore() {
  let totalScore = 0;
  let availableWeight = 0;

  // Calculate score for each tracked goal
  Object.entries(GOAL_WEIGHTS).forEach(([id, weight]) => {
    const value = state[id] || 0;
    const goal = state[`${id}Goal`];
    
    if (goal) {
      const completion = Math.min(value / goal, 1);
      totalScore += completion * weight * 1000;
      availableWeight += weight;
    }
  });

  // Normalize score based on available goals
  return Math.round(availableWeight > 0 ? totalScore / availableWeight : 0);
}

export function getScoreGrade(score) {
  const grades = [
    { min: 900, grade: 'A+', color: '#22c55e' },
    { min: 800, grade: 'A',  color: '#16a34a' },
    { min: 700, grade: 'B',  color: '#2563eb' },
    { min: 600, grade: 'C',  color: '#f59e0b' },
    { min: 500, grade: 'D',  color: '#dc2626' },
    { min: 0,   grade: 'F',  color: '#991b1b' }
  ];

  const { grade, color } = grades.find(g => score >= g.min) || grades[grades.length - 1];
  return { grade, color };
}

// Subscribe to state changes to trigger score updates
document.addEventListener('stateChange', () => {
  const event = new CustomEvent('scoreUpdate', {
    detail: { score: calculateDailyScore() }
  });
  document.dispatchEvent(event);
});