import { BasePopup } from '../popups/BasePopup.js';
import { createElement } from '../../utils/dom.js';
import { calculateDailyScore, getScoreGrade } from '../../utils/scoring/goalScoring.js';

export class WeeklyCalendar extends BasePopup {
  constructor() {
    super();
    this.currentWeek = this.getCurrentWeek();
    this.initialize();
  }

  getCurrentWeek() {
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - start.getDay());
    return start;
  }

  initialize() {
    const content = createElement('div', 'calendar-content');
    content.innerHTML = `
      <h2 class="calendar-title">Weekly Progress</h2>
      <div class="week-navigation">
        <button class="btn-prev">←</button>
        <span class="week-display"></span>
        <button class="btn-next">→</button>
      </div>
      <div class="week-grid"></div>
    `;

    this.setContent(content);
    this.updateCalendar();
    this.attachEventListeners(content);
  }

  updateCalendar() {
    const grid = this.popup.querySelector('.week-grid');
    const weekDisplay = this.popup.querySelector('.week-display');
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(this.currentWeek);
      date.setDate(date.getDate() + i);
      days.push(this.createDayCard(date));
    }

    grid.innerHTML = days.join('');
    weekDisplay.textContent = `Week of ${this.currentWeek.toLocaleDateString()}`;
  }

  createDayCard(date) {
    const isToday = date.toDateString() === new Date().toDateString();
    const score = calculateDailyScore();
    const { grade, color } = getScoreGrade(score);

    return `
      <div class="day-card ${isToday ? 'today' : ''}">
        <div class="day-header">
          <span class="day-name">${date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
          <span class="day-date">${date.getDate()}</span>
        </div>
        <div class="day-score" style="color: ${color}">
          <span class="score-value">${score}</span>
          <span class="score-grade">${grade}</span>
        </div>
      </div>
    `;
  }

  attachEventListeners(content) {
    content.querySelector('.btn-prev').addEventListener('click', () => {
      this.currentWeek.setDate(this.currentWeek.getDate() - 7);
      this.updateCalendar();
    });

    content.querySelector('.btn-next').addEventListener('click', () => {
      this.currentWeek.setDate(this.currentWeek.getDate() + 7);
      this.updateCalendar();
    });
  }
}