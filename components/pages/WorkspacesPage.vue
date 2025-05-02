<template>
  <div class="p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Workspaces Header -->
      <div class="mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-[rgb(var(--color-neumorphic-text))]">
            Your Workspaces
          </h1>
          <p class="text-[rgb(var(--color-neumorphic-text))/70]">
            Manage your workspaces and collaborations
          </p>
        </div>
        
        <NeumorphicButton
          variant="convex"
          color="primary"
          @click="showCreateWorkspaceModal = true"
        >
          Create Workspace
        </NeumorphicButton>
      </div>
      
      <!-- Workspaces Tabs -->
      <div class="mb-6">
        <div class="nm-flat rounded-lg overflow-hidden">
          <div class="flex">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-4 py-3 transition-colors duration-200 flex-1 text-center"
              :class="activeTab === tab.id ? 'bg-[rgb(var(--color-neumorphic-accent))/10] text-[rgb(var(--color-neumorphic-accent))]' : 'text-[rgb(var(--color-neumorphic-text))] hover:bg-[rgb(var(--color-neumorphic-dark))/10]'"
            >
              {{ tab.name }} {{ tab.count ? `(${tab.count})` : '' }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Search and Filter -->
      <div class="mb-6 flex flex-col sm:flex-row gap-4">
        <NeumorphicInput
          v-model="searchQuery"
          placeholder="Search workspaces..."
          class="flex-grow"
        >
          <template #append>
            <svg class="w-5 h-5 text-[rgb(var(--color-neumorphic-text))/50]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </template>
        </NeumorphicInput>
        
        <NeumorphicSelect
          v-model="filterType"
          class="w-full sm:w-48"
        >
          <option value="">All Types</option>
          <option value="business">Business</option>
          <option value="project">Project</option>
          <option value="personal">Personal</option>
        </NeumorphicSelect>
      </div>
      
      <!-- Workspaces List -->
      <div v-if="isLoading" class="py-12 text-center">
        <div class="nm-flat w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
          <svg class="animate-spin h-8 w-8 text-[rgb(var(--color-neumorphic-accent))]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-[rgb(var(--color-neumorphic-text))]">Loading workspaces...</p>
      </div>
      
      <div v-else-if="filteredWorkspaces.length === 0" class="py-12 text-center">
        <div class="nm-flat w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 text-[rgb(var(--color-neumorphic-text))/30]">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))] mb-2">No workspaces found</h3>
        <p v-if="searchQuery || filterType" class="text-[rgb(var(--color-neumorphic-text))/70] mb-6">
          Try adjusting your search or filters
        </p>
        <p v-else class="text-[rgb(var(--color-neumorphic-text))/70] mb-6">
          Create your first workspace to get started
        </p>
        
        <NeumorphicButton
          variant="convex"
          color="primary"
          @click="showCreateWorkspaceModal = true"
        >
          Create Workspace
        </NeumorphicButton>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WorkspaceCard
          v-for="workspace in filteredWorkspaces"
          :key="workspace.id"
          :workspace="workspace"
          :current-user-id="currentUserId"
          @view="handleViewWorkspace"
          @edit="handleEditWorkspace"
          @invite="handleInviteWorkspace"
          @leave="handleLeaveWorkspace"
          @delete="handleDeleteWorkspace"
        />
      </div>
      
      <!-- Pagination -->
      <div v-if="filteredWorkspaces.length > 0 && totalPages > 1" class="mt-8 flex justify-center">
        <div class="flex space-x-2">
          <NeumorphicButton
            variant="flat"
            size="sm"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Previous
          </NeumorphicButton>
          
          <div v-for="page in totalPages" :key="page" class="mx-1">
            <NeumorphicButton
              variant="flat"
              size="sm"
              :class="currentPage === page ? 'bg-[rgb(var(--color-neumorphic-accent))/10] text-[rgb(var(--color-neumorphic-accent))]' : ''"
              @click="currentPage = page"
            >
              {{ page }}
            </NeumorphicButton>
          </div>
          
          <NeumorphicButton
            variant="flat"
            size="sm"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </NeumorphicButton>
        </div>
      </div>
    </div>
    
    <!-- Create Workspace Modal -->
    <NeumorphicModal
      v-model="showCreateWorkspaceModal"
      title="Create Workspace"
      description="Create a new workspace for collaboration"
    >
      <WorkspaceForm
        :is-loading="isFormLoading"
        :error="formError"
        @submit="handleCreateWorkspace"
        @cancel="showCreateWorkspaceModal = false"
      />
    </NeumorphicModal>
    
    <!-- Edit Workspace Modal -->
    <NeumorphicModal
      v-model="showEditWorkspaceModal"
      title="Edit Workspace"
      description="Update workspace details"
    >
      <WorkspaceForm
        :workspace="selectedWorkspace"
        :is-loading="isFormLoading"
        :error="formError"
        @submit="handleUpdateWorkspace"
        @cancel="showEditWorkspaceModal = false"
      />
    </NeumorphicModal>
    
    <!-- Invite Members Modal -->
    <NeumorphicModal
      v-model="showInviteModal"
      title="Invite Members"
      description="Invite people to join this workspace"
    >
      <WorkspaceInviteForm
        :workspace="selectedWorkspace"
        :is-loading="isFormLoading"
        :error="formError"
        @submit="handleSendInvites"
        @cancel="showInviteModal = false"
      />
    </NeumorphicModal>
    
    <!-- Leave Workspace Confirmation Modal -->
    <NeumorphicModal
      v-model="showLeaveConfirmationModal"
      title="Leave Workspace"
      description="Are you sure you want to leave this workspace?"
    >
      <div class="mb-6">
        <p class="text-[rgb(var(--color-neumorphic-text))]">
          You will lose access to all resources in <strong>{{ selectedWorkspace?.name }}</strong>.
        </p>
      </div>
      
      <div class="flex justify-end space-x-3">
        <NeumorphicButton
          variant="flat"
          @click="showLeaveConfirmationModal = false"
        >
          Cancel
        </NeumorphicButton>
        
        <NeumorphicButton
          variant="convex"
          color="danger"
          :disabled="isFormLoading"
          @click="confirmLeaveWorkspace"
        >
          {{ isFormLoading ? 'Leaving...' : 'Leave Workspace' }}
        </NeumorphicButton>
      </div>
    </NeumorphicModal>
    
    <!-- Delete Workspace Confirmation Modal -->
    <NeumorphicModal
      v-model="showDeleteConfirmationModal"
      title="Delete Workspace"
      description="Are you sure you want to delete this workspace?"
    >
      <div class="mb-6">
        <p class="text-[rgb(var(--color-neumorphic-text))] mb-4">
          This action cannot be undone. All data associated with <strong>{{ selectedWorkspace?.name }}</strong> will be permanently deleted.
        </p>
        
        <NeumorphicInput
          v-model="deleteConfirmation"
          label="Type the workspace name to confirm"
          placeholder="Workspace name"
          :error="deleteConfirmationError"
        />
      </div>
      
      <div class="flex justify-end space-x-3">
        <NeumorphicButton
          variant="flat"
          @click="showDeleteConfirmationModal = false"
        >
          Cancel
        </NeumorphicButton>
        
        <NeumorphicButton
          variant="convex"
          color="danger"
          :disabled="isFormLoading || deleteConfirmation !== selectedWorkspace?.name"
          @click="confirmDeleteWorkspace"
        >
          {{ isFormLoading ? 'Deleting...' : 'Delete Workspace' }}
        </NeumorphicButton>
      </div>
    </NeumorphicModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import NeumorphicInput from '~/components/neumorphic/Input.vue';
