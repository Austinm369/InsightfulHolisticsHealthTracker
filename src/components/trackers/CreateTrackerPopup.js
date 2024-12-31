import { BasePopup } from '../popup/BasePopup.js';
import { createElement } from '../../utils/dom.js';
import { createCustomTracker } from '../widgets/CustomTracker.js';
import { validateEmoji } from '../../utils/validators.js';

export class CreateTrackerPopup extends BasePopup {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    const content = createElement('div', 'create-tracker-content');
    
    content.innerHTML = `
      <h2 class="popup-title">Create Custom Tracker</h2>
      <form id="create-tracker-form" class="tracker-form">
        <div class="form-field">
          <label for="tracker-icon">Icon:</label>
          <input type="text" 
            id="tracker-icon" 
            required 
            maxlength="10"
            placeholder="Choose emoji (e.g., 🏃‍♂️ or 💪)"
          >
          <div class="emoji-suggestions">
            Suggestions: 
            <button type="button" class="emoji-btn">💪</button>
            <button type="button" class="emoji-btn">🏃</button>
            <button type="button" class="emoji-btn">🧘</button>
            <button type="button" class="emoji-btn">🏋️</button>
            <button type="button" class="emoji-btn">🚴</button>
            <button type="button" class="emoji-btn">🎯</button>
            <button type="button" class="emoji-btn">📝</button>
            <button type="button" class="emoji-btn">💊</button>
            <button type="button" class="emoji-btn">💭</button>
            <button type="button" class="emoji-btn">💩</button>
          </div>
        </div>
        
        <div class="form-field">
          <label for="tracker-name">Name:</label>
          <input type="text" 
            id="tracker-name" 
            required 
            placeholder="e.g., Meditation, Cardio, etc."
          >
        </div>

        <div class="form-field">
          <label for="tracker-unit">Unit:</label>
          <input type="text" 
            id="tracker-unit" 
            required 
            placeholder="e.g., minutes, times, etc."
          >
        </div>

        <div class="form-row">
          <div class="form-field">
            <label for="tracker-goal">Daily Goal:</label>
            <input type="number" 
              id="tracker-goal" 
              required 
              min="1" 
              placeholder="e.g., 30"
            >
          </div>

          <div class="form-field">
            <label for="tracker-increment">Increment By:</label>
            <input type="number" 
              id="tracker-increment" 
              required 
              min="1" 
              value="1"
              placeholder="e.g., 5"
            >
          </div>
        </div>

        <button type="submit" class="btn-primary">Create Tracker</button>
      </form>
    `;

    this.setContent(content);
    this.attachEventListeners(content);
  }

  attachEventListeners(content) {
    const form = content.querySelector('#create-tracker-form');
    
    // Emoji suggestion buttons
    content.querySelectorAll('.emoji-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        content.querySelector('#tracker-icon').value = btn.textContent;
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const icon = form.querySelector('#tracker-icon').value;
      const name = form.querySelector('#tracker-name').value;
      const unit = form.querySelector('#tracker-unit').value;
      const goal = parseInt(form.querySelector('#tracker-goal').value, 10);
      const increment = parseInt(form.querySelector('#tracker-increment').value, 10);

      if (!validateEmoji(icon)) {
        alert('Please select at least one emoji as the tracker icon');
        return;
      }

      if (name && unit && goal > 0 && increment > 0) {
        const id = name.toLowerCase().replace(/\s+/g, '-');
        createCustomTracker(id, name, unit, goal, increment, icon);
        form.reset();
        this.hide();
      }
    });
  }
}