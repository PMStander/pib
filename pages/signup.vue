<template>
  <div class="min-h-screen bg-[rgb(var(--color-neumorphic-bg))] flex items-center justify-center p-4">
    <NeumorphicCard title="Create an Account" class="w-full max-w-md">
      <div class="mb-6">
        <p class="text-[rgb(var(--color-neumorphic-text))/70] text-sm">
          Fill out the form below to create your account
        </p>
      </div>

      <form @submit.prevent="onSubmit">
        <NeumorphicInput
          v-model="values.name"
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          :error="errors.name"
          class="mb-4"
        />

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
          placeholder="Create a password"
          :error="errors.password"
          class="mb-4"
        />

        <NeumorphicInput
          v-model="values.confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          :error="errors.confirmPassword"
          class="mb-6"
        />

        <div class="flex items-center mb-6">
          <NeumorphicToggle
            v-model="values.terms"
            name="terms"
            label="I agree to the Terms and Conditions"
          />
          <p v-if="errors.terms" class="ml-2 text-sm text-[rgb(var(--color-neumorphic-accent-tertiary))]">
            {{ errors.terms }}
          </p>
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
          {{ isSubmitting || isAuthLoading ? 'Creating Account...' : 'Create Account' }}
        </NeumorphicButton>

        <div class="mt-4 text-center">
          <p class="text-[rgb(var(--color-neumorphic-text))/70] text-sm">
            Already have an account?
            <NuxtLink to="/login" class="text-[rgb(var(--color-neumorphic-accent))] hover:underline">Log in</NuxtLink>
          </p>
        </div>
      </form>
    </NeumorphicCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signupFormSchema } from '~/utils/validations/schemas';
import { useZodForm } from '~/composables/useZodForm';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useDataConnect } from '~/composables/useDataConnect';

const router = useRouter();
const authError = ref<string | null>(null);

// Initialize Firebase Auth
const { signUp, isLoading: isAuthLoading } = useFirebaseAuth();

// Initialize form with Zod validation
const {
  values,
  errors,
  isSubmitting,
  onSubmit
} = useZodForm(signupFormSchema, {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
});

// Handle form submission
onSubmit(async (validData) => {
  try {
    authError.value = null;

    // Create user with Firebase
    await signUp(validData.email, validData.password, validData.name);

    // Initialize user data in DataConnect
    const dataConnect = useDataConnect();
    await dataConnect.initUserData();

    // Show success message
    alert('Account created successfully! You can now log in.');

    // Redirect to login page
    router.push('/login');
  } catch (error: any) {
    authError.value = error.message;
    console.error('Signup failed:', error);
  }
});
</script>
