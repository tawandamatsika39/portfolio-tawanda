<template>
  <div
    class="fixed top-0 left-0 z-[60] h-px bg-spice shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-none"
    :style="{ width: pct + '%' }"
    aria-hidden="true"
  />
</template>

<script lang="ts" setup>
const pct = ref(0)

let cleanup: (() => void) | null = null

onBeforeUnmount(() => {
  cleanup?.()
})

onMounted(async () => {
  await nextTick()

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    pct.value = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0
  }
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update, { passive: true })
  update()

  cleanup = () => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  }
})
</script>