import NeumorphicSelect from '~/components/neumorphic/Select.vue';
import NeumorphicModal from '~/components/neumorphic/Modal.vue';
import WorkspaceCard from '~/components/workspace/WorkspaceCard.vue';
import WorkspaceForm from '~/components/forms/WorkspaceForm.vue';
import WorkspaceInviteForm from '~/components/forms/WorkspaceInviteForm.vue';

// Define workspace type
interface Workspace {
  id: string;
  name: string;
  description?: string;
  type: 'business' | 'project' | 'personal';
  privacy: 'private' | 'public';
  role?: string;
  members?: number;
  createdAt?: Date;
  ownerId?: string;
  logoUrl?: string;
}

const props = defineProps({
  workspaces: {
    type: Array as () => Workspace[],
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  currentUserId: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([
  'create-workspace', 
  'update-workspace', 
  'delete-workspace', 
  'leave-workspace',
  'view-workspace',
  'send-invites'
]);

// Tabs
const tabs = [
  { id: 'all', name: 'All Workspaces', count: props.workspaces.length },
  { id: 'owned', name: 'Owned', count: props.workspaces.filter(w => w.role === 'Owner' || w.ownerId === props.currentUserId).length },
  { id: 'member', name: 'Member', count: props.workspaces.filter(w => w.role === 'Member' || w.role === 'Admin').length },
  { id: 'guest', name: 'Guest', count: props.workspaces.filter(w => w.role === 'Guest').length }
];

// State
const activeTab = ref('all');
const searchQuery = ref('');
const filterType = ref('');
const currentPage = ref(1);
const itemsPerPage = 6;

// Modal state
const showCreateWorkspaceModal = ref(false);
const showEditWorkspaceModal = ref(false);
const showInviteModal = ref(false);
const showLeaveConfirmationModal = ref(false);
const showDeleteConfirmationModal = ref(false);

// Form state
const selectedWorkspace = ref<Workspace | null>(null);
const isFormLoading = ref(false);
const formError = ref('');

// Delete confirmation
const deleteConfirmation = ref('');
const deleteConfirmationError = ref('');

// Computed properties
const filteredWorkspaces = computed(() => {
  let filtered = [...props.workspaces];
  
  // Filter by tab
  if (activeTab.value === 'owned') {
    filtered = filtered.filter(w => w.role === 'Owner' || w.ownerId === props.currentUserId);
  } else if (activeTab.value === 'member') {
    filtered = filtered.filter(w => w.role === 'Member' || w.role === 'Admin');
  } else if (activeTab.value === 'guest') {
    filtered = filtered.filter(w => w.role === 'Guest');
  }
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(w => 
      w.name.toLowerCase().includes(query) || 
      (w.description && w.description.toLowerCase().includes(query))
    );
  }
  
  // Filter by type
  if (filterType.value) {
    filtered = filtered.filter(w => w.type === filterType.value);
  }
  
  return filtered;
});

const paginatedWorkspaces = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredWorkspaces.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredWorkspaces.value.length / itemsPerPage);
});

