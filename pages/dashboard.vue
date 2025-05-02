<template>
  <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] p-6">
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <div class="nm-flat p-6 rounded-xl">
        <p class="text-[rgb(var(--color-neumorphic-text))]">Loading...</p>
      </div>
    </div>
    
    <div v-else-if="!isAuthenticated" class="flex justify-center items-center h-screen">
      <NeumorphicCard title="Access Denied" class="w-full max-w-md">
        <p class="text-[rgb(var(--color-neumorphic-text))/70] mb-6">
          You need to be logged in to view this page.
        </p>
        <NeumorphicButton
          variant="convex"
          color="primary"
          class="w-full"
          @click="router.push('/login')"
        >
          Go to Login
        </NeumorphicButton>
      </NeumorphicCard>
    </div>
    
    <div v-else>
      <header class="mb-8">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-[rgb(var(--color-neumorphic-text))]">Dashboard</h1>
          <div class="flex items-center space-x-4">
            <div class="nm-flat px-4 py-2 rounded-lg">
              <p class="text-[rgb(var(--color-neumorphic-text))]">
                Welcome, {{ user?.displayName || 'User' }}
              </p>
            </div>
            <NeumorphicButton
              variant="flat"
              @click="handleSignOut"
            >
              Sign Out
            </NeumorphicButton>
          </div>
        </div>
      </header>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NeumorphicCard title="Profile" class="h-full">
          <div class="space-y-4">
            <div class="nm-pressed p-4 rounded-lg">
              <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">Email</p>
              <p class="text-[rgb(var(--color-neumorphic-text))]">{{ user?.email }}</p>
            </div>
            <div class="nm-pressed p-4 rounded-lg">
              <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">Name</p>
              <p class="text-[rgb(var(--color-neumorphic-text))]">{{ user?.displayName || 'Not set' }}</p>
            </div>
            <div class="nm-pressed p-4 rounded-lg">
              <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">Account ID</p>
              <p class="text-[rgb(var(--color-neumorphic-text))]">{{ user?.uid }}</p>
            </div>
          </div>
          <div class="mt-4">
            <NeumorphicButton
              variant="flat"
              color="primary"
              class="w-full"
            >
              Edit Profile
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
        
        <NeumorphicCard title="Recent Activity" class="h-full">
          <div class="space-y-2">
            <div v-for="(activity, index) in recentActivities" :key="index" class="nm-flat p-3 rounded-lg">
              <div class="flex justify-between">
                <p class="text-[rgb(var(--color-neumorphic-text))]">{{ activity.title }}</p>
                <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">{{ activity.date }}</p>
              </div>
              <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">{{ activity.description }}</p>
            </div>
          </div>
        </NeumorphicCard>
        
        <NeumorphicCard title="Quick Actions" class="h-full">
          <div class="grid grid-cols-2 gap-4">
            <NeumorphicButton
              variant="convex"
              color="primary"
              class="w-full"
            >
              Find Partners
            </NeumorphicButton>
            <NeumorphicButton
              variant="convex"
              class="w-full"
            >
              Messages
            </NeumorphicButton>
            <NeumorphicButton
              variant="convex"
              class="w-full"
            >
              Create Project
            </NeumorphicButton>
            <NeumorphicButton
              variant="convex"
              class="w-full"
            >
              Settings
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { user, isAuthenticated, isLoading, signOut } from '~/composables/useFirebaseAuth';

const router = useRouter();

// Sample recent activities
const recentActivities = ref([
  {
    title: 'Login',
    date: new Date().toLocaleDateString(),
    description: 'You logged in to your account'
  },
  {
    title: 'Profile Updated',
    date: new Date(Date.now() - 86400000).toLocaleDateString(),
    description: 'Your profile information was updated'
  },
  {
    title: 'Account Created',
    date: new Date(Date.now() - 172800000).toLocaleDateString(),
    description: 'Your account was created successfully'
  }
]);

// Handle sign out
const handleSignOut = async () => {
  try {
    await signOut();
    router.push('/login');
  } catch (error) {
    console.error('Sign out failed:', error);
  }
};

// Redirect if not authenticated after loading
onMounted(() => {
  // We'll wait for isLoading to be false before checking authentication
  // This is handled by the template conditionals
});
</script>
