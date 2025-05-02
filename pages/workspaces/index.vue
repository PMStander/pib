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
      <!-- Header with Navigation -->
      <div class="bg-[rgb(var(--color-neumorphic-bg))] dark-mode-transition border-b border-[rgb(var(--color-neumorphic-dark)/0.1)] p-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold text-[rgb(var(--color-neumorphic-text))]">Partners in Biz</h1>
          <div class="flex items-center space-x-4">
            <NeumorphicButton
              variant="flat"
              size="sm"
              @click="router.push('/dashboard')"
            >
              Dashboard
            </NeumorphicButton>
            <NeumorphicButton
              variant="flat"
              size="sm"
              @click="router.push('/profile')"
            >
              Profile
            </NeumorphicButton>
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

      <!-- Workspaces Page Component -->
      <WorkspacesPage
        :workspaces="workspaces"
        :is-loading="isWorkspacesLoading"
        :current-user-id="user?.uid || ''"
        @create-workspace="handleCreateWorkspace"
        @update-workspace="handleUpdateWorkspace"
        @delete-workspace="handleDeleteWorkspace"
        @leave-workspace="handleLeaveWorkspace"
        @view-workspace="handleViewWorkspace"
        @send-invites="handleSendInvites"
      />
    </div>

    <!-- Success Modal -->
    <NeumorphicModal
      v-model="showSuccessModal"
      title="Success"
      :description="successMessage"
    >
      <div class="flex justify-center">
        <NeumorphicButton
          variant="convex"
          color="primary"
          @click="showSuccessModal = false"
        >
          OK
        </NeumorphicButton>
      </div>
    </NeumorphicModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useDataConnect } from '~/composables/useDataConnect';
import { useAppState } from '~/composables/useAppState';
import WorkspacesPage from '~/components/pages/WorkspacesPage.vue';
import NeumorphicCard from '~/components/neumorphic/Card.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import NeumorphicModal from '~/components/neumorphic/Modal.vue';

const router = useRouter();

// Initialize Firebase Auth
const { user, isAuthenticated, isLoading, signOut } = useFirebaseAuth();

// Initialize DataConnect and AppState
const dataConnect = useDataConnect();
const appState = useAppState();

// Workspaces state - use computed to get the current workspaces from appState
const workspaces = computed(() => {
  console.log('workspaces/index.vue - Computing workspaces from appState:', appState.userWorkspaces.value);
  return appState.userWorkspaces.value || [];
});
const isWorkspacesLoading = ref(false);

// Success modal
const showSuccessModal = ref(false);
const successMessage = ref('');

// Fetch workspaces
const fetchWorkspaces = async () => {
  if (!isAuthenticated.value) return;

  try {
    isWorkspacesLoading.value = true;

    // Fetch workspaces from DataConnect
    await dataConnect.fetchUserWorkspaces();

    // If no workspaces are found, use mock data as fallback
    if (workspaces.value.length === 0) {
      console.log('No workspaces found in DataConnect, using mock data');

      // Create a default workspace
      await dataConnect.createDefaultWorkspace(user.value?.displayName || 'My');

      // Refresh workspaces
      await dataConnect.fetchUserWorkspaces();
    }
  } catch (error) {
    console.error('Failed to fetch workspaces:', error);
  } finally {
    isWorkspacesLoading.value = false;
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

// Handle create workspace
const handleCreateWorkspace = async (workspace) => {
  try {
    // This would typically create a workspace in the database
    // For now, we'll simulate it
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add the new workspace to the list
    const newWorkspace = {
      ...workspace,
      id: `new-${Date.now()}`,
      role: 'Owner',
      members: 1,
      createdAt: new Date(),
      ownerId: user.value?.uid
    };

    workspaces.value.unshift(newWorkspace);

    // Show success message
    successMessage.value = `Workspace "${workspace.name}" created successfully!`;
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Failed to create workspace:', error);
  }
};

// Handle update workspace
const handleUpdateWorkspace = async (workspace) => {
  try {
    // This would typically update a workspace in the database
    // For now, we'll simulate it
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update the workspace in the list
    const index = workspaces.value.findIndex(w => w.id === workspace.id);
    if (index !== -1) {
      workspaces.value[index] = {
        ...workspaces.value[index],
        ...workspace
      };
    }

    // Show success message
    successMessage.value = `Workspace "${workspace.name}" updated successfully!`;
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Failed to update workspace:', error);
  }
};

// Handle delete workspace
const handleDeleteWorkspace = async (workspace) => {
  try {
    // This would typically delete a workspace from the database
    // For now, we'll simulate it
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Remove the workspace from the list
    workspaces.value = workspaces.value.filter(w => w.id !== workspace.id);

    // Show success message
    successMessage.value = `Workspace "${workspace.name}" deleted successfully!`;
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Failed to delete workspace:', error);
  }
};

// Handle leave workspace
const handleLeaveWorkspace = async (workspace) => {
  try {
    // This would typically remove the user from the workspace in the database
    // For now, we'll simulate it
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Remove the workspace from the list
    workspaces.value = workspaces.value.filter(w => w.id !== workspace.id);

    // Show success message
    successMessage.value = `You have left the workspace "${workspace.name}".`;
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Failed to leave workspace:', error);
  }
};

// Handle view workspace
const handleViewWorkspace = (workspace) => {
  router.push(`/workspaces/${workspace.id}`);
};

// Handle send invites
const handleSendInvites = async (inviteData) => {
  try {
    // This would typically send invites to the specified emails
    // For now, we'll simulate it
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Show success message
    successMessage.value = `Invitations sent to ${inviteData.emails.length} email${inviteData.emails.length > 1 ? 's' : ''}.`;
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Failed to send invites:', error);
  }
};

// Fetch workspaces on mount
onMounted(async () => {
  if (!isLoading.value && isAuthenticated.value) {
    console.log('Fetching workspaces on mount...');
    // First ensure we have the user data
    await dataConnect.fetchCurrentUser();
    // Then fetch workspaces
    await fetchWorkspaces();
    console.log('Workspaces after fetch:', workspaces.value);
  }
});
</script>
