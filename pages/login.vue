<template>
  <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] flex items-center justify-center p-4">
    <NeumorphicCard title="Login" class="w-full max-w-md">
      <div class="mb-6">
        <p class="text-[rgb(var(--color-neumorphic-text))/70] text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      <LoginForm
        :auth-error="authError || undefined"
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
import { useAppState } from '~/composables/useAppState';
import { useSessionServer } from '~/composables/useSessionServer';
import LoginForm from '~/components/forms/LoginForm.vue';
import ForgotPasswordForm from '~/components/forms/ForgotPasswordForm.vue';
import NeumorphicModal from '~/components/neumorphic/Modal.vue';

const router = useRouter();
const authError = ref<string | null>(null);

// Initialize Firebase Auth
const { signIn, resetPassword, isLoading: isAuthLoading, user } = useFirebaseAuth();

// Initialize AppState
const appState = useAppState();

// Debug: Log current auth state
console.log('login.vue - Current auth state:', {
  isAuthLoading: isAuthLoading.value,
  user: user.value
});

// Forgot password state
const showForgotPassword = ref(false);
const isResetLoading = ref(false);
const resetSuccess = ref(false);

// Handle login form submission
const handleLogin = async (validData: { email: string; password: string; rememberMe: boolean }) => {
  console.log('login.vue - handleLogin called with:', validData);
  try {
    authError.value = null;
    console.log('login.vue - Signing in with Firebase...');

    // Sign in with Firebase
    const user = await signIn(validData.email, validData.password);
    console.log('login.vue - Firebase sign-in successful:', user);

    // If remember me is checked, we could set persistence here
    // This would require additional configuration in a real app
    console.log('login.vue - Remember me:', validData.rememberMe);

       // Set server-side session
       console.log('login.vue - Setting server-side session...');
    const sessionServer = useSessionServer();
    const sessionSet = await sessionServer.setSessionServer();
    console.log('login.vue - Server session set:', sessionSet);

    // Initialize user data from DataConnect
    console.log('login.vue - Initializing user data from DataConnect...');
    const dataConnect = useDataConnect();
    const userData = await dataConnect.initUserData();
    console.log('login.vue - User data initialized:', userData);

 

    // Log the user's workspaces and profiles
    console.log('login.vue - User workspaces:', appState.userWorkspaces.value);
    console.log('login.vue - User workspaces length:', appState.userWorkspaces.value.length);
    console.log('login.vue - User profiles:', appState.userProfiles.value);

    // Redirect to dashboard
    console.log('login.vue - Redirecting to dashboard...');
    router.push('/dashboard');
  } catch (error: any) {
    console.error('login.vue - Login failed with error:', error);
    authError.value = error.message;

    // Log more detailed error information
    if (error.code) {
      console.error('login.vue - Error code:', error.code);
    }
    if (error.stack) {
      console.error('login.vue - Error stack:', error.stack);
    }
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
