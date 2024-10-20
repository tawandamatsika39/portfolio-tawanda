<template>
  <div class="not-prose">
    <section v-if="status === 'pending'">Loading...</section>
    <section v-else-if="error">Something went wrong... Try again</section>
    <section v-else>
      <ul class="grid grid-cols-1 gap-4">
        <li v-for="repository in repos" :key="repository.id" class="border border-gray rounded-sm p-4 hover:bg-slate-200 dark:hover:bg-slate-800 font-mono" >
          <a :href="repository.html_url" target="_blank">
            <div class="flex items-center justify-between">
              <div class="font-semibold">{{ repository.name }}</div>
              <div>{{repository.formattedCreateDate}}</div>
            </div>
            <p class="text-sm">
              {{repository.description}}
            </p>
          </a>
        </li>

      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { data, status, error, refresh, clear } = await useFetch('https://api.github.com/users/tawandamatsika39/repos')

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const repos = computed(
  () => data.value.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map(item => ({
                    ...item,
                    formattedCreateDate: formatDate(new Date(item.created_at))
                  }))
)
</script>

<style>

</style>