/**
 * Goal Progress Component
 * Shows combined progress across all health goals
 */
import { createElement } from '../../utils/dom.js';
import { ProgressRing } from './ProgressRing.js';
import { StreakCounter } from '../streaks/StreakCounter.js';
import { calculateDailyScore, getScoreGrade } from '../../utils/scoring/goalScoring.js';

export class GoalProgress {
  constructor() {
    this.element = this.createProgress();
    this.progressRing = new ProgressRing(80, 6);
    this.streakCounter = new StreakCounter('daily-goals');
    this.initialize();
  }

  createProgress() {
    const container = createElement('div', 'goal-progress');
    container.innerHTML = `
      <div class="progress-header">
        <h3>Daily Progress</h3>
        <div class="progress-stats"></div>
      </div>
      <div class="progress-display"></div>
    `;
    return container;
  }

  initialize() {
    const display = this.element.querySelector('.progress-display');
    const stats = this.element.querySelector('.progress-stats');
    
    display.appendChild(this.progressRing.element);
    stats.appendChild(this.streakCounter.element);
    
    this.updateProgress();
    this.setupEventListeners();
    this.setupAutoUpdate();
  }

  setupEventListeners() {
    // Update on score changes
    document.addEventListener('scoreUpdate', (e) => {
      this.updateProgress(e.detail.score);
    });
  }

  updateProgress(score = calculateDailyScore()) {
    const { grade, color } = getScoreGrade(score);
    
    this.progressRing.setProgress((score / 1000) * 100);
    this.progressRing.element.style.setProperty('--progress-color', color);
    
    if (score >= 800) {
      this.streakCounter.incrementStreak();
    }
  }

  setupAutoUpdate() {
    // Update at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
      this.updateProgress();
      this.setupAutoUpdate();
    }, timeUntilMidnight);
  }
}