/**
 * Store factory function
 */
import { Store } from './Store.js';

export function createStore(initialState = {}) {
  return new Store(initialState);
}