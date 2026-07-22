import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const failures = [];
const siteValue = process.env.SITE?.trim() ?? '';
const baseValue = process.env.BASE?.trim() || '/';

if (!siteValue) {
  failures.push('SITE is required for a production deployment.');
} else {
  try {
    const site = new URL(siteValue);
    if (site.protocol !== 'https:') failures.push('SITE must use https://.');
    if (site.pathname !== '/' || site.search || site.hash) {
      failures.push('SITE must be an origin without a path, query, or hash.');
    }
    if (site.hostname === 'example.com' || site.hostname.endsWith('.example.com')) {
      failures.push('SITE still points to example.com.');
    }
  } catch {
    failures.push('SITE is not a valid absolute URL.');
  }
}

if (baseValue !== '/') {
  failures.push('Only root-path deployment is supported; BASE must be /.');
}

const sourceContracts = [
  {
    file: 'src/app/config/user.config.ts',
    patterns: [
      ['Your Name', 'user name'],
      ['yourusername', 'GitHub/social username'],
      ['your.email@example.com', 'email address'],
    ],
  },
  {
    file: 'src/app/config/links.config.ts',
    patterns: [
      ['yourusername', 'links username'],
      ['your.email@example.com', 'links email address'],
      ['your-site.example.com', 'site link'],
    ],
  },
];

for (const contract of sourceContracts) {
  const body = await readFile(resolve(process.cwd(), contract.file), 'utf8');
  for (const [placeholder, label] of contract.patterns) {
    if (body.includes(placeholder)) {
      failures.push(`${contract.file} still contains the placeholder ${label}: ${placeholder}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Production configuration validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Production configuration is ready for ${siteValue} at root path /.`);
