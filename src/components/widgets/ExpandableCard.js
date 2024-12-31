/**
 * Reusable expandable card component
 */
export class ExpandableCard {
  constructor(id, title, icon) {
    this.id = id;
    this.title = title;
    this.icon = icon;
    this.isExpanded = false;
  }

  createCard() {
    const card = document.createElement('div');
    card.className = 'widget expandable-card';
    card.id = this.id;
    
    card.innerHTML = `
      <div class="widget-header">
        <div class="widget-title">
          <span class="widget-icon">${this.icon}</span>
          <h2>${this.title}</h2>
        </div>
        <button class="expand-toggle" aria-label="Toggle settings">🔽</button>
      </div>
      <div class="widget-content"></div>
      <div class="widget-settings" style="display: none;">
        <div class="settings-content"></div>
      </div>
    `;

    this.attachEventListeners(card);
    return card;
  }

  attachEventListeners(card) {
    const toggle = card.querySelector('.expand-toggle');
    const settings = card.querySelector('.widget-settings');

    toggle.addEventListener('click', () => {
      this.isExpanded = !this.isExpanded;
      toggle.textContent = this.isExpanded ? '🔼' : '🔽';
      settings.style.display = this.isExpanded ? 'block' : 'none';
    });
  }

  setContent(content) {
    const contentContainer = this.element.querySelector('.widget-content');
    contentContainer.innerHTML = '';
    contentContainer.appendChild(content);
  }

  setSettings(settings) {
    const settingsContainer = this.element.querySelector('.settings-content');
    settingsContainer.innerHTML = '';
    settingsContainer.appendChild(settings);
  }
}