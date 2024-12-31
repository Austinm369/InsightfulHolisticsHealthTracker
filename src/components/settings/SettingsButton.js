import { popupManager } from '../popups/core/PopupManager.js';
import { PopupSizes } from '../popups/types/PopupTypes.js';

export function SettingsButton() {
  const button = document.createElement('button');
  button.className = 'settings-button';
  button.setAttribute('aria-label', 'Open settings');
  button.textContent = '⚙️';
  
  button.addEventListener('click', () => {
    const content = `
      <div class="settings-content">
        <h2 class="settings-title">Settings</h2>
        <div class="settings-section">
          <h3>Daily Goals</h3>
          <div class="settings-field">
            <label for="waterGoal">Water Goal (glasses)</label>
            <input type="number" id="waterGoal" min="1" value="8">
          </div>
          <div class="settings-field">
            <label for="stepsGoal">Steps Goal</label>
            <input type="number" id="stepsGoal" min="1000" step="1000" value="10000">
          </div>
        </div>
        <div class="settings-section">
          <h3>Macro Goals (grams)</h3>
          <div class="settings-field">
            <label for="proteinGoal">Protein Goal</label>
            <input type="number" id="proteinGoal" min="1" value="150">
          </div>
          <div class="settings-field">
            <label for="carbsGoal">Carbs Goal</label>
            <input type="number" id="carbsGoal" min="1" value="175">
          </div>
          <div class="settings-field">
            <label for="fatsGoal">Fats Goal</label>
            <input type="number" id="fatsGoal" min="1" value="78">
          </div>
        </div>
      </div>
    `;

    popupManager.showPopup('settings', content, {
      size: PopupSizes.MEDIUM
    });
  });

  return button;
}