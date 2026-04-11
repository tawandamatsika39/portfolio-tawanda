<template>
  <div class="not-prose">
    <section v-if="status === 'pending'" class="text-gray-500">Loading projects...</section>
    <section v-else-if="error" class="text-red-500">Something went wrong... Try again</section>
    <section v-else>
      <div v-for="{ year, repos } in reposByYear" :key="year" class="mb-10">
        <h2 class="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
          {{ year }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            v-for="repo in repos"
            :key="repo.id"
            :href="repo.html_url"
            target="_blank"
            class="flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150 font-mono"
          >
            <div class="flex items-start justify-between gap-2 mb-2">
              <span class="font-semibold text-sm break-all">{{ repo.name }}</span>
              <span v-if="repo.stargazers_count > 0" class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 shrink-0">
                ⭐ {{ repo.stargazers_count }}
              </span>
            </div>

            <p class="text-xs text-gray-600 dark:text-gray-400 flex-1 mb-3 line-clamp-3">
              {{ repo.description || 'No description provided.' }}
            </p>

            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-if="repo.language"
                :style="{ backgroundColor: languageColor(repo.language) }"
                class="text-xs text-white px-2 py-0.5 rounded-full"
              >
                {{ repo.language }}
              </span>
              <span
                v-for="topic in repo.topics.slice(0, 3)"
                :key="topic"
                class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full"
              >
                {{ topic }}
              </span>
            </div>

            <div class="text-xs text-gray-400 dark:text-gray-500 text-right">
              Updated {{ repo.formattedPushedAt }}
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { data, status, error } = await useFetch('https://api.github.com/users/tawandamatsika39/repos?per_page=100', {
  headers: {
    Accept: 'application/vnd.github.mercy-preview+json'
  }
})

const LANGUAGE_COLORS: Record<string, string> = {
  Java: '#f89820',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Vue: '#42b883',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Go: '#00ADD8',
  Kotlin: '#A97BFF',
}

const languageColor = (lang: string) => LANGUAGE_COLORS[lang] ?? '#8b8b8b'

const formatPushedAt = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const reposByYear = computed(() => {
  if (!data.value) return {}

  const sorted = [...data.value].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  const groups: Record<string, typeof sorted> = {}
  for (const repo of sorted) {
    const year = new Date(repo.created_at).getFullYear().toString()
    if (!groups[year]) groups[year] = []
    groups[year].push({
      ...repo,
      topics: repo.topics ?? [],
      formattedPushedAt: formatPushedAt(repo.pushed_at)
    })
  }

  // Sort years descending — return array to preserve insertion order (plain objects with
  // numeric keys are always iterated ascending by JS engines regardless of insertion order)
  return Object.entries(groups)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, repos]) => ({ year, repos }))
})
</script>
