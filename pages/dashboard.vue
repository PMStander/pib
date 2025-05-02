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

    <div v-else class="relative">
      <!-- Header with Sign Out Button -->
      <div class="bg-[rgb(var(--color-neumorphic-bg))] dark-mode-transition border-b border-[rgb(var(--color-neumorphic-dark)/0.1)] p-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold text-[rgb(var(--color-neumorphic-text))]">Partners in Biz</h1>
          <div class="flex items-center space-x-4">
            <NeumorphicButton
              variant="flat"
              size="sm"
              @click="handleSignOut"
            >
              Sign Out
            </NeumorphicButton>
          </div>
        </div>
      </div>

      <!-- Dashboard Page Component -->
      <DashboardPage
        :user="user"
        :workspaces="userWorkspaces"
        :activities="userActivities"
        @edit-profile="handleEditProfile"
        @create-workspace="handleCreateWorkspace"
        @view-all-activity="handleViewAllActivity"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useDataConnect } from '~/composables/useDataConnect';
import { useAppState } from '~/composables/useAppState';
import DashboardPage from '~/components/pages/DashboardPage.vue';

const router = useRouter();

// Initialize Firebase Auth
const { user, isAuthenticated, isLoading, signOut } = useFirebaseAuth();

// Initialize DataConnect and AppState
const dataConnect = useDataConnect();
const appState = useAppState();

// User workspaces - use computed to get the current workspaces from appState
const userWorkspaces = computed(() => {
  console.log('dashboard.vue - Computing userWorkspaces from appState:', appState.userWorkspaces.value);
  return appState.userWorkspaces.value || [];
});

// User activities
const userActivities = ref([
  {
    description: 'You logged in to your account',
    date: new Date()
  },
  {
    description: 'Your profile was updated',
    date: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    description: 'Your account was created',
    date: new Date(Date.now() - 172800000) // 2 days ago
  }
]);

// Fetch user data
const fetchUserData = async () => {
  if (isAuthenticated.value) {
    try {
      // Fetch user workspaces - this will update dataConnect.currentUserWorkspaces
      await dataConnect.fetchUserWorkspaces();
      console.log('dashboard.vue - Fetched workspaces, computed userWorkspaces:', userWorkspaces.value);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
};

// Handle sign out
const handleSignOut = async () => {
  try {
    await signOut();
    router.push('/login');
  } catch (error) {
    console.error('Sign out failed:', error);
  }
};

// Handle edit profile
const handleEditProfile = () => {
  // This would navigate to a profile edit page
  console.log('Edit profile clicked');
  // router.push('/profile/edit');
};

// Handle create workspace
const handleCreateWorkspace = () => {
  // This would open a modal or navigate to a workspace creation page
  console.log('Create workspace clicked');
  // router.push('/workspaces/create');
};

// Handle view all activity
const handleViewAllActivity = () => {
  // This would navigate to an activity log page
  console.log('View all activity clicked');
  // router.push('/activity');
};

// Fetch user data on mount
onMounted(async () => {
  if (!isLoading.value && isAuthenticated.value) {
    await fetchUserData();
  }
});
</script>
