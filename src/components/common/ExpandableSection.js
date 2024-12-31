export function initializeExpandableSection(container) {
  const toggle = container.querySelector('.expand-toggle');
  const content = container.querySelector('.expandable-content');
  
  if (!toggle || !content) return;

  toggle.addEventListener('click', () => {
    const isExpanded = content.style.display !== 'none';
    content.style.display = isExpanded ? 'none' : 'block';
    toggle.textContent = isExpanded ? '🔽' : '🔼';
    toggle.setAttribute('aria-expanded', !isExpanded);
  });
}