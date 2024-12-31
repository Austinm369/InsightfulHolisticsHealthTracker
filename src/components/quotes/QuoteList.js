import { healthQuotes } from '../../data/quotes.js';

export function initializeQuotes(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Get two random unique quotes
  const selectedQuotes = getRandomQuotes(2);
  
  container.innerHTML = selectedQuotes.map(quote => `
    <div class="quote-card">
      <p class="quote-text">"${quote.text}"</p>
      <p class="quote-author">- ${quote.author}</p>
    </div>
  `).join('');
}

function getRandomQuotes(count) {
  const quotes = [...healthQuotes];
  const selected = [];
  
  for (let i = 0; i < count && quotes.length > 0; i++) {
    const index = Math.floor(Math.random() * quotes.length);
    selected.push(quotes.splice(index, 1)[0]);
  }
  
  return selected;
}