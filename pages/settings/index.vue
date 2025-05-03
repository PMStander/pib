<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold mb-6">Settings</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Settings Navigation -->
      <div class="nm-flat p-6 rounded-xl">
        <h2 class="text-xl font-semibold mb-4">Settings</h2>
        <nav class="space-y-2">
          <NuxtLink
            v-for="(item, index) in settingsItems"
            :key="index"
            :to="item.path"
            class="block px-4 py-2 rounded-md text-[rgb(var(--color-neumorphic-text))]"
            :class="$route.path === item.path ? 'nm-pressed text-[rgb(var(--color-neumorphic-accent))]' : 'hover:bg-[rgb(var(--color-neumorphic-dark))/10]'"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
      
      <!-- Settings Content -->
      <div class="md:col-span-2 nm-flat p-6 rounded-xl">
        <h2 class="text-xl font-semibold mb-4">Account Settings</h2>
        <p class="text-[rgb(var(--color-neumorphic-text))/70] mb-4">
          Manage your account settings and preferences.
        </p>
        
        <div class="space-y-4">
          <div
            v-for="(item, index) in settingsItems"
            :key="index"
            class="p-4 rounded-md hover:bg-[rgb(var(--color-neumorphic-dark))/10]"
          >
            <h3 class="text-lg font-medium">{{ item.name }}</h3>
            <p class="text-[rgb(var(--color-neumorphic-text))/70]">{{ item.description }}</p>
            <NuxtLink
              :to="item.path"
              class="mt-2 inline-block text-[rgb(var(--color-neumorphic-accent))]"
            >
              Manage {{ item.name.toLowerCase() }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';

// Get authentication state
const { isAuthenticated } = useFirebaseAuth();

// Redirect if not authenticated
onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo('/login');
  }
});

// Settings items
const settingsItems = [
  {
    name: 'Profile',
    path: '/profile',
    description: 'Update your profile information and preferences.'
  },
  {
    name: 'LLM Keys',
    path: '/settings/llm-keys',
    description: 'Manage your API keys for various LLM providers.'
  },
  {
    name: 'Notifications',
    path: '/settings/notifications',
    description: 'Configure your notification preferences.'
  },
  {
    name: 'Security',
    path: '/settings/security',
    description: 'Manage your account security settings.'
  }
];
</script>
