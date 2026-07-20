<template>
  <figure class="not-prose my-10">
    <div v-if="svg" class="mermaid-diagram overflow-x-auto" v-html="svg" />
    <pre v-else class="overflow-x-auto border hairline bg-obsidian/60 p-4 text-xs leading-relaxed text-stardust/60">{{ code }}</pre>
  </figure>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: ''
  }
})

const svg = ref('')
const id = `mermaid-${Math.random().toString(36).slice(2)}`

onMounted(async () => {
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    look: 'handDrawn',
    handDrawnSeed: 7,
    theme: 'base',
    fontFamily: '"Patrick Hand", "Comic Sans MS", cursive',
    themeVariables: {
      darkMode: true,
      background: '#0B0B0C',
      primaryColor: '#0B0B0C',
      primaryTextColor: '#F5F5F7',
      primaryBorderColor: '#A8893A',
      lineColor: '#9BA0A8',
      secondaryColor: '#0B0B0C',
      tertiaryColor: '#0B0B0C',
      clusterBkg: 'rgba(255, 255, 255, 0.03)',
      clusterBorder: 'rgba(255, 255, 255, 0.15)',
      edgeLabelBackground: '#0B0B0C',
      fontSize: '20px'
    }
  })
  try {
    const rawSvg = (await mermaid.render(id, props.code)).svg
    svg.value = forceNativeSize(rawSvg)
  } catch (error) {
    console.error('[mermaid] render failed:', error)
  }
})

// Mermaid emits width="100%" with no height attribute, which leaves the browser to guess
// the aspect ratio; that guess sometimes clips wide hand-drawn diagrams instead of scaling
// them. Setting explicit pixel width/height from the SVG's own viewBox removes the guesswork.
function forceNativeSize(rawSvg: string): string {
  const doc = new DOMParser().parseFromString(rawSvg, 'image/svg+xml')
  const svgEl = doc.documentElement
  const vb = (svgEl as unknown as SVGSVGElement).viewBox?.baseVal
  if (vb && vb.width > 0 && vb.height > 0) {
    svgEl.setAttribute('width', String(vb.width))
    svgEl.setAttribute('height', String(vb.height))
  }
  return new XMLSerializer().serializeToString(svgEl)
}
</script>

<style scoped>
.mermaid-diagram :deep(svg) {
  max-width: none !important;
  display: block;
}
</style>
