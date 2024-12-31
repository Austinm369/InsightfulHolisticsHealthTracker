import { initializeTheme } from '../utils/theme.js';
import { initializeComponents } from './initialization.js';

export function initializeApp() {
  // Initialize theme first since it's visual
  initializeTheme();
  
  // Initialize components
  initializeComponents();
}