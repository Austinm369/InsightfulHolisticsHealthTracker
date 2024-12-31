import { createElement } from '../../utils/dom.js';

/**
 * Creates a single quote element
 */
export function createQuote(text, author) {
  const quote = createElement('div', 'quote-card');
  
  quote.innerHTML = `
    <p class="quote-text">"${text}"</p>
    <p class="quote-author">- ${author}</p>
  `;
  
  return quote;
}