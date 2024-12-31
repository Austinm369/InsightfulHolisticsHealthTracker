import { safeQuerySelector } from '../utils/dom';

export function createHeader() {
  try {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = '<h1>Health Tracker</h1>';
    
    const app = safeQuerySelector('#app');
    if (app) {
      app.insertBefore(header, app.firstChild);
      return header;
    }
    return null;
  } catch (error) {
    console.error('Failed to create header:', error);
    return null;
  }
}