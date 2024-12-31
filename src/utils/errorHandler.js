export function handleError(error, context = '') {
  console.error(`Error${context ? ` in ${context}:` : ':'}`, error);
  
  const errorContainer = document.getElementById('error-boundary');
  if (errorContainer) {
    errorContainer.style.display = 'block';
    const message = errorContainer.querySelector('.error-message');
    if (message) {
      message.textContent = error.message || 'An unexpected error occurred';
    }
  }
}