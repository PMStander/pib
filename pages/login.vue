<template>
  <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] flex items-center justify-center p-4">
    <NeumorphicCard title="Login" class="w-full max-w-md">
      <div class="mb-6">
        <p class="text-[rgb(var(--color-neumorphic-text))/70] text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      <LoginForm
        :auth-error="authError"
        @submit="handleLogin"
        @forgot-password="showForgotPassword = true"
      />
    </NeumorphicCard>

    <!-- Forgot Password Modal -->
    <NeumorphicModal
      v-model="showForgotPassword"
      title="Reset Password"
      description="Enter your email address and we'll send you a link to reset your password."
    >
      <ForgotPasswordForm
        :is-loading="isResetLoading"
        :reset-success="resetSuccess"
        @submit="handleResetPassword"
        @cancel="showForgotPassword = false"
      />
    </NeumorphicModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useDataConnect } from '~/composables/useDataConnect';
import LoginForm from '~/components/forms/LoginForm.vue';
import ForgotPasswordForm from '~/components/forms/ForgotPasswordForm.vue';
import NeumorphicModal from '~/components/neumorphic/Modal.vue';

const router = useRouter();
const authError = ref<string | null>(null);

// Initialize Firebase Auth
const { signIn, resetPassword, isLoading: isAuthLoading } = useFirebaseAuth();

// Forgot password state
const showForgotPassword = ref(false);
const isResetLoading = ref(false);
const resetSuccess = ref(false);

// Handle login form submission
const handleLogin = async (validData) => {
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
};

// Handle password reset
const handleResetPassword = async (email: string) => {
  try {
    isResetLoading.value = true;
    resetSuccess.value = false;

    await resetPassword(email);
    resetSuccess.value = true;

    // Close the modal after 3 seconds
    setTimeout(() => {
      showForgotPassword.value = false;
    }, 3000);
  } catch (error: any) {
    console.error('Password reset failed:', error);
    throw error;
  } finally {
    isResetLoading.value = false;
  }
};
</script>
