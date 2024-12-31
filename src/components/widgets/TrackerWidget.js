import { createElement } from '../../utils/dom.js';

export class TrackerWidget {
  constructor(id, name, value, goal, unit, icon, onIncrement, onDecrement) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.goal = goal;
    this.unit = unit;
    this.icon = icon;
    this.onIncrement = onIncrement;
    this.onDecrement = onDecrement;
  }

  render() {
    const widget = createElement('div', 'widget tracker-widget fade-in');
    
    widget.innerHTML = `
      <div class="widget-header">
        <h2><span class="widget-icon">${this.icon}</span> ${this.name}</h2>
        <span class="widget-value">${this.value} / ${this.goal} ${this.unit}</span>
      </div>
      
      <div class="widget-progress">
        <div class="progress-bar" style="width: ${(this.value / this.goal) * 100}%"></div>
      </div>
      
      <div class="widget-controls">
        <button class="btn-control btn-decrement" aria-label="Decrease ${this.name}">−</button>
        <button class="btn-control btn-increment" aria-label="Increase ${this.name}">+</button>
      </div>
    `;

    // Add event listeners
    widget.querySelector('.btn-increment').addEventListener('click', this.onIncrement);
    widget.querySelector('.btn-decrement').addEventListener('click', this.onDecrement);

    return widget;
  }
}