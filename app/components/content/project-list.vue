<template>
  <div class="not-prose">
    <section v-if="status === 'pending'" class="text-xs uppercase tracking-vast text-stardust/60">Scanning the archive…</section>
    <section v-else-if="error" class="text-xs uppercase tracking-vast text-stardust/80">Signal lost — try again</section>
    <section v-else>
      <div v-for="{ year, repos } in reposByYear" :key="year" class="mb-16">
        <h2 class="mb-6 border-b border-white/[0.07] pb-3">
          <span class="font-display text-3xl font-semibold text-snow">{{ year }}</span>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07]">
          <a
            v-for="repo in repos"
            :key="repo.id"
            :href="repo.html_url"
            target="_blank"
            class="group flex flex-col bg-void p-6 transition-colors duration-300 hover:bg-obsidian"
          >
            <div class="flex items-start justify-between gap-2 mb-3">
              <span class="text-sm font-medium tracking-orbit uppercase text-snow break-all">{{ repo.name }}</span>
              <span v-if="repo.stargazers_count > 0" class="flex items-center gap-1 text-xs text-stardust/70 shrink-0">
                ★ {{ repo.stargazers_count }}
              </span>
            </div>

            <p class="text-xs font-light leading-relaxed text-stardust flex-1 mb-5 line-clamp-3">
              {{ repo.description || 'No description provided.' }}
            </p>

            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
              <span
                v-if="repo.language"
                class="flex items-center gap-1.5 text-[10px] uppercase tracking-orbit text-snow/80"
              >
                <span class="h-1 w-1 rounded-full" :style="{ backgroundColor: languageColor(repo.language) }" />
                {{ repo.language }}
              </span>
              <span
                v-for="topic in repo.topics.slice(0, 3)"
                :key="topic"
                class="text-[10px] uppercase tracking-orbit text-stardust/50"
              >
                {{ topic }}
              </span>
            </div>

            <div class="text-[10px] uppercase tracking-orbit text-stardust/40 text-right">
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
