<template>
  <div>
    <!-- <NuxtRouteAnnouncer /> -->
     <NuxtLayout>
      <NuxtPage/>
     </NuxtLayout>
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, filter 0.25s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(4px) brightness(1.4) hue-rotate(15deg);
}
</style>