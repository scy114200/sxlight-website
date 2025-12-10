<script setup>
import { Calendar, Tag } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="`/post/${post.id}`" class="block group">
    <article class="glass-card h-full rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
      <!-- Cover Image -->
      <div class="relative h-48 overflow-hidden">
        <img :src="post.cover" :alt="post.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <!-- Content -->
      <div class="p-6">
        <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span class="flex items-center gap-1">
            <Calendar class="w-3 h-3" />
            {{ post.date }}
          </span>
          <span class="flex items-center gap-1">
            <Tag class="w-3 h-3" />
            {{ post.tags.join(', ') }}
          </span>
        </div>
        
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {{ post.title }}
        </h2>
        
        <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {{ post.excerpt }}
        </p>
      </div>
    </article>
  </RouterLink>
</template>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

@media (prefers-color-scheme: dark) {
  .glass-card {
    background: rgba(30, 41, 59, 0.4);
    border-color: rgba(255, 255, 255, 0.05);
  }
}
</style>
