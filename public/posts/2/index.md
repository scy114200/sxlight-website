---
title: 探索 Vue 3 Composition API
date: 2025-12-08
tags: [Vue3, 编程]
cover: ./cover.svg
reading_time: 5
---

# Vue 3 Composition API

Composition API 让我们可以将相关逻辑聚合在一起，提升复用与可维护性。

## 示例代码

```js
import { ref, onMounted } from 'vue'

export function usePosts() {
  const posts = ref([])
  onMounted(async () => {
    posts.value = await fetch('/api/posts').then(r => r.json())
  })
  return { posts }
}
```

## 图片示例

![示例封面](./cover.svg)

> 这是一个演示用的占位封面图片（SVG）。

