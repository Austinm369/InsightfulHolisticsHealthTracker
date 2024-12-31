/**
 * Nutrition goals configuration
 * High protein, medium fat, medium carb split targeting 2000 calories
 */
export const MACRO_GOALS = {
  // High protein for muscle maintenance and satiety
  protein: 150, // grams (30% of calories = 600 cal = 150g)
  
  // Medium carbs for stable energy and gut health
  carbs: 175,   // grams (35% of calories = 700 cal = 175g)
  
  // Medium fats for hormone function and satiety
  fats: 78      // grams (35% of calories = 700 cal = 78g)
};

// Total calories: ~2000 
// - Protein: 600 calories (150g × 4 cal/g)
// - Carbs: 700 calories (175g × 4 cal/g)
// - Fats: 700 calories (78g × 9 cal/g)