#!/bin/bash

# 卡片系统迁移脚本
# 批量替换所有组件中的自定义卡片样式为统一的卡片类

echo "🔧 开始迁移卡片系统..."
echo ""

# 备份计数器
MIGRATED=0

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 函数: 显示进度
show_progress() {
  echo -e "${YELLOW}[进行中]${NC} $1"
}

show_success() {
  echo -e "${GREEN}[完成]${NC} $1"
  ((MIGRATED++))
}

show_error() {
  echo -e "${RED}[错误]${NC} $1"
}

# ===== 1. 替换常见的背景样式 =====
show_progress "替换 background: var(--md-sys-color-surface-container) 样式..."

find src -name "*.astro" -type f -exec sed -i '' \
  's/background: var(--md-sys-color-surface-container);/\/\* Migrated to unified card system - see cards.css \*\//g' {} \;

show_success "背景样式替换完成"

# ===== 2. 替换边框样式 =====
show_progress "替换 border: 1px solid 样式..."

find src -name "*.astro" -type f -exec sed -i '' \
  's/border: 1px solid var(--md-sys-color-outline-variant);/\/\* Migrated to unified card system - see cards.css \*\//g' {} \;

show_success "边框样式替换完成"

# ===== 3. 替换 backdrop-filter =====
show_progress "替换 backdrop-filter 样式..."

find src -name "*.astro" -type f -exec sed -i '' \
  's/backdrop-filter: blur(.*);//g' {} \;

find src -name "*.astro" -type f -exec sed -i '' \
  's/-webkit-backdrop-filter: blur(.*);//g' {} \;

show_success "backdrop-filter 替换完成"

# ===== 4. 添加注释标记需要手动检查的文件 =====
show_progress "扫描需要手动迁移的组件..."

# 查找所有包含自定义卡片样式的文件
FILES_TO_REVIEW=$(grep -rl "background.*var(--md-sys-color" src/ --include="*.astro" || true)

if [ -n "$FILES_TO_REVIEW" ]; then
  echo ""
  echo -e "${YELLOW}⚠️  以下文件需要手动检查和迁移:${NC}"
  echo "$FILES_TO_REVIEW" | while read -r file; do
    echo "  - $file"
  done
  echo ""
fi

# ===== 5. 生成迁移报告 =====
show_progress "生成迁移报告..."

REPORT_FILE="tmp/MIGRATION-REPORT-$(date +%Y%m%d-%H%M%S).md"

cat > "$REPORT_FILE" << EOF
# 卡片系统迁移报告

生成时间: $(date '+%Y-%m-%d %H:%M:%S')

## 📊 统计信息

- 自动替换操作: $MIGRATED 项
- 需要手动检查的文件: $(echo "$FILES_TO_REVIEW" | wc -l | tr -d ' ') 个

## 📝 需要手动迁移的文件清单

$(echo "$FILES_TO_REVIEW" | while read -r file; do
  if [ -n "$file" ]; then
    echo "### \`$file\`"
    echo ""
    echo "\`\`\`astro"
    grep -A 3 "background.*var(--md-sys-color" "$file" 2>/dev/null || echo "（已迁移或无匹配内容）"
    echo "\`\`\`"
    echo ""
  fi
done)

## 🎯 迁移建议

根据组件用途选择合适的卡片类:

| 组件类型 | 推荐类名 | 说明 |
|---------|---------|------|
| 普通内容容器 | \`.card\` | 标准卡片,适合大多数场景 |
| 可点击/链接项 | \`.card-interactive\` | 带hover效果的交互卡片 |
| 统计数据 | \`.card-stat\` | 紧凑型统计卡片 |
| 重要/特色内容 | \`.card-highlight\` | 渐变背景高亮卡片 |
| 辅助信息 | \`.card-minimal\` | 极简设计卡片 |

## ✅ 下一步操作

1. 检查上述文件清单中的每个组件
2. 根据组件用途选择合适的卡片类
3. 删除冗余的内联样式和 <style> 块
4. 测试 Light/Dark 主题切换
5. 验证响应式布局
6. 提交代码

EOF

show_success "迁移报告已生成: $REPORT_FILE"

# ===== 完成 =====
echo ""
echo -e "${GREEN}✨ 自动迁移完成!${NC}"
echo ""
echo "📋 总结:"
echo "  - 已完成 $MIGRATED 项自动替换"
echo "  - 迁移报告: $REPORT_FILE"
echo ""
echo "⚠️  请注意:"
echo "  1. 自动迁移只处理了基础样式"
echo "  2. 请手动检查报告中列出的文件"
echo "  3. 为每个组件添加适当的卡片类名"
echo "  4. 删除被注释的旧样式代码"
echo "  5. 测试所有页面的显示效果"
echo ""
echo "🚀 开始手动迁移: 查看 $REPORT_FILE"
echo ""
