<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <div class="max-w-3xl mx-auto">
      <div class="glass-page p-12 rounded-3xl text-center">
        <h1 class="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">About SXLight</h1>
        
        <div class="prose prose-lg dark:prose-invert mx-auto">
          <p>
            Welcome to SXLight. This website is an exploration of modern web design, specifically focusing on the 
            <strong>Liquid Glass (Glassmorphism)</strong> aesthetic.
          </p>
          <p>
            Built with:
          </p>
          <ul class="list-none p-0 flex justify-center gap-4 flex-wrap">
            <li class="glass-tag px-4 py-2 rounded-full">Vue 3</li>
            <li class="glass-tag px-4 py-2 rounded-full">Vite</li>
            <li class="glass-tag px-4 py-2 rounded-full">Tailwind CSS</li>
          </ul>
          <p class="mt-8">
            Hosted on GitHub Pages & Cloudflare.
          </p>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.glass-page {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}

.glass-tag {
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  .glass-page {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }
  .glass-tag {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
