import { defineNuxtPlugin } from 'nuxt/app';
import { useColorMode } from '#imports';
import { watch } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client-side
  if (process.client) {
    const colorMode = useColorMode();

    // Apply dark class to html element based on color mode preference
    const applyDarkMode = () => {
      if (colorMode.preference === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Apply dark mode on initial load
    applyDarkMode();

    // Watch for changes to color mode preference
    nuxtApp.hook('app:mounted', () => {
      // Re-apply dark mode when app is mounted
      applyDarkMode();

      // Watch for changes to color mode preference
      watch(() => colorMode.preference, () => {
        applyDarkMode();
      });
    });
  }
});
