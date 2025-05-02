<template>
  <div class="flex items-center">
    <button 
      @click="toggleDarkMode" 
      class="relative w-14 h-7 rounded-full transition-all duration-300 nm-flat overflow-hidden"
      :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <!-- Sun/Moon Icons -->
      <div class="absolute inset-0 flex items-center justify-between px-1.5">
        <!-- Sun Icon -->
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5 text-yellow-400 transition-opacity duration-300" 
          :class="isDarkMode ? 'opacity-0' : 'opacity-100'"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        
        <!-- Moon Icon -->
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5 text-indigo-200 transition-opacity duration-300" 
          :class="isDarkMode ? 'opacity-100' : 'opacity-0'"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </div>
      
      <!-- Toggle Knob -->
      <div 
        class="absolute top-1 left-1 w-5 h-5 rounded-full nm-convex transition-transform duration-300"
        :class="isDarkMode ? 'translate-x-7' : ''"
      ></div>
    </button>
    
    <span v-if="showLabel" class="ml-3 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
      {{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  showLabel: {
    type: Boolean,
    default: false
  }
});

const colorMode = useColorMode();
const isDarkMode = ref(false);

// Initialize dark mode state
onMounted(() => {
  isDarkMode.value = colorMode.preference === 'dark';
});

// Watch for changes to color mode preference
watch(() => colorMode.preference, (newValue) => {
  isDarkMode.value = newValue === 'dark';
});

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  colorMode.preference = isDarkMode.value ? 'dark' : 'light';
  
  // Apply dark class to html element for CSS variables
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
</script>
