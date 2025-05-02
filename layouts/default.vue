<script setup lang="ts">
/**
 * Default layout for the application.
 * This layout is used when no other layout is specified.
 */
import DarkModeToggle from '~/components/neumorphic/DarkModeToggle.vue';
</script>

<template>
  <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] dark-mode-transition">
    <!-- Dark Mode Toggle -->
    <div class="fixed top-4 right-4 z-10">
      <DarkModeToggle />
    </div>

    <slot />
  </div>
</template>