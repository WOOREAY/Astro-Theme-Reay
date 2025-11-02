# GitHub Actions 自动部署指南

本项目已配置多个 GitHub Actions 工作流，支持自动部署到不同平台。

## 📋 可用的工作流

### 1. GitHub Pages 部署 (`deploy.yml`)
自动部署到 GitHub Pages。

### 2. Vercel 部署 (`deploy-vercel.yml`)
自动部署到 Vercel。

### 3. Netlify 部署 (`deploy-netlify.yml`)
自动部署到 Netlify。

### 4. CI/CD 流水线 (`ci.yml`)
代码质量检查、类型检查和构建测试。

## 🚀 快速开始

### 选择一个工作流

根据你的部署目标，**只保留一个部署工作流**，删除或禁用其他：

```bash
# 保留 GitHub Pages
rm .github/workflows/deploy-vercel.yml
rm .github/workflows/deploy-netlify.yml

# 或保留 Vercel
rm .github/workflows/deploy.yml
rm .github/workflows/deploy-netlify.yml

# 或保留 Netlify
rm .github/workflows/deploy.yml
rm .github/workflows/deploy-vercel.yml
```

## 📝 详细配置

### 方案 1: GitHub Pages (推荐，免费)

#### 1. 检查 Astro 配置

编辑 `astro.config.mjs`：

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/repository-name', // 如果是仓库项目页面
  // 如果是用户/组织页面，注释掉 base
})
```

#### 2. 启用 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择 "GitHub Actions"
3. 保存

#### 3. 推送代码

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

#### 4. 查看部署

- 进入 **Actions** 标签查看工作流运行
- 部署成功后，访问 `https://yourusername.github.io/repository-name`

#### 故障排除

**问题：404 错误**
```javascript
// astro.config.mjs
export default defineConfig({
  base: '/your-repo-name', // 确保正确
})
```

**问题：权限错误**
- Settings → Actions → General
- Workflow permissions → 选择 "Read and write permissions"
- 勾选 "Allow GitHub Actions to create and approve pull requests"

---

### 方案 2: Vercel

#### 1. 获取 Vercel Token

1. 访问 [Vercel Dashboard](https://vercel.com/account/tokens)
2. 创建新 Token
3. 复制 Token

#### 2. 添加 GitHub Secrets

在仓库 Settings → Secrets and variables → Actions:

- `VERCEL_TOKEN`: 你的 Vercel Token
- `VERCEL_ORG_ID`: 在 Vercel 项目设置中找到
- `VERCEL_PROJECT_ID`: 在 Vercel 项目设置中找到

#### 3. Vercel 项目配置

在 Vercel 项目根目录创建 `vercel.json`（可选）：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

#### 4. 推送部署

```bash
git push origin main
```

#### 优点
- 自动 HTTPS
- 全球 CDN
- 预览部署（PR）
- 零配置

---

### 方案 3: Netlify

#### 1. 获取 Netlify Token

1. 访问 [Netlify Personal Access Tokens](https://app.netlify.com/user/applications#personal-access-tokens)
2. 创建新 Token
3. 复制 Token

#### 2. 获取 Site ID

1. 在 Netlify 创建新站点（可以是空站点）
2. 进入 Site settings
3. 复制 Site ID

#### 3. 添加 GitHub Secrets

在仓库 Settings → Secrets and variables → Actions:

- `NETLIFY_AUTH_TOKEN`: 你的 Netlify Token
- `NETLIFY_SITE_ID`: 你的 Site ID

#### 4. Netlify 配置文件

创建 `netlify.toml`：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

#### 5. 推送部署

```bash
git push origin main
```

---

## 🔧 进阶配置

### 环境变量

如果你的项目需要环境变量（如 GitHub Token）：

#### GitHub Actions Secrets

在 Settings → Secrets and variables → Actions 添加：

```
GITHUB_TOKEN (GitHub 自动提供)
PUBLIC_GA_ID (如果使用 Google Analytics)
其他自定义环境变量
```

#### 在工作流中使用

```yaml
- name: Build
  run: npm run build
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    PUBLIC_GA_ID: ${{ secrets.PUBLIC_GA_ID }}
```

### 分支策略

#### 仅主分支部署

```yaml
on:
  push:
    branches: [main]
```

#### 多分支部署

```yaml
on:
  push:
    branches: [main, develop]
```

#### PR 预览

```yaml
on:
  pull_request:
    branches: [main]
```

### 缓存优化

加速构建时间：

```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'  # 启用 npm 缓存

- name: Cache Astro build
  uses: actions/cache@v4
  with:
    path: |
      .astro
      node_modules/.astro
    key: ${{ runner.os }}-astro-${{ hashFiles('**/package-lock.json') }}
```

### 定时构建

每天自动重新构建（适用于动态内容）：

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 00:00
```

### 通知

#### Slack 通知

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Deployment completed!'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

#### Discord 通知

```yaml
- name: Discord notification
  uses: Ilshidur/action-discord@master
  env:
    DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK }}
  with:
    args: 'The project {{ EVENT_PAYLOAD.repository.full_name }} has been deployed.'
```

## 📊 监控部署

### 查看工作流状态

1. 进入仓库的 **Actions** 标签
2. 点击具体的工作流运行
3. 查看每个步骤的日志

### 添加状态徽章

在 `README.md` 中添加：

```markdown
![Deploy Status](https://github.com/username/repo/actions/workflows/deploy.yml/badge.svg)
```

## 🐛 常见问题

### 构建失败

**检查日志：**
1. Actions → 失败的工作流
2. 查看具体步骤的错误信息

**常见原因：**
- Node 版本不匹配
- 依赖安装失败
- 环境变量缺失
- 构建命令错误

**解决方案：**
```yaml
# 确保 Node 版本正确
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # 与本地一致
```

### 权限错误

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### 部署后 404

检查 `astro.config.mjs` 中的 `base` 配置。

### GitHub Token 过期

GitHub Actions 自动提供 `GITHUB_TOKEN`，无需手动设置。

如需自定义 Token：
1. Settings → Developer settings → Personal access tokens
2. 创建 Token
3. 添加到 Repository Secrets

## 💡 最佳实践

### 1. 使用 CI 工作流

保留 `ci.yml` 进行代码质量检查：

```yaml
# PR 触发检查
on:
  pull_request:
    branches: [main]
```

### 2. 分离环境

```yaml
# 生产环境
deploy-production.yml (main 分支)

# 预览环境
deploy-preview.yml (PR)

# 开发环境
deploy-staging.yml (develop 分支)
```

### 3. 版本标签

```yaml
on:
  push:
    tags:
      - 'v*'
```

### 4. 安全扫描

```yaml
- name: Run security audit
  run: npm audit --audit-level=high
```

## 📚 相关资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Astro 部署指南](https://docs.astro.build/en/guides/deploy/)
- [Vercel 部署文档](https://vercel.com/docs)
- [Netlify 部署文档](https://docs.netlify.com/)

## 🎯 推荐配置

**个人博客（免费）：**
- ✅ GitHub Pages + `deploy.yml`
- ✅ CI 检查 `ci.yml`

**商业项目：**
- ✅ Vercel + `deploy-vercel.yml`
- ✅ CI 检查 `ci.yml`

**大型项目：**
- ✅ 自定义 CI/CD
- ✅ 多环境部署
- ✅ 自动化测试

---

选择适合你的配置，开始自动化部署吧！🚀
