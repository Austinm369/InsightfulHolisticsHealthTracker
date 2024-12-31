/**
 * State validation utilities
 */
export function validateStateKey(key, allowedKeys) {
  if (!allowedKeys.includes(key)) {
    throw new Error(`Invalid state key: ${key}`);
  }
  return key;
}

export function validateStateValue(value, type) {
  switch (type) {
    case 'number':
      if (typeof value !== 'number' || isNaN(value)) {
        throw new Error('Value must be a valid number');
      }
      break;
    case 'boolean':
      if (typeof value !== 'boolean') {
        throw new Error('Value must be a boolean');
      }
      break;
    case 'string':
      if (typeof value !== 'string') {
        throw new Error('Value must be a string');
      }
      break;
  }
  return value;
}