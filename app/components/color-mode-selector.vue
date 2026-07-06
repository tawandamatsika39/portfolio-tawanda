<template>
  <div class="flex space-x-2 items-center">
    <div class="font-mono text-xs text-gray-500">Change to {{ nextMode }}</div>
    <label class="toggle-button">
      <input type="checkbox" @click="toggleMode" />
      <span class="toggle-indicator" :class="nextMode"></span>
    </label>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

const modes = ['light', 'dark'];

const nextMode = computed(() => {
  const currentModeIndex = modes.indexOf(colorMode.preference);
  const nextModeIndex = (currentModeIndex + 1) % modes.length;
  return modes[nextModeIndex];
});

const toggleMode = () => {
  colorMode.preference = nextMode.value;
};
</script>

<style>
.toggle-button {
  position: relative;
  display: inline-block;
  width: 40px; /* Reduced width of the toggle */
  height: 20px; /* Reduced height of the toggle */
}

.toggle-button input {
  opacity: 0; /* Hide the default checkbox */
  width: 0;
  height: 0;
}

.toggle-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #c17f3f; /* ochre — light mode state */
  border-radius: 20px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.toggle-indicator:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
}

/* Checked styles — dark mode state, neon glow */
input:checked + .toggle-indicator {
  background-color: #1c1c2b;
  box-shadow: 0 0 6px rgba(34, 211, 238, 0.7), 0 0 20px rgba(34, 211, 238, 0.4);
}

input:checked + .toggle-indicator:before {
  transform: translateX(20px);
  background-color: #67e8f9;
  box-shadow: 0 0 6px rgba(34, 211, 238, 0.7);
}

</style>
