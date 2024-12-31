/**
 * DOM-specific validation utilities
 */
export function validateSelector(selector) {
  if (!selector || typeof selector !== 'string') {
    throw new Error('Invalid selector provided');
  }
  return selector;
}

export function validateElement(element, context = 'Element') {
  if (!element || !(element instanceof Element)) {
    throw new Error(`${context} not found or invalid`);
  }
  return element;
}

export function validateContainer(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container #${containerId} not found`);
  }
  return container;
}