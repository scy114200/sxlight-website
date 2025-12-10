export default {
  mounted(el) {
    el.classList.add('reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) el.classList.add('is-visible')
      })
    }, { threshold: 0.12 })
    io.observe(el)
    el._io = io
  },
  unmounted(el) {
    if (el._io) el._io.disconnect()
  }
}
