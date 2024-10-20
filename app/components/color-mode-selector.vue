<template>
  <div class="flex space-x-2 items-center">
    <div class="text-gray-500 text-xs">Change to {{ nextMode }}</div>
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
  background-color: #a268dd; /* Default background */
  border-radius: 20px; /* Adjusted rounded edges */
  transition: background-color 0.3s;
}

.toggle-indicator:before {
  position: absolute;
  content: "";
  height: 16px; /* Reduced height of the knob */
  width: 16px; /* Reduced width of the knob */
  left: 2px; /* Adjusted position of the knob */
  bottom: 2px; /* Adjusted position of the knob */
  background-color: white; /* Knob color */
  border-radius: 50%; /* Circle knob */
  transition: transform 0.3s;
}

/* Checked styles */
input:checked + .toggle-indicator {
  background-color: #4CAF50; /* Green for the toggle */
}

input:checked + .toggle-indicator:before {
  transform: translateX(20px); /* Move knob on toggle */
}

</style>
