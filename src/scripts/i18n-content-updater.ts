/**
 * Client-side i18n Content Updater
 * Enables language switching without page refresh
 */

import { translations, defaultLang } from '../data/i18n.config';

type Language = 'en' | 'zh';
type TranslationKey = keyof typeof translations['en'];

/**
 * Get current language from localStorage
 */
export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return defaultLang;
  return (localStorage.getItem('language') as Language) || defaultLang;
}

/**
 * Get translation for a key
 */
export function t(key: TranslationKey, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  return translations[currentLang][key] || translations[defaultLang][key] || key;
}

/**
 * Update all elements with data-i18n attribute
 */
export function updatePageContent(lang: Language) {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach((element) => {
    const key = element.getAttribute('data-i18n') as TranslationKey;
    const attr = element.getAttribute('data-i18n-attr');
    
    if (key) {
      const translation = t(key, lang);
      
      if (attr) {
        element.setAttribute(attr, translation);
      } else if (element.hasAttribute('data-text')) {
        element.setAttribute('data-text', translation);
      } else {
        element.textContent = translation;
      }
    }
  });
  
  updatePageTitle(lang);
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
}

/**
 * Update page title based on current route
 */
function updatePageTitle(lang: Language) {
  const path = window.location.pathname;
  let titleKey: TranslationKey | null = null;
  
  if (path === '/' || path.startsWith('/home')) {
    titleKey = 'page.title.home';
  } else if (path.startsWith('/blog')) {
    titleKey = 'page.title.blog';
  } else if (path.startsWith('/archives')) {
    titleKey = 'page.title.archives';
  } else if (path.startsWith('/projects')) {
    titleKey = 'page.title.projects';
  } else if (path.startsWith('/links')) {
    titleKey = 'page.title.links';
  } else if (path.startsWith('/about')) {
    titleKey = 'page.title.about';
  }
  
  if (titleKey) {
    document.title = t(titleKey, lang);
  }
}

/**
 * Initialize i18n system
 */
export function initI18n() {
  const currentLang = getCurrentLanguage();
  updatePageContent(currentLang);
  
  window.addEventListener('languagechange', (event: Event) => {
    const customEvent = event as CustomEvent<{ lang: Language }>;
    updatePageContent(customEvent.detail.lang);
  });
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }
}
