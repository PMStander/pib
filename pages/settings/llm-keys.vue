<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">LLM API Keys</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- User Keys -->
      <div class="nm-flat p-6 rounded-xl">
        <h2 class="text-xl font-semibold mb-4">Your API Keys</h2>
        <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mb-4">
          These keys will be used when no workspace or profile keys are available.
        </p>
        
        <LLMKeyList
          :keys="userKeys"
          :is-loading="isLoadingUserKeys"
          @add="openUserKeyModal()"
          @edit="openUserKeyModal($event)"
        />
      </div>
      
      <!-- Profile Keys -->
      <div class="nm-flat p-6 rounded-xl">
        <h2 class="text-xl font-semibold mb-4">Profile API Keys</h2>
        <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mb-4">
          These keys will be used when the profile is active and no workspace keys are available.
        </p>
        
        <div v-if="!activeProfile" class="text-center py-4">
          <p class="text-[rgb(var(--color-neumorphic-text))/70]">
            No active profile selected.
          </p>
        </div>
        
        <template v-else>
          <div class="mb-4">
            <label class="block text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
              Active Profile
            </label>
            <NeumorphicSelect
              v-model="selectedProfileId"
              :options="profileOptions"
              class="w-full"
            />
          </div>
          
          <LLMKeyList
            :keys="profileKeys"
            :is-loading="isLoadingProfileKeys"
            @add="openProfileKeyModal()"
            @edit="openProfileKeyModal($event)"
          />
        </template>
      </div>
      
      <!-- Workspace Keys -->
      <div class="nm-flat p-6 rounded-xl">
        <h2 class="text-xl font-semibold mb-4">Workspace API Keys</h2>
        <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mb-4">
          These keys will be used when the workspace is active. Only workspace owners can manage these keys.
        </p>
        
        <div v-if="!activeWorkspace" class="text-center py-4">
          <p class="text-[rgb(var(--color-neumorphic-text))/70]">
            No active workspace selected.
          </p>
        </div>
        
        <template v-else>
          <div class="mb-4">
            <label class="block text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
              Active Workspace
            </label>
            <NeumorphicSelect
              v-model="selectedWorkspaceId"
              :options="workspaceOptions"
              class="w-full"
            />
          </div>
          
          <div v-if="!isWorkspaceOwner" class="text-center py-4">
            <p class="text-[rgb(var(--color-neumorphic-text))/70]">
              You must be a workspace owner to manage API keys.
            </p>
          </div>
          
          <LLMKeyList
            v-else
            :keys="workspaceKeys"
            :is-loading="isLoadingWorkspaceKeys"
            @add="openWorkspaceKeyModal()"
            @edit="openWorkspaceKeyModal($event)"
          />
        </template>
      </div>
    </div>
    
    <!-- Modals -->
    <LLMKeyModal
      v-if="showUserKeyModal"
      :show="showUserKeyModal"
      entity-type="user"
      :entity-id="currentUser?.id || ''"
      :existing-key="selectedKey"
      @close="closeUserKeyModal"
      @saved="loadUserKeys"
      @deleted="loadUserKeys"
    />
    
    <LLMKeyModal
      v-if="showProfileKeyModal"
      :show="showProfileKeyModal"
      entity-type="profile"
      :entity-id="selectedProfileId"
      :existing-key="selectedKey"
      @close="closeProfileKeyModal"
      @saved="loadProfileKeys"
      @deleted="loadProfileKeys"
    />
    
    <LLMKeyModal
      v-if="showWorkspaceKeyModal"
      :show="showWorkspaceKeyModal"
      entity-type="workspace"
      :entity-id="selectedWorkspaceId"
      :existing-key="selectedKey"
      @close="closeWorkspaceKeyModal"
      @saved="loadWorkspaceKeys"
      @deleted="loadWorkspaceKeys"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useAppState } from '~/composables/useAppState';
import { useLLMKeys, type LLMKey } from '~/composables/useLLMKeys';
import LLMKeyList from '~/components/llm-keys/LLMKeyList.vue';
import LLMKeyModal from '~/components/llm-keys/LLMKeyModal.vue';
import NeumorphicSelect from '~/components/neumorphic/Select.vue';

// Authentication and app state
const { isAuthenticated, currentUser } = useFirebaseAuth();
const { activeWorkspace, activeProfile, workspaces, profiles } = useAppState();

