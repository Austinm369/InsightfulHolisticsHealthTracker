/**
 * Centralized state management
 */
import { EventEmitter } from './eventEmitter.js';

export class StateManager {
  constructor() {
    this.state = {
      waterGlasses: 0,
      steps: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      customTrackers: [],
      hiddenTrackers: []
    };
    this.events = new EventEmitter();
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;
    this.events.emit(`${key}Changed`, value);
    return value;
  }

  subscribe(key, callback) {
    return this.events.on(`${key}Changed`, callback);
  }

  unsubscribe(key, callback) {
    this.events.off(`${key}Changed`, callback);
  }
}