<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Valine from 'valine'

const props = defineProps({
  path: {
    type: String,
    required: true
  },
  bare: {
    type: Boolean,
    default: false
  }
})

const valineContainer = ref(null)
const err = ref('')

const appId = import.meta.env.VITE_VALINE_APP_ID
const appKey = import.meta.env.VITE_VALINE_APP_KEY
const serverURLs = import.meta.env.VITE_VALINE_SERVER_URLS || 'https://zdjdzs52.api.lncldglobal.com'
const placeholder = import.meta.env.VITE_VALINE_PLACEHOLDER || '欢迎评论'
const avatar = import.meta.env.VITE_VALINE_AVATAR || 'wavatar'
const recordIP = String(import.meta.env.VITE_VALINE_RECORD_IP).toLowerCase() === 'true'
const visitor = String(import.meta.env.VITE_VALINE_VISITOR).toLowerCase() === 'true'
const verify = String(import.meta.env.VITE_VALINE_VERIFY).toLowerCase() === 'true'
const pageSize = Number(import.meta.env.VITE_VALINE_PAGE_SIZE) || 10
let submitHandler

onMounted(() => {
  if (!valineContainer.value) return
  if (!appId || !appKey) {
    err.value = 'Valine 未配置：缺少 AppID/AppKey'
    return
  }
  try {
    new Valine({
      el: valineContainer.value,
      appId,
      appKey,
      serverURLs,
      placeholder,
      avatar,
      recordIP,
      visitor,
      verify,
      pageSize,
      path: props.path
    })
    submitHandler = (e) => {
      const btn = e.target.closest('button')
      if (!btn) return
      if (btn.disabled) return
      btn.disabled = true
      btn.setAttribute('aria-disabled', 'true')
      setTimeout(() => {
        btn.disabled = false
        btn.removeAttribute('aria-disabled')
      }, 12000)
    }
    valineContainer.value.addEventListener('click', submitHandler)
  } catch (e) {
    err.value = 'Valine 初始化失败'
  }
})
onUnmounted(() => {
  if (valineContainer.value && submitHandler) {
    valineContainer.value.removeEventListener('click', submitHandler)
  }
})
</script>

<template>
  <div v-if="!props.bare" class="glass-panel rounded-2xl p-6 mt-12">
    <h3 class="text-xl font-bold mb-6 text-primary border-b border-gray-200 dark:border-gray-700 pb-2">评论</h3>
    <div v-if="!err" ref="valineContainer" id="vcomments"></div>
    <p v-else class="text-sm text-secondary">{{ err }}</p>
  </div>
  <div v-else>
    <div v-if="!err" ref="valineContainer" id="vcomments"></div>
    <p v-else class="text-sm text-secondary">{{ err }}</p>
  </div>
</template>

<style scoped>
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
