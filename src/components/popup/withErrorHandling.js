/**
 * Higher-order function to add error handling to popups
 */
import { ErrorHandler } from '../../utils/errorHandler.js';

export function withErrorHandling(PopupClass) {
  return class extends PopupClass {
    constructor(...args) {
      super(...args);
      this.errorHandler = new ErrorHandler();
    }

    show() {
      try {
        super.show();
      } catch (error) {
        this.errorHandler.handleError('popup', error, () => this.show());
      }
    }

    hide() {
      try {
        super.hide();
      } catch (error) {
        this.errorHandler.handleError('popup', error, () => this.hide());
      }
    }
  };
}