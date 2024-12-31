import { createElement } from '../../utils/dom.js';
import { getGoals, updateGoal } from '../../utils/goals.js';

export class GoalSettings {
  constructor() {
    this.element = this.createSettings();
  }

  createSettings() {
    const container = createElement('div', 'goal-settings');
    const title = createElement('h3', 'settings-subtitle');
    title.textContent = 'Tracker Goals';
    
    const goals = getGoals();
    const form = createElement('form', 'goals-form');
    
    Object.entries(goals).forEach(([id, tracker]) => {
      const field = this.createGoalField(id, tracker);
      form.appendChild(field);
    });
    
    container.appendChild(title);
    container.appendChild(form);
    return container;
  }

  createGoalField(id, tracker) {
    const field = createElement('div', 'settings-field');
    
    const label = createElement('label');
    label.htmlFor = `goal-${id}`;
    label.innerHTML = `${tracker.icon} ${tracker.name}`;
    
    const input = createElement('input', 'goal-input');
    input.type = 'number';
    input.id = `goal-${id}`;
    input.min = '1';
    input.value = tracker.value;
    input.placeholder = `Target ${tracker.unit}`;
    
    const unit = createElement('span', 'goal-unit');
    unit.textContent = tracker.unit;
    
    const inputGroup = createElement('div', 'input-group');
    inputGroup.appendChild(input);
    inputGroup.appendChild(unit);
    
    input.addEventListener('change', (e) => {
      const newValue = parseInt(e.target.value, 10);
      if (newValue > 0) {
        updateGoal(id, newValue);
      }
    });
    
    field.appendChild(label);
    field.appendChild(inputGroup);
    return field;
  }

  render() {
    return this.element;
  }
}