<template>
  <div class="not-prose">
    <blog-posts v-slot="{posts}" :limit=5>
      <ul class="divide-y divide-white/[0.07] border-y border-white/[0.07]">
        <li v-for="post in posts" :key="post._path">
          <NuxtLink :to="post._path" class="group flex items-baseline justify-between gap-6 py-5 px-2 transition-colors duration-300 hover:bg-white/[0.03]">
            <span class="font-display text-lg text-snow md:text-xl">
              {{ post.title }}
            </span>
            <span class="shrink-0 text-[10px] uppercase tracking-vast text-stardust/40 transition-colors duration-300 group-hover:text-stardust">
              Read
            </span>
          </NuxtLink>
        </li>
      </ul>
    </blog-posts>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  limit: {
    type: Number,
    default: 0
  }
})
</script>
