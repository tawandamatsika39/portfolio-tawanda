<template>
  <figure class="not-prose my-10">
    <div class="mb-4">
      <p class="text-[11px] uppercase tracking-vast text-stardust/60">Unemployment rate, 2024</p>
      <h3 class="font-display text-lg text-snow">Southern Africa, by country</h3>
    </div>

    <svg
      :viewBox="`0 0 ${width} ${height}`"
      class="w-full"
      role="img"
      aria-label="Bar chart of 2024 unemployment rate by Southern African country, from Eswatini and South Africa in the low-to-mid thirties percent down to Malawi and Zambia around five percent"
    >
      <!-- gridlines -->
      <g v-for="tick in ticks" :key="tick">
        <line
          :x1="xScale(tick)" :x2="xScale(tick)"
          :y1="margin.top - 6" :y2="height - margin.bottom + 4"
          stroke="#9BA0A8" stroke-opacity="0.18" stroke-width="1"
        />
        <text
          :x="xScale(tick)" :y="margin.top - 12"
          text-anchor="middle" font-size="11" fill="#9BA0A8"
        >{{ tick }}%</text>
      </g>

      <!-- bars -->
      <g v-for="(d, i) in data" :key="d.country">
        <text
          :x="margin.left - 12" :y="rowCenter(i) + 4"
          text-anchor="end" font-size="12.5" fill="#F5F5F7"
        >{{ d.country }}</text>

        <rect
          :x="margin.left" :y="rowCenter(i) - barHalf"
          :width="Math.max(barWidth(d.value) - 4, 0)" :height="barThickness"
          rx="4" ry="4"
          :fill="hovered === i ? '#E8C563' : '#D4AF37'"
          class="transition-colors duration-150"
          style="cursor: pointer"
          @mouseenter="hovered = i" @mouseleave="hovered = null"
          @focus="hovered = i" @blur="hovered = null"
          tabindex="0"
        />
        <!-- square baseline cap: redraw the first 4px square so only the far end is rounded -->
        <rect
          :x="margin.left" :y="rowCenter(i) - barHalf"
          width="4" :height="barThickness"
          :fill="hovered === i ? '#E8C563' : '#D4AF37'"
          class="transition-colors duration-150 pointer-events-none"
        />

        <text
          :x="margin.left + barWidth(d.value) + 8" :y="rowCenter(i) + 4"
          font-size="12.5" fill="#F5F5F7" font-weight="600"
        >{{ d.value.toFixed(1) }}%</text>

        <!-- hover tooltip -->
        <g v-if="hovered === i" :transform="`translate(${margin.left + barWidth(d.value) / 2}, ${rowCenter(i) - barHalf - 10})`">
          <rect x="-58" y="-24" width="116" height="22" rx="4" fill="#0B0B0C" stroke="#A8893A" stroke-opacity="0.5" />
          <text x="0" y="-9" text-anchor="middle" font-size="11" fill="#F5F5F7">
            {{ d.country }}: <tspan font-weight="700" fill="#D4AF37">{{ d.value.toFixed(2) }}%</tspan>
          </text>
        </g>
      </g>
    </svg>

    <figcaption class="mt-3 text-[11px] leading-relaxed text-stardust/60">
      Unemployment, total (% of total labor force), modeled ILO estimate, 2024.
      <a
        href="https://data.worldbank.org/indicator/SL.UEM.TOTL.ZS?locations=ZA-ZW-ZM-MZ-BW-MW-LS-SZ"
        target="_blank" rel="noopener"
        class="underline decoration-stardust/40 hover:text-spice"
      >World Bank / ILO modeled estimates</a>.
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
const data = [
  { country: 'Eswatini', value: 34.64 },
  { country: 'South Africa', value: 32.28 },
  { country: 'Botswana', value: 23.81 },
  { country: 'Lesotho', value: 16.34 },
  { country: 'Zimbabwe', value: 9.44 },
  { country: 'Mozambique', value: 6.67 },
  { country: 'Zambia', value: 5.90 },
  { country: 'Malawi', value: 5.05 }
]

const hovered = ref<number | null>(null)

const width = 720
const margin = { top: 28, right: 56, bottom: 12, left: 104 }
const rowHeight = 38
const barThickness = 20
const barHalf = barThickness / 2
const height = margin.top + data.length * rowHeight + margin.bottom

const maxVal = Math.max(...data.map((d) => d.value))
const axisMax = 40
const ticks = [0, 10, 20, 30, 40]

const plotWidth = width - margin.left - margin.right

function xScale(v: number) {
  return margin.left + (v / axisMax) * plotWidth
}
function barWidth(v: number) {
  return (v / axisMax) * plotWidth
}
function rowCenter(i: number) {
  return margin.top + i * rowHeight + rowHeight / 2
}
</script>
