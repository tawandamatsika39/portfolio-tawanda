<template>
  <div class="not-prose">
    <div v-if="searchable" class="mb-10 space-y-5">
      <label class="relative block">
        <Icon name="mdi:magnify" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stardust/40" size="16" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="w-full border hairline bg-obsidian/60 py-3 pl-10 pr-4 text-sm text-snow outline-none transition-colors duration-300 placeholder:text-[11px] placeholder:uppercase placeholder:tracking-vast placeholder:text-stardust/40 focus:border-spice/60"
        />
      </label>
      <div v-if="allTags.length" class="flex flex-wrap items-center gap-2">
        <button
          class="border px-3 py-1 text-[10px] uppercase tracking-orbit transition-colors duration-300"
          :class="activeTag === null ? 'border-spice/60 text-spice' : 'hairline text-stardust/50 hover:text-stardust'"
          @click="activeTag = null"
        >
          All
        </button>
        <button
          v-for="tag in allTags"
          :key="tag"
          class="border px-3 py-1 text-[10px] uppercase tracking-orbit transition-colors duration-300"
          :class="activeTag === tag ? 'border-spice/60 text-spice' : 'hairline text-stardust/50 hover:text-stardust'"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <slot :posts="filteredPosts">
      <section>
        <ul v-if="filteredPosts.length" class="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          <li v-for="post in filteredPosts" :key="post._path">
            <NuxtLink :to="post._path" class="group block px-2 py-8 transition-colors duration-300 hover:bg-white/[0.03]">
              <div class="mb-2 text-[10px] uppercase tracking-vast text-stardust/50">
                {{ post.dateLabel }}
              </div>
              <div class="flex items-baseline justify-between gap-6">
                <h3 class="font-display text-xl text-snow transition-colors duration-300 group-hover:text-spice md:text-2xl">
                  {{ post.title }}
                </h3>
                <span class="hidden shrink-0 text-[10px] uppercase tracking-vast text-stardust/40 transition-colors duration-300 group-hover:text-stardust md:block">
                  Read
                </span>
              </div>
              <p v-if="post.description" class="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-stardust">
                {{ post.description }}
              </p>
              <div v-if="post.tags.length" class="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                <span v-for="tag in post.tags" :key="tag" class="text-[10px] uppercase tracking-orbit text-stardust/50">
                  {{ tag }}
                </span>
              </div>
            </NuxtLink>
          </li>
        </ul>
        <p v-else class="border-y border-white/[0.07] py-10 text-center text-xs uppercase tracking-vast text-stardust/60">
          No signal on that frequency — clear the search or tags
        </p>
      </section>
    </slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  limit: {
    type: Number,
    default: 0
  },
  searchable: {
    type: Boolean,
    default: false
  }
})

const {data} = await useAsyncData(
  `blog-list-${props.limit}`,
  ()=> {
    const query = queryContent('/blog').where({_path :{ $ne: '/blog'}})
                            .only(['_path', 'title', 'description', 'publishedAt', 'tags'])
                            .sort({publishedAt: -1})

    if (props.limit)
      query.limit(props.limit)

    return query.find()
  });

// 'YYYY-MM-DD HH:mm:ss' is not ISO-8601; Safari rejects the space form, so swap it for 'T'.
const parsePublishedAt = (value: unknown) =>
  new Date(typeof value === 'string' ? value.replace(' ', 'T') : (value as string | number))

const posts = computed(() =>
  (data.value ?? []).map((post) => ({
    ...post,
    tags: (post.tags ?? []) as string[],
    dateLabel: parsePublishedAt(post.publishedAt)
      .toLocaleDateString('en-US', {month: 'short', year: 'numeric'})
      .toUpperCase()
  }))
)

const searchQuery = ref('')
const activeTag = ref<string | null>(null)

const allTags = computed(() => {
  const tags = new Set<string>()
  for (const post of posts.value)
    for (const tag of post.tags)
      tags.add(tag)
  return [...tags].sort()
})

const filteredPosts = computed(() => {
  if (!props.searchable)
    return posts.value

  const q = searchQuery.value.trim().toLowerCase()
  return posts.value.filter((post) => {
    const matchesQuery = !q
      || post.title?.toLowerCase().includes(q)
      || post.description?.toLowerCase().includes(q)
    const matchesTag = !activeTag.value || post.tags.includes(activeTag.value)
    return matchesQuery && matchesTag
  })
})

const toggleTag = (tag: string) => {
  activeTag.value = activeTag.value === tag ? null : tag
}
</script>
