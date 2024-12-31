import { createElement } from '../../../utils/dom.js';

export function createWidgetHeader({ icon, name, value, goal, unit }) {
  const header = createElement('div', 'widget-header');
  
  const title = createElement('h2');
  title.innerHTML = `<span class="widget-icon">${icon}</span> ${name}`;
  
  const valueDisplay = createElement('span', 'widget-value');
  valueDisplay.textContent = `${value} / ${goal} ${unit}`;
  
  header.appendChild(title);
  header.appendChild(valueDisplay);
  
  return header;
}