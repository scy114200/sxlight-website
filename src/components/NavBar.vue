<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X, Github, Moon, Sun, Search } from 'lucide-vue-next'
import { isDark, toggleDark } from '../composables/useTheme'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <div class="glass-nav border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center gap-3">
            <RouterLink to="/" class="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-80 transition-opacity">
              SXLight
            </RouterLink>
          </div>
          
          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <div class="flex items-baseline space-x-6">
              <RouterLink to="/" class="nav-link">首页</RouterLink>
              <RouterLink to="/about" class="nav-link">关于</RouterLink>
              <a href="#" class="nav-link">分类</a>
            </div>

            <!-- Right Actions -->
            <div class="flex items-center gap-4 border-l border-gray-200 dark:border-gray-700 pl-6">
              <button class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" title="Search">
                <Search class="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              
              <button @click="toggleDark()" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" title="Toggle Theme">
                <Sun v-if="isDark" class="w-5 h-5 text-yellow-400" />
                <Moon v-else class="w-5 h-5 text-gray-600" />
              </button>

              <a href="https://github.com/yourusername" target="_blank" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <Github class="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </a>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center gap-4">
             <button @click="toggleDark()" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
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
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden absolute w-full glass-nav border-b border-white/10">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.nav-link {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative;
}

.nav-link::after {
  content: '';
  @apply absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300;
}

.nav-link:hover::after {
  @apply w-full;
}

.mobile-nav-link {
  @apply block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10;
}
</style>
