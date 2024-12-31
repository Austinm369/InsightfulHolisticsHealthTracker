import { initializeQuotes as initQuotes } from '../../components/quotes/QuoteList.js';
import { handleError } from '../../utils/errorHandler.js';

export async function initializeQuotes() {
  try {
    const container = document.getElementById('quotes');
    if (!container) {
      throw new Error('Quotes container not found');
    }

    await initQuotes('quotes');
    return true;
  } catch (error) {
    handleError({
      message: 'Failed to initialize quotes',
      context: 'QuoteLoader',
      error
    });
    return false;
  }
}