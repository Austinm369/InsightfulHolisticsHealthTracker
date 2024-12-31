const healthQuotes = [
  { text: "The greatest wealth is health.", author: "Virgil" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" }
];

export function initializeQuotes() {
  const quotesSection = document.getElementById('quotes');
  if (!quotesSection) return;

  const quote = healthQuotes[Math.floor(Math.random() * healthQuotes.length)];
  quotesSection.innerHTML = `
    <div class="quote-card">
      <p class="quote-text">"${quote.text}"</p>
      <p class="quote-author">- ${quote.author}</p>
    </div>
  `;
}