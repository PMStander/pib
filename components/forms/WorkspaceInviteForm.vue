<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label class="block mb-2 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
        Invite Members to {{ workspace?.name }}
      </label>
      <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mb-4">
        Enter email addresses of people you want to invite to this workspace.
      </p>
    </div>
    
    <div v-for="(email, index) in emails" :key="index" class="mb-3 flex items-center">
      <div class="flex-grow mr-2">
        <NeumorphicInput
          v-model="emails[index]"
          placeholder="Enter email address"
          :error="emailErrors[index]"
        />
      </div>
      
      <NeumorphicButton
        v-if="index > 0"
        type="button"
        variant="flat"
        size="sm"
        @click="removeEmail(index)"
        aria-label="Remove email"
      >
        <svg class="w-4 h-4 text-[rgb(var(--color-neumorphic-accent-tertiary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </NeumorphicButton>
    </div>
    
    <div class="mb-6">
      <NeumorphicButton
        type="button"
        variant="flat"
        size="sm"
        @click="addEmail"
      >
        + Add Another Email
      </NeumorphicButton>
    </div>
    
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
        Role
      </label>
      <div class="space-y-2">
        <NeumorphicRadio
          v-model="role"
          :value="'Member'"
          name="invite-role"
          label="Member"
          description="Can view and contribute to the workspace"
        />
        
        <NeumorphicRadio
          v-model="role"
          :value="'Admin'"
          name="invite-role"
          label="Admin"
          description="Can manage workspace settings and members"
        />
        
        <NeumorphicRadio
          v-model="role"
          :value="'Guest'"
          name="invite-role"
          label="Guest"
          description="Limited access to view only"
        />
      </div>
    </div>
    
    <div class="mb-6">
      <NeumorphicInput
        v-model="message"
        label="Personal Message (Optional)"
        placeholder="Add a personal message to your invitation"
        class="mb-4"
      />
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
        :disabled="isLoading || !hasValidEmails"
      >
        {{ isLoading ? 'Sending Invites...' : 'Send Invites' }}
      </NeumorphicButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import NeumorphicInput from '~/components/neumorphic/Input.vue';
import NeumorphicRadio from '~/components/neumorphic/Radio.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';

// Define workspace type
interface Workspace {
  id: string;
  name: string;
}

const props = defineProps({
  workspace: {
    type: Object as () => Workspace,
    required: true
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
const emails = ref(['']);
const emailErrors = ref(['']);
const role = ref('Member');
const message = ref('');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Computed properties
const hasValidEmails = computed(() => {
  return emails.value.some(email => email.trim() !== '' && emailRegex.test(email));
});

// Add email field
const addEmail = () => {
  emails.value.push('');
  emailErrors.value.push('');
};

// Remove email field
const removeEmail = (index: number) => {
  emails.value.splice(index, 1);
  emailErrors.value.splice(index, 1);
};

// Form submission
const handleSubmit = () => {
  // Reset errors
  emailErrors.value = emails.value.map(() => '');
  
  // Validate emails
  let isValid = true;
  
  emails.value.forEach((email, index) => {
    if (email.trim() === '') {
      if (index === 0 || emails.value.some(e => e.trim() !== '')) {
        emailErrors.value[index] = 'Email is required';
        isValid = false;
      }
    } else if (!emailRegex.test(email)) {
      emailErrors.value[index] = 'Invalid email format';
      isValid = false;
    }
  });
  
  if (!isValid) {
    return;
  }
  
  // Filter out empty emails
  const validEmails = emails.value.filter(email => email.trim() !== '');
  
  if (validEmails.length === 0) {
    emailErrors.value[0] = 'At least one email is required';
    return;
  }
  
  // Submit form
  emit('submit', {
    workspaceId: props.workspace.id,
    emails: validEmails,
    role: role.value,
    message: message.value
  });
};
</script>
