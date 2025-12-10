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
        placeholder: '欢迎留下你的评论（Valine 尚未完全配置）...'
      })
    } catch (e) {
      console.error('Valine init failed', e)
    }
  }
})
</script>

<template>
  <div class="glass-panel rounded-2xl p-6 mt-12">
    <h3 class="text-xl font-bold mb-6 text-primary border-b border-gray-200 dark:border-gray-700 pb-2">
      评论
    </h3>
    <div ref="valineContainer" id="vcomments"></div>
  </div>
</template>

<style scoped>
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
