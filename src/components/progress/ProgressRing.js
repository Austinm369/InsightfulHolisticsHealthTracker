/**
 * Circular progress indicator component
 */
import { createElement } from '../../utils/dom.js';

export class ProgressRing {
  constructor(size = 60, strokeWidth = 4) {
    this.size = size;
    this.strokeWidth = strokeWidth;
    this.radius = (size - strokeWidth) / 2;
    this.element = this.createRing();
  }

  createRing() {
    const container = createElement('div', 'progress-ring');
    const circumference = 2 * Math.PI * this.radius;
    
    container.innerHTML = `
      <svg width="${this.size}" height="${this.size}" class="progress-ring-circle">
        <circle 
          class="progress-ring-background"
          stroke-width="${this.strokeWidth}"
          fill="transparent"
          r="${this.radius}"
          cx="${this.size/2}"
          cy="${this.size/2}"
        />
        <circle 
          class="progress-ring-progress"
          stroke-width="${this.strokeWidth}"
          fill="transparent"
          r="${this.radius}"
          cx="${this.size/2}"
          cy="${this.size/2}"
          style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${circumference}"
        />
      </svg>
      <span class="progress-ring-text">0%</span>
    `;

    return container;
  }

  setProgress(percent) {
    const circle = this.element.querySelector('.progress-ring-progress');
    const text = this.element.querySelector('.progress-ring-text');
    const circumference = 2 * Math.PI * this.radius;
    const offset = circumference - (percent / 100 * circumference);
    
    circle.style.strokeDashoffset = offset;
    text.textContent = `${Math.round(percent)}%`;
  }
}