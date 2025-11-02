/**
 * Mobile Menu
 * Mobile menu toggle with expand/collapse and icon animations
 */

export interface MobileMenuConfig {
  btnId?: string;
  menuId?: string;
  openIconClass?: string;
  closeIconClass?: string;
}

const DEFAULT_CONFIG: MobileMenuConfig = {
  btnId: 'menu-btn',
  menuId: 'mobile-menu',
  openIconClass: 'i-carbon:menu text-[1.25rem] text-[var(--md-sys-color-on-surface)] transition-transform duration-200',
  closeIconClass: 'i-carbon:close text-[1.25rem] text-[var(--md-sys-color-on-surface)] transition-transform duration-200 rotate-90',
};

export class MobileMenu {
  private btn: HTMLElement | null;
  private menu: HTMLElement | null;
  private icon: HTMLElement | null;
  private config: MobileMenuConfig;
  private isOpen: boolean = false;

  constructor(config: Partial<MobileMenuConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    
    this.btn = document.getElementById(this.config.btnId!);
    this.menu = document.getElementById(this.config.menuId!);
    this.icon = this.btn?.querySelector('i') || null;
    
    if (!this.btn || !this.menu) {
      console.warn('[MobileMenu] Required elements not found');
      return;
    }
    
    this.init();
  }

  /**
   * Initialize event listeners
   */
  private init() {
    this.btn?.addEventListener('click', () => this.toggle());
    
    this.menu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (this.isOpen) {
          this.close();
        }
      });
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  /**
   * Toggle menu open/close state
   */
  public toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open menu with animation
   */
  public open() {
    if (!this.menu || !this.btn) return;
    
    this.isOpen = true;
    this.menu.classList.remove('hidden');
    this.btn.setAttribute('aria-expanded', 'true');
    
    // Update icon to close state
    if (this.icon && this.config.closeIconClass) {
      this.icon.className = this.config.closeIconClass;
    }
  }

  /**
   * Close menu with animation
   */
  public close() {
    if (!this.menu || !this.btn) return;
    
    this.isOpen = false;
    this.menu.classList.add('hidden');
    this.btn.setAttribute('aria-expanded', 'false');
    
    // Update icon to open state
    if (this.icon && this.config.openIconClass) {
      this.icon.className = this.config.openIconClass;
    }
  }

  /**
   * Get current open/close state
   * @returns true if menu is open, false otherwise
   */
  public getState(): boolean {
    return this.isOpen;
  }
}

/**
 * Auto-initialize mobile menu
 * @param config - Optional configuration overrides
 * @returns MobileMenu instance or null if DOM not ready
 */
export function initMobileMenu(config?: Partial<MobileMenuConfig>): MobileMenu | null {
  if (document.readyState === 'loading') {
    let instance: MobileMenu | null = null;
    document.addEventListener('DOMContentLoaded', () => {
      instance = new MobileMenu(config);
    });
    return instance;
  } else {
    return new MobileMenu(config);
  }
}
