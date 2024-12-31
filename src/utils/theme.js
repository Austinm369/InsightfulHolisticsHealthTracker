export function initializeTheme() {
  // Get system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply theme based on system preference
  document.documentElement.classList.toggle('dark', prefersDark);
  
  // Update theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = prefersDark ? '🌙' : '🌞';
    themeToggle.setAttribute('aria-label', prefersDark ? 'Switch to light mode' : 'Switch to dark mode');
    
    // Add click handler
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      themeToggle.textContent = isDark ? '🌙' : '🌞';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
}