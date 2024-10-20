<template>
  <div>
    <blog-posts v-slot="{posts}" :limit=5>
      <div v-for="post in posts" :key="post.id">
        <NuxtLink :to="post._path">{{post.title }}</NuxtLink>
      </div>
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

<style>

</style>