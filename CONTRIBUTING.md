# Contributing to Astro Theme Reay

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🌟 Ways to Contribute

### Bug Reports
- Check if the issue already exists
- Use the bug report template
- Provide clear reproduction steps
- Include environment details

### Feature Requests
- Search for existing requests
- Describe the use case
- Explain the expected behavior
- Consider implementation impact

### Code Contributions
- Fix bugs
- Implement features
- Improve documentation
- Optimize performance

### Documentation
- Fix typos and errors
- Improve clarity
- Add examples
- Translate content

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/Astro-Theme-Reay.git
cd Astro-Theme-Reay
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `style/` - Code style changes
- `test/` - Test additions/changes

### 4. Make Changes

Follow the code style and conventions below.

### 5. Test Your Changes

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Linting
npm run lint
```

### 6. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve issue with..."
git commit -m "docs: update installation guide"
git commit -m "refactor: improve theme system"
```

Commit types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code restructuring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 7. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📝 Code Style

### TypeScript

```typescript
// ✅ Good
interface User {
  name: string
  email: string
}

function getUserName(user: User): string {
  return user.name
}

// ❌ Avoid
function GetUserName(user) {
  return user.name
}
```

**Guidelines:**
- Use TypeScript for all new code
- Define interfaces for complex types
- Use type imports: `import type { ... }`
- Avoid `any` type
- Use meaningful variable names

### Astro Components

```astro
---
// ✅ Good structure
import type { CollectionEntry } from 'astro:content'

interface Props {
  post: CollectionEntry<'blog'>
  featured?: boolean
}

const { post, featured = false } = Astro.props
---

<article class:list={['post', { featured }]}>
  <h2>{post.data.title}</h2>
  <p>{post.data.description}</p>
</article>

<style>
  .post {
    padding: 1rem;
  }
  
  .featured {
    border: 2px solid var(--color-primary);
  }
</style>
```

**Guidelines:**
- Define Props interface
- Use destructuring with defaults
- Keep logic in frontmatter
- Use scoped styles
- Add comments for complex logic

### CSS/Styles

```css
/* ✅ Good */
.component {
  display: flex;
  gap: 1rem;
  padding: var(--spacing-md);
}

.component__title {
  font-size: var(--font-size-lg);
  color: var(--color-on-surface);
}

/* ❌ Avoid */
.component {
  display: flex;
  gap: 16px;
  padding: 24px;
}
```

**Guidelines:**
- Use CSS custom properties
- Use BEM naming or semantic names
- Avoid magic numbers
- Mobile-first responsive design
- Leverage UnoCSS utilities where appropriate

### File Organization

```
src/
├── components/
│   ├── feature/          # Group by feature
│   │   ├── Component.astro
│   │   └── SubComponent.astro
│   └── common/           # Shared components
├── layouts/
├── pages/
└── utils/
```

**Guidelines:**
- Group related files
- Use index files for exports
- Keep components focused (single responsibility)
- Shared utilities in `utils/`

## 🧪 Testing

### Manual Testing

Test your changes on:
- Desktop browsers (Chrome, Firefox, Safari)
- Mobile devices (iOS, Android)
- Different screen sizes
- Light and dark modes

### Checklist

- [ ] Code builds without errors
- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] Works on mobile
- [ ] Works in light/dark mode
- [ ] Follows code style
- [ ] Documentation updated
- [ ] No breaking changes (or documented)

## 📋 Pull Request Guidelines

### PR Title

Follow conventional commits format:

```
feat: add dark mode toggle to header
fix: resolve mobile navigation overflow
docs: update installation guide
```

### PR Description

Include:
1. **What** - What does this PR do?
2. **Why** - Why is this change needed?
3. **How** - How does it work?
4. **Testing** - How to test?
5. **Screenshots** - For UI changes

Template:
```markdown
## Description
Brief description of changes.

## Motivation
Why this change is needed.

## Changes
- Change 1
- Change 2

## Testing
Steps to test the changes.

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex parts
- [ ] Updated documentation
- [ ] No breaking changes
```

### Review Process

1. Automated checks run
2. Maintainer reviews code
3. Address feedback
4. Approval and merge

## 🎨 Design Guidelines

### Material Design 3

Follow MD3 principles:
- Use theme colors from palette
- Follow elevation system
- Use consistent spacing
- Implement proper touch targets (48px minimum)

### Accessibility

- Semantic HTML
- Proper ARIA labels
- Keyboard navigation
- Color contrast (WCAG AA)
- Alt text for images
- Focus indicators

### Responsive Design

Mobile-first breakpoints:
```css
/* Mobile: default */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large desktop */
@media (min-width: 1440px) { }
```

## 📚 Documentation

### Code Comments

```typescript
/**
 * Fetches user repositories from GitHub API
 * 
 * @param username - GitHub username
 * @param token - Optional GitHub token for higher rate limits
 * @returns Array of repository objects
 * @throws Error if fetch fails
 */
async function getUserRepos(username: string, token?: string): Promise<Repository[]> {
  // Implementation
}
```

**When to comment:**
- Public APIs
- Complex algorithms
- Non-obvious code
- Workarounds
- TODOs

**When not to comment:**
- Self-explanatory code
- Obvious operations

### Documentation Files

When adding features, update:
- Relevant `.md` files in `docs/`
- README.md if major feature
- Add examples
- Update API reference

## 🐛 Bug Reports

### Good Bug Report

```markdown
## Description
Clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll to '...'
4. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- OS: macOS 14.0
- Browser: Chrome 120
- Node: 20.10.0
- Theme Version: 1.0.0

## Screenshots
[If applicable]

## Additional Context
Any other relevant information.
```

## 💡 Feature Requests

### Good Feature Request

```markdown
## Feature Description
Clear description of the feature.

## Use Case
Why is this feature needed?
Who would benefit?

## Proposed Solution
How could this be implemented?

## Alternatives Considered
Other ways to solve this.

## Additional Context
Examples, mockups, references.
```

## ⚠️ Breaking Changes

If your change breaks existing functionality:

1. **Document it clearly** in PR
2. **Provide migration guide**
3. **Update CHANGELOG**
4. **Bump version** appropriately

## 🔒 Security

Report security issues privately:
- **DO NOT** open public issues
- Email maintainer directly
- Provide details and impact

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Mentioned in relevant documentation

## 💬 Communication

- **GitHub Issues** - Bug reports and features
- **GitHub Discussions** - Questions and ideas
- **Pull Requests** - Code contributions

## 🎯 Priorities

Current focus areas:
1. Performance optimization
2. Accessibility improvements
3. Documentation enhancements
4. Mobile experience
5. TypeScript type safety

## ❓ Questions?

- Check [FAQ](./docs/FAQ.md)
- Search existing issues
- Ask in GitHub Discussions
- Contact maintainers

## 📚 Resources

- [Astro Documentation](https://docs.astro.build/)
- [Material Design 3](https://m3.material.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)

Thank you for contributing! 🎉
