<template>
  <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] dark-mode-transition">
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <div class="nm-flat p-6 rounded-xl">
        <p class="text-[rgb(var(--color-neumorphic-text))]">Loading...</p>
      </div>
    </div>

    <div v-else-if="!isAuthenticated" class="flex justify-center items-center h-screen">
      <NeumorphicCard title="Access Denied" class="w-full max-w-md">
        <p class="text-[rgb(var(--color-neumorphic-text))/70] mb-6">
          You need to be logged in to view this page.
        </p>
        <NeumorphicButton
          variant="convex"
          color="primary"
          class="w-full"
          @click="router.push('/login')"
        >
          Go to Login
        </NeumorphicButton>
      </NeumorphicCard>
    </div>

    <div v-else class="relative">
      <!-- Header with Sign Out Button -->
      <div class="bg-[rgb(var(--color-neumorphic-bg))] dark-mode-transition border-b border-[rgb(var(--color-neumorphic-dark)/0.1)] p-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold text-[rgb(var(--color-neumorphic-text))]">Partners in Biz</h1>
          <div class="flex items-center space-x-4">
            <NeumorphicButton
              variant="flat"
              size="sm"
              @click="router.push('/dashboard')"
            >
              Dashboard
            </NeumorphicButton>
            <NeumorphicButton
              variant="flat"
              size="sm"
              @click="handleSignOut"
            >
              Sign Out
            </NeumorphicButton>
          </div>
        </div>
      </div>
      
      <!-- Profile Page Component -->
      <ProfilePage 
        :user="user" 
        @delete-account="handleDeleteAccount"
      />
    </div>
    
    <!-- Delete Account Confirmation Modal -->
    <NeumorphicModal
      v-model="showDeleteConfirmation"
      title="Account Deletion"
      description="Your account has been scheduled for deletion. You will be signed out now."
    >
      <div class="flex justify-center">
        <NeumorphicButton
          variant="convex"
          color="primary"
          @click="finalizeDeleteAccount"
        >
          OK
        </NeumorphicButton>
      </div>
    </NeumorphicModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import ProfilePage from '~/components/pages/ProfilePage.vue';
import NeumorphicCard from '~/components/neumorphic/Card.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import NeumorphicModal from '~/components/neumorphic/Modal.vue';

const router = useRouter();

// Initialize Firebase Auth
const { user, isAuthenticated, isLoading, signOut } = useFirebaseAuth();

// Delete account confirmation
const showDeleteConfirmation = ref(false);

// Handle sign out
const handleSignOut = async () => {
  try {
    await signOut();
    router.push('/login');
  } catch (error) {
    console.error('Sign out failed:', error);
  }
};

// Handle delete account
const handleDeleteAccount = () => {
  // Show confirmation modal
  showDeleteConfirmation.value = true;
};

// Finalize delete account
const finalizeDeleteAccount = async () => {
  try {
    // In a real implementation, you would delete the user account here
    // For now, we'll just sign out
    await signOut();
    router.push('/login');
  } catch (error) {
    console.error('Delete account failed:', error);
  }
};
</script>
