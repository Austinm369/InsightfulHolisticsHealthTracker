/**
 * Handles component recovery and regeneration
 */
export class ComponentRecovery {
  static async recoverComponent(id, component, container) {
    try {
      // Remove failed component
      const failed = document.getElementById(id);
      if (failed) {
        failed.remove();
      }

      // Create new container
      const newContainer = document.createElement('div');
      newContainer.id = id;
      container.appendChild(newContainer);

      // Re-render component
      await component.render(newContainer);
      return true;
    } catch (error) {
      console.error(`Failed to recover component ${id}:`, error);
      this.showFallback(id, container);
      return false;
    }
  }

  static showFallback(id, container) {
    const fallback = document.createElement('div');
    fallback.className = 'component-error';
    fallback.innerHTML = `
      <div class="error-content">
        <p>Failed to load component</p>
        <button onclick="window.componentLoader.reloadComponent('${id}')">
          Retry
        </button>
      </div>
    `;
    container.appendChild(fallback);
  }
}