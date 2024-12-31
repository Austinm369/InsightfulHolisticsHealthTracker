/**
 * Component Registry
 * Manages component registration, lifecycle, and cleanup
 * 
 * Responsibilities:
 * - Track registered components
 * - Handle component initialization
 * - Manage component cleanup
 * - Prevent duplicate registrations
 */
export class ComponentRegistry {
  constructor() {
    /**
     * Map of registered components
     * @type {Map<string, Object>}
     */
    this.components = new Map();
  }

  /**
   * Register a new component
   * @param {Object} config - Component configuration
   * @param {string} config.id - Unique component identifier
   * @param {Function} config.loader - Async function that loads the component
   * @returns {Promise<Object>} The loaded component instance
   * @throws {Error} If registration fails
   */
  async register({ id, loader }) {
    // Return existing component if already registered
    if (this.components.has(id)) {
      return this.components.get(id);
    }

    // Load and register new component
    const component = await loader();
    this.components.set(id, component);
    return component;
  }

  /**
   * Unregister and cleanup a component
   * @param {string} id - Component ID to unregister
   */
  unregister(id) {
    const component = this.components.get(id);
    // Call cleanup method if it exists
    if (component?.cleanup) {
      component.cleanup();
    }
    this.components.delete(id);
  }

  /**
   * Clean up all registered components
   * Called during application shutdown or hot reload
   */
  cleanup() {
    this.components.forEach((_, id) => this.unregister(id));
  }
}