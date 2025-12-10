<script setup>
import { defineProps, ref } from 'vue'
import { useTilt } from '../composables/useTilt'
import { Calendar, Tag, Clock, ArrowRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  layout: {
    type: String,
    default: 'grid' // 'grid' or 'list'
  }
})
const imgRef = ref(null)
useTilt(imgRef, { max: 6, scale: 1.02 })
</script>

<template>
  <RouterLink :to="`/post/${post.id}`" class="block group h-full active:scale-[0.98] transition-transform duration-200">
    <article 
      class="modern-card h-full flex overflow-hidden relative"
      :class="[layout === 'list' ? 'flex-row' : 'flex-col']"
    >
      <!-- Image Container with Zoom Effect -->
      <div 
        class="relative overflow-hidden tilt-transition"
        :class="[
          layout === 'list' 
            ? 'w-1/3 min-w-[200px] rounded-l-2xl' 
            : 'h-56 w-full rounded-t-2xl'
        ]"
      >
        <img ref="imgRef" :src="post.cover" :alt="post.title" loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform" />
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
        
        <!-- Category Badge -->
        <div v-if="post.tags && post.tags.length" class="absolute top-4 left-4">
          <span class="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-gray-800 dark:text-white shadow-sm">
            {{ post.tags[0] }}
          </span>
        </div>
      </div>
      
      <!-- Content -->
      <div 
        class="glass-panel p-6 flex flex-col flex-grow border-0 rounded-none shadow-none transition-all duration-300 group-hover:shadow-xl"
        :class="[
          layout === 'list' 
            ? 'w-2/3 rounded-r-2xl' 
            : 'w-full rounded-b-2xl'
        ]"
      >
        <!-- Meta -->
        <div class="flex items-center gap-4 text-xs text-secondary mb-3">
          <span class="flex items-center gap-1">
            <Calendar class="w-3 h-3" />
            {{ post.date }}
          </span>
          <span class="flex items-center gap-1">
            <Clock class="w-3 h-3" />
            {{ post.readingTime || 5 }} 分钟阅读
          </span>
        </div>
        
        <h2 class="text-xl font-bold mb-3 text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
          {{ post.title }}
        </h2>
        
        <p v-if="post.excerpt" class="text-secondary text-sm line-clamp-3 mb-4 flex-grow">
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
