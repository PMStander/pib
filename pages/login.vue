<template>
  <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] flex items-center justify-center p-4">
    <NeumorphicCard title="Login" class="w-full max-w-md">
      <div class="mb-6">
        <p class="text-[rgb(var(--color-neumorphic-text))/70] text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      <form @submit.prevent="onSubmit">
        <NeumorphicInput
          v-model="values.email"
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          :error="errors.email"
          class="mb-4"
        />

        <NeumorphicInput
          v-model="values.password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          :error="errors.password"
          class="mb-6"
        />

        <div class="flex items-center justify-between mb-6">
          <NeumorphicToggle
            v-model="values.rememberMe"
            name="rememberMe"
            label="Remember me"
          />
          <button
            type="button"
            @click="showForgotPassword = true"
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
    </NeumorphicCard>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="nm-flat bg-[rgb(var(--color-neumorphic-bg))] p-6 rounded-xl w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Reset Password</h2>
        <p class="mb-4 text-[rgb(var(--color-neumorphic-text))/70] text-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form @submit.prevent="handleResetPassword">
          <NeumorphicInput
            v-model="resetEmail"
            label="Email"
            type="email"
            placeholder="Enter your email"
            :error="resetEmailError"
            class="mb-4"
          />

          <div v-if="resetSuccess" class="mb-4 p-3 bg-green-100 rounded-lg text-green-700 text-sm">
            Password reset email sent! Check your inbox.
          </div>

          <div class="flex justify-end space-x-3">
            <NeumorphicButton
              type="button"
              variant="flat"
              @click="showForgotPassword = false"
            >
              Cancel
            </NeumorphicButton>

            <NeumorphicButton
              type="submit"
              variant="convex"
              color="primary"
              :disabled="isResetLoading"
            >
              {{ isResetLoading ? 'Sending...' : 'Send Reset Link' }}
            </NeumorphicButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginFormSchema } from '~/utils/validations/schemas';
import { useZodForm } from '~/composables/useZodForm';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useDataConnect } from '~/composables/useDataConnect';

const router = useRouter();
const authError = ref<string | null>(null);

// Initialize Firebase Auth
const { signIn, resetPassword, isLoading: isAuthLoading } = useFirebaseAuth();

// Initialize form with Zod validation
const {
  values,
  errors,
  isSubmitting,
  onSubmit
} = useZodForm(loginFormSchema, {
  email: '',
  password: '',
  rememberMe: false
});

// Forgot password state
const showForgotPassword = ref(false);
const resetEmail = ref('');
const resetEmailError = ref('');
const isResetLoading = ref(false);
const resetSuccess = ref(false);

// Handle form submission
onSubmit(async (validData) => {
  try {
    authError.value = null;

    // Sign in with Firebase
    await signIn(validData.email, validData.password);

    // If remember me is not checked, set session persistence
    // This would require additional configuration in a real app

    // Initialize user data from DataConnect
    const dataConnect = useDataConnect();
    await dataConnect.initUserData();

    // Redirect to dashboard
    router.push('/dashboard');
  } catch (error: any) {
    authError.value = error.message;
    console.error('Login failed:', error);
  }
});

// Handle password reset
const handleResetPassword = async () => {
  resetEmailError.value = '';
  resetSuccess.value = false;

  if (!resetEmail.value) {
    resetEmailError.value = 'Please enter your email address';
    return;
  }

  try {
    isResetLoading.value = true;
    await resetPassword(resetEmail.value);
    resetSuccess.value = true;

    // Close the modal after 3 seconds
    setTimeout(() => {
      showForgotPassword.value = false;
      resetEmail.value = '';
    }, 3000);
  } catch (error: any) {
    resetEmailError.value = error.message;
  } finally {
    isResetLoading.value = false;
  }
};
</script>
