export const posts = [
  {
    id: '1',
    title: 'Hello World - The Beginning of Liquid Glass',
    excerpt: 'Welcome to my new blog designed with a unique Liquid Glass aesthetic. This post explores the journey of creating this design system.',
    date: '2025-12-10',
    cover: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop',
    tags: ['Design', 'Vue3', 'Tailwind'],
    content: `
# Hello World

Welcome to my new blog! This site is built with **Vue 3**, **Vite**, and **Tailwind CSS**.

## The Design Philosophy

I wanted to create something that feels organic yet modern. The **Liquid Glass** effect is achieved using:

- \`backdrop-filter: blur()\`
- Translucent backgrounds
- Subtle borders and shadows

\`\`\`css
.glass-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
\`\`\`

Stay tuned for more updates!
    `
  },
  {
    id: '2',
    title: 'Exploring Vue 3 Composition API',
    excerpt: 'Why I chose Vue 3 for this project and how Composition API makes code organization a breeze.',
    date: '2025-12-08',
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    tags: ['Vue3', 'Coding'],
    content: `
# Vue 3 Composition API

The Composition API is a game changer. It allows us to group logical concerns together.

## Why use it?

1. **Better TypeScript support**
2. **Reusability** via composables
3. **Organization** by feature, not option type

## Example

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
    title: 'The Beauty of Tailwind CSS v4',
    excerpt: 'Tailwind v4 brings a simplified configuration and better performance. Here is my experience.',
    date: '2025-12-05',
    cover: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop',
    tags: ['Tailwind', 'CSS'],
    content: `
# Tailwind CSS v4

It's faster, lighter, and easier to configure.

## Key Changes

- No more \`tailwind.config.js\` (mostly)
- Native CSS variables
- Just-in-Time engine by default

It fits perfectly with the **Vite** ecosystem.
    `
  }
]
