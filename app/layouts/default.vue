<template>
  <div>
    <div class="fixed inset-0 -z-10 bg-night-950 bg-chevron opacity-[0.04] pointer-events-none" aria-hidden="true"></div>
    <div class="container mx-auto max-w-4xl">
      <header class="flex justify-between items-start md:items-center mt-5 pb-4 border-b border-primary-900/40">
        <div class="flex items-center md:space-x-16">
          <div class="hidden md:block">
            <NuxtLink to="/" class="group">
              <img
                src="/images/logo.png"
                alt="logo"
                class="w-24 h-auto transition-all duration-300 drop-shadow-[0_0_0px_rgba(162,104,221,0)] dark:drop-shadow-[0_0_10px_rgba(162,104,221,0.55)] group-hover:drop-shadow-[0_0_16px_rgba(34,211,238,0.7)]"
              />
            </NuxtLink>
          </div>
          <Menu/>

        </div>
        <ClientOnly>
          <ColorModeSelector/>
        </ClientOnly>
        <SpeedInsights/>
      </header>
      <main class="p-2 mt-10">
        <slot />
      </main>

      <ChevronDivider class="opacity-40 my-6" />
      <footer class="p-4 text-center mt-10">
        <p class="font-mono text-xs text-gray-600 dark:text-gray-500">
          © 2024 Tawanda Matsika. All rights reserved.
        </p>
        <p class="mt-2">
          <!-- <a
            href="https://buymeacoffee.com/tawandamatsika"
            target="_blank"
            class="text-slate-500 hover:underline">
            Buy me a coffee ☕
          </a> -->
        </p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';
// const colorMode = useColorMode()
// console.log(colorMode)

useHead({
  titleTemplate: '%s - Tawanda.Matsika',
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
      crossorigin: ''
    }
  ]
})
</script>