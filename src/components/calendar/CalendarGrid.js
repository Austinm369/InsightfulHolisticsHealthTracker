import { createElement } from '../../utils/dom.js';
import { formatDate } from '../../utils/dateUtils.js';

export class CalendarGrid {
  constructor(date) {
    this.date = date;
    this.element = this.createGrid();
  }

  createGrid() {
    const grid = createElement('div', 'calendar-grid');
    
    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
      const header = createElement('div', 'calendar-day-header');
      header.textContent = day;
      grid.appendChild(header);
    });
    
    // Add day cells
    const startOfWeek = this.getStartOfWeek(this.date);
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      grid.appendChild(this.createDayCell(date));
    }
    
    return grid;
  }

  createDayCell(date) {
    const cell = createElement('div', 'calendar-day');
    cell.innerHTML = `
      <div class="day-date">${formatDate(date)}</div>
      <div class="day-goals">
        <div class="goal-item">
          <span class="goal-icon">🥤</span>
          <span class="goal-value">0/8</span>
        </div>
        <div class="goal-item">
          <span class="goal-icon">👣</span>
          <span class="goal-value">0/10000</span>
        </div>
      </div>
    `;
    return cell;
  }

  getStartOfWeek(date) {
    const result = new Date(date);
    const day = date.getDay();
    result.setDate(result.getDate() - day);
    return result;
  }

  update(date) {
    this.date = date;
    const newGrid = this.createGrid();
    this.element.replaceWith(newGrid);
    this.element = newGrid;
  }
}