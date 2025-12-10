import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/common'

export function usePostMarkdown(basePath) {
  const meta = ref({ title: '', date: '', tags: [], cover: '', readingTime: 0 })
  const htmlContent = ref('')
  const hasMd = ref(false)
  const loading = ref(true)
  const toc = ref([])

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      try {
        if (lang && hljs.getLanguage(lang)) return hljs.highlight(str, { language: lang }).value
        return hljs.highlightAuto(str).value
      } catch {
        return ''
      }
    }
  })

  const defaultFence = md.renderer.rules.fence || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]
    const info = token.info ? token.info.trim() : ''
    const lang = info.split(/\s+/g)[0]
    let highlighted = ''
    try {
      highlighted = lang && hljs.getLanguage(lang)
        ? hljs.highlight(token.content, { language: lang }).value
        : hljs.highlightAuto(token.content).value
    } catch (e) {
      highlighted = md.utils.escapeHtml(token.content)
    }
    const langClass = lang ? ` language-${md.utils.escapeHtml(lang)}` : ''
    return `<div class="code-wrap relative"><button class="copy-btn" data-copy-btn title="复制代码">复制</button><pre class="hljs${langClass}"><code class="hljs${langClass}">${highlighted}</code></pre></div>`
  }

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
          if (!/^([a-z]+:)?\//i.test(src)) t.attrs[srcIdx][1] = base + src.replace(/^\.\//, '')
        }
      }
      if (t.type === 'link_open') {
        const hrefIdx = t.attrIndex('href')
        if (hrefIdx >= 0) {
          const href = t.attrs[hrefIdx][1]
          if (!/^([a-z]+:)?\//i.test(href)) t.attrs[hrefIdx][1] = base + href.replace(/^\.\//, '')
        }
      }
      if (t.children) rewriteRelativeUrls(t.children, base)
    })
  }

  function addHeadingAnchorsAndToc(tokens) {
    toc.value = []
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i]
      if (t.type === 'heading_open') {
        const level = Number(t.tag.replace('h', ''))
        const inline = tokens[i + 1]
        if (inline && inline.type === 'inline') {
          const text = inline.content || ''
          const slug = text
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 64)
          const idIdx = t.attrIndex('id')
          if (idIdx < 0) t.attrPush(['id', slug])
          else t.attrs[idIdx][1] = slug
          toc.value.push({ id: slug, text, level })
        }
      }
    }
  }

  function estimateReadingTime(text) {
    const plain = text.replace(/```[\s\S]*?```/g, '').replace(/\s+/g, '')
    const charCount = plain.length
    return Math.max(1, Math.round(charCount / 300))
  }

  async function load() {
    try {
      loading.value = true
      const res = await fetch(`${basePath}index.md`)
      if (!res.ok) { hasMd.value = false; return }
      const raw = await res.text()
      const { meta: fmMeta, body } = parseFrontmatter(raw)
      const tokens = md.parse(body, {})
      rewriteRelativeUrls(tokens, basePath)
      addHeadingAnchorsAndToc(tokens)
      htmlContent.value = md.renderer.render(tokens, md.options, {})
      meta.value = {
        title: fmMeta.title || '',
        date: fmMeta.date || '',
        tags: Array.isArray(fmMeta.tags) ? fmMeta.tags : [],
        cover: fmMeta.cover ? (fmMeta.cover.startsWith('http') ? fmMeta.cover : basePath + fmMeta.cover.replace(/^\.\//, '')) : '',
        readingTime: fmMeta.reading_time ? Number(fmMeta.reading_time) : estimateReadingTime(body)
      }
      hasMd.value = true
    } catch {
      hasMd.value = false
    } finally {
      loading.value = false
    }
  }

  return { meta, htmlContent, hasMd, loading, toc, load }
}
