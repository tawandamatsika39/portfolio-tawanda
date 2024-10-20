<template>
  <div>
    <ul>
      <li v-for="link in links" :key="link.id">
        <NuxtLink :to="{path: route.path, hash: `#${link.id}`}" :class="{'ml-4': level, 'text-green-600 dark:text-green-400': activeId === link.id}">
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