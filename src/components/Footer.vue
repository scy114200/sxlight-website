<template>
  <footer class="mt-auto py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="glass-footer rounded-2xl p-6 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} SXLight. 版权所有.
        </p>
        <div class="mt-2 flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
          <span>Designed with Liquid Glass</span>
          <span>&bull;</span>
          <span>Vue 3 + Tailwind</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.glass-footer {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (prefers-color-scheme: dark) {
  .glass-footer {
    background: rgba(30, 41, 59, 0.3);
    border-color: rgba(255, 255, 255, 0.05);
  }
}
</style>
