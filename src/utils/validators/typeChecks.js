/**
 * Type checking and validation utilities
 */
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

export function isString(value) {
  return typeof value === 'string';
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isElement(value) {
  return value instanceof Element || value instanceof HTMLElement;
}

export function isDefined(value) {
  return value !== undefined && value !== null;
}