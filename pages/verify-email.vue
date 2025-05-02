<template>
  <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] dark-mode-transition flex items-center justify-center p-4">
    <NeumorphicCard title="Email Verification" class="w-full max-w-md">
      <div v-if="isLoading" class="py-8 text-center">
        <div class="nm-flat w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
          <svg class="animate-spin h-8 w-8 text-[rgb(var(--color-neumorphic-accent))]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-[rgb(var(--color-neumorphic-text))]">Verifying your email...</p>
      </div>
      
      <div v-else-if="verificationSuccess" class="py-8 text-center">
        <div class="nm-flat w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))] mb-2">Email Verified!</h3>
        <p class="text-[rgb(var(--color-neumorphic-text))/70] mb-6">
          Your email has been successfully verified. You can now access all features of your account.
        </p>
        <NeumorphicButton
          variant="convex"
          color="primary"
          class="w-full"
          @click="router.push('/dashboard')"
        >
          Go to Dashboard
        </NeumorphicButton>
      </div>
      
      <div v-else-if="verificationError" class="py-8 text-center">
        <div class="nm-flat w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 text-[rgb(var(--color-neumorphic-accent-tertiary))]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))] mb-2">Verification Failed</h3>
        <p class="text-[rgb(var(--color-neumorphic-text))/70] mb-6">
          {{ verificationError }}
        </p>
        <div class="space-y-3">
          <NeumorphicButton
            variant="flat"
            class="w-full"
            @click="sendNewVerificationEmail"
            :disabled="isResendLoading"
          >
            {{ isResendLoading ? 'Sending...' : 'Send New Verification Email' }}
          </NeumorphicButton>
          
          <NeumorphicButton
            variant="convex"
            color="primary"
            class="w-full"
            @click="router.push('/dashboard')"
          >
            Go to Dashboard
          </NeumorphicButton>
        </div>
      </div>
      
      <div v-else-if="!actionCode" class="py-8 text-center">
        <div class="nm-flat w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 text-[rgb(var(--color-neumorphic-text))/70]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))] mb-2">Email Verification</h3>
        <p class="text-[rgb(var(--color-neumorphic-text))/70] mb-6">
          No verification code found. Please check your email and click on the verification link.
        </p>
        <div class="space-y-3">
          <NeumorphicButton
            variant="flat"
            class="w-full"
            @click="sendNewVerificationEmail"
            :disabled="isResendLoading"
          >
            {{ isResendLoading ? 'Sending...' : 'Send Verification Email' }}
          </NeumorphicButton>
          
          <NeumorphicButton
            variant="convex"
            color="primary"
            class="w-full"
            @click="router.push('/dashboard')"
          >
            Go to Dashboard
          </NeumorphicButton>
        </div>
      </div>
    </NeumorphicCard>
    
    <!-- Success Modal -->
    <NeumorphicModal
      v-model="showSuccessModal"
      title="Verification Email Sent"
      description="A verification email has been sent to your email address. Please check your inbox and click on the verification link."
    >
      <div class="flex justify-end">
        <NeumorphicButton
          variant="convex"
          color="primary"
          @click="showSuccessModal = false"
        >
          Close
        </NeumorphicButton>
      </div>
    </NeumorphicModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import NeumorphicCard from '~/components/neumorphic/Card.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import NeumorphicModal from '~/components/neumorphic/Modal.vue';

const route = useRoute();
const router = useRouter();

// Get the action code from the URL
const actionCode = ref<string | null>(null);

// States
const isLoading = ref(false);
const isResendLoading = ref(false);
const verificationSuccess = ref(false);
const verificationError = ref<string | null>(null);
const showSuccessModal = ref(false);

// Get Firebase auth
const { user, isAuthenticated, verifyEmail, sendVerificationEmail } = useFirebaseAuth();

// Handle email verification
const handleVerifyEmail = async () => {
  if (!actionCode.value) return;
  
  try {
    isLoading.value = true;
    await verifyEmail(actionCode.value);
    verificationSuccess.value = true;
  } catch (error: any) {
    verificationError.value = error.message;
  } finally {
    isLoading.value = false;
  }
};

// Send a new verification email
const sendNewVerificationEmail = async () => {
  try {
    isResendLoading.value = true;
    await sendVerificationEmail();
    showSuccessModal.value = true;
  } catch (error: any) {
    verificationError.value = error.message;
  } finally {
    isResendLoading.value = false;
  }
};

// On component mount
onMounted(() => {
  // Get the action code from the URL
  const oobCode = route.query.oobCode as string | undefined;
  
  if (oobCode) {
    actionCode.value = oobCode;
    handleVerifyEmail();
  }
});
</script>
