<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const showTop = ref(false)
const onScroll = () => {
  const y = (document.scrollingElement ? document.scrollingElement.scrollTop : window.scrollY) || 0
  showTop.value = y > 300
}
const scrollToTop = () => {
  const el = document.scrollingElement || document.documentElement
  const start = el.scrollTop
  const duration = 700
  const startTime = performance.now()
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
  const step = (now) => {
    const elapsed = now - startTime
    const p = Math.min(elapsed / duration, 1)
    const v = 1 - ease(p)
    el.scrollTop = start * v
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition name="backtop" appear>
    <button
      v-show="showTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 p-3 rounded-full btn-soft" aria-label="回到顶部"
    >
      <ArrowUp class="w-5 h-5" />
    </button>
  </Transition>
</template>

<style scoped>
.backtop-enter-active,
.backtop-leave-active { transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); }
.backtop-enter-from,
.backtop-leave-to { opacity: 0; transform: translateY(12px) scale(0.96); }
</style>

