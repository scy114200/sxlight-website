<script setup>
import { onMounted, ref } from 'vue'
import Valine from 'valine'

const props = defineProps({
  path: {
    type: String,
    required: true
  }
})

const valineContainer = ref(null)

onMounted(() => {
  if (valineContainer.value) {
    try {
      new Valine({
        el: valineContainer.value,
        appId: 'Your-App-ID-Here', // Placeholder
        appKey: 'Your-App-Key-Here', // Placeholder
        path: props.path,
        avatar: 'mp',
        placeholder: 'Leave a comment (Valine is not fully configured yet)...'
      })
    } catch (e) {
      console.error('Valine init failed', e)
    }
  }
})
</script>

<template>
  <div class="glass-comment rounded-2xl p-6 mt-12">
    <h3 class="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
      Comments
    </h3>
    <div ref="valineContainer" id="vcomments"></div>
  </div>
</template>

<style scoped>
.glass-comment {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

@media (prefers-color-scheme: dark) {
  .glass-comment {
    background: rgba(30, 41, 59, 0.5);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

/* Valine Customization for Dark Mode/Glass */
:deep(.v[data-class=v] .vwrap) {
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 8px;
  background: transparent;
}
:deep(.v[data-class=v] .vbtn) {
  border-radius: 4px;
  background: transparent;
  border: 1px solid rgba(128, 128, 128, 0.3);
  color: inherit;
}
</style>
