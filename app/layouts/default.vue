<template>
  <div class="relative min-h-screen">
    <SpaceScene />

    <header class="fixed inset-x-0 top-0 z-50 border-b hairline bg-void/70 backdrop-blur-md">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <NuxtLink
          to="/"
          class="font-sans text-sm font-medium uppercase tracking-cosmos text-snow transition-colors hover:text-spice"
        >
          Banturoots
        </NuxtLink>
        <Menu />
        <SpeedInsights />
      </div>
    </header>

    <main class="content-veil relative z-10 mx-auto max-w-4xl px-6 pt-28 md:px-10">
      <slot />
    </main>

    <footer class="relative z-10 border-t hairline">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center md:px-10">
        <p class="text-[11px] uppercase tracking-vast text-stardust/60">
          © {{ new Date().getFullYear() }} Tawanda Matsika. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';

useHead({
  titleTemplate: '%s - Tawanda.Matsika',
  htmlAttrs: { lang: 'en' },
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap'
    }
  ],
  meta: [
    { name: 'theme-color', content: '#000000' }
  ]
})
</script>
