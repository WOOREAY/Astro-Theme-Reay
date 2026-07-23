type Cleanup = () => void;

export function initArchiveExplorer(): Cleanup {
  const root = document.querySelector<HTMLElement>('[data-archive-explorer]');
  if (!root) return () => {};

  const controller = new AbortController();
  const options = { signal: controller.signal };
  const filters = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-archive-filter]'));
  const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-archive-row]'));
  const years = Array.from(root.querySelectorAll<HTMLElement>('[data-archive-year]'));
  const yearLinks = Array.from(root.querySelectorAll<HTMLElement>('[data-archive-year-link]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-archive-topic-panel]'));
  const topicButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-archive-topic]'));
  const empty = root.querySelector<HTMLElement>('[data-archive-empty]');
  let activeKind = 'all';
  let activeTopic = '';

  const apply = () => {
    let visibleCount = 0;

    rows.forEach((row) => {
      const matchesKind = activeKind === 'all' || row.dataset.archiveKind === activeKind;
      const topics = JSON.parse(row.dataset.archiveTopics ?? '[]') as string[];
      const matchesTopic = !activeTopic || topics.includes(activeTopic);
      row.hidden = !(matchesKind && matchesTopic);
      if (!row.hidden) visibleCount += 1;
    });

    years.forEach((year) => {
      const visibleRows = Array.from(year.querySelectorAll<HTMLElement>('[data-archive-row]'))
        .filter((row) => !row.hidden);
      year.hidden = visibleRows.length === 0;
      const count = year.querySelector<HTMLElement>('[data-year-count]');
      if (count) count.textContent = String(visibleRows.length);
    });

    yearLinks.forEach((link) => {
      const year = link.dataset.archiveYearLink;
      link.hidden = !years.some((section) => section.dataset.archiveYear === year && !section.hidden);
    });

    filters.forEach((filter) => {
      const selected = filter.dataset.archiveFilter === activeKind;
      filter.classList.toggle('is-active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    panels.forEach((panel) => { panel.hidden = panel.dataset.archiveTopicPanel !== activeKind; });
    topicButtons.forEach((button) => {
      const selected = button.dataset.archiveTopic === activeTopic;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (empty) empty.hidden = visibleCount > 0;
  };

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      activeKind = filter.dataset.archiveFilter ?? 'all';
      activeTopic = '';
      apply();
    }, options);
  });

  topicButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const topic = button.dataset.archiveTopic ?? '';
      activeTopic = activeTopic === topic ? '' : topic;
      apply();
    }, options);
  });

  apply();
  return () => controller.abort();
}
