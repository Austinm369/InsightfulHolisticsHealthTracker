import { createQuote } from './Quote.js';

export function initializeQuotes(containerId, quotes) {
  const container = document.getElementById(containerId);
  quotes.forEach(quote => {
    container.appendChild(createQuote(quote.text, quote.author));
  });
}