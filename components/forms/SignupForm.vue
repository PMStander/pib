<template>
  <form @submit.prevent="handleFormSubmit">
    <NeumorphicInput
      :model-value="values.name"
      @update:model-value="(val) => setFieldValue('name', val)"
      name="signup-name"
      label="Full Name"
      placeholder="Enter your full name"
      :error="errors.name"
      class="mb-4"
    />

    <NeumorphicInput
      :model-value="values.email"
      @update:model-value="(val) => setFieldValue('email', val)"
      name="signup-email"
      label="Email"
      type="email"
      placeholder="Enter your email"
      :error="errors.email"
      class="mb-4"
    />

    <NeumorphicInput
      :model-value="values.password"
      @update:model-value="(val) => setFieldValue('password', val)"
      name="signup-password"
      label="Password"
      type="password"
      placeholder="Create a password"
      :error="errors.password"
      class="mb-4"
    />

    <NeumorphicInput
      :model-value="values.confirmPassword"
      @update:model-value="(val) => setFieldValue('confirmPassword', val)"
      name="signup-confirm-password"
      label="Confirm Password"
      type="password"
      placeholder="Confirm your password"
      :error="errors.confirmPassword"
      class="mb-6"
    />

    <div class="flex items-center mb-6">
      <NeumorphicToggle
        :model-value="values.terms"
        @update:model-value="(val) => setFieldValue('terms', val)"
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
      @click="() => console.log('SignupForm - Submit button clicked directly')"
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signupFormSchema } from '~/utils/validations/schemas';
import { useZodForm } from '~/composables/useZodForm';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';

const props = defineProps({
  authError: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['submit']);

// Initialize Firebase Auth
const { isLoading: isAuthLoading } = useFirebaseAuth();

// Initialize form with Zod validation
const {
  values,
  errors,
  isSubmitting,
  onSubmit,
  setFieldValue
} = useZodForm(signupFormSchema, {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
});

// Custom form submission handler
const handleFormSubmit = () => {
  console.log('SignupForm - Form submit button clicked');
  console.log('SignupForm - Current form values:', values);
  console.log('SignupForm - Current form errors:', errors);

  // Manually validate all fields
  const validateAll = async () => {
    try {
      const result = await signupFormSchema.parseAsync({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        terms: values.terms
      });
      console.log('SignupForm - Manual validation passed:', result);
      emit('submit', result);
    } catch (error) {
      console.error('SignupForm - Manual validation failed:', error);
    }
  };

  validateAll();
};

// Handle form submission with validation
onSubmit(async (validData) => {
  console.log('SignupForm - Form submitted with valid data:', validData);
  emit('submit', validData);
});
</script>
