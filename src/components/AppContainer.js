/**
 * Creates and returns the main application container
 * @returns {HTMLElement} The app container element
 */
export function createAppContainer() {
  // Check if container already exists
  let container = document.getElementById('app');
  
  if (!container) {
    container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);
  }
  
  return container;
}