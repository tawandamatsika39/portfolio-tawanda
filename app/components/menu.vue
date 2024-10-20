<template>
  <div class="container max-w-6xl mx-auto px-6 py-6">
    <div class="nav flex items-center justify-between font-bold">
      <div class="hidden h-10 font-alata md:flex md:space-x-8">
        <div class="group">
          <NuxtLink to="/" class="link">Home</NuxtLink>
          <div class="mx-2 group-hover:border-b border-[#8546c5]"></div>
        </div>
        <div class="group">
          <NuxtLink to="/about" class="link">About</NuxtLink>
          <div class="mx-2 group-hover:border-b border-[#8546c5]"></div>
        </div>
        <div class="group">
          <NuxtLink to="/projects" class="link">Projects</NuxtLink>
          <div class="mx-2 group-hover:border-b border-[#8546c5]"></div>
        </div>
        <div class="group">
          <NuxtLink to="/blog" class="link">Blog</NuxtLink>
          <div class="mx-2 group-hover:border-b border-[#8546c5]"></div>
        </div>
      </div>
      <div class="md:hidden">
        <button
          id="menu-btn"
          type="button"
          class="z-40 block hamburger md:hidden focus:outline-none"
          @click="displayMenu"
        >
          <span class="hamburger-top"></span>
          <span class="hamburger-middle"></span>
          <span class="hamburger-bottom"></span>
        </button>
      </div>
    </div>

    <div
      id="menu"
      class="absolute top-0 bottom-0 left-0 hidden flex-col self-end w-1/2 min-h-screen py-1 pt-40 pl-12 space-y-3 text-lg uppercase dark:bg-slate-950 bg-stone-100 menu-text-color"
    >
      <div class="group">
          <NuxtLink to="/" class="link" @click="closeMenu">Home</NuxtLink>
          <div class="mx-2 group-hover:border-b w-8 border-[#8546c5]"></div>
        </div>
        <div class="group">
          <NuxtLink to="/about" class="link" @click="closeMenu">About</NuxtLink>
          <div class="mx-2 group-hover:border-b w-8 border-[#8546c5]"></div>
        </div>
        <div class="group">
          <NuxtLink to="/projects" class="link" @click="closeMenu">Projects</NuxtLink>
          <div class="mx-2 group-hover:border-b w-8 border-[#8546c5]"></div>
        </div>
        <div class="group">
          <NuxtLink to="/blog" class="link" @click="closeMenu">Blog</NuxtLink>
          <div class="mx-2 group-hover:border-b w-8 border-[#8546c5]"></div>
        </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    displayMenu() {
      const toggleBtn = document.getElementById('menu-btn');
      const menu = document.getElementById('menu');
      if (toggleBtn) toggleBtn.classList.toggle('open');
      if (menu) {
        menu.classList.toggle('flex');
        menu.classList.toggle('hidden');
      }
    },
    closeMenu() {
      this.displayMenu();
    }
  }
});
</script>

<style>
.link {
  @apply p-1  text-2xl md:text-base
}

/* hover:bg-gray-200 dark:hover:bg-gray-800 */

.menu-text-color {
  color: #8e8c8e;
}

.hamburger {
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: all 0.25s;
  position: relative;
}

.hamburger-top,
.hamburger-middle,
.hamburger-bottom {
  position: absolute;
  width: 24px;
  height: 2px;
  top: 0;
  left: 0;
  background: #8e8c8e;
  transition: all 0.5s;
}

.hamburger-middle {
  transform: translateY(7px);
}

.hamburger-bottom {
  transform: translateY(14px);
}

.open {
  transform: rotate(90deg);
}

.open .hamburger-top {
  transform: rotate(45deg) translateY(6px) translateX(6px);
}

.open .hamburger-middle {
  display: none;
}

.open .hamburger-bottom {
  transform: rotate(-45deg) translateY(6px) translateX(-6px);
}
</style>
