/**
 * GitHub API Utilities
 * Fetch repository information and README content
 * 
 * Performance optimizations:
 * - Dual-layer caching (memory + disk)
 * - Parallel requests
 * - ETag conditional requests
 * - Request deduplication
 */
import { user } from '../data/user.config';
import { githubCache } from './github-cache';

interface GitHubRepo {
  owner: string;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  isArchived: boolean;
  isFork: boolean;
  license: string | null;
}

interface GitHubReadme {
  content: string;
  encoding: string;
}

const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = user.github.token || import.meta.env.GITHUB_TOKEN;

const pendingRequests = new Map<string, Promise<any>>();

const getHeaders = (etag?: string) => {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }
  if (etag) {
    headers['If-None-Match'] = etag;
  }
  return headers;
};

/**
 * Get single repository information with caching
 */
export async function getGitHubRepo(owner: string, repo: string): Promise<GitHubRepo | null> {
  const cacheKey = `repo:${owner}/${repo}`;

  const cached = githubCache.get<GitHubRepo>(cacheKey);
  if (cached) {
    console.log(`✅ Cache hit: ${owner}/${repo}`);
    return cached;
  }

  if (pendingRequests.has(cacheKey)) {
    console.log(`⏳ Reusing pending request: ${owner}/${repo}`);
    return pendingRequests.get(cacheKey);
  }

  const requestPromise = (async () => {
    try {
      const etag = githubCache.getETag(cacheKey);
      const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
        headers: getHeaders(etag),
      });

      // Use cache if not modified
      if (response.status === 304 && cached) {
        console.log(`✅ 304 Not Modified: ${owner}/${repo}`);
        return cached;
      }

      if (!response.ok) {
        console.error(`❌ Failed to fetch repo ${owner}/${repo}: ${response.status}`);
        return null;
      }

      const data = await response.json();
      const newEtag = response.headers.get('etag') || undefined;

      const repoData: GitHubRepo = {
        owner: data.owner.login,
        name: data.name,
        description: data.description,
        url: data.html_url,
        homepage: data.homepage,
        stars: data.stargazers_count,
        forks: data.forks_count,
        language: data.language,
        topics: data.topics || [],
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        pushedAt: data.pushed_at,
        isArchived: data.archived,
        isFork: data.fork,
        license: data.license?.spdx_id || null,
      };

      // Write to cache
      githubCache.set(cacheKey, repoData, newEtag);
      console.log(`💾 Cached: ${owner}/${repo}`);

      return repoData;
    } catch (error) {
      console.error(`❌ Error fetching repo ${owner}/${repo}:`, error);
      return null;
    } finally {
      pendingRequests.delete(cacheKey);
    }
  })();

  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
}

/**
 * Get all public repositories for a user with caching
 * 
 * @param username - GitHub username
 * @returns Array of repository information
 * 
 * @remarks
 * Fetches all public repositories with pagination support (100 per page)
 * Results are cached and concurrent requests are deduplicated
 */
export async function getUserRepos(username: string): Promise<GitHubRepo[]> {
  const cacheKey = `user-repos:${username}`;

  // Check cache first
  const cached = githubCache.get<GitHubRepo[]>(cacheKey);
  if (cached) {
    console.log(`✅ Cache hit: user repos for ${username}`);
    return cached;
  }

  // Deduplicate concurrent requests
  if (pendingRequests.has(cacheKey)) {
    console.log(`⏳ Reusing pending request: user repos for ${username}`);
    return pendingRequests.get(cacheKey);
  }

  // Make new request
  const requestPromise = (async () => {
    try {
      const repos: GitHubRepo[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const etag = githubCache.getETag(`${cacheKey}:page${page}`);
        const response = await fetch(
          `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100&page=${page}`,
          {
            headers: getHeaders(etag),
          }
        );

        if (!response.ok) {
          console.error(`❌ Failed to fetch repos for ${username}: ${response.status}`);
          break;
        }

        const data = await response.json();
        
        if (data.length === 0) {
          hasMore = false;
        } else {
          repos.push(...data.map((repo: any) => ({
            owner: repo.owner.login,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            homepage: repo.homepage,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            topics: repo.topics || [],
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
            isArchived: repo.archived,
            isFork: repo.fork,
            license: repo.license?.spdx_id || null,
          })));
          page++;
        }
      }

      // Write to cache
      githubCache.set(cacheKey, repos);
      console.log(`💾 Cached: ${repos.length} repos for ${username}`);

      return repos;
    } catch (error) {
      console.error(`❌ Error fetching repos for ${username}:`, error);
      return [];
    } finally {
      pendingRequests.delete(cacheKey);
    }
  })();

  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
}

