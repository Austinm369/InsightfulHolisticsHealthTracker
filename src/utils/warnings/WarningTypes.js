/**
 * Defines warning types and their messages
 * Centralizes warning configuration for consistency
 */
export const WarningTypes = {
  LOW_CARB: 'LOW_CARB',
  NEGATIVE_CALORIES: 'NEGATIVE_CALORIES',
  OVEREXERTION: 'OVEREXERTION'
};

export const WarningMessages = {
  [WarningTypes.LOW_CARB]: {
    title: 'Low Carb Warning',
    message: 'Carbs are essential for gut microbiome health. Consider adding healthy carbs to your diet.'
  },
  [WarningTypes.NEGATIVE_CALORIES]: {
    title: 'Calorie Warning',
    message: 'Your net calories are negative. Make sure to eat enough to fuel your activities.'
  },
  [WarningTypes.OVEREXERTION]: {
    title: 'Exercise Warning',
    message: 'High activity detected. Remember to rest and recover between workouts.'
  }
};