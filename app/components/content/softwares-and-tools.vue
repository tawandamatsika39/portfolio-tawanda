<template>
  <div class="not-prose">
    <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
      <div
        v-for="(tool, index) in tools"
        :key="index"
        class="group flex flex-col items-center gap-2 p-4 rounded-xl border border-primary-800/40 bg-night-900/40 backdrop-blur-sm transition-all duration-300 hover:border-neon-400/60 hover:shadow-glow-neon hover:-translate-y-1"
      >
        <Icon :name="tool.iconClass" size="40" class="text-gray-300 group-hover:text-neon-300 transition-colors" />
        <span class="text-xs font-mono text-gray-400 group-hover:text-gray-200">{{ tool.name }}</span>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
const tools = ref([
  { name: "Java", iconClass: "devicon:java" },
  { name: "Spring Boot", iconClass: "devicon:spring" },
  { name: "Vue.js", iconClass: "devicon:vuejs" },
  { name: "Nuxt", iconClass: "devicon:nuxtjs" },
  { name: "Javascript", iconClass: "devicon:javascript" },
  { name: "TypeScript", iconClass: "devicon:typescript" },
  { name: "Firebase", iconClass: "devicon:firebase" },
  { name: "MySQL", iconClass: "devicon:mysql" },
  { name: "Docker", iconClass: "devicon:docker" },
  { name: "Linux", iconClass: "devicon:linux" },
  { name: "Git", iconClass: "devicon:git" },
  { name: "Postman", iconClass: "devicon:postman"},
  { name: "Dbeaver", iconClass: "devicon:dbeaver"},
  { name: "Hibernate", iconClass: "devicon:hibernate"},
  { name: "IntelliJ", iconClass: "devicon:intellij"},
  { name: "Trello", iconClass: "devicon:trello"},
]);

</script>

<style scoped>
/* No extra styles needed, TailwindCSS handles layout and design */
</style>
