<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import ValineComment from '../components/ValineComment.vue'
import { posts } from '../data/posts'
import MarkdownIt from 'markdown-it'
import { Calendar, Tag, ArrowLeft } from 'lucide-vue-next'

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
</script>

<template>
  <DefaultLayout>
    <div v-if="post" class="max-w-4xl mx-auto">
      <div class="mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6 glass-btn px-4 py-2 rounded-full">
          <ArrowLeft class="w-4 h-4" /> Back to Home
        </RouterLink>
      </div>

      <article class="glass-article rounded-3xl overflow-hidden p-8 sm:p-12">
        <!-- Header -->
        <header class="mb-8 text-center">
          <div class="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span class="flex items-center gap-1">
              <Calendar class="w-4 h-4" />
              {{ post.date }}
            </span>
            <span class="flex items-center gap-1">
              <Tag class="w-4 h-4" />
              {{ post.tags.join(', ') }}
            </span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            {{ post.title }}
          </h1>
          <img :src="post.cover" :alt="post.title" class="w-full h-64 sm:h-96 object-cover rounded-2xl shadow-lg mb-8" />
        </header>

        <!-- Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-a:text-blue-600 hover:prose-a:text-blue-500" v-html="renderedContent"></div>
      </article>

      <!-- Comments -->
      <ValineComment :path="route.path" />
    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold">Post not found</h2>
      <RouterLink to="/" class="text-blue-600 hover:underline mt-4 inline-block">Go Home</RouterLink>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.glass-article {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}

.glass-btn {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s;
}
.glass-btn:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: translateX(-2px);
}

@media (prefers-color-scheme: dark) {
  .glass-article {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }
  .glass-btn {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
  }
  .glass-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>
