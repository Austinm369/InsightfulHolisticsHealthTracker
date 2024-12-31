/**
 * Handles dynamic component loading and lifecycle management
 */
import { ErrorHandler } from '../utils/errorHandler.js';
import { ComponentRegistry } from './ComponentRegistry.js';

export class ComponentLoader {
  constructor() {
    this.errorHandler = new ErrorHandler();
    this.registry = new ComponentRegistry();
  }

  /**
   * Load multiple components in parallel
   * @param {Array} components - Array of component configs
   */
  async loadComponents(components) {
    return Promise.all(
      components.map(component => this.loadComponent(component))
    );
  }

  /**
   * Load a single component
   * @param {Object} config - Component configuration
   */
  async loadComponent(config) {
    try {
      return await this.registry.register(config);
    } catch (error) {
      this.errorHandler.handleError(
        `component-${config.id}`,
        error,
        () => this.loadComponent(config)
      );
      return null;
    }
  }

  /**
   * Clean up all components
   */
  cleanup() {
    this.registry.cleanup();
  }
}