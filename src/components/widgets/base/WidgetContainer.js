/**
 * Creates a container for health tracking widgets
 */
export function createWidgetContainer() {
  const container = document.createElement('div');
  container.className = 'widgets-container';
  return container;
}