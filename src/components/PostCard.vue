<script setup>
import { defineProps } from 'vue'
import { Calendar, Tag, Clock, ArrowRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="`/post/${post.id}`" class="block group h-full">
    <article class="modern-card h-full flex flex-col overflow-hidden relative">
      <!-- Image Container with Zoom Effect -->
      <div class="relative h-56 overflow-hidden rounded-t-2xl">
        <img :src="post.cover" :alt="post.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
        
        <!-- Category Badge -->
        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-gray-800 dark:text-white shadow-sm">
            {{ post.tags[0] }}
          </span>
        </div>
      </div>
      
      <!-- Content -->
      <div class="p-6 flex flex-col flex-grow bg-white dark:bg-gray-800 rounded-b-2xl border-x border-b border-gray-100 dark:border-gray-700 shadow-sm transition-shadow duration-300 group-hover:shadow-xl group-hover:border-blue-100 dark:group-hover:border-blue-900">
        <!-- Meta -->
        <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span class="flex items-center gap-1">
            <Calendar class="w-3 h-3" />
            {{ post.date }}
          </span>
          <span class="flex items-center gap-1">
            <Clock class="w-3 h-3" />
            5 min read
          </span>
        </div>
        
        <h2 class="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
          {{ post.title }}
        </h2>
        
        <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
          {{ post.excerpt }}
        </p>

        <!-- Read More Link -->
        <div class="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          阅读全文 <ArrowRight class="w-4 h-4 ml-1" />
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<style scoped>
.modern-card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modern-card:hover {
  transform: translateY(-5px);
}
</style>
