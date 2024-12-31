import { MenuButton } from './menuButton.js';
import { toggleTheme } from '../theme/theme.js';

export class MenuBar {
  constructor() {
    this.element = this.createMenuBar();
  }

  createMenuBar() {
    const menu = document.createElement('nav');
    menu.className = 'menu-bar';
    
    const themeButton = new MenuButton({
      icon: '🌞',
      label: 'Toggle theme',
      onClick: () => {
        const isDark = toggleTheme();
        themeButton.setIcon(isDark ? '🌙' : '🌞');
      }
    });

    const settingsButton = new MenuButton({
      icon: '⚙️',
      label: 'Open settings',
      onClick: () => $('#settings-panel').slideDown()
    });

    menu.append(themeButton.element, settingsButton.element);
    return menu;
  }

  mount() {
    document.body.appendChild(this.element);
  }
}