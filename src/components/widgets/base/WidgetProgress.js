import { createElement } from '../../../utils/dom.js';

export function createWidgetProgress(value, goal) {
  const container = createElement('div', 'widget-progress');
  const progressBar = createElement('div', 'progress-bar');
  progressBar.style.width = `${(value / goal) * 100}%`;
  container.appendChild(progressBar);
  return container;
}