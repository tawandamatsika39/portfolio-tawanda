<template>
  <div class="not-prose rounded-lg border border-primary-700/40 bg-night-900/80 backdrop-blur-sm shadow-glow-card overflow-hidden">
    <div class="flex items-center gap-2 px-4 py-2 border-b border-primary-800/40 bg-night-800/60">
      <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
      <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
      <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
      <span class="ml-3 font-mono text-xs text-gray-500">~/tawanda-matsika</span>
    </div>

    <ClientOnly>
      <div class="px-4 py-5 font-mono text-sm md:text-base space-y-1">
        <div v-for="(line, index) in visibleLines" :key="index">
          <span v-if="line.type === 'command'">
            <span class="text-neon-400">$</span> <span class="text-gray-200">{{ line.display }}</span>
          </span>
          <span v-else class="text-primary-300">{{ line.display }}</span>
        </div>
        <span class="inline-block w-2.5 h-4 bg-neon-green animate-blink align-middle"></span>
      </div>

      <template #fallback>
        <div class="px-4 py-5 font-mono text-sm md:text-base space-y-1">
          <div v-for="(line, index) in lines" :key="index">
            <span v-if="line.type === 'command'">
              <span class="text-neon-400">$</span> <span class="text-gray-200">{{ line.text }}</span>
            </span>
            <span v-else class="text-primary-300">{{ line.text }}</span>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const lines = [
  { type: 'command', text: 'whoami' },
  { type: 'output', text: 'tawanda_matsika' },
  { type: 'command', text: 'cat mission.txt' },
  { type: 'output', text: 'Senior Java Engineer · Cape Town, Zimbabwean roots \u{1F1FF}\u{1F1FC}' },
  { type: 'output', text: 'Building digital transformation, one commit at a time.' },
];

const visibleLines = ref(lines.map((line) => ({ ...line, display: '' })));

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    visibleLines.value = lines.map((line) => ({ ...line, display: line.text }));
    return;
  }

  let lineIndex = 0;

  const typeLine = () => {
    if (lineIndex >= lines.length) return;

    const line = lines[lineIndex];

    if (line.type === 'output') {
      visibleLines.value[lineIndex].display = line.text;
      lineIndex += 1;
      setTimeout(typeLine, 250);
      return;
    }

    let charIndex = 0;
    const typeChar = () => {
      if (charIndex >= line.text.length) {
        lineIndex += 1;
        setTimeout(typeLine, 400);
        return;
      }
      charIndex += 1;
      visibleLines.value[lineIndex].display = line.text.slice(0, charIndex);
      setTimeout(typeChar, 35);
    };
    typeChar();
  };

  typeLine();
});
</script>
