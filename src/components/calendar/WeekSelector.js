import { createElement } from '../../utils/dom.js';

export class WeekSelector {
  constructor(onChange) {
    this.currentWeek = this.getWeekNumber(new Date());
    this.onChange = onChange;
    this.element = this.createSelector();
  }

  getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  createSelector() {
    const container = createElement('div', 'week-selector');
    
    const label = createElement('span', 'week-label');
    label.textContent = 'Week: ';
    
    const select = createElement('select', 'week-select');
    const totalWeeks = 52;
    
    for (let i = 1; i <= totalWeeks; i++) {
      const option = createElement('option');
      option.value = i;
      option.textContent = `Week ${i}`;
      if (i === this.currentWeek) option.selected = true;
      select.appendChild(option);
    }
    
    select.addEventListener('change', (e) => {
      this.currentWeek = parseInt(e.target.value);
      this.onChange(this.currentWeek);
    });
    
    container.appendChild(label);
    container.appendChild(select);
    
    return container;
  }

  render() {
    return this.element;
  }
}