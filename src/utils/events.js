export function createEventBus() {
  const listeners = new Map();

  return {
    emit(event, data) {
      const callbacks = listeners.get(event) || [];
      callbacks.forEach(cb => cb(data));
    },

    on(event, callback) {
      if (!listeners.has(event)) {
        listeners.set(event, new Set());
      }
      listeners.get(event).add(callback);
    },

    off(event, callback) {
      const callbacks = listeners.get(event);
      if (callbacks) {
        callbacks.delete(callback);
      }
    }
  };
}

export const eventBus = createEventBus();