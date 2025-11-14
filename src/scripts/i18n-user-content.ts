/**
 * User Content i18n Handler
 * Manages bilingual user-configurable content (bio, tagline, etc.)
 */

import type { Language } from '../data/i18n.config';
import { userContent } from '../data/user.config';

/**
 * Update user content based on language
 */
export function updateUserContent(lang: Language) {
  const content = userContent[lang];
  
  // Update bio content
  const bioElement = document.querySelector('[data-user-content="bio"]');
  if (bioElement && content.bio) {
    bioElement.textContent = content.bio;
  }
  
  // Update tagline (for typewriter effect via data-text)
  const taglineElement = document.querySelector('[data-user-content="tagline"]');
  if (taglineElement && content.tagline) {
    if (taglineElement.hasAttribute('data-text')) {
      taglineElement.setAttribute('data-text', content.tagline);
    } else {
      taglineElement.textContent = content.tagline;
    }
  }
  
  // Update greeting
  const greetingElement = document.querySelector('[data-user-content="greeting"]');
  if (greetingElement && content.greeting) {
    greetingElement.textContent = content.greeting;
  }
}

/**
 * Initialize user content i18n system
 */
export function initUserContentI18n() {
  window.addEventListener('languagechange', (event: Event) => {
    const customEvent = event as CustomEvent<{ lang: Language }>;
    if (customEvent.detail?.lang) {
      updateUserContent(customEvent.detail.lang);
    }
  });
  
  const currentLang = (localStorage.getItem('language') || 'en') as Language;
  updateUserContent(currentLang);
}
