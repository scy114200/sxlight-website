<template>
  <footer class="mt-auto py-8">
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
      <div class="glass-panel rounded-2xl p-6 text-center">
        <p class="text-sm text-secondary">
          &copy; {{ new Date().getFullYear() }} SXLight. 版权所有.
        </p>
        <div class="mt-2 flex justify-center space-x-4 text-sm text-secondary">
          <span>Designed with Liquid Glass</span>
          <span>&bull;</span>
          <span>Vue 3 + Tailwind</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Styles inherited from global .glass-panel */
</style>
