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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useDataConnect } from '~/composables/useDataConnect';
import WorkspacesPage from '~/components/pages/WorkspacesPage.vue';
import NeumorphicCard from '~/components/neumorphic/Card.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import NeumorphicModal from '~/components/neumorphic/Modal.vue';

const router = useRouter();

// Initialize Firebase Auth
const { user, isAuthenticated, isLoading, signOut } = useFirebaseAuth();

// Initialize DataConnect
const dataConnect = useDataConnect();

// Workspaces state
const workspaces = ref([]);
const isWorkspacesLoading = ref(false);

// Success modal
const showSuccessModal = ref(false);
const successMessage = ref('');

// Fetch workspaces
const fetchWorkspaces = async () => {
  if (!isAuthenticated.value) return;
  
  try {
    isWorkspacesLoading.value = true;
    
    // This would typically fetch workspaces from the database
    // For now, we'll use mock data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    workspaces.value = [
      {
        id: '1',
        name: 'Personal Workspace',
        description: 'Your personal workspace for individual projects',
        type: 'personal',
        privacy: 'private',
        role: 'Owner',
        members: 1,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        ownerId: user.value?.uid
      },
      {
        id: '2',
        name: 'Web Development Team',
        description: 'Collaborative workspace for web development projects',
        type: 'project',
        privacy: 'private',
        role: 'Admin',
        members: 5,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        ownerId: 'user123'
      },
      {
        id: '3',
        name: 'Marketing Agency',
        description: 'Business workspace for marketing projects and clients',
        type: 'business',
        privacy: 'private',
        role: 'Member',
        members: 12,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        ownerId: 'user456'
      }
    ];
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
    await fetchWorkspaces();
  }
});
</script>