/**
 * Get repository README content with caching
 * 
 * @param owner - Repository owner username
 * @param repo - Repository name
 * @returns README content as UTF-8 string, or null if not found
 * 
 * @remarks
 * GitHub API returns base64-encoded content which is automatically decoded
 * Supports ETag-based conditional requests to minimize API calls
 */
export async function getRepoReadme(owner: string, repo: string): Promise<string | null> {
  const cacheKey = `readme:${owner}/${repo}`;

  // Check cache first
  const cached = githubCache.get<string>(cacheKey);
  if (cached) {
    console.log(`✅ Cache hit: README for ${owner}/${repo}`);
    return cached;
  }

  // Deduplicate concurrent requests
  if (pendingRequests.has(cacheKey)) {
    console.log(`⏳ Reusing pending request: README for ${owner}/${repo}`);
    return pendingRequests.get(cacheKey);
  }

  // Make new request
  const requestPromise = (async () => {
    try {
      const etag = githubCache.getETag(cacheKey);
      const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/readme`, {
        headers: getHeaders(etag),
      });

      // Use cache if not modified
      if (response.status === 304 && cached) {
        console.log(`✅ 304 Not Modified: README for ${owner}/${repo}`);
        return cached;
      }

      if (!response.ok) {
        console.error(`❌ Failed to fetch README for ${owner}/${repo}: ${response.status}`);
        return null;
      }

      const data: GitHubReadme = await response.json();
      const newEtag = response.headers.get('etag') || undefined;

      // GitHub API returns base64-encoded content - decode to UTF-8
      let content = '';
      if (data.encoding === 'base64') {
        // Use Buffer for proper UTF-8 decoding
        const base64Content = data.content.replace(/\n/g, '');
        content = Buffer.from(base64Content, 'base64').toString('utf-8');
      } else {
        content = data.content;
      }

      // Write to cache
      githubCache.set(cacheKey, content, newEtag);
      console.log(`💾 Cached: README for ${owner}/${repo}`);

      return content;
    } catch (error) {
      console.error(`❌ Error fetching README for ${owner}/${repo}:`, error);
      return null;
    } finally {
      pendingRequests.delete(cacheKey);
    }
  })();

  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
}

/**
 * Format large numbers to compact representation
 * 
 * @param num - Number to format
 * @returns Formatted string (e.g., 1234 -> "1.2k")
 * 
 * @example
 * ```ts
 * formatNumber(1234)  // "1.2k"
 * formatNumber(999)   // "999"
 * formatNumber(5678)  // "5.7k"
 * ```
 */
export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

/**
 * Format date to relative time string (Chinese)
 * 
 * @param dateString - ISO date string to format
 * @returns Relative time string in Chinese (e.g., "3 天前", "2 个月前")
 * 
 * @remarks
 * Calculates time difference and returns human-readable format:
 * - 0 days: "今天"
 * - 1 day: "昨天"
 * - < 7 days: "X 天前"
 * - < 30 days: "X 周前"
 * - < 365 days: "X 个月前"
 * - >= 365 days: "X 年前"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return '今天';
  } else if (diffDays === 1) {
    return '昨天';
  } else if (diffDays < 7) {
    return `${diffDays} 天前`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} 周前`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} 个月前`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} 年前`;
  }
}

/**
 * Get color for programming language
 * 
 * @param language - Programming language name (case-sensitive)
 * @returns Hex color code
 * 
 * @remarks
 * Returns predefined colors for common languages, defaults to #8b949e for unknown languages
 * Color scheme follows GitHub's language colors
 */
export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Swift': '#ffac45',
    'Kotlin': '#A97BFF',
    'Dart': '#00B4AB',
    'Vue': '#41b883',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
  };
  return language ? colors[language] || '#8b949e' : '#8b949e';
}
