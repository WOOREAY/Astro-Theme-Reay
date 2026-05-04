# 部署前检查清单

在推送代码触发自动部署前，请确认以下配置已完成。

## ✅ 必需配置

### 1. Astro 配置 (`astro.config.mjs`)

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/repository-name', // 如果是仓库项目页面
  // 如果是用户/组织页面 (username.github.io)，设置 base: '/'
})
```

**检查项：**
- [ ] `site` 设置正确
- [ ] `base` 路径正确（与仓库名一致）
- [ ] 如果是主页面 (username.github.io)，`base` 为 `/`

### 2. GitHub Pages 设置

1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择 "GitHub Actions"
3. 保存设置

**检查项：**
- [ ] Pages 已启用
- [ ] Source 设为 "GitHub Actions"

### 3. 仓库权限

Settings → Actions → General → Workflow permissions

**检查项：**
- [ ] 选择 "Read and write permissions"
- [ ] 勾选 "Allow GitHub Actions to create and approve pull requests"

### 4. Package.json 脚本

确保有必要的构建脚本：

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

**检查项：**
- [ ] `build` 脚本存在
- [ ] `check` 脚本存在

## 🔧 可选配置

### 5. GitHub Token (可选但推荐)

如果使用 GitHub API 获取仓库信息：

1. 创建 Token: https://github.com/settings/tokens
2. 权限: `public_repo` (只读)
3. 添加到项目（二选一）：
   - **方案 A**: 仓库 Secrets（推荐）
     - Settings → Secrets and variables → Actions
     - 添加 `GITHUB_TOKEN`（也可以使用 GitHub Actions 自动提供的 token）
   - **方案 B**: 本地环境变量
     - 创建 `.env` 文件
     - 添加 `GITHUB_TOKEN=your_token`

**检查项：**
- [ ] Token 已创建
- [ ] Token 已添加到 Secrets 或 .env

### 6. 环境变量

复制 `.env.example` 到 `.env` 并填写：

```bash
cp .env.example .env
```

编辑 `.env`:
```env
GITHUB_TOKEN=<your-github-token>
SITE=https://yourusername.github.io
BASE=/repository-name
```

**检查项：**
- [ ] `.env` 文件已创建
- [ ] 环境变量已填写
- [ ] `.env` 在 `.gitignore` 中（不要提交）

### 7. 用户配置

编辑 `src/data/user.config.ts`:

```typescript
export const user = {
  name: '你的名字',
  avatar: '/avatar.jpg',
  location: '你的城市',
  github: {
    username: 'yourusername',
    token: '',
  },
}
```

**检查项：**
- [ ] 个人信息已更新
- [ ] 头像已添加到 `public/`
- [ ] 社交链接已配置

## 🧪 本地测试

### 8. 构建测试

在推送前本地测试构建：

```bash
# 安装依赖
npm install

# 类型检查
npm run check

# 构建
npm run build

# 预览构建结果
npm run preview
```

访问 `http://localhost:4321` 检查：

**检查项：**
- [ ] 构建成功无错误
- [ ] 页面正常显示
- [ ] 链接正常工作
- [ ] 图片正常加载
- [ ] 样式正确应用

### 9. 路径测试

如果设置了 `base`，确保所有资源路径正确：

```astro
<!-- ✅ 正确 -->
<img src={`${import.meta.env.BASE_URL}images/photo.jpg`} />
<a href={`${import.meta.env.BASE_URL}blog`}>Blog</a>

<!-- ❌ 错误 -->
<img src="/images/photo.jpg" />
<a href="/blog">Blog</a>
```

**检查项：**
- [ ] 导航链接包含 base 路径
- [ ] 静态资源路径正确
- [ ] 内部链接正常工作

## 📝 工作流验证

### 10. 工作流文件

检查 `.github/workflows/deploy.yml`:

**检查项：**
- [ ] 文件存在且格式正确
- [ ] Node 版本正确 (20)
- [ ] 构建命令正确 (`npm run build`)
- [ ] 输出目录正确 (`./dist`)

