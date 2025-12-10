<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <div class="max-w-3xl mx-auto">
      <div class="glass-panel p-12 rounded-3xl text-center">
        <h1 class="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">关于 SXLight</h1>
        
        <div class="prose prose-lg dark:prose-invert mx-auto">
          <p>
            欢迎来到 SXLight。本网站是对现代网页设计的一次探索，专注于
            <strong>液态玻璃 (Liquid Glass / Glassmorphism)</strong> 美学风格。
          </p>
          <p>
            构建技术栈：
          </p>
          <ul class="list-none p-0 flex justify-center gap-4 flex-wrap">
            <li class="glass-chip px-4 py-2 rounded-full">Vue 3</li>
            <li class="glass-chip px-4 py-2 rounded-full">Vite</li>
            <li class="glass-chip px-4 py-2 rounded-full">Tailwind CSS</li>
          </ul>
          <p class="mt-8">
            托管于 GitHub Pages & Cloudflare.
          </p>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
</style>
