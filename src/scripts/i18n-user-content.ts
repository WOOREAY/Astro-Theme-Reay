/**
 * User Content i18n Handler
 * Manages bilingual user-configurable content (bio, description, etc.)
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
  
  // Update description (for typewriter effect via data-text)
  const descriptionElement = document.querySelector('[data-user-content="description"]');
  if (descriptionElement && content.description) {
    if (descriptionElement.hasAttribute('data-text')) {
      descriptionElement.setAttribute('data-text', content.description);
    } else {
      descriptionElement.textContent = content.description;
    }
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
