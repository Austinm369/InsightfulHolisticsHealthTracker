import { TrackerManager } from './TrackerManager';
import { safeQuerySelector } from '../../../utils/dom';

export function initializeTrackerManager() {
  try {
    const quotesSection = safeQuerySelector('.quotes-section');
    if (!quotesSection) {
      console.warn('Quotes section not found, deferring tracker manager initialization');
      return false;
    }

    const existingManager = document.querySelector('.tracker-manager-section');
    if (existingManager) {
      console.warn('Tracker manager already initialized');
      return true;
    }

    const manager = new TrackerManager();
    const managerElement = manager.render();
    
    quotesSection.parentNode.insertBefore(managerElement, quotesSection.nextSibling);
    
    return true;
  } catch (error) {
    console.error('Error initializing tracker manager:', error.message);
    return false;
  }
}