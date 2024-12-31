/**
 * DOM utility functions
 * Provides consistent DOM manipulation methods across the application
 */

/**
 * Creates a new DOM element with optional class
 */
export function createElement(tag, className = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
}

/**
 * Safely queries for a single element with warning
 */
export function safeQuerySelector(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element "${selector}" not found`);
    return null;
  }
  return element;
}

/**
 * Appends multiple children to a parent element
 */
export function appendChildren(parent, ...children) {
  children.forEach(child => parent.appendChild(child));
}

/**
 * Gets all elements matching selector
 */
export function getAllElements(selector) {
  return document.querySelectorAll(selector);
}