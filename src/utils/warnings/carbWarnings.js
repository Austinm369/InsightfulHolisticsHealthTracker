import { WarningPopup } from '../../components/popups/WarningPopup';

const LOW_CARB_THRESHOLD = 30; // grams

export function checkCarbGoal(value) {
  if (value <= LOW_CARB_THRESHOLD) {
    WarningPopup.show('LOW_CARB');
  }
}

export function checkDailyCarbIntake(carbs) {
  if (carbs <= LOW_CARB_THRESHOLD) {
    WarningPopup.show('LOW_CARB');
  }
}