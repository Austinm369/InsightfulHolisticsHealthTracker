import { BasePopup } from '../popups/BasePopup.js';
import { createElement } from '../../utils/dom.js';
import { state, updateState } from '../../utils/state.js';
import { checkCarbGoal } from '../../utils/warnings/carbWarnings.js';

export class SettingsPopup extends BasePopup {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    const content = createElement('div', 'settings-content');
    
    content.innerHTML = `
      <h2 class="settings-title">Settings</h2>
      
      <div class="settings-section">
        <h3>Daily Goals</h3>
        <div class="settings-field">
          <label for="waterGoal">Water Goal (glasses)</label>
          <input type="number" id="waterGoal" value="${state.waterGoal}" min="1">
        </div>
        <div class="settings-field">
          <label for="stepsGoal">Steps Goal</label>
          <input type="number" id="stepsGoal" value="${state.stepsGoal}" min="1000" step="1000">
        </div>
      </div>

      <div class="settings-section">
        <h3>Macro Goals (grams)</h3>
        <div class="settings-field">
          <label for="proteinGoal">Protein Goal</label>
          <input type="number" id="proteinGoal" value="${state.proteinGoal}" min="1">
        </div>
        <div class="settings-field">
          <label for="carbsGoal">Carbs Goal</label>
          <input type="number" id="carbsGoal" value="${state.carbsGoal}" min="1">
        </div>
        <div class="settings-field">
          <label for="fatsGoal">Fats Goal</label>
          <input type="number" id="fatsGoal" value="${state.fatsGoal}" min="1">
        </div>
      </div>
    `;

    this.setContent(content);
    this.attachEventListeners(content);
  }

  attachEventListeners(content) {
    const inputs = content.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
          updateState(input.id, value);
          
          // Check carb goal specifically
          if (input.id === 'carbsGoal') {
            checkCarbGoal(value);
          }
        }
      });
    });
  }
}