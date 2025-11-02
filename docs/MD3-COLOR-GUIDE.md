# Material Design 3 颜色使用指南

本项目已遵循 Material Design 3 (MD3) 颜色系统规范。所有颜色变量使用标准的 `--md-sys-color-*` 命名。

## 📋 可用的颜色 Token

### Primary（主色）
用于：主要操作按钮、活跃导航、关键图标、链接

```css
--md-sys-color-primary              /* 主色 */
--md-sys-color-on-primary           /* 主色上的文本/图标（确保对比度） */
--md-sys-color-primary-container    /* 主色容器背景 */
--md-sys-color-on-primary-container /* 容器上的文本 */
```

**使用示例**：
```html
<!-- 主按钮 -->
<button class="bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]">
  提交
</button>

<!-- 活跃链接 -->
<a class="text-[var(--md-sys-color-primary)]">文档</a>
```

---

### Secondary（次色）
用于：次要操作、辅助信息、标签

```css
--md-sys-color-secondary
--md-sys-color-on-secondary
--md-sys-color-secondary-container
--md-sys-color-on-secondary-container
```

**使用示例**：
```html
<!-- 次要按钮 -->
<button class="bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]">
  取消
</button>
```

---

### Tertiary（第三色）
用于：强调、对比元素

```css
--md-sys-color-tertiary
--md-sys-color-on-tertiary
--md-sys-color-tertiary-container
--md-sys-color-on-tertiary-container
```

---

### Surface & Background（表面与背景）
用于：卡片、容器、页面背景

```css
--md-sys-color-background           /* 页面背景 */
--md-sys-color-on-background        /* 背景上的文本 */
--md-sys-color-surface              /* 卡片/容器表面 */
--md-sys-color-on-surface           /* 表面上的文本 */
--md-sys-color-surface-variant      /* 次级表面（略有差异） */
--md-sys-color-on-surface-variant   /* 次级表面上的文本（通常用于次要文本） */
```

**使用示例**：
```html
<!-- 卡片 -->
<div class="bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)] p-4 rounded-lg">
  <h2>标题</h2>
  <p class="text-[var(--md-sys-color-on-surface-variant)]">次要文本</p>
</div>

<!-- 页面背景已在 BaseLayout.astro 中设置 -->
```

---

### Outline（边框）
用于：分隔线、边框、描边

```css
--md-sys-color-outline
```

**使用示例**：
```html
<hr class="border-[var(--md-sys-color-outline)]" />
<input class="border border-[var(--md-sys-color-outline)]" />
```

---

### Error（错误）
用于：错误提示、警告

```css
--md-sys-color-error
--md-sys-color-on-error
```

**使用示例**：
```html
<div class="bg-[var(--md-sys-color-error)] text-[var(--md-sys-color-on-error)] p-3 rounded">
  操作失败，请重试
</div>
```

---

### 扩展颜色（非 MD3 标准，项目自定义）
```css
--md-ref-palette-success  /* 成功绿 */
--md-ref-palette-warning  /* 警告橙 */
--md-ref-palette-info     /* 信息蓝 */
```

---

## 🎨 常见场景使用

### 1. 导航栏
```html
<header class="bg-[var(--md-sys-color-surface)] border-b border-[var(--md-sys-color-outline)]">
  <a class="text-[var(--md-sys-color-primary)]">Logo</a>
  <nav class="text-[var(--md-sys-color-on-surface-variant)]">
    <a class="hover:text-[var(--md-sys-color-primary)]">菜单</a>
  </nav>
</header>
```

### 2. 按钮
```html
<!-- 主按钮（Filled） -->
<button class="bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]">
  主操作
</button>

<!-- 次按钮（Filled Tonal） -->
<button class="bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]">
  次操作
</button>

<!-- 边框按钮（Outlined） -->
<button class="border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-primary)]">
  取消
</button>

<!-- 文字按钮（Text） -->
<button class="text-[var(--md-sys-color-primary)]">
  了解更多
</button>
```

### 3. 卡片
```html
<article class="bg-[var(--md-sys-color-surface)] rounded-lg p-6">
  <h3 class="text-[var(--md-sys-color-on-surface)] text-xl font-bold">标题</h3>
  <p class="text-[var(--md-sys-color-on-surface-variant)] mt-2">描述文本</p>
  <div class="mt-4 border-t border-[var(--md-sys-color-outline)] pt-4">
    <button class="text-[var(--md-sys-color-primary)]">阅读更多</button>
  </div>
</article>
```

### 4. 表单
```html
<input 
  class="border border-[var(--md-sys-color-outline)] 
         bg-[var(--md-sys-color-surface)] 
         text-[var(--md-sys-color-on-surface)]
         focus:border-[var(--md-sys-color-primary)]"
  placeholder="输入内容"
/>
```

---

## 🌓 暗色模式

颜色会根据 `data-theme` 属性自动切换：

- `data-theme="light"`: 强制亮色
- `data-theme="dark"`: 强制暗色
- 无属性: 跟随系统 `prefers-color-scheme`

切换逻辑已在 `src/scripts/theme-toggle.ts` 实现。

---

## ⚠️ 注意事项

### ❌ 不要使用硬编码颜色
```html
<!-- 错误 -->
<div class="text-gray-600 bg-blue-500">...</div>
```

### ✅ 使用 MD3 颜色 Token
```html
<!-- 正确 -->
<div class="text-[var(--md-sys-color-on-surface-variant)] bg-[var(--md-sys-color-primary)]">...</div>
```

### 对比度规则
始终使用配对的颜色以确保无障碍：
- `primary` 配 `on-primary`
- `surface` 配 `on-surface`
- `background` 配 `on-background`

### 语义优先
根据**用途**而非**颜色**选择 token：
- 主操作 → `primary`
- 次要文本 → `on-surface-variant`
- 分隔线 → `outline`

---

## 🔧 自定义主色

编辑 `src/data/theme.config.ts`：

```typescript
export const themeConfig = {
  primary: '#00B4D8',  // 修改这里即可自动生成完整调色板
  // ...
};
```

系统会自动生成所有相关颜色（secondary、tertiary、surface 等）及明暗两套方案。

---

## 📚 参考资源

- [Material Design 3 - Color System](https://m3.material.io/styles/color/system/overview)
- [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/)
- [@material/material-color-utilities](https://www.npmjs.com/package/@material/material-color-utilities)
