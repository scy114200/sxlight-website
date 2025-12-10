<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X, Github, Moon, Sun, Search } from 'lucide-vue-next'
import { isDark, toggleDark } from '../composables/useTheme'
import { useWindowScroll } from '@vueuse/core'

const isMenuOpen = ref(false)
const y = ref(0)
const scrollProgress = ref(0)

const updateProgress = () => {
  if (typeof window === 'undefined') return
  const se = document.scrollingElement || document.documentElement
  const height = (se ? se.scrollHeight : 0) - window.innerHeight
  const cur = window.scrollY || 0
  y.value = cur
  if (height <= 0) {
    scrollProgress.value = 0
    return
  }
  scrollProgress.value = Math.min(100, Math.max(0, (cur / height) * 100))
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="fixed top-4 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
    <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center pointer-events-auto">
      
      <!-- Left Island: Logo -->
      <div 
        class="glass-nav rounded-2xl shadow-lg px-6 h-16 flex items-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        :class="[
          y > 50 ? '-translate-y-32 opacity-0' : 'translate-y-0 opacity-100'
        ]"
      >
        <RouterLink to="/" class="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-80 transition-opacity">
          SXLight
        </RouterLink>
      </div>

      <!-- Right Island: Navigation -->
      <div class="glass-nav rounded-2xl shadow-lg px-6 h-16 flex items-center relative overflow-hidden">
        <!-- Scroll Progress Bar -->
        <div 
          class="absolute bottom-0 left-0 right-0 h-[2px] bg-black/10 dark:bg-white/10 z-0"
        ></div>
        <div 
          class="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 z-10 transition-all duration-100 ease-out"
          :style="{ width: `${scrollProgress}%` }"
        ></div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <div class="flex items-baseline space-x-6">
            <RouterLink to="/" class="nav-link">首页</RouterLink>
            <RouterLink to="/about" class="nav-link">关于</RouterLink>
            <a href="#" class="nav-link">分类</a>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-4 border-l border-gray-200 dark:border-gray-700 pl-6">
            <button class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors tap-spring" title="Search">
              <Search class="w-5 h-5 text-gray-600 dark:text-white" />
            </button>
            
            <button @click="toggleDark($event)" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors tap-spring" title="Toggle Theme">
              <Sun v-if="isDark" class="w-5 h-5 text-yellow-400" />
              <Moon v-else class="w-5 h-5 text-gray-600" />
            </button>

            <a href="https://github.com/yourusername" target="_blank" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors tap-spring">
              <Github class="w-5 h-5 text-gray-600 dark:text-white" />
            </a>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center gap-4">
           <button @click="toggleDark($event)" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <Sun v-if="isDark" class="w-5 h-5 text-yellow-400" />
              <Moon v-else class="w-5 h-5 text-gray-600" />
            </button>
          <button @click="toggleMenu" class="text-gray-800 dark:text-gray-200 hover:text-blue-600 p-2 rounded-lg focus:outline-none">
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden absolute right-4 left-4 top-24 pointer-events-auto">
      <div class="glass-nav rounded-xl shadow-lg px-2 pt-2 pb-3 space-y-1 sm:px-3 max-w-[1600px] mx-auto">
        <RouterLink to="/" @click="isMenuOpen = false" class="mobile-nav-link">首页</RouterLink>
        <RouterLink to="/about" @click="isMenuOpen = false" class="mobile-nav-link">关于</RouterLink>
        <a href="#" class="mobile-nav-link">分类</a>
        <a href="https://github.com" target="_blank" class="mobile-nav-link flex items-center gap-2">
          <Github class="w-4 h-4" /> GitHub
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.glass-nav {
  /* Using global .glass-nav styles from style.css */
}

.nav-link {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  position: relative;
}

:global(.dark) .nav-link {
  color: var(--text-primary);
}

.nav-link:hover {
  color: var(--accent-color);
}

:global(.dark) .nav-link:hover {
  color: var(--accent-color);
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.25rem;
  width: 0;
  height: 0.125rem;
  background-color: var(--accent-color);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

:global(.dark) .nav-link::after {
  background-color: var(--accent-color);
}

.nav-link:hover::after {
  width: 100%;
}

.mobile-nav-link {
  display: block;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: var(--text-secondary);
}

:global(.dark) .mobile-nav-link {
  color: var(--text-primary);
}

.mobile-nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

:global(.dark) .mobile-nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
