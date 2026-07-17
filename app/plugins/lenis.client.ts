import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const lenis = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  })

  const raf = (time: number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  // Jump to top between pages so drifting doesn't carry across routes
  nuxtApp.hook('page:finish', () => {
    lenis.scrollTo(0, { immediate: true })
  })

  return {
    provide: { lenis }
  }
})
