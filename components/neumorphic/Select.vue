<template>
  <div class="mb-4">
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]"
    >
      {{ label }}
    </label>
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        :name="name"
        :disabled="disabled"
        :readonly="readonly"
        :class="[
          'w-full px-4 py-2 bg-[rgb(var(--color-neumorphic-bg))] rounded-lg text-[rgb(var(--color-neumorphic-text))] transition-all duration-300 focus:outline-none appearance-none',
          'nm-pressed',
          error ? 'border border-[rgb(var(--color-neumorphic-accent-tertiary))]' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          readonly ? 'opacity-70 cursor-default' : '',
          className
        ]"
        @change="handleChange"
        @blur="handleBlur"
      >
        <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
        <slot></slot>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg class="w-5 h-5 text-[rgb(var(--color-neumorphic-text))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-[rgb(var(--color-neumorphic-accent-tertiary))]">
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-1 text-sm text-[rgb(var(--color-neumorphic-text))/60]">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  },
  validateOn: {
    type: String,
    default: 'blur', // Options: 'blur', 'input', 'submit'
  }
});

const emit = defineEmits(['update:modelValue', 'blur']);

const inputId = computed(() => props.id || `select-${Math.random().toString(36).substring(2, 9)}`);

// If name is provided, integrate with vee-validate
const fieldName = computed(() => props.name || '');
const { errorMessage, value, handleBlur: fieldBlur, handleChange: fieldHandleChange } = fieldName.value
  ? useField(fieldName.value, undefined, {
      validateOnValueUpdate: props.validateOn === 'input'
    })
  : { errorMessage: ref(''), value: ref(props.modelValue), handleBlur: () => {}, handleChange: () => {} };

// Computed error message (from props or vee-validate)
const errorMsg = computed(() => props.error || errorMessage.value);

// Handle change events
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);

  if (fieldName.value) {
    fieldHandleChange(target.value);
  }

  if (props.validateOn === 'input') {
    // Validation happens automatically through vee-validate
  }
};

// Handle blur events
const handleBlur = (event: Event) => {
  emit('blur', event);

  if (fieldName.value) {
    fieldBlur();
  }
};
</script>
