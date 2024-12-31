/**
 * Manages storage and retrieval of daily goal scores and details
 */
export class GoalsStorage {
  constructor() {
    this.STORAGE_KEY = 'daily-goals';
    this.scores = this.loadScores();
  }

  loadScores() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load goal scores:', error);
      return {};
    }
  }

  saveScores() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.scores));
    } catch (error) {
      console.error('Failed to save goal scores:', error);
    }
  }

  getDailyScore(date) {
    const key = this.getDateKey(date);
    return this.scores[key]?.score || 0;
  }

  getDailyDetails(date) {
    const key = this.getDateKey(date);
    return this.scores[key] || {
      score: 0,
      goals: {}
    };
  }

  saveDailyScore(date, score, goals) {
    const key = this.getDateKey(date);
    this.scores[key] = {
      score,
      goals,
      timestamp: Date.now()
    };
    this.saveScores();
  }

  getDateKey(date) {
    return date.toISOString().split('T')[0];
  }

  getMonthScores(year, month) {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    return Object.entries(this.scores)
      .filter(([key]) => key.startsWith(prefix))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  }
}

// Export singleton instance
export const goalsStorage = new GoalsStorage();