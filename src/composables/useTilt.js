import { onMounted, onBeforeUnmount } from 'vue'

export function useTilt(elRef, opts = {}) {
  const max = opts.max ?? 6
  const scale = opts.scale ?? 1.02
  let el
  let raf = 0

  function onMove(e) {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    const rx = (-py * max).toFixed(2)
    const ry = (px * max).toFixed(2)
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
    })
  }

  function onLeave() {
    if (!el) return
    cancelAnimationFrame(raf)
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  onMounted(() => {
    el = elRef?.value
    if (!el) return
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
  })

  onBeforeUnmount(() => {
    if (!el) return
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  })
}
