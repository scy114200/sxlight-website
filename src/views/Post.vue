<script setup>
import { useRoute } from 'vue-router'
import { computed, ref, onMounted, watch } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import ValineComment from '../components/ValineComment.vue'
import { usePostMarkdown } from '../composables/usePostMarkdown'
import { onUpdated, onUnmounted } from 'vue'
import { Calendar, Tag, ArrowLeft, Clock, Share2, Bookmark } from 'lucide-vue-next'
const avatarSrc = '/avatars/avatar.png'
const fallbackAvatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAOcb+h8AAAAASUVORK5CYII='
const onAvatarError = (e) => { e.target.src = fallbackAvatar }

const route = useRoute()
const folderBase = computed(() => `/posts/${route.params.id}/`)
const { meta, htmlContent, hasMd, loading, toc, load } = usePostMarkdown(folderBase.value)

function parseFrontmatter(raw) {
  const fmMatch = raw.match(/^---[\s\S]*?---/)
  if (!fmMatch) return { meta: {}, body: raw }
  const fm = fmMatch[0]
  const body = raw.slice(fm.length).trim()
  const lines = fm.replace(/^---\n?|\n?---$/g, '').split(/\n/)
  const out = {}
  lines.forEach(l => {
    const m = l.match(/^([A-Za-z_][A-Za-z0-9_\-]*)\s*:\s*(.+)$/)
    if (!m) return
    const k = m[1]
    let v = m[2].trim()
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''))
    }
    out[k] = v
  })
  return { meta: out, body }
}

function rewriteRelativeUrls(tokens, base) {
  tokens.forEach((t) => {
    if (t.type === 'image') {
      const srcIdx = t.attrIndex('src')
      if (srcIdx >= 0) {
        const src = t.attrs[srcIdx][1]
        if (!/^([a-z]+:)?\//i.test(src)) {
          t.attrs[srcIdx][1] = base + src.replace(/^\.\//, '')
        }
      }
    }
    if (t.type === 'link_open') {
      const hrefIdx = t.attrIndex('href')
      if (hrefIdx >= 0) {
        const href = t.attrs[hrefIdx][1]
        if (!/^([a-z]+:)?\//i.test(href)) {
          t.attrs[hrefIdx][1] = base + href.replace(/^\.\//, '')
        }
      }
    }
    if (t.children) rewriteRelativeUrls(t.children, base)
  })
}

onMounted(() => load())
watch(() => route.params.id, () => { load() })

function bindCopyButtons() {
  const root = document.querySelector('.md-container')
  if (!root) return
  const buttons = root.querySelectorAll('[data-copy-btn]')
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-wrap')?.querySelector('pre code')
      if (!pre) return
      const text = pre.textContent || ''
      navigator.clipboard?.writeText(text)
      btn.classList.add('copied')
      setTimeout(() => btn.classList.remove('copied'), 1200)
    }, { passive: true })
  })
}

let anchorHandler
function enableSmoothAnchors() {
  if (anchorHandler) return
  anchorHandler = (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return
    const href = link.getAttribute('href') || ''
    if (!href || href === '#') return
    const id = decodeURIComponent(href.replace('#', ''))
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    const se = document.scrollingElement || document.documentElement
    const start = se.scrollTop
    const rect = target.getBoundingClientRect()
    const headerOffset = 80
    const end = start + rect.top - headerOffset
    const duration = 600
    const startTime = performance.now()
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
    const step = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const v = ease(p)
      se.scrollTop = start + (end - start) * v
      if (p < 1) requestAnimationFrame(step)
      else history.replaceState(null, '', `#${id}`)
    }
    requestAnimationFrame(step)
  }
  document.addEventListener('click', anchorHandler, { passive: false })
}
function disableSmoothAnchors() {
  if (anchorHandler) {
    document.removeEventListener('click', anchorHandler)
    anchorHandler = null
  }
}

onUpdated(() => { bindCopyButtons(); enableSmoothAnchors() })
onUnmounted(() => { disableSmoothAnchors() })

</script>

