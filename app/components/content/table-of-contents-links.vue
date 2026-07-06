<template>
  <div>
    <ul class="font-mono text-sm">
      <li v-for="link in links" :key="link.id">
        <NuxtLink
          :to="{path: route.path, hash: `#${link.id}`}"
          class="text-gray-400"
          :class="{'ml-4': level, 'text-neon-400 border-l-2 border-neon-400 pl-2': activeId === link.id}"
        >
          {{link.text }}
        </NuxtLink>
        <TableOfContentsLinks :links="link.children"  :level="level + 1" :active-id="activeId"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
defineProps({
  links: Array,
  level: {
    type: Number,
    default: 0
  },
  activeId: {
    type: String,
    default: null
  }
})
</script>

<style>

</style>