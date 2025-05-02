<template>
  <form @submit.prevent="onSubmit">
    <NeumorphicInput
      :model-value="values.email"
      @update:model-value="(val) => setFieldValue('email', val)"
      name="login-email"
      label="Email"
      type="email"
      placeholder="Enter your email"
      :error="errors.email"
      class="mb-4"
    />

    <NeumorphicInput
      :model-value="values.password"
      @update:model-value="(val) => setFieldValue('password', val)"
      name="login-password"
      label="Password"
      type="password"
      placeholder="Enter your password"
      :error="errors.password"
      class="mb-6"
    />

    <div class="flex items-center justify-between mb-6">
      <NeumorphicToggle
        :model-value="values.rememberMe"
        @update:model-value="(val) => setFieldValue('rememberMe', val)"
        name="rememberMe"
        label="Remember me"
      />
      <button
        type="button"
        @click="$emit('forgot-password')"
        class="text-sm text-[rgb(var(--color-neumorphic-accent))] hover:underline"
      >
        Forgot password?
      </button>
    </div>

    <div v-if="authError" class="mb-4 p-3 bg-[rgb(var(--color-neumorphic-accent-tertiary))/10] rounded-lg text-[rgb(var(--color-neumorphic-accent-tertiary))] text-sm">
      {{ authError }}
    </div>

    <NeumorphicButton
      type="submit"
      variant="convex"
      color="primary"
      class="w-full"
      :disabled="isSubmitting || isAuthLoading"
    >
      {{ isSubmitting || isAuthLoading ? 'Logging in...' : 'Log In' }}
    </NeumorphicButton>

    <div class="mt-4 text-center">
      <p class="text-[rgb(var(--color-neumorphic-text))/70] text-sm">
        Don't have an account?
        <NuxtLink to="/signup" class="text-[rgb(var(--color-neumorphic-accent))] hover:underline">Sign up</NuxtLink>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { loginFormSchema } from '~/utils/validations/schemas';
import { useZodForm } from '~/composables/useZodForm';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';

const props = defineProps({
  authError: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['submit', 'forgot-password']);

// Initialize Firebase Auth
const { isLoading: isAuthLoading } = useFirebaseAuth();

// Initialize form with Zod validation
const {
  values,
  errors,
  isSubmitting,
  onSubmit,
  setFieldValue
} = useZodForm(loginFormSchema, {
  email: '',
  password: '',
  rememberMe: false
});

// Handle form submission
onSubmit(async (validData) => {
  emit('submit', validData);
});
</script>
