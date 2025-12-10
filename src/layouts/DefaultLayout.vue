<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen pt-24 relative isolate">
    <!-- Aurora Background Blobs -->
    <div class="aurora-bg">
      <div class="aurora-blob blob-1"></div>
      <div class="aurora-blob blob-2"></div>
      <div class="aurora-blob blob-3"></div>
    </div>

    <NavBar />
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
      <slot />
    </main>
    <Footer />
  </div>
</template>
