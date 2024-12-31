import { createElement } from '../utils/dom.js';
import { createWidgetHeader } from './widgets/base/WidgetHeader.js';
import { createWidgetProgress } from './widgets/base/WidgetProgress.js';
import { createWidgetControls } from './widgets/base/WidgetControls.js';

export function createHealthWidget(title, value, goal, unit, onIncrement, onDecrement) {
  const widget = createElement('div', 'widget fade-in');
  
  const header = createWidgetHeader(title, value, goal, unit);
  const progress = createWidgetProgress(value, goal);
  const controls = createWidgetControls(title, onIncrement, onDecrement);
  
  widget.appendChild(header);
  widget.appendChild(progress);
  widget.appendChild(controls);
  
  return widget;
}