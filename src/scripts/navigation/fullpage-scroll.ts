/**
 * Full-Page Scroll
 * Fullscreen section scrolling with wheel, touch, and keyboard support
 */

export class FullPageScroll {
  private container: HTMLElement;
  private sections: NodeListOf<HTMLElement>;
  private dots: NodeListOf<HTMLButtonElement>;
  private currentSection: number = 0;
  private isAnimating: boolean = false;
  private touchStartY: number = 0;
  private lastScrollTime: number = 0;
  private scrollCooldown: number = 1000;

  constructor() {
    const container = document.getElementById('fullpage-container');
    
    if (!container) {
      console.error('[FullPageScroll] Required elements not found');
      return;
    }

    this.container = container;
    this.sections = this.container.querySelectorAll('.fullpage-section');
    this.dots = document.querySelectorAll('.section-dot');
    
    this.prepareInitialState();
    this.init();
  }

  private prepareInitialState() {
    this.sections.forEach((section, index) => {
      section.dataset.ready = 'false';
      section.dataset.active = index === 0 ? 'true' : 'false';
    });

    requestAnimationFrame(() => {
      this.sections.forEach((section) => {
        section.dataset.ready = 'true';
      });
    });
  }

  private init() {
    const defaultFooter = document.getElementById('default-footer');
    if (defaultFooter) {
      defaultFooter.style.display = 'none';
    }
    
    this.updateSectionPositions();
    
    window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    window.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    window.addEventListener('keydown', this.handleKeydown.bind(this));
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.scrollToSection(index));
    });
    
    this.updateDots();
  }

  /**
   * Update section positions
   */
  private updateSectionPositions() {
    this.sections.forEach((section, index) => {
      const offset = (index - this.currentSection) * 100;
      section.style.transform = `translateY(${offset}%)`;
      const isActive = index === this.currentSection;
      section.style.opacity = isActive ? '1' : '0';
      section.dataset.active = isActive ? 'true' : 'false';
    });
  }

  /**
   * Handle mouse wheel events for section navigation
   * Implements cooldown period to prevent rapid scrolling
   */
  private handleWheel(e: WheelEvent) {
    e.preventDefault();
    
    // Check if in cooldown period or animating
    const now = Date.now();
    if (this.isAnimating || (now - this.lastScrollTime) < this.scrollCooldown) {
      return;
    }

    // Determine scroll direction (deltaY > 0 = down, < 0 = up)
    // Minimum threshold to prevent accidental triggers
    if (Math.abs(e.deltaY) > 10) {
      if (e.deltaY > 0) {
        this.scrollDown();
      } else {
        this.scrollUp();
      }
      this.lastScrollTime = now;
    }
  }

  /**
   * Handle touch start event
   * Records initial touch position for swipe detection
   */
  private handleTouchStart(e: TouchEvent) {
    this.touchStartY = e.touches[0].clientY;
  }

  /**
   * Handle touch move event for swipe navigation
   * Implements cooldown and swipe threshold
   */
  private handleTouchMove(e: TouchEvent) {
    if (this.isAnimating) return;
    
    e.preventDefault();
    const touchEndY = e.touches[0].clientY;
    const diff = this.touchStartY - touchEndY;
    
    // Check cooldown time
    const now = Date.now();
    if ((now - this.lastScrollTime) < this.scrollCooldown) {
      return;
    }

    // Swipe threshold: 50 pixels
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.scrollDown();
      } else {
        this.scrollUp();
      }
      this.lastScrollTime = now;
    }
  }

  /**
   * Handle keyboard events for section navigation
   * Supports arrow keys, page up/down, home, and end
   */
  private handleKeydown(e: KeyboardEvent) {
    if (this.isAnimating) return;
    
    switch(e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        this.scrollDown();
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        this.scrollUp();
        break;
      case 'Home':
        e.preventDefault();
        this.scrollToSection(0);
        break;
      case 'End':
        e.preventDefault();
        this.scrollToSection(this.sections.length - 1);
        break;
    }
  }

  /**
   * Scroll down to next section
   */
  private scrollDown() {
    if (this.currentSection < this.sections.length - 1) {
      this.scrollToSection(this.currentSection + 1);
    }
  }

  /**
   * Scroll up to previous section
   */
  private scrollUp() {
    if (this.currentSection > 0) {
      this.scrollToSection(this.currentSection - 1);
    }
  }

  /**
   * Scroll to specific section by index
   * @param index - Target section index
   */
  private scrollToSection(index: number) {
    if (index < 0 || index >= this.sections.length || this.isAnimating || index === this.currentSection) {
      return;
    }
    
    this.isAnimating = true;
    this.currentSection = index;
    
    // Update all section positions
    this.updateSectionPositions();
    
    // Update indicators
    this.updateDots();
    
    // Unlock after 800ms (matches CSS transition duration)
    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
  }

  /**
   * Update pagination dot indicators
   */
  private updateDots() {
    this.dots.forEach((dot, index) => {
      if (index === this.currentSection) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  /**
   * Get current section index
   * @returns Current section index
   */
  public getCurrentSection(): number {
    return this.currentSection;
  }

  /**
   * Manually navigate to specific section (public method)
   * @param index - Target section index
   */
  public goToSection(index: number): void {
    this.scrollToSection(index);
  }
}

/**
 * Auto-initialize full-page scroll
 * @returns FullPageScroll instance or null if DOM not ready
 */
export function initFullPageScroll(): FullPageScroll | null {
  if (document.readyState === 'loading') {
    let instance: FullPageScroll | null = null;
    document.addEventListener('DOMContentLoaded', () => {
      instance = new FullPageScroll();
    });
    return instance;
  } else {
    return new FullPageScroll();
  }
}
