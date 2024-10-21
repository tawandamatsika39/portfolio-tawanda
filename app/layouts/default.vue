<template>
  <div class="container mx-auto max-w-4xl">
    <header class="flex justify-between items-start md:items-center mt-5">
      <div class="flex items-center md:space-x-16">
        <div class="hidden md:block">
          <NuxtLink to="/">
            <img src="/images/logo.png" alt="logo" class="w-24 h-auto"/>
          </NuxtLink>
        </div>
        <Menu/>

      </div>
      <ClientOnly>
        <ColorModeSelector/>
      </ClientOnly>
    </header>
    <main class="p-2 mt-10">
      <slot />
    </main>

    <hr/>
    <footer class="p-4  text-center mt-10">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        © 2024 Tawanda Matsika. All rights reserved.
      </p>
      <p class="mt-2">
        <a 
          href="https://buymeacoffee.com/tawandamatsika" 
          target="_blank" 
          class="text-slate-500 hover:underline">
          Buy me a coffee ☕
        </a>
      </p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
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
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: ''
    }
  ]
})
</script>

<style>
body {
  font-family: 'Roboto';
}

body {
  @apply bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200
}
</style>