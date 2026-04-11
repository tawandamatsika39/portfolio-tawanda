<template>
  <div class="not-prose mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">

    <div class="relative min-h-[200px]">
      <!-- Giscus always in DOM and visible so it can load normally -->
      <GiscusComponent
        repo="tawandamatsika39/portfolio-tawanda"
        repo-id="R_kgDONDM5yQ"
        category="General"
        category-id="DIC_kwDONDM5yc4C6oGj"
        mapping="pathname"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="bottom"
        :theme="giscusTheme"
        lang="en"
      />

      <!-- Skeleton overlaid on top until Giscus fires its ready message -->
      <div
        v-if="!isLoaded"
        class="absolute inset-0 animate-pulse space-y-6 bg-white dark:bg-slate-900 pt-1"
      >
        <div class="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        <div v-for="i in 2" :key="i" class="flex gap-3 items-start">
          <div class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
          <div class="flex-1 space-y-2 pt-1">
            <div class="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            <div class="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            <div class="h-3 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import GiscusComponent from '@giscus/vue'

const colorMode = useColorMode()
const isLoaded = ref(false)

const giscusTheme = computed(() =>
  colorMode.value === 'dark' ? 'dark_dimmed' : 'light'
)

watch(giscusTheme, (newTheme) => {
  const iframe = document.querySelector('iframe.giscus-frame')
  if (!iframe) return
  ;(iframe as HTMLIFrameElement).contentWindow?.postMessage(
    { giscus: { setConfig: { theme: newTheme } } },
    'https://giscus.app'
  )
})

const onGiscusMessage = (event: MessageEvent) => {
  if (event.origin === 'https://giscus.app' && event.data?.giscus) {
    isLoaded.value = true
  }
}

onMounted(() => window.addEventListener('message', onGiscusMessage))
onUnmounted(() => window.removeEventListener('message', onGiscusMessage))
</script>
