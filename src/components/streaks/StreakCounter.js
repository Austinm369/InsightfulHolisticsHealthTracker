/**
 * Tracks daily goal completion streaks
 */
import { createElement } from '../../utils/dom.js';

export class StreakCounter {
  constructor(trackerId) {
    this.trackerId = trackerId;
    this.streak = this.loadStreak();
    this.element = this.createCounter();
    this.lastUpdate = this.loadLastUpdate();
    this.checkStreak();
  }

  loadStreak() {
    return parseInt(localStorage.getItem(`${this.trackerId}-streak`) || '0', 10);
  }

  loadLastUpdate() {
    return localStorage.getItem(`${this.trackerId}-lastUpdate`);
  }

  saveStreak() {
    localStorage.setItem(`${this.trackerId}-streak`, this.streak);
    localStorage.setItem(`${this.trackerId}-lastUpdate`, new Date().toDateString());
  }

  createCounter() {
    const container = createElement('div', 'streak-counter');
    container.innerHTML = `
      <span class="streak-flame">🔥</span>
      <span class="streak-count">${this.streak}</span>
      <span class="streak-label">day streak</span>
    `;
    return container;
  }

  checkStreak() {
    const today = new Date().toDateString();
    if (this.lastUpdate !== today) {
      if (this.lastUpdate !== new Date(Date.now() - 86400000).toDateString()) {
        this.resetStreak();
      }
      this.lastUpdate = today;
      this.saveStreak();
    }
  }

  incrementStreak() {
    this.streak++;
    this.saveStreak();
    this.updateDisplay();
  }

  resetStreak() {
    this.streak = 0;
    this.saveStreak();
    this.updateDisplay();
  }

  updateDisplay() {
    this.element.querySelector('.streak-count').textContent = this.streak;
  }
}