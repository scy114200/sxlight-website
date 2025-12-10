export const posts = [
  {
    id: '1',
    title: 'Hello World - 液态玻璃设计的开始',
    excerpt: '欢迎来到我的新博客。这篇文章将探讨液态玻璃（Liquid Glass）设计美学的实现之旅。',
    date: '2025-12-10',
    cover: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop',
    tags: ['设计', 'Vue3', 'Tailwind'],
    content: `
# Hello World

欢迎来到我的新博客！这个网站是使用 **Vue 3**、**Vite** 和 **Tailwind CSS** 构建的。

## 设计哲学

我希望创造一种既有机又现代的感觉。**液态玻璃（Liquid Glass）**效果主要通过以下方式实现：

- \`backdrop-filter: blur()\`（背景模糊）
- 半透明背景
- 微妙的边框和阴影

\`\`\`css
.glass-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
\`\`\`

敬请期待更多更新！
    `
  },
  {
    id: '2',
    title: '探索 Vue 3 Composition API',
    excerpt: '为什么在这个项目中选择 Vue 3？Composition API 如何让代码组织变得轻而易举。',
    date: '2025-12-08',
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    tags: ['Vue3', '编程'],
    content: `
# Vue 3 Composition API

Composition API 是一个游戏规则改变者。它允许我们将逻辑关注点组合在一起。

## 为什么要使用它？

1. **更好的 TypeScript 支持**
2. **复用性**（通过 composables）
3. **组织性**（按功能而非选项类型组织代码）

## 示例

\`\`\`javascript
import { ref, onMounted } from 'vue'

export function usePosts() {
  const posts = ref([])
  
  onMounted(async () => {
    posts.value = await fetchPosts()
  })
  
  return { posts }
}
\`\`\`
    `
  },
  {
    id: '3',
    title: 'Tailwind CSS v4 的魅力',
    excerpt: 'Tailwind v4 带来了更简化的配置和更好的性能。这是我的使用体验。',
    date: '2025-12-05',
    cover: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop',
    tags: ['Tailwind', 'CSS'],
    content: `
# Tailwind CSS v4

它更快、更轻量，配置也更容易。

## 主要变化

- 几乎不再需要 \`tailwind.config.js\`
- 原生 CSS 变量支持
- 默认启用的即时编译（Just-in-Time）引擎

它与 **Vite** 生态系统完美契合。
    `
  }
]
