<template>
  <svg
    class="w-full h-4"
    :class="colorClass"
    viewBox="0 0 100 8"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <pattern id="chevron-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
        <polygon points="0,8 4,0 8,8" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="100" height="8" fill="url(#chevron-pattern)" />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  colorClass: {
    type: String,
    default: 'text-ochre-500/60 dark:text-ochre-400/50',
  },
});
</script>
