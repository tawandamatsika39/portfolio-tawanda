<template>
  <div class="not-prose my-12 panel border-l-2 border-l-spice/40 px-6 py-7 md:px-8">
    <p class="font-display text-base leading-snug text-snow md:text-lg">
      Interested in piloting Bantu LMS or collaborating?
    </p>
    <p class="mt-3 text-sm font-light leading-relaxed text-stardust">
      Whether you run an institution, represent a community organisation, or want to explore
      corporate tech training — let's talk.
    </p>

    <div class="mt-6 flex flex-wrap gap-3">
      <a class="cta-link" :href="mailto">Send an email</a>
      <a
        class="cta-link"
        href="https://www.linkedin.com/in/tawanda-matsika-8a18a7ba/"
        target="_blank"
        rel="noopener"
      >Connect on LinkedIn</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const mailto = 'mailto:tawandamatsika39@gmail.com?subject=Bantu%20LMS%20%E2%80%94%20partnership%20enquiry'
</script>

<style scoped>
.cta-link {
  @apply border hairline px-4 py-2.5 text-[11px] font-light uppercase tracking-vast text-stardust
    transition-colors duration-300 hover:border-spice/60 hover:text-snow;
}
</style>