// Redirect if not authenticated
onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo('/login');
  }
});

// LLM keys composable
const {
  getUserLLMKeys,
  getProfileLLMKeys,
  getWorkspaceLLMKeys,
  isLoading
} = useLLMKeys();

// State for keys
const userKeys = ref<LLMKey[]>([]);
const profileKeys = ref<LLMKey[]>([]);
const workspaceKeys = ref<LLMKey[]>([]);

// Loading states
const isLoadingUserKeys = ref(false);
const isLoadingProfileKeys = ref(false);
const isLoadingWorkspaceKeys = ref(false);

// Selected entities
const selectedProfileId = ref<string>('');
const selectedWorkspaceId = ref<string>('');

// Modal states
const showUserKeyModal = ref(false);
const showProfileKeyModal = ref(false);
const showWorkspaceKeyModal = ref(false);
const selectedKey = ref<LLMKey | undefined>(undefined);

// Options for dropdowns
const profileOptions = computed(() => {
  return profiles.value.map(profile => ({
    value: profile.id,
    label: profile.name || `Profile ${profile.id}`
  }));
});

const workspaceOptions = computed(() => {
  return workspaces.value.map(workspace => ({
    value: workspace.id,
    label: workspace.name || `Workspace ${workspace.id}`
  }));
});

// Check if user is workspace owner
const isWorkspaceOwner = computed(() => {
  if (!activeWorkspace.value || !currentUser.value) return false;
  
  // Check if the user is an owner of the workspace
  const workspace = workspaces.value.find(w => w.id === selectedWorkspaceId.value);
  if (!workspace) return false;
  
  // This is a simplified check - you might need to adjust based on your actual data structure
  return workspace.ownerId === currentUser.value.id;
});

// Initialize selected entities
watch(activeProfile, (newProfile) => {
  if (newProfile) {
    selectedProfileId.value = newProfile.id;
    loadProfileKeys();
  }
});

watch(activeWorkspace, (newWorkspace) => {
  if (newWorkspace) {
    selectedWorkspaceId.value = newWorkspace.id;
    loadWorkspaceKeys();
  }
});

// Watch for changes in selected profile/workspace
watch(selectedProfileId, () => {
  loadProfileKeys();
});

watch(selectedWorkspaceId, () => {
  loadWorkspaceKeys();
});

// Load keys
const loadUserKeys = async () => {
  if (!currentUser.value) return;
  
  isLoadingUserKeys.value = true;
  userKeys.value = await getUserLLMKeys();
  isLoadingUserKeys.value = false;
};

const loadProfileKeys = async () => {
  if (!selectedProfileId.value) return;
  
  isLoadingProfileKeys.value = true;
  profileKeys.value = await getProfileLLMKeys(selectedProfileId.value);
  isLoadingProfileKeys.value = false;
};

const loadWorkspaceKeys = async () => {
  if (!selectedWorkspaceId.value) return;
  
  isLoadingWorkspaceKeys.value = true;
  workspaceKeys.value = await getWorkspaceLLMKeys(selectedWorkspaceId.value);
  isLoadingWorkspaceKeys.value = false;
};

// Modal functions
const openUserKeyModal = (key?: LLMKey) => {
  selectedKey.value = key;
  showUserKeyModal.value = true;
};

const closeUserKeyModal = () => {
  selectedKey.value = undefined;
  showUserKeyModal.value = false;
};

const openProfileKeyModal = (key?: LLMKey) => {
  selectedKey.value = key;
  showProfileKeyModal.value = true;
};

const closeProfileKeyModal = () => {
  selectedKey.value = undefined;
  showProfileKeyModal.value = false;
};

const openWorkspaceKeyModal = (key?: LLMKey) => {
  selectedKey.value = key;
  showWorkspaceKeyModal.value = true;
};

const closeWorkspaceKeyModal = () => {
  selectedKey.value = undefined;
  showWorkspaceKeyModal.value = false;
};

// Load initial data
onMounted(async () => {
  if (isAuthenticated.value && currentUser.value) {
    await loadUserKeys();
    
    if (activeProfile.value) {
      selectedProfileId.value = activeProfile.value.id;
      await loadProfileKeys();
    }
    
    if (activeWorkspace.value) {
      selectedWorkspaceId.value = activeWorkspace.value.id;
      await loadWorkspaceKeys();
    }
  }
});
</script>
