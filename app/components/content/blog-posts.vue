<template>
  <div>
    <slot :posts="posts">
      <section class="not-prose">
        <ul class="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          <li v-for="post in posts" :key="post._path">
            <NuxtLink :to="post._path" class="group flex items-baseline gap-8 py-6 px-2 transition-colors duration-300 hover:bg-white/[0.03]">
              <div class="w-14 shrink-0 text-xs uppercase tracking-orbit" :class="post.displayYear ? 'text-stardust/60' : 'text-transparent'">
                {{ post.year }}
              </div>
              <div class="font-display text-xl text-snow md:text-2xl">
                {{ post.title }}
              </div>
              <div class="ml-auto hidden shrink-0 text-[10px] uppercase tracking-vast text-stardust/40 transition-colors duration-300 group-hover:text-stardust md:block">
                Read
              </div>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  limit: {
    type: Number,
    default: 0
  }
})

const {data} = await useAsyncData(
  'blog-list',
  ()=> {
    const query = queryContent('/blog').where({_path :{ $ne: '/blog'}})
                            .only(['_path', 'title', 'publishedAt'])
                            .sort({publishedAt: -1})

    if (props.limit)
      query.limit(props.limit)

    return query.find()
  });


  const posts = computed(() => {
    if (!data.value){
      return [];
    }

    const result = []
    let lastYear = null;
    for(const post of data.value){
      const year = new Date(post.publishedAt).getFullYear()
      const displayYear = year != lastYear;
      post.displayYear = displayYear;
      post.year = year
      result.push(post)
      lastYear = year;
    }
    return result;
  })
</script>
