<template>
  <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] dark-mode-transition">
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

    <div v-else class="p-4 md:p-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-8 text-[rgb(var(--color-neumorphic-text))]">
          AI Partner Matching Assistant
        </h1>

        <p class="text-center text-[rgb(var(--color-neumorphic-text))/70] mb-8">
          Chat with our AI assistant to find potential business partners, search profiles, or get recommendations.
        </p>

        <!-- Chat Interface -->
        <ChatInterface />

        <!-- Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <NeumorphicCard variant="flat" class="text-center">
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 rounded-full nm-flat flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-[rgb(var(--color-neumorphic-accent))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))] mb-2">
                Semantic Search
              </h3>
              <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">
                Find partners based on meaning, not just keywords. Our AI understands what you're looking for.
              </p>
            </div>
          </NeumorphicCard>

          <NeumorphicCard variant="flat" class="text-center">
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 rounded-full nm-flat flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-[rgb(var(--color-neumorphic-accent))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))] mb-2">
                Partner Matching
              </h3>
              <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">
                Get matched with businesses and professionals that complement your skills and needs.
              </p>
            </div>
          </NeumorphicCard>

          <NeumorphicCard variant="flat" class="text-center">
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 rounded-full nm-flat flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-[rgb(var(--color-neumorphic-accent))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))] mb-2">
                Natural Language
              </h3>
              <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">
                Just chat naturally with our AI assistant. No need to learn complex search syntax.
              </p>
            </div>
          </NeumorphicCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useDataConnect } from '~/composables/useDataConnect';
import ChatInterface from '~/components/chat/ChatInterface.vue';
import NeumorphicCard from '~/components/neumorphic/Card.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';

const router = useRouter();

// Initialize Firebase Auth
const { isAuthenticated, isLoading } = useFirebaseAuth();

// Initialize DataConnect
const dataConnect = useDataConnect();

// Fetch user data on mount
onMounted(async () => {
  if (!isLoading.value && isAuthenticated.value) {
    await dataConnect.fetchCurrentUser();
    await dataConnect.fetchUserProfiles();
    await dataConnect.fetchUserWorkspaces();
  }
});
</script>
