<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X, Github } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="glass-nav mt-4 rounded-2xl flex items-center justify-between h-16 px-6">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-80 transition-opacity">
            SXLight
          </RouterLink>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <RouterLink to="/" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-white/40 transition-all duration-200 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-white/10">Home</RouterLink>
            <RouterLink to="/about" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-white/40 transition-all duration-200 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-white/10">About</RouterLink>
            <a href="https://github.com/yourusername" target="_blank" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-white/40 transition-all duration-200 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-white/10 flex items-center gap-2">
              <Github class="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-gray-800 hover:text-blue-600 p-2 rounded-lg focus:outline-none">
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden absolute w-full px-4 mt-2">
      <div class="glass-card rounded-xl px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink to="/" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-white/40 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-white/10">Home</RouterLink>
        <RouterLink to="/about" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-white/40 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-white/10">About</RouterLink>
        <a href="https://github.com" target="_blank" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-white/40 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-white/10 flex items-center gap-2">
          <Github class="w-4 h-4" /> GitHub
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.glass-nav {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .glass-nav {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }
  .glass-card {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
