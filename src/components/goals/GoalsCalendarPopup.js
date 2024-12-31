import { BasePopup } from '../popup/BasePopup.js';
import { createElement } from '../../utils/dom.js';
import { goalsStorage } from '../../utils/storage/goalsStorage.js';
import { calculateDailyScore, getScoreGrade } from '../../utils/scoring/goalScoring.js';

export class GoalsCalendarPopup extends BasePopup {
  constructor() {
    super();
    this.currentDate = new Date();
    this.initialize();
  }

  initialize() {
    const content = createElement('div', 'goals-calendar-content');
    
    content.innerHTML = `
      <h2 class="popup-title">Goals Calendar</h2>
      <div class="calendar-navigation">
        <button class="btn-prev">←</button>
        <span class="current-month">${this.formatMonth()}</span>
        <button class="btn-next">→</button>
      </div>
      ${this.createCalendarGrid()}
      <div class="score-legend">
        <h3>Score Legend</h3>
        <div class="legend-items">
          <div class="legend-item"><span class="score-dot a-plus"></span>A+ (900+)</div>
          <div class="legend-item"><span class="score-dot a"></span>A (800-899)</div>
          <div class="legend-item"><span class="score-dot b"></span>B (700-799)</div>
          <div class="legend-item"><span class="score-dot c"></span>C (600-699)</div>
          <div class="legend-item"><span class="score-dot d"></span>D (500-599)</div>
          <div class="legend-item"><span class="score-dot f"></span>F (0-499)</div>
        </div>
      </div>
    `;

    this.setContent(content);
    this.attachEventListeners(content);
  }

  formatMonth() {
    return this.currentDate.toLocaleString('default', { 
      month: 'long', 
      year: 'numeric' 
    });
  }

  createCalendarGrid() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let html = `
      <div class="calendar-grid">
        <div class="weekday">Sun</div>
        <div class="weekday">Mon</div>
        <div class="weekday">Tue</div>
        <div class="weekday">Wed</div>
        <div class="weekday">Thu</div>
        <div class="weekday">Fri</div>
        <div class="weekday">Sat</div>
    `;

    // Add empty cells for days before first of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      html += '<div class="calendar-day empty"></div>';
    }

    // Add days of month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const score = goalsStorage.getDailyScore(date);
      const { grade, color } = getScoreGrade(score);
      const isToday = this.isToday(date);

      html += `
        <div class="calendar-day ${isToday ? 'today' : ''}" data-date="${date.toISOString()}">
          <span class="day-number">${day}</span>
          <span class="day-score" style="background-color: ${color}">${grade}</span>
        </div>
      `;
    }

    html += '</div>';
    return html;
  }

  isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  attachEventListeners(content) {
    content.querySelector('.btn-prev').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.updateCalendar();
    });

    content.querySelector('.btn-next').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.updateCalendar();
    });

    // Show detailed score on day click
    content.querySelectorAll('.calendar-day:not(.empty)').forEach(day => {
      day.addEventListener('click', () => {
        const date = new Date(day.dataset.date);
        const details = goalsStorage.getDailyDetails(date);
        this.showDayDetails(date, details);
      });
    });
  }

  updateCalendar() {
    const content = this.popup.querySelector('.goals-calendar-content');
    content.querySelector('.current-month').textContent = this.formatMonth();
    content.querySelector('.calendar-grid').outerHTML = this.createCalendarGrid();
    this.attachEventListeners(content);
  }

  showDayDetails(date, details) {
    const formattedDate = date.toLocaleDateString('default', { 
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

    const detailsPopup = new BasePopup();
    detailsPopup.setContent(`
      <div class="day-details">
        <h3>${formattedDate}</h3>
        <div class="goals-summary">
          ${Object.entries(details.goals).map(([goal, value]) => `
            <div class="goal-item">
              <span class="goal-name">${goal}</span>
              <span class="goal-value">${value.achieved}/${value.target}</span>
            </div>
          `).join('')}
        </div>
        <div class="final-score">
          <span>Final Score: ${details.score}</span>
          <span class="grade">${getScoreGrade(details.score).grade}</span>
        </div>
      </div>
    `);
    detailsPopup.show();
  }
}