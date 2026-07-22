import { commentProviderLoaders } from './providers';
import type { CommentClientConfig } from './types';

type Cleanup = () => void;

const sectionCleanups = new Map<HTMLElement, Cleanup>();
let runtimeBound = false;

function clearHost(host: HTMLElement) {
  host.replaceChildren();
}

function parseConfig(node: HTMLScriptElement): CommentClientConfig | null {
  try {
    const config = JSON.parse(node.textContent || '{}') as CommentClientConfig;
    return config.provider in commentProviderLoaders ? config : null;
  } catch (error) {
    console.error('[comments] Invalid client configuration:', error);
    return null;
  }
}

function initCommentSection(root: HTMLElement) {
  if (sectionCleanups.has(root)) return;

  const host = root.querySelector<HTMLElement>('[data-comment-host]');
  const button = root.querySelector<HTMLButtonElement>('[data-comment-load]');
  const configNode = root.querySelector<HTMLScriptElement>('[data-comment-config]');
  if (!host || !button || !configNode) return;

  const config = parseConfig(configNode);
  if (!config) return;

  const controller = new AbortController();
  let observer: IntersectionObserver | null = null;
  let providerCleanup: Cleanup | null = null;
  let loaded = false;

  const cleanup = () => {
    controller.abort();
    observer?.disconnect();
    observer = null;
    providerCleanup?.();
    providerCleanup = null;
    clearHost(host);
    root.classList.remove('is-loading', 'is-loaded', 'is-error');
    button.hidden = false;
    sectionCleanups.delete(root);
  };
  sectionCleanups.set(root, cleanup);

  const loadComments = async () => {
    if (loaded) return;

    loaded = true;
    root.classList.remove('is-error');
    root.classList.add('is-loading');
    button.hidden = true;
    clearHost(host);

    try {
      const providerDisposer = await commentProviderLoaders[config.provider](host, config);
      if (controller.signal.aborted) {
        providerDisposer?.();
        return;
      }
      providerCleanup = providerDisposer ?? null;
      root.classList.remove('is-loading');
      root.classList.add('is-loaded');
    } catch (error) {
      loaded = false;
      button.hidden = false;
      root.classList.remove('is-loading');
      root.classList.add('is-error');
      host.textContent = '评论加载失败，请稍后重试。';
      console.error(`[comments] ${config.provider} failed to load:`, error);
    }
  };

  button.addEventListener('click', loadComments, { signal: controller.signal });

  if (!config.autoLoad) return;

  if (!config.lazy || !('IntersectionObserver' in window)) {
    void loadComments();
    return;
  }

  observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer?.disconnect();
      void loadComments();
    }
  }, { rootMargin: '280px 0px' });

  observer.observe(root);
}

export function initCommentSections() {
  document
    .querySelectorAll<HTMLElement>('[data-comment-section][data-ready="true"]')
    .forEach(initCommentSection);
}

export function cleanupCommentSections() {
  [...sectionCleanups.values()].forEach((cleanup) => cleanup());
  sectionCleanups.clear();
}

export function initCommentsRuntime() {
  initCommentSections();
  if (runtimeBound) return;

  runtimeBound = true;
  document.addEventListener('astro:before-swap', cleanupCommentSections);
  document.addEventListener('astro:page-load', initCommentSections);
}
