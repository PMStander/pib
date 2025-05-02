<template>
  <form @submit.prevent="handleSubmit" class="nm-flat p-6 rounded-xl">
    <slot 
      :values="values" 
      :errors="errors" 
      :touched="touched"
      :isSubmitting="isSubmitting"
      :submitCount="submitCount"
    ></slot>
    
    <div v-if="formError" class="mt-4 p-3 bg-[rgb(var(--color-neumorphic-accent-tertiary))/10] rounded-lg text-[rgb(var(--color-neumorphic-accent-tertiary))] text-sm">
      {{ formError }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { Form as VeeForm } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const props = defineProps({
  schema: {
    type: Object as () => z.ZodType<any, any>,
    required: true
  },
  initialValues: {
    type: Object,
    default: () => ({})
  },
  validateOnMount: {
    type: Boolean,
    default: false
  },
  formError: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['submit', 'invalid']);

// Convert Zod schema to vee-validate compatible schema
const validationSchema = toTypedSchema(props.schema);

// Form state
const values = ref(props.initialValues);
const errors = ref({});
const touched = ref({});
const isSubmitting = ref(false);
const submitCount = ref(0);

// Handle form submission
const handleSubmit = async (values: any) => {
  isSubmitting.value = true;
  submitCount.value++;
  
  try {
    // Validate with Zod schema
    const validatedData = props.schema.parse(values);
    emit('submit', validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        formattedErrors[path] = err.message;
      });
      errors.value = formattedErrors;
      emit('invalid', formattedErrors);
    }
  } finally {
    isSubmitting.value = false;
  }
};

// Provide form context to child components
provide('form', {
  values,
  errors,
  touched,
  isSubmitting,
  submitCount
});
</script>