// Reset pagination when filters change
watch([activeTab, searchQuery, filterType], () => {
  currentPage.value = 1;
});

// Handlers
const handleViewWorkspace = (workspace: Workspace) => {
  emit('view-workspace', workspace);
};

const handleEditWorkspace = (workspace: Workspace) => {
  selectedWorkspace.value = workspace;
  showEditWorkspaceModal.value = true;
};

const handleInviteWorkspace = (workspace: Workspace) => {
  selectedWorkspace.value = workspace;
  showInviteModal.value = true;
};

const handleLeaveWorkspace = (workspace: Workspace) => {
  selectedWorkspace.value = workspace;
  showLeaveConfirmationModal.value = true;
};

const handleDeleteWorkspace = (workspace: Workspace) => {
  selectedWorkspace.value = workspace;
  deleteConfirmation.value = '';
  deleteConfirmationError.value = '';
  showDeleteConfirmationModal.value = true;
};

const handleCreateWorkspace = (workspace: Workspace) => {
  isFormLoading.value = true;
  formError.value = '';
  
  try {
    emit('create-workspace', workspace);
    showCreateWorkspaceModal.value = false;
  } catch (error: any) {
    formError.value = error.message || 'Failed to create workspace';
  } finally {
    isFormLoading.value = false;
  }
};

const handleUpdateWorkspace = (workspace: Workspace) => {
  isFormLoading.value = true;
  formError.value = '';
  
  try {
    emit('update-workspace', workspace);
    showEditWorkspaceModal.value = false;
  } catch (error: any) {
    formError.value = error.message || 'Failed to update workspace';
  } finally {
    isFormLoading.value = false;
  }
};

const handleSendInvites = (inviteData: any) => {
  isFormLoading.value = true;
  formError.value = '';
  
  try {
    emit('send-invites', inviteData);
    showInviteModal.value = false;
  } catch (error: any) {
    formError.value = error.message || 'Failed to send invites';
  } finally {
    isFormLoading.value = false;
  }
};

const confirmLeaveWorkspace = () => {
  if (!selectedWorkspace.value) return;
  
  isFormLoading.value = true;
  
  try {
    emit('leave-workspace', selectedWorkspace.value);
    showLeaveConfirmationModal.value = false;
  } catch (error: any) {
    formError.value = error.message || 'Failed to leave workspace';
  } finally {
    isFormLoading.value = false;
  }
};

const confirmDeleteWorkspace = () => {
  if (!selectedWorkspace.value) return;
  
  deleteConfirmationError.value = '';
  
  if (deleteConfirmation.value !== selectedWorkspace.value.name) {
    deleteConfirmationError.value = 'Workspace name does not match';
    return;
  }
  
  isFormLoading.value = true;
  
  try {
    emit('delete-workspace', selectedWorkspace.value);
    showDeleteConfirmationModal.value = false;
  } catch (error: any) {
    formError.value = error.message || 'Failed to delete workspace';
  } finally {
    isFormLoading.value = false;
  }
};
</script>
