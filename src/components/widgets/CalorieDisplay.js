import { createElement } from '../../utils/dom.js';
import { formatNumber } from '../../utils/formatters.js';
import { 
  calculateCaloriesBurned, 
  calculateCaloriesConsumed,
  calculateNetCalories 
} from '../../utils/calorieCalculations.js';
import { state } from '../../utils/state.js';
import { WarningPopup } from '../popup/WarningPopup.js';

export function createCalorieDisplay() {
  const container = createElement('div', 'calorie-stats');
  let wasNegative = false;
  const warningPopup = new WarningPopup(
    'You are in danger of feinting or causing muscle spasms including heart palpitations. ' +
    'Eat or drink some calories NOW. You are starving. Lose weight by fasting and resting. ' +
    'ALWAYS fuel a workout!'
  );
  
  const updateDisplay = () => {
    const caloriesBurned = calculateCaloriesBurned(state.steps);
    const caloriesConsumed = calculateCaloriesConsumed(
      state.protein || 0,
      state.carbs || 0,
      state.fats || 0
    );
    const netCalories = calculateNetCalories(caloriesConsumed, caloriesBurned);
    
    // Show warning popup when net calories first goes negative
    if (netCalories < 0 && !wasNegative) {
      warningPopup.show();
      wasNegative = true;
    } else if (netCalories >= 0) {
      wasNegative = false;
    }
    
    container.innerHTML = `
      <div class="calorie-item">
        <div class="calories-label">Calories Consumed</div>
        <div class="calories-value">${formatNumber(caloriesConsumed)}</div>
      </div>
      <div class="calorie-item">
        <div class="calories-label">Calories Burned</div>
        <div class="calories-value">${formatNumber(caloriesBurned)}</div>
      </div>
      <div class="calorie-item calorie-net">
        <div class="calories-label">Net Calories</div>
        <div class="calories-value ${netCalories < 0 ? 'negative' : ''}">${formatNumber(netCalories)}</div>
      </div>
    `;
  };

  // Initial render
  updateDisplay();

  // Subscribe to state changes
  document.addEventListener('stepsUpdated', updateDisplay);
  document.addEventListener('macrosUpdated', updateDisplay);

  return container;
}