<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import BackToTop from '../components/BackToTop.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen pt-24 relative isolate">
    <a href="#content" class="skip-link">跳到内容</a>
    <!-- Aurora Background Blobs -->
    <div class="aurora-bg">
      <div class="aurora-blob blob-1"></div>
      <div class="aurora-blob blob-2"></div>
      <div class="aurora-blob blob-3"></div>
    </div>

    <NavBar />
    <main id="content" class="flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 z-10">
      <slot />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>
