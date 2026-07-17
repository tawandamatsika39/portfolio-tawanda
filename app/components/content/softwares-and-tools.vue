<template>
  <div>
    <div class="flex flex-wrap gap-8">
      <div
        v-for="(tool, index) in tools"
        :key="index"
        class="w-1/4 flex flex-col"
      >
        <Icon :name="tool.iconClass" style="color: white" size="48"/>
        <span class="text-lg font-medium">{{ tool.name }}</span>
        
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
  { name: "Vaadin", iconClass: "mdi:alpha-v"},
  { name: "GraphQL", iconClass: "mdi:graphql"},
  { name: "Claude Code", iconClass: "mdi:robot-outline"},
  { name: "MSSQL", iconClass: "devicon:microsoftsqlserver"},
  { name: "Jira", iconClass: "devicon:jira"},
  { name: "Cypress", iconClass: "devicon:cypressio"},
]);

</script>

<style scoped>
/* No extra styles needed, TailwindCSS handles layout and design */
</style>
