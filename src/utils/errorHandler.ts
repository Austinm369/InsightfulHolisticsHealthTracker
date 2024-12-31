/**
 * Error handling utilities
 */

type ErrorContext = {
  message: string;
  context?: string;
  error?: Error;
};

/**
 * Handles errors consistently across the application
 */
export function handleError({ message, context, error }: ErrorContext): void {
  console.error(`Error${context ? ` in ${context}` : ''}: ${message}`, error);
}

/**
 * Creates an error fallback element
 */
export function createErrorFallback(message: string): HTMLDivElement {
  const fallback = document.createElement('div');
  fallback.className = 'error-fallback';
  fallback.innerHTML = `
    <p>${message}</p>
    <button onclick="window.location.reload()">Retry</button>
  `;
  return fallback;
}