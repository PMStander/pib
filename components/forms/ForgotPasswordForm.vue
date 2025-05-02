<template>
  <form @submit.prevent="handleSubmit">
    <NeumorphicInput
      v-model="email"
      label="Email"
      type="email"
      placeholder="Enter your email"
      :error="emailError"
      class="mb-4"
    />

    <div v-if="resetSuccess" class="mb-4 p-3 bg-green-100 rounded-lg text-green-700 text-sm">
      Password reset email sent! Check your inbox.
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
        {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
      </NeumorphicButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  resetSuccess: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

const email = ref('');
const emailError = ref('');

const handleSubmit = () => {
  emailError.value = '';

  if (!email.value) {
    emailError.value = 'Please enter your email address';
    return;
  }

  // Validate email format
  try {
    z.string().email('Please enter a valid email address').parse(email.value);
    emit('submit', email.value);
  } catch (error) {
    if (error instanceof z.ZodError) {
      emailError.value = error.errors[0].message;
    } else {
      emailError.value = 'Invalid email format';
    }
  }
};
</script>
