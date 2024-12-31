import { createElement } from '../../utils/dom.js';

export class InstallPWA {
  constructor() {
    this.deferredPrompt = null;
    this.element = this.createInstallSection();
    this.initializePWA();
  }

  createInstallSection() {
    const container = createElement('div', 'install-pwa-section');
    container.style.display = 'none'; // Hidden by default
    
    const title = createElement('h3', 'settings-subtitle');
    title.textContent = 'App Installation';
    
    const button = createElement('button', 'btn-install');
    button.innerHTML = '📱 Install Health Tracker';
    button.addEventListener('click', () => this.installPWA());
    
    container.appendChild(title);
    container.appendChild(button);
    return container;
  }

  initializePWA() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.element.style.display = 'block';
    });

    window.addEventListener('appinstalled', () => {
      this.element.style.display = 'none';
      this.deferredPrompt = null;
    });
  }

  async installPWA() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const result = await this.deferredPrompt.userChoice;
    
    if (result.outcome === 'accepted') {
      console.log('PWA installed successfully');
    }
    
    this.deferredPrompt = null;
  }

  render() {
    return this.element;
  }
}