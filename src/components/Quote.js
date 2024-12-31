export function createQuote(text, author) {
  const quoteElement = document.createElement('div');
  quoteElement.className = 'quote-card fade-in';
  
  quoteElement.innerHTML = `
    <p class="quote-text">"${text}"</p>
    <p class="quote-author">- ${author}</p>
  `;
  
  return quoteElement;
}