<template>
  <DefaultLayout>
    <div v-if="hasMd" class="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
      
      <!-- Left Sidebar (Actions) -->
      <aside class="hidden lg:flex lg:col-span-1 flex-col gap-6 sticky top-24 h-fit">
        <button class="p-3 rounded-full glass-panel shadow-md hover:text-blue-600 transition-colors">
          <Share2 class="w-5 h-5" />
        </button>
        <button class="p-3 rounded-full glass-panel shadow-md hover:text-blue-600 transition-colors">
          <Bookmark class="w-5 h-5" />
        </button>
      </aside>

      <!-- Main Content -->
      <article class="lg:col-span-8">
        <!-- Breadcrumb & Back -->
        <div class="mb-8 flex items-center justify-between">
          <RouterLink to="/" class="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <ArrowLeft class="w-4 h-4" /> 返回首页
          </RouterLink>
          <div class="text-xs font-mono text-gray-400">POST #{{ route.params.id }}</div>
        </div>

        <!-- Article Header -->
        <header class="mb-10">
          <div class="flex flex-wrap gap-3 mb-6" v-if="hasMd && meta.tags && meta.tags.length">
            <span v-for="tag in meta.tags" :key="tag" class="px-3 py-1 text-xs font-bold rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              #{{ tag }}
            </span>
          </div>
          
          <h1 class="text-3xl sm:text-5xl font-black mb-6 text-primary leading-tight">
            <span v-if="!loading">{{ meta.title }}</span>
            <span v-else class="skeleton skeleton-text w-2/3 h-8"></span>
          </h1>

          <div class="flex items-center gap-6 text-sm text-secondary border-b border-gray-100 dark:border-gray-800 pb-8">
            <div class="flex items-center gap-2">
              <img :src="avatarSrc" @error="onAvatarError" class="w-8 h-8 rounded-full object-cover" alt="avatar" />
              <span class="font-bold text-primary">SXLight</span>
            </div>
            <span class="flex items-center gap-1">
              <Calendar class="w-4 h-4" />
              <span v-if="!loading">{{ meta.date }}</span>
              <span v-else class="skeleton skeleton-text w-24 h-3"></span>
            </span>
            <span class="flex items-center gap-1">
              <Clock class="w-4 h-4" />
              <span v-if="!loading">{{ meta.readingTime }} 分钟阅读</span>
              <span v-else class="skeleton skeleton-text w-20 h-3"></span>
            </span>
          </div>
        </header>

        <!-- Featured Image -->
        <div class="relative rounded-3xl overflow-hidden mb-12 shadow-2xl" v-if="hasMd && meta.cover">
          <img :src="meta.cover" :alt="meta.title" loading="lazy" decoding="async" class="w-full h-auto object-cover will-change-transform" />
        </div>

        <!-- Markdown Content -->
          <div class="md-container">
            <div v-if="!loading" class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-2xl reveal is-visible" v-html="htmlContent"></div>
            <div v-else class="space-y-3">
              <div class="skeleton skeleton-text w-full h-4"></div>
              <div class="skeleton skeleton-text w-5/6 h-4"></div>
              <div class="skeleton skeleton-text w-4/6 h-4"></div>
            </div>
          </div>

        <!-- Author Bio Box -->
        <div class="mt-16 p-8 rounded-2xl glass-panel flex items-start gap-6">
          <img :src="avatarSrc" @error="onAvatarError" class="w-16 h-16 rounded-full object-cover flex-shrink-0" alt="avatar" />
          <div>
            <h3 class="font-bold text-lg text-primary mb-2">关于作者</h3>
            <p class="text-secondary text-sm leading-relaxed">
              全栈开发者，热爱探索新技术。专注于 Vue 生态系统和现代前端工程化。希望能通过这个博客分享我的学习历程。
            </p>
          </div>
        </div>

        <!-- Comments -->
        <ValineComment :path="route.path" />
      </article>

      <!-- Right Sidebar (TOC) -->
      <aside class="hidden lg:block lg:col-span-3">
        <div class="sticky top-24">
          <div class="glass-panel rounded-2xl p-6">
            <h3 class="font-bold text-sm uppercase tracking-wider text-secondary mb-4">目录</h3>
            <ul class="space-y-3 text-sm">
              <li v-for="item in toc" :key="item.id">
                <a :href="`#${item.id}`" class="text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors block border-l-2 border-transparent hover:border-blue-500 pl-3">
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

    </div>
    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold">文章未找到</h2>
      <RouterLink to="/" class="text-blue-600 hover:underline mt-4 inline-block">返回首页</RouterLink>
    </div>
  </DefaultLayout>
</template>

<style scoped>
/* Typography customization handled in global styles or Tailwind Typography config */
</style>
