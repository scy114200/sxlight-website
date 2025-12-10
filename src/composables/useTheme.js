import { useDark, useToggle } from '@vueuse/core'
import { nextTick } from 'vue'

export const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})

const toggleDarkBase = useToggle(isDark)

export const toggleDark = async (event) => {
  // Fallback for browsers that don't support View Transitions
  if (!document.startViewTransition || !event) {
    toggleDarkBase()
    return
  }

  const x = event.clientX
  const y = event.clientY

  // Set CSS variables for the initial state (prevents flash)
  document.documentElement.style.setProperty('--click-x', `${x}px`)
  document.documentElement.style.setProperty('--click-y', `${y}px`)
  document.documentElement.style.setProperty('--mask-radius', `0px`)

  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  const transition = document.startViewTransition(async () => {
    toggleDarkBase()
    await nextTick()
  })

  transition.ready.then(() => {
    const SPEED_PX_PER_SEC = 1400
    const durationMs = Math.max(600, Math.min(1200, Math.round((endRadius / SPEED_PX_PER_SEC) * 1000)))
    document.documentElement.animate(
      {
        '--mask-radius': ['0px', `${endRadius}px`],
      },
      {
        duration: durationMs,
        easing: 'ease-in-out',
        fill: 'both',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  })
}
