/**
 * Core application class
 */
import { ThemeManager } from '../core/theme/ThemeManager.js';
import { ErrorHandler } from '../core/error/ErrorHandler.js';
import { ComponentLoader } from '../core/components/ComponentLoader.js';
import { AppConfig } from '../config/app.config.js';

export class App {
  constructor() {
    this.themeManager = new ThemeManager();
    this.errorHandler = new ErrorHandler();
    this.componentLoader = new ComponentLoader();
  }

  async initialize() {
    try {
      await this.initializeCore();
      await this.loadComponents();
      return true;
    } catch (error) {
      this.errorHandler.handleError('app', error, () => this.initialize());
      return false;
    }
  }

  async initializeCore() {
    this.themeManager.initialize();
  }

  async loadComponents() {
    await this.componentLoader.loadComponents(AppConfig.components);
  }
}