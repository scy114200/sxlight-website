<script setup>
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import ValineComment from '../components/ValineComment.vue'
import { posts } from '../data/posts'
import MarkdownIt from 'markdown-it'
import { Calendar, Tag, ArrowLeft, Clock, Share2, Bookmark } from 'lucide-vue-next'

const route = useRoute()
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const post = computed(() => {
  return posts.find(p => p.id === route.params.id)
})

const renderedContent = computed(() => {
  return post.value ? md.render(post.value.content) : ''
})

// TOC generation (Mock)
const toc = [
  { id: 'design', text: '设计哲学' },
  { id: 'tech', text: '技术实现' },
  { id: 'future', text: '未来展望' }
]
</script>

<template>
  <DefaultLayout>
    <div v-if="post" class="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
      
      <!-- Left Sidebar (Actions) -->
      <aside class="hidden lg:flex lg:col-span-1 flex-col gap-6 sticky top-24 h-fit">
        <button class="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:text-blue-600 transition-colors">
          <Share2 class="w-5 h-5" />
        </button>
        <button class="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:text-blue-600 transition-colors">
          <Bookmark class="w-5 h-5" />
        </button>
      </aside>

      <!-- Main Content -->
      <article class="lg:col-span-8">
        <!-- Breadcrumb & Back -->
        <div class="mb-8 flex items-center justify-between">
          <RouterLink to="/" class="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft class="w-4 h-4" /> 返回首页
          </RouterLink>
          <div class="text-xs font-mono text-gray-400">POST #{{ post.id }}</div>
        </div>

        <!-- Article Header -->
        <header class="mb-10">
          <div class="flex flex-wrap gap-3 mb-6">
            <span v-for="tag in post.tags" :key="tag" class="px-3 py-1 text-xs font-bold rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              #{{ tag }}
            </span>
          </div>
          
          <h1 class="text-3xl sm:text-5xl font-black mb-6 text-gray-900 dark:text-white leading-tight">
            {{ post.title }}
          </h1>

          <div class="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-8">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400"></div>
              <span class="font-bold text-gray-900 dark:text-white">SXLight</span>
            </div>
            <span class="flex items-center gap-1">
              <Calendar class="w-4 h-4" />
              {{ post.date }}
            </span>
            <span class="flex items-center gap-1">
              <Clock class="w-4 h-4" />
              5 min read
            </span>
          </div>
        </header>

        <!-- Featured Image -->
        <div class="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <img :src="post.cover" :alt="post.title" class="w-full h-auto object-cover" />
        </div>

        <!-- Markdown Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-2xl" v-html="renderedContent"></div>

        <!-- Author Bio Box -->
        <div class="mt-16 p-8 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-start gap-6">
          <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex-shrink-0"></div>
          <div>
            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">关于作者</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              全栈开发者，热爱探索新技术。专注于 Vue 生态系统和现代前端工程化。希望能通过这个博客分享我的学习历程。
            </p>
          </div>
        </div>

        <!-- Comments -->
        <ValineComment :path="route.path" />
      </article>

      <!-- Right Sidebar (TOC) -->
      <aside class="hidden lg:block lg:col-span-3">
        <div class="sticky top-24">
          <div class="bg-white/50 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 class="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">目录</h3>
            <ul class="space-y-3 text-sm">
              <li v-for="item in toc" :key="item.id">
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block border-l-2 border-transparent hover:border-blue-500 pl-3">
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold">文章未找到</h2>
      <RouterLink to="/" class="text-blue-600 hover:underline mt-4 inline-block">返回首页</RouterLink>
    </div>
  </DefaultLayout>
</template>

<style scoped>
/* Typography customization handled in global styles or Tailwind Typography config */
</style>
