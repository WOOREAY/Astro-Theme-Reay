import { PagefindUI } from '@pagefind/default-ui';

let searchInstance: PagefindUI | null = null;
let runtimeBound = false;

const translations = {
  zh: {
    placeholder: '搜索文章、项目与页面…',
    clear_search: '清除',
    load_more: '加载更多结果',
    search_label: '站内搜索',
    filters_label: '筛选',
    zero_results: '没有找到 [SEARCH_TERM] 的结果',
    many_results: '找到 [COUNT] 条结果',
    one_result: '找到 1 条结果',
    alt_search: '没有找到 [SEARCH_TERM]。显示 [DIFFERENT_TERM] 的结果',
    search_suggestion: '没有找到 [SEARCH_TERM]。可以尝试以下搜索：',
    searching: '正在搜索 [SEARCH_TERM]…',
  },
  en: {
    placeholder: 'Search posts, projects, and pages…',
    clear_search: 'Clear',
    load_more: 'Load more results',
    search_label: 'Site search',
    filters_label: 'Filters',
    zero_results: 'No results for [SEARCH_TERM]',
    many_results: '[COUNT] results found',
    one_result: '1 result found',
    alt_search: 'No results for [SEARCH_TERM]. Showing results for [DIFFERENT_TERM]',
    search_suggestion: 'No results for [SEARCH_TERM]. Try one of these searches:',
    searching: 'Searching for [SEARCH_TERM]…',
  },
};

function currentLanguage() {
  return document.documentElement.dataset.lang === 'en' ? 'en' : 'zh';
}

export function initSearch() {
  const host = document.querySelector<HTMLElement>('[data-pagefind-search]');
  if (!host) {
    searchInstance?.destroy();
    searchInstance = null;
    return;
  }

  searchInstance?.destroy();
  host.replaceChildren();

  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  searchInstance = new PagefindUI({
    element: host,
    bundlePath: `${base}pagefind/`,
    showImages: false,
    showSubResults: true,
    excerptLength: 24,
    autofocus: true,
    focusOnSlash: true,
    translations: translations[currentLanguage()],
  });

  const query = new URLSearchParams(window.location.search).get('q');
  if (query) searchInstance.triggerSearch(query);
}

export function initSearchRuntime() {
  initSearch();
  if (runtimeBound) return;

  runtimeBound = true;
  document.addEventListener('astro:before-swap', () => {
    searchInstance?.destroy();
    searchInstance = null;
  });
  document.addEventListener('astro:page-load', initSearch);
  window.addEventListener('languagechange', initSearch);
}
