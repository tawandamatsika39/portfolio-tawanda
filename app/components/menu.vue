<template>
  <nav>
    <!-- Desktop -->
    <div class="hidden md:flex md:items-center md:space-x-10">
      <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="nav-link">
        {{ item.label }}
      </NuxtLink>
    </div>

    <!-- Mobile toggle -->
    <button
      type="button"
      class="relative z-[60] block h-6 w-6 md:hidden focus:outline-none"
      :class="{ open }"
      aria-label="Toggle menu"
      @click="open = !open"
    >
      <span class="hamburger-top" />
      <span class="hamburger-middle" />
      <span class="hamburger-bottom" />
    </button>

    <!-- Mobile overlay: teleported to body because the header's backdrop-blur
         makes it the containing block for fixed descendants, which would clip
         the overlay to the header bar. Sits below the header (z-40 < z-50)
         so the hamburger stays tappable. -->
    <Teleport to="body">
      <Transition name="veil">
        <div
          v-if="open"
          class="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-10 bg-void/95 backdrop-blur-lg md:hidden"
        >
          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="nav-link text-lg"
            @click="open = false"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>

<script lang="ts" setup>
const open = ref(false)

const items = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' }
]

const route = useRoute()
watch(() => route.path, () => {
  open.value = false
})
</script>

<style scoped>
.nav-link {
  @apply text-xs font-light uppercase tracking-vast text-stardust transition-colors duration-300 hover:text-snow;
}

.nav-link.router-link-active {
  @apply text-snow;
  border-bottom: 1px solid rgba(212, 175, 55, 0.6);
  padding-bottom: 2px;
}

.veil-enter-active,
.veil-leave-active {
  transition: opacity 0.35s ease;
}
.veil-enter-from,
.veil-leave-to {
  opacity: 0;
}

.hamburger-top,
.hamburger-middle,
.hamburger-bottom {
  position: absolute;
  width: 24px;
  height: 1px;
  top: 4px;
  left: 0;
  background: #9ba0a8;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.hamburger-middle {
  transform: translateY(7px);
}

.hamburger-bottom {
  transform: translateY(14px);
}

.open .hamburger-top {
  transform: translateY(7px) rotate(45deg);
  background: #f5f5f7;
}

.open .hamburger-middle {
  opacity: 0;
}

.open .hamburger-bottom {
  transform: translateY(7px) rotate(-45deg);
  background: #f5f5f7;
}
</style>