### 11. 分支配置

确认触发分支正确：

```yaml
on:
  push:
    branches: [main]  # 或 master
```

**检查项：**
- [ ] 分支名称与仓库默认分支一致
- [ ] 使用 `main` 还是 `master`

## 🚀 部署流程

### 12. 首次部署

```bash
# 1. 提交所有更改
git add .
git commit -m "Configure GitHub Actions deployment"

# 2. 推送到 GitHub
git push origin main

# 3. 查看 Actions 运行
# 访问: https://github.com/username/repository/actions
```

**检查项：**
- [ ] 代码已推送
- [ ] Actions 工作流已触发
- [ ] 构建步骤全部成功
- [ ] 部署步骤成功

### 13. 验证部署

构建成功后：

1. 访问你的站点 URL
2. 检查所有页面
3. 测试导航和链接
4. 验证图片和资源

**检查项：**
- [ ] 站点可以访问
- [ ] 首页正常显示
- [ ] 博客文章可以打开
- [ ] 项目页面正常
- [ ] 样式和交互正常

## 🐛 故障排除

### 构建失败

查看 Actions 日志:
1. 进入 Actions 标签
2. 点击失败的工作流
3. 查看错误信息

**常见问题：**

**问题 1: 找不到模块**
```bash
# 解决：确保所有依赖都在 package.json 中
npm install
```

**问题 2: 类型错误**
```bash
# 解决：修复 TypeScript 错误
npm run check
```

**问题 3: 构建错误**
```bash
# 解决：本地测试构建
npm run build
```

### 部署后 404

**原因：** `base` 配置不正确

**解决方案：**
```javascript
// astro.config.mjs
export default defineConfig({
  base: '/your-repo-name', // 确保与仓库名完全一致
})
```

### 资源加载失败

**原因：** 资源路径没有包含 base

**解决方案：**
```astro
---
const baseUrl = import.meta.env.BASE_URL
---
<img src={`${baseUrl}images/photo.jpg`} />
```

### 权限错误

**错误信息：** "Resource not accessible by integration"

**解决方案：**
1. Settings → Actions → General
2. Workflow permissions → "Read and write permissions"
3. 保存并重新运行工作流

## 📋 快速检查清单

部署前快速检查：

```bash
# 1. 依赖安装
✓ npm install

# 2. 类型检查
✓ npm run check

# 3. 本地构建
✓ npm run build

# 4. 预览测试
✓ npm run preview

# 5. 配置确认
✓ astro.config.mjs (site, base)
✓ user.config.ts (个人信息)
✓ .github/workflows/deploy.yml (工作流)
✓ GitHub Pages 设置 (已启用)
✓ Actions 权限 (读写)

# 6. 提交推送
✓ git add .
✓ git commit -m "message"
✓ git push origin main

# 7. 验证部署
✓ Actions 运行成功
✓ 站点可访问
✓ 功能正常
```

## 🎯 部署成功标准

- ✅ GitHub Actions 工作流全部成功
- ✅ 站点可以通过 URL 访问
- ✅ 所有页面正常显示
- ✅ 导航和链接工作正常
- ✅ 图片和资源加载正常
- ✅ 样式和主题正确应用
- ✅ 移动端显示正常
- ✅ 无控制台错误

## 💡 最佳实践

1. **先本地测试** - 推送前确保本地构建成功
2. **分支保护** - 考虑设置 PR 审查
3. **环境分离** - 使用不同分支部署不同环境
4. **监控日志** - 定期检查 Actions 运行日志
5. **备份配置** - 保存重要配置的副本

## 📚 相关文档

- [GitHub Actions 指南](./GITHUB-ACTIONS.md)
- [部署指南](./DEPLOYMENT.md)
- [用户配置](./USER-CONFIG.md)
- [故障排除](./FAQ.md)

---

准备好了吗？开始部署吧！🚀
