<script setup lang="ts">
/**
 * Default layout for the application.
 * This layout is used when no other layout is specified.
 */
import DarkModeToggle from '~/components/neumorphic/DarkModeToggle.vue';
import MainNavigation from '~/components/navigation/MainNavigation.vue';
</script>

<template>
  <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] dark-mode-transition">
    <!-- Main Navigation -->
    <MainNavigation />

    <!-- Dark Mode Toggle -->
    <div class="fixed top-4 right-4 z-20">
      <DarkModeToggle />
    </div>

    <!-- Main Content -->
    <div class="pt-16">
      <slot />
    </div>
  </div>
</template>