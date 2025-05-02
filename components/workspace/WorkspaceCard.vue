<template>
  <NeumorphicCard 
    :variant="variant" 
    :class="className"
  >
    <div class="flex items-start">
      <!-- Workspace Icon -->
      <div class="w-12 h-12 rounded-md nm-convex flex items-center justify-center mr-4 flex-shrink-0">
        <span v-if="!workspace.logoUrl" class="text-lg font-bold text-[rgb(var(--color-neumorphic-accent))]">
          {{ workspace.name ? workspace.name.charAt(0).toUpperCase() : 'W' }}
        </span>
        <img 
          v-else 
          :src="workspace.logoUrl" 
          :alt="workspace.name" 
          class="w-10 h-10 object-cover rounded"
        />
      </div>
      
      <!-- Workspace Info -->
      <div class="flex-grow">
        <div class="flex justify-between items-start">
          <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))]">
            {{ workspace.name }}
          </h3>
          
          <div v-if="workspace.role" class="ml-2">
            <span 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="getRoleBadgeClass(workspace.role)"
            >
              {{ workspace.role }}
            </span>
          </div>
        </div>
        
        <p v-if="workspace.description" class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mt-1">
          {{ workspace.description }}
        </p>
        
        <!-- Workspace Stats -->
        <div class="flex flex-wrap mt-3 gap-4">
          <div v-if="workspace.members !== undefined" class="flex items-center text-sm text-[rgb(var(--color-neumorphic-text))/70]">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            {{ workspace.members }} {{ workspace.members === 1 ? 'Member' : 'Members' }}
          </div>
          
          <div v-if="workspace.createdAt" class="flex items-center text-sm text-[rgb(var(--color-neumorphic-text))/70]">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {{ formatDate(workspace.createdAt) }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div v-if="showActions" class="mt-4 flex flex-wrap gap-2">
      <slot name="actions">
        <NeumorphicButton
          variant="flat"
          size="sm"
          @click="$emit('view', workspace)"
        >
          View
        </NeumorphicButton>
        
        <NeumorphicButton
          v-if="canEdit"
          variant="flat"
          size="sm"
          @click="$emit('edit', workspace)"
        >
          Edit
        </NeumorphicButton>
        
        <NeumorphicButton
          v-if="canInvite"
          variant="flat"
          size="sm"
          @click="$emit('invite', workspace)"
        >
          Invite
        </NeumorphicButton>
        
        <NeumorphicButton
          v-if="canLeave"
          variant="flat"
          size="sm"
          color="danger"
          @click="$emit('leave', workspace)"
        >
          Leave
        </NeumorphicButton>
        
        <NeumorphicButton
          v-if="canDelete"
          variant="flat"
          size="sm"
          color="danger"
          @click="$emit('delete', workspace)"
        >
          Delete
        </NeumorphicButton>
      </slot>
    </div>
  </NeumorphicCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import NeumorphicCard from '~/components/neumorphic/Card.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';

// Define workspace type
interface Workspace {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  role?: string;
  members?: number;
  createdAt?: Date;
  ownerId?: string;
}

const props = defineProps({
  workspace: {
    type: Object as () => Workspace,
    required: true
  },
  variant: {
    type: String,
    default: 'flat'
  },
  showActions: {
    type: Boolean,
    default: true
  },
  currentUserId: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['view', 'edit', 'invite', 'leave', 'delete']);

// Computed properties for permissions
const canEdit = computed(() => {
  return props.workspace.role === 'Owner' || props.workspace.role === 'Admin' || 
         props.workspace.ownerId === props.currentUserId;
});

const canInvite = computed(() => {
  return props.workspace.role === 'Owner' || props.workspace.role === 'Admin' || 
         props.workspace.ownerId === props.currentUserId;
});

const canLeave = computed(() => {
  return props.workspace.ownerId !== props.currentUserId;
});

const canDelete = computed(() => {
  return props.workspace.role === 'Owner' || props.workspace.ownerId === props.currentUserId;
});

// Helper functions
function formatDate(date: Date): string {
  if (!date) return '';
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date instanceof Date ? date : new Date(date));
}

function getRoleBadgeClass(role: string): string {
  switch (role) {
    case 'Owner':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'Admin':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'Member':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Guest':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}
</script>
