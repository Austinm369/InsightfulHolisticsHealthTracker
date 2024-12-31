/**
 * Reusable progress bar component
 */
export function createProgressBar(current, goal) {
  const container = document.createElement('div');
  container.className = 'progress-container';
  
  const percentage = Math.min((current / goal) * 100, 100);
  
  container.innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${percentage}%"></div>
    </div>
    <div class="progress-text">${Math.round(percentage)}%</div>
  `;
  
  return container;
}