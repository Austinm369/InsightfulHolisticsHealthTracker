/**
 * Validation utility functions
 */
export function validateEmoji(str) {
  if (!str) return false;
  
  // Basic emoji validation - checks if string contains at least one emoji
  const emojiRegex = /[\p{Emoji}]/gu;
  const emojis = str.match(emojiRegex);
  
  return emojis && emojis.length > 0 && emojis.length <= 5;
}

export function isPositiveNumber(value) {
  return typeof value === 'number' && value >= 0;
}

export function validateWidgetValue(value, min = 0) {
  if (!isPositiveNumber(value)) {
    throw new Error('Widget value must be a positive number');
  }
  if (value < min) {
    throw new Error(`Widget value cannot be less than ${min}`);
  }
  return true;
}