<template>
  <form @submit.prevent="handleSubmit">
    <NeumorphicInput
      v-model="form.name"
      label="Workspace Name"
      placeholder="Enter workspace name"
      :error="errors.name"
      class="mb-4"
    />
    
    <NeumorphicInput
      v-model="form.description"
      label="Description"
      placeholder="Enter workspace description"
      :error="errors.description"
      class="mb-4"
    />
    
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
        Workspace Type
      </label>
      <div class="space-y-2">
        <NeumorphicRadio
          v-model="form.type"
          :value="'business'"
          name="workspace-type"
          label="Business"
          description="For companies and organizations"
        />
        
        <NeumorphicRadio
          v-model="form.type"
          :value="'project'"
          name="workspace-type"
          label="Project"
          description="For specific projects or initiatives"
        />
        
        <NeumorphicRadio
          v-model="form.type"
          :value="'personal'"
          name="workspace-type"
          label="Personal"
          description="For individual use"
        />
      </div>
      <p v-if="errors.type" class="mt-1 text-sm text-[rgb(var(--color-neumorphic-accent-tertiary))]">
        {{ errors.type }}
      </p>
    </div>
    
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
        Privacy Settings
      </label>
      <div class="space-y-2">
        <NeumorphicRadio
          v-model="form.privacy"
          :value="'private'"
          name="workspace-privacy"
          label="Private"
          description="Only invited members can access"
        />
        
        <NeumorphicRadio
          v-model="form.privacy"
          :value="'public'"
          name="workspace-privacy"
          label="Public"
          description="Anyone can find and request to join"
        />
      </div>
      <p v-if="errors.privacy" class="mt-1 text-sm text-[rgb(var(--color-neumorphic-accent-tertiary))]">
        {{ errors.privacy }}
      </p>
    </div>
    
    <div v-if="error" class="mb-4 p-3 bg-[rgb(var(--color-neumorphic-accent-tertiary))/10] rounded-lg text-[rgb(var(--color-neumorphic-accent-tertiary))] text-sm">
      {{ error }}
    </div>
    
    <div class="flex justify-end space-x-3">
      <NeumorphicButton
        type="button"
        variant="flat"
        @click="$emit('cancel')"
      >
        Cancel
      </NeumorphicButton>
      
      <NeumorphicButton
        type="submit"
        variant="convex"
        color="primary"
        :disabled="isLoading"
      >
        {{ isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Workspace' : 'Create Workspace') }}
      </NeumorphicButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import NeumorphicInput from '~/components/neumorphic/Input.vue';
import NeumorphicRadio from '~/components/neumorphic/Radio.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';

// Define workspace type
interface Workspace {
  id?: string;
  name: string;
  description: string;
  type: 'business' | 'project' | 'personal';
  privacy: 'private' | 'public';
}

const props = defineProps({
  workspace: {
    type: Object as () => Workspace | null,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['submit', 'cancel']);

// Form state
const form = reactive({
  name: '',
  description: '',
  type: 'business' as 'business' | 'project' | 'personal',
  privacy: 'private' as 'private' | 'public'
});

// Form errors
const errors = reactive({
  name: '',
  description: '',
  type: '',
  privacy: ''
});

// Computed properties
const isEditMode = computed(() => !!props.workspace?.id);

// Initialize form with workspace data if in edit mode
onMounted(() => {
  if (props.workspace) {
    form.name = props.workspace.name || '';
    form.description = props.workspace.description || '';
    form.type = props.workspace.type || 'business';
    form.privacy = props.workspace.privacy || 'private';
  }
});

// Form submission
const handleSubmit = () => {
  // Reset errors
  errors.name = '';
  errors.description = '';
  errors.type = '';
  errors.privacy = '';
  
  // Validate form
  let isValid = true;
  
  if (!form.name.trim()) {
    errors.name = 'Workspace name is required';
    isValid = false;
  }
  
  if (!form.type) {
    errors.type = 'Workspace type is required';
    isValid = false;
  }
  
  if (!form.privacy) {
    errors.privacy = 'Privacy setting is required';
    isValid = false;
  }
  
  if (!isValid) {
    return;
  }
  
  // Submit form
  emit('submit', {
    ...form,
    id: props.workspace?.id
  });
};
</script>
