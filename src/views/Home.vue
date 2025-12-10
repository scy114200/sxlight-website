<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import PostCard from '../components/PostCard.vue'
import { ArrowRight, Sparkles, TrendingUp, Grid, List } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
const avatarSrc = '/avatars/avatar.png'
const fallbackAvatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAOcb+h8AAAAASUVORK5CYII='
const onAvatarError = (e) => { e.target.src = fallbackAvatar }

const viewMode = ref('grid') // 'grid' or 'list'

const posts = ref([])
const featuredPost = ref(null)
const recentPosts = ref([])

async function loadManifest() {
  try {
    const res = await fetch('/posts/index.json')
    if (!res.ok) return
    const data = await res.json()
    posts.value = Array.isArray(data) ? data : []
    featuredPost.value = posts.value[0] || null
    recentPosts.value = posts.value.slice(0, 4)
  } catch {}
}

onMounted(loadManifest)
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
              精选文章
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight text-primary">
              {{ featuredPost && featuredPost.title }}
            </h1>
            <p class="text-lg text-secondary mb-8 leading-relaxed">
              {{ featuredPost && featuredPost.excerpt }}
            </p>
            <RouterLink v-if="featuredPost" :to="`/post/${featuredPost.id}`" class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
              阅读更多 <ArrowRight class="w-4 h-4" />
            </RouterLink>
          </div>
          <div class="relative hidden lg:block">
            <div class="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-30 animate-smooth-glow"></div>
            <img v-if="featuredPost" :src="featuredPost.cover" loading="eager" decoding="async" fetchpriority="high" class="relative rounded-2xl shadow-2xl transition-transform duration-500 object-cover w-full h-80 will-change-transform hover:scale-[1.02]" alt="Featured">
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Grid -->
    <div class="flex flex-col lg:flex-row gap-12">
      <!-- Left Column: Posts -->
      <div class="w-full lg:w-2/3 xl:w-3/4">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold flex items-center gap-2 text-primary">
            <TrendingUp class="w-6 h-6 text-blue-500" />
            最新文章
          </h2>
          <div class="relative flex gap-2 bg-gray-100 dark:bg-white/5 p-1 rounded-lg isolate">
            <!-- Animated Background Pill -->
            <div 
              class="absolute top-1 bottom-1 rounded-md bg-white dark:bg-gray-700 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              :class="viewMode === 'grid' ? 'left-1 w-[calc(50%-4px)]' : 'left-[calc(50%+4px)] w-[calc(50%-8px)]'"
            ></div>
            
            <button 
              @click="viewMode = 'grid'" 
              class="relative z-10 p-2 rounded-md transition-colors w-10 flex justify-center items-center"
              :class="viewMode === 'grid' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
            >
              <Grid class="w-4 h-4" />
            </button>
            <button 
              @click="viewMode = 'list'" 
              class="relative z-10 p-2 rounded-md transition-colors w-10 flex justify-center items-center"
              :class="viewMode === 'list' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
            >
              <List class="w-4 h-4" />
            </button>
          </div>
        </div>

        <Transition name="layout-switch" mode="out-in">
          <div 
            :key="viewMode"
            :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'flex flex-col gap-8'"
          >
            <div v-for="post in recentPosts" :key="post.id" class="post-item" v-reveal>
              <PostCard :post="post" :layout="viewMode" />
            </div>
            <div v-if="recentPosts.length === 0" class="text-secondary">暂无文章，请在 public/posts 下添加并更新 index.json</div>
          </div>
        </Transition>
      </div>

      <!-- Right Column: Sidebar -->
      <aside class="w-full lg:w-1/3 xl:w-1/4 space-y-8 self-start">
        <!-- About Widget -->
        <div class="glass-panel p-6 rounded-2xl">
          <h3 class="font-bold text-lg mb-4 text-primary">关于作者</h3>
          <div class="flex items-center gap-4 mb-4">
            <img :src="avatarSrc" @error="onAvatarError" class="w-12 h-12 rounded-full object-cover" alt="avatar" />
            <div>
              <div class="font-bold text-primary">SXLight</div>
              <div class="text-xs text-secondary">全栈开发者</div>
            </div>
          </div>
          <p class="text-sm text-secondary leading-relaxed">
            热爱设计与代码的结合。探索 Vue 3, Tailwind 和现代前端技术。
          </p>
        </div>

        <!-- Tags Widget -->
        <div class="glass-panel p-6 rounded-2xl">
          <h3 class="font-bold text-lg mb-4 text-primary">热门标签</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in ['Vue3', 'Design', 'Tailwind', 'CSS', 'JavaScript', 'Frontend']" :key="tag" class="glass-chip px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors">
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Recent Comments Widget (Replaced Newsletter) -->
        <div class="glass-panel p-6 rounded-2xl">
          <h3 class="font-bold text-lg mb-4 text-primary">最新评论</h3>
          <ul class="space-y-4">
            <li class="flex gap-3 text-sm">
              <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-primary">Alice</div>
                <p class="text-secondary line-clamp-2 mt-1">这篇文章写得太棒了，对我的学习很有帮助！</p>
              </div>
            </li>
            <li class="flex gap-3 text-sm">
              <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
              <div>
                <div class="font-medium text-primary">Bob</div>
                <p class="text-secondary line-clamp-2 mt-1">期待更多关于 Vue 3 的教程。</p>
              </div>
            </li>
          </ul>
          <button class="w-full mt-6 py-2 border border-gray-200 dark:border-gray-700 text-secondary font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm">
            留下评论
          </button>
        </div>
      </aside>
    </div>
  </DefaultLayout>
</template>

<style scoped>
/* Layout Switch Transition (Cross-fade + Scale) */
.layout-switch-enter-active,
.layout-switch-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.layout-switch-enter-from,
.layout-switch-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

@keyframes smooth-glow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.02);
  }
}

.animate-smooth-glow {
  animation: smooth-glow 4s ease-in-out infinite;
}
</style>
