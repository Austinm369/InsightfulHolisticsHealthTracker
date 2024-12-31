/**
 * Calorie calculation utilities
 */

// Constants for calorie calculations
const CALORIES_PER_GRAM = {
  protein: 4,
  carbs: 4,
  fats: 9
};

const CALORIES_PER_STEP = 0.04; // Approximately 0.04 calories per step

/**
 * Calculate total calories from macronutrients
 */
export function calculateTotalCalories(macros) {
  return Object.entries(macros).reduce((total, [macro, grams]) => {
    return total + (grams * CALORIES_PER_GRAM[macro]);
  }, 0);
}

/**
 * Calculate calories burned from steps
 */
export function calculateCaloriesFromSteps(steps) {
  return Math.round(steps * CALORIES_PER_STEP);
}

/**
 * Calculate net calories (consumed - burned)
 */
export function calculateNetCalories(consumed, burned) {
  return consumed - burned;
}

/**
 * Calculate total calories burned from exercises
 */
export function calculateTotalCaloriesBurned(exercises) {
  return exercises.reduce((total, exercise) => {
    const caloriesBurned = (exercise.value || 0) * (exercise.caloriesPerIncrement || 0);
    return total + caloriesBurned;
  }, 0);
}

/**
 * Calculate calories burned for a single exercise
 */
export function calculateExerciseCalories(exercise) {
  return (exercise.value || 0) * (exercise.caloriesPerIncrement || 0);
}