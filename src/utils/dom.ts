/**
 * DOM utility functions for safe element selection and manipulation
 */

/**
 * Safely queries for a single element, returns null if not found
 */
export function safeQuerySelector<T extends HTMLElement>(selector: string): T | null {
  const element = document.querySelector<T>(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return null;
  }
  return element;
}

/**
 * Creates an element with optional class names
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  return element;
}

/**
 * Appends multiple children to a parent element
 */
export function appendChildren(
  parent: HTMLElement,
  ...children: Array<HTMLElement | null>
): void {
  children.forEach(child => {
    if (child) {
      parent.appendChild(child);
    }
  });
}