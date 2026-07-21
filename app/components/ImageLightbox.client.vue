<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 backdrop-blur-sm"
        @click="close"
      >
        <button
          type="button"
          class="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border hairline text-snow/70 transition-colors hover:border-spice/60 hover:text-spice"
          aria-label="Close"
          @click="close"
        >
          <Icon name="mdi:close" size="20" />
        </button>

        <p class="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-vast text-stardust/50">
          {{ isZoomed ? 'Click image to fit screen' : 'Click image to zoom in' }}
        </p>

        <div class="max-h-[92vh] max-w-[95vw] overflow-auto" @click.stop="toggleZoom">
          <img
            :src="activeSrc"
            :alt="activeAlt"
            class="block select-none"
            :class="isZoomed ? 'max-w-none cursor-zoom-out' : 'max-h-[88vh] max-w-[92vw] cursor-zoom-in object-contain'"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const isZoomed = ref(false)
const activeSrc = ref('')
const activeAlt = ref('')

function open(img: HTMLImageElement) {
  activeSrc.value = img.currentSrc || img.src
  activeAlt.value = img.alt || ''
  isZoomed.value = false
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

function close() {
  isOpen.value = false
  document.body.style.overflow = ''
}

function toggleZoom() {
  isZoomed.value = !isZoomed.value
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null
  const img = target?.closest('.prose img') as HTMLImageElement | null
  if (img) open(img)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style>
.prose img {
  cursor: zoom-in;
  transition: opacity 0.2s ease;
}
.prose img:hover {
  opacity: 0.9;
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.15s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
