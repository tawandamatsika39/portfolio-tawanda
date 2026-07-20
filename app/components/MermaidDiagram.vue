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
    svg.value = (await mermaid.render(id, props.code)).svg
  } catch (error) {
    console.error('[mermaid] render failed:', error)
  }
})
</script>

<style scoped>
.mermaid-diagram :deep(svg) {
  max-width: none !important;
  min-width: 900px;
  width: 100%;
  height: auto;
}
</style>
