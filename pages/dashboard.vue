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
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useDataConnect } from '~/composables/useDataConnect';
import { useAppState } from '~/composables/useAppState';
import { useSessionServer } from '~/composables/useSessionServer';
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
      console.log('dashboard.vue - Fetching user data...');

      // First, make sure we have the current user data
      const userData = await dataConnect.fetchCurrentUser();
      console.log('dashboard.vue - Fetched user data:', userData);

      // Then fetch user profiles
      const profiles = await dataConnect.fetchUserProfiles();
      console.log('dashboard.vue - Fetched profiles:', profiles);

      // Finally fetch user workspaces
      const workspaces = await dataConnect.fetchUserWorkspaces();
      console.log('dashboard.vue - Fetched workspaces:', workspaces);
      console.log('dashboard.vue - Computed userWorkspaces:', userWorkspaces.value);

      // If no workspaces exist, create a default one
      if (!workspaces || workspaces.length === 0) {
        console.log('dashboard.vue - No workspaces found, creating default workspace');
        const userName = userData?.displayName || 'My';
        const newWorkspace = await dataConnect.createWorkspace({
          name: `${userName}'s Workspace`,
          description: 'Default workspace'
        });
        console.log('dashboard.vue - Created default workspace:', newWorkspace);

        // Refresh workspaces list
        await dataConnect.fetchUserWorkspaces();
        console.log('dashboard.vue - Updated workspaces after creation:', userWorkspaces.value);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
};

// Handle sign out
const handleSignOut = async () => {
  try {
    console.log('dashboard.vue - Signing out...');

    // Clear server-side session
    console.log('dashboard.vue - Clearing server-side session...');
    const sessionServer = useSessionServer();
    await sessionServer.clearSessionServer();

    // Sign out from Firebase
    console.log('dashboard.vue - Signing out from Firebase...');
    await signOut();

    // Redirect to login page
    console.log('dashboard.vue - Redirecting to login page...');
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
const handleCreateWorkspace = async () => {
  console.log('dashboard.vue - Create workspace clicked');

  try {
    // In a real implementation, this would open a modal to get workspace details
    // For now, we'll create a workspace with a default name
    const userName = user.value?.displayName || 'New';
    const workspaceName = `${userName}'s Workspace ${userWorkspaces.value.length + 1}`;

    console.log('dashboard.vue - Creating workspace:', workspaceName);
    const newWorkspace = await dataConnect.createWorkspace({
      name: workspaceName,
      description: 'Created from dashboard'
    });

    console.log('dashboard.vue - Workspace created:', newWorkspace);

    // Refresh workspaces list
    await dataConnect.fetchUserWorkspaces();
    console.log('dashboard.vue - Updated workspaces after creation:', userWorkspaces.value);
  } catch (error) {
    console.error('dashboard.vue - Error creating workspace:', error);
  }
};

// Handle view all activity
const handleViewAllActivity = () => {
  // This would navigate to an activity log page
  console.log('View all activity clicked');
  // router.push('/activity');
};

// Fetch user data on mount
onMounted(async () => {
  console.log('dashboard.vue - Component mounted');
  console.log('dashboard.vue - Auth state:', { isLoading: isLoading.value, isAuthenticated: isAuthenticated.value });

  // If already authenticated, fetch data immediately
  if (!isLoading.value && isAuthenticated.value) {
    console.log('dashboard.vue - User already authenticated, fetching data');
    await fetchUserData();
  } else if (isLoading.value) {
    // If still loading auth state, wait for it to complete
    console.log('dashboard.vue - Auth state still loading, waiting...');

    // Watch for changes to isLoading
    const unwatch = watch(isLoading, async (newIsLoading) => {
      if (!newIsLoading && isAuthenticated.value) {
        console.log('dashboard.vue - Auth state loaded, user authenticated, fetching data');
        await fetchUserData();
        unwatch(); // Stop watching once we've fetched data
      } else if (!newIsLoading && !isAuthenticated.value) {
        console.log('dashboard.vue - Auth state loaded, user not authenticated');
        unwatch(); // Stop watching if not authenticated
      }
    });
  }
});
</script>
