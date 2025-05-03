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
  console.log('signup.vue - handleSignup called with:', validData);
  try {
    authError.value = null;
    console.log('signup.vue - Creating user with Firebase...');

    // Create user with Firebase
    const newUser = await signUp(validData.email, validData.password, validData.name);
    console.log('signup.vue - User created successfully:', newUser);

    // Send verification email
    console.log('signup.vue - Sending verification email...');
    await sendVerificationEmail();
    console.log('signup.vue - Verification email sent');

    // Initialize user data in DataConnect
    console.log('signup.vue - Initializing user data in DataConnect...');
    const dataConnect = useDataConnect();
    try {
      await dataConnect.initUserData();
      console.log('signup.vue - User data initialized');
    } catch (dataConnectError) {
      // Just log the error but don't fail the signup process
      console.warn('signup.vue - DataConnect initialization failed, but continuing with signup:', dataConnectError);
      // The user will still be able to use the app, and we can try to initialize again later
    }

    // Show success message and redirect to verification page
    console.log('signup.vue - Redirecting to verification page...');
    router.push({
      path: '/verify-email',
      query: { email: validData.email }
    });
  } catch (error: any) {
    console.error('signup.vue - Signup failed with error:', error);
    authError.value = error.message;
  }
};
</script>
