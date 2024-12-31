import { state, updateState } from '../state/state.js';

export function initializeSettings() {
  const settingsBtn = document.getElementById('settings-btn');
  if (!settingsBtn) return;

  const panel = createSettingsPanel();
  document.body.appendChild(panel);

  settingsBtn.addEventListener('click', () => {
    $(panel).slideToggle();
  });
}

function createSettingsPanel() {
  const panel = document.createElement('div');
  panel.id = 'settings-panel';
  panel.className = 'settings-panel';
  
  panel.innerHTML = `
    <div class="settings-header">
      <h2>Settings</h2>
      <button class="close-btn">×</button>
    </div>
    <div class="settings-content">
      <section class="settings-section">
        <h3>Tracker Goals</h3>
        <div id="tracker-goals"></div>
      </section>
      <section class="settings-section">
        <h3>Visible Trackers</h3>
        <div id="tracker-visibility"></div>
      </section>
    </div>
  `;

  panel.querySelector('.close-btn').addEventListener('click', () => 
    $(panel).slideUp());

  initializeTrackerGoals(panel.querySelector('#tracker-goals'));
  initializeTrackerVisibility(panel.querySelector('#tracker-visibility'));

  return panel;
}