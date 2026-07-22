<template>
  <!-- No eyebrow label: the h2 immediately above this already reads "The Five Walls" -->
  <div class="not-prose my-10 panel px-6 py-3 md:px-8">
    <ol>
      <li
        v-for="(wall, i) in walls"
        :key="wall.label"
        class="grid grid-cols-[2.25rem_1fr] gap-x-4 py-4 md:grid-cols-[3rem_1fr]"
        :class="i > 0 ? 'border-t hairline' : ''"
      >
        <span class="font-display text-xs tracking-orbit text-spice">{{ wall.index }}</span>
        <div>
          <p class="font-display text-xs uppercase tracking-orbit text-snow">{{ wall.label }}</p>
          <p class="mt-1.5 text-sm font-light leading-relaxed text-stardust">{{ wall.blurb }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
const walls = [
  { index: '01', label: 'Material Shortage', blurb: 'Outdated or missing textbooks' },
  { index: '02', label: 'Seat Scarcity', blurb: "Universities admit a fraction of those who'd thrive" },
  { index: '03', label: 'Teacher Deficit', blurb: 'Too few qualified people to teach' },
  { index: '04', label: 'Economic Volatility', blurb: 'Tuition priced against a currency that moves monthly' },
  { index: '05', label: 'The Trust Gap', blurb: 'Credentials no remote employer can verify' }
]
</script>
