<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import PostCard from '../components/PostCard.vue'
import { posts } from '../data/posts'
</script>

<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <section class="mb-16 text-center">
      <div class="glass-hero inline-block rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto">
        <h1 class="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
          欢迎来到 SXLight
        </h1>
        <p class="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed">
          透过液态玻璃的视角，探索设计与技术的边界。
        </p>
      </div>
    </section>

    <!-- Posts Grid -->
    <section>
      <h2 class="text-2xl font-bold mb-8 px-2 text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4">
        最新文章
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.glass-hero {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

@media (prefers-color-scheme: dark) {
  .glass-hero {
    background: rgba(30, 41, 59, 0.3);
    border-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
