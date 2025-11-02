/**
 * links-animation.ts
 * Enhanced animation effects for link cards
 * Provides scroll-triggered fade-in animations with stagger effect
 */

export class LinksAnimation {
  private cards: NodeListOf<HTMLElement>;
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.cards = document.querySelectorAll('.link-card');
    this.init();
  }

  /**
   * Initialize animations
   */
  private init() {
    // Setup intersection observer for scroll-triggered animations
    this.setupIntersectionObserver();
    
    // Add stagger delays to create cascading animation effect
    this.setupStaggerAnimation();
  }

  /**
   * Setup intersection observer for viewport detection
   */
  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of element is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Stop observing once animation is triggered
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all cards
    this.cards.forEach((card) => {
      this.observer?.observe(card);
    });
  }

  /**
   * Setup staggered animation delays for cards
   */
  private setupStaggerAnimation() {
    this.cards.forEach((card, index) => {
      // Set different delay for each card to create stagger effect
      (card as HTMLElement).style.setProperty('--animation-delay', `${index * 50}ms`);
    });
  }

  /**
   * Cleanup observer and resources
   */
  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

/**
 * Auto-initialize links animation
 * @returns LinksAnimation instance or null if DOM not ready
 */
export function initLinksAnimation(): LinksAnimation | null {
  if (document.readyState === 'loading') {
    let instance: LinksAnimation | null = null;
    document.addEventListener('DOMContentLoaded', () => {
      instance = new LinksAnimation();
    });
    return instance;
  } else {
    return new LinksAnimation();
  }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  // Cleanup work if needed
});
