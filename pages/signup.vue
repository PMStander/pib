<template>
  <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] flex items-center justify-center p-4">
    <NeumorphicCard title="Create an Account" class="w-full max-w-md">
      <div class="mb-6">
        <p class="text-[rgb(var(--color-neumorphic-text))/70] text-sm">
          Fill out the form below to create your account
        </p>
      </div>

      <SignupForm
        :auth-error="authError"
        @submit="handleSignup"
      />
    </NeumorphicCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useDataConnect } from '~/composables/useDataConnect';
import SignupForm from '~/components/forms/SignupForm.vue';

const router = useRouter();
const authError = ref<string | null>(null);

// Initialize Firebase Auth
const { signUp, sendVerificationEmail } = useFirebaseAuth();

// Handle form submission
const handleSignup = async (validData) => {
  try {
    authError.value = null;

    // Create user with Firebase
    const newUser = await signUp(validData.email, validData.password, validData.name);

    // Send verification email
    await sendVerificationEmail();

    // Initialize user data in DataConnect
    const dataConnect = useDataConnect();
    await dataConnect.initUserData();

    // Show success message and redirect to verification page
    router.push({
      path: '/verify-email',
      query: { email: validData.email }
    });
  } catch (error: any) {
    authError.value = error.message;
    console.error('Signup failed:', error);
  }
};
</script>
