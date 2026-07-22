# Known Gaps and Closure Conditions

本文件记录已由源码确认、但尚未形成一致实现或可信文档合同的问题。它不是路线图承诺；修改相关代码或文档时，应关闭、拆分或更新对应条目。

本轮已关闭：`published/draft` 生产可见性不一致、缺失自定义 404、非根 `BASE` 决策、deploy 门禁差异、远程 README 未净化、宽泛且无消费者的 feature flags、项目配置消费者缺失，以及默认媒体引用缺失。对应实现现由 route/security/E2E/production checks 覆盖。

## 发布与文档

### 真实 GitHub Pages 部署尚未验收

- 现状：deploy workflow 已从仓库变量读取 `SITE`、固定 `BASE=/`，并运行 production check、完整 verify 和 audit；本地以 `SITE=https://wooreay.github.io` 验证通过，但本轮没有读取一次真实 Pages run 和线上产物。
- 影响：无法仅凭 workflow 源码证明仓库变量已配置、Pages 环境授权正确，或线上 canonical/RSS/robots/Sitemap 与预期完全一致。
- 来源：`.github/workflows/deploy.yml`、`scripts/check-production-config.mjs`、GitHub Pages 仓库设置。
- 关闭条件：一次 main/manual Pages run 成功，并核对部署后的首页 HTML、404、RSS、robots、Sitemap 和 canonical 均使用 `https://wooreay.github.io`。

### 旧版使用文档仍有环境变量漂移

- 现状：主 README、`.env.example` 和 llmdoc 已统一到 Node 22、`SITE` 与根路径部署；部分 `docs/` 仍使用不受支持的 `SITE_URL`、项目子路径 `BASE` 或旧工作流片段。
- 影响：绕过主入口直接阅读旧文档时，可能配置无效变量或尝试不受支持的项目子路径部署。
- 来源：`docs/INSTALLATION.md`、`docs/DEPLOYMENT.md`、`docs/GITHUB-ACTIONS.md`、`docs/DEPLOYMENT-CHECKLIST.md`、`docs/QUICK-START.md`。
- 关闭条件：逐篇核对并统一旧 docs 的环境变量、根路径合同、命令和 workflow 示例；增加文档命令/链接检查，防止再次漂移。

## 外部内容、安全与隐私

### 评论 provider 合同仍不完整

- 现状：comments 默认关闭，启用后默认要求访客显式点击才加载；但各 provider 的完整 CSP origin、自托管责任、隐私数据流、精确版本和第三方 teardown/theme/language update 合同尚未统一。
- 影响：站点所有者启用 provider 后仍需自行判断供应链、地区访问、Cookie、隐私和销毁行为。
- 来源：`src/app/config/comments.config.ts`、`src/features/comments/client/comments-runtime.ts`、`src/features/comments/client/providers.ts`。
- 关闭条件：为每个 provider 记录公开配置、网络 origin、固定版本、隐私/CSP 和 teardown/update 能力，并完成至少一个真实 provider 与拒绝加载路径测试。

### 缺少第三方许可证、服务条款和资产来源审计

- 现状：项目自身为 Apache-2.0，但没有依赖许可证清单、复制代码/图片/字体/图标来源记录、SaaS 条款清单或完整 NOTICE 评估。
- 影响：不能据项目 LICENSE 推断所有依赖、远程服务和媒体都采用同一许可证。
- 来源：`LICENSE`、`package.json`、`public/`、`src/assets/`、外部集成代码。
- 关闭条件：完成可复核的依赖与资产 provenance/许可证盘点，补齐所需署名或 NOTICE，并为评论、GitHub 与 CDN 服务记录适用条款和隐私责任。

## 客户端生命周期与验证

### 部分第三方和增强脚本生命周期仍需专项证明

- 现状：Music、Gallery、Search、Comments、Timeline 已有 cleanup/destroy 或幂等保护；核心 ClientRouter、Gallery 和移动菜单已有 Playwright/Chrome 证据。文章与 README 增强仍依赖 DOM marker，评论 provider adapter 没有统一第三方 teardown。
- 影响：未覆盖的第三方 provider 或长时间多页面交换仍可能产生重复副作用或陈旧引用。
- 来源：`src/shared/client/`、`src/features/*/client/`、文章/README enhancement scripts、`reference/client-lifecycle-contract.md`。
- 关闭条件：为剩余 runtime 明确 owner、初始化幂等性和 disposer；对真实评论 provider 与文章/README 连续前进、后退、多次交换运行专项浏览器/heap 测试。

### 自动化测试仍不是全站与真实集成证明

- 现状：`verify` 已覆盖类型/内容、完整构建、16 个产物、性能预算、发布可见性、恶意 README、核心浏览器流程和三个页面的 Axe WCAG A/AA；仍没有 HTTP 全站 link crawl、visual regression、人工无障碍、真实评论 provider 或线上部署测试。
- 影响：现有门禁不证明全部动态路由、视觉像素、真实第三方服务和线上托管行为正确。
- 来源：`package.json`、`scripts/`、`tests/e2e/core.spec.ts`、`.github/workflows/`。
- 关闭条件：按风险补充全站 link crawl、关键 viewport visual baseline、键盘/屏幕阅读器人工清单、至少一个 live provider 测试，以及真实 Pages 部署验收。
