import { createElement } from '../../utils/dom.js';
import { state } from '../../utils/state.js';
import { calculateDailyScore } from '../../utils/scoring/goalScoring.js';

export function showCalendarPopup() {
  const popup = createElement('div', 'popup-overlay');
  popup.innerHTML = `
    <div class="popup-content calendar-popup">
      <button class="popup-close" aria-label="Close calendar">×</button>
      <h2>Progress Calendar</h2>
      <div class="calendar-navigation">
        <button class="prev-month">←</button>
        <span class="current-month"></span>
        <button class="next-month">→</button>
      </div>
      <div class="calendar-grid"></div>
      <div class="calendar-legend">
        <div class="legend-item">🏆 Great progress (>80%)</div>
        <div class="legend-item">👍 Good progress (60-80%)</div>
        <div class="legend-item">😐 Fair progress (40-60%)</div>
        <div class="legend-item">👎 Needs improvement (<40%)</div>
      </div>
    </div>
  `;

  document.body.appendChild(popup);
  initializeCalendar(popup);
  
  // Show with animation
  requestAnimationFrame(() => {
    popup.classList.add('active');
  });

  // Add close handlers
  const closeBtn = popup.querySelector('.popup-close');
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('active');
    setTimeout(() => popup.remove(), 300);
  });
}

function initializeCalendar(popup) {
  const today = new Date();
  updateCalendarMonth(popup, today);
}

function updateCalendarMonth(popup, date) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
    
  popup.querySelector('.current-month').textContent = 
    `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    
  // Calendar grid implementation would go here
  // This would show daily scores and progress
}