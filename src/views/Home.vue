<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import PostCard from '../components/PostCard.vue'
import { posts } from '../data/posts'
import { ArrowRight, Sparkles, TrendingUp, Grid, List } from 'lucide-vue-next'
import { ref } from 'vue'

const viewMode = ref('grid') // 'grid' or 'list'

const featuredPost = posts[0]
const recentPosts = posts.slice(1)
</script>

<template>
  <DefaultLayout>
    <!-- Modern Hero Section -->
    <section class="relative mb-20 pt-10">
      <div class="glass-panel p-8 sm:p-12 rounded-3xl overflow-hidden relative">
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles class="w-3 h-3" />
              Featured Story
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight text-gray-900 dark:text-white">
              {{ featuredPost.title }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {{ featuredPost.excerpt }}
            </p>
            <RouterLink :to="`/post/${featuredPost.id}`" class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
              阅读更多 <ArrowRight class="w-4 h-4" />
            </RouterLink>
          </div>
          <div class="relative hidden lg:block">
            <div class="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
            <img :src="featuredPost.cover" class="relative rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 object-cover w-full h-80" alt="Featured">
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <!-- Left Column: Posts -->
      <div class="lg:col-span-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <TrendingUp class="w-6 h-6 text-blue-500" />
            最新文章
          </h2>
          <div class="flex gap-2 bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
            <button @click="viewMode = 'grid'" :class="{'bg-white dark:bg-gray-700 shadow-sm': viewMode === 'grid'}" class="p-2 rounded-md transition-all">
              <Grid class="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button @click="viewMode = 'list'" :class="{'bg-white dark:bg-gray-700 shadow-sm': viewMode === 'list'}" class="p-2 rounded-md transition-all">
              <List class="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'flex flex-col gap-8'">
          <PostCard v-for="post in recentPosts" :key="post.id" :post="post" />
          <!-- Duplicating posts for demo layout -->
          <PostCard v-for="post in recentPosts" :key="post.id + '_dup'" :post="post" />
        </div>
      </div>

      <!-- Right Column: Sidebar -->
      <aside class="lg:col-span-4 space-y-8">
        <!-- About Widget -->
        <div class="glass-panel p-6 rounded-2xl">
          <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">关于作者</h3>
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400"></div>
            <div>
              <div class="font-bold text-gray-900 dark:text-white">SXLight</div>
              <div class="text-xs text-gray-500">Full Stack Developer</div>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            热爱设计与代码的结合。探索 Vue 3, Tailwind 和现代前端技术。
          </p>
        </div>

        <!-- Tags Widget -->
        <div class="glass-panel p-6 rounded-2xl">
          <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">热门标签</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in ['Vue3', 'Design', 'Tailwind', 'CSS', 'JavaScript', 'Frontend']" :key="tag" class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors">
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Newsletter Widget -->
        <div class="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
          <h3 class="font-bold text-lg mb-2">订阅更新</h3>
          <p class="text-sm text-blue-100 mb-4">获取最新的设计趋势和技术文章。</p>
          <input type="email" placeholder="你的邮箱地址" class="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white mb-3" />
          <button class="w-full py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
            订阅
          </button>
        </div>
      </aside>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

@media (prefers-color-scheme: dark) {
  .glass-panel {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(255, 255, 255, 0.05);
  }
}

/* Force dark mode styles when class is present on html/body */
:global(.dark) .glass-panel {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255, 255, 255, 0.05);
}
</style>
