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
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full px-4 py-2 bg-[rgb(var(--color-neumorphic-bg))] rounded-lg text-[rgb(var(--color-neumorphic-text))] transition-all duration-300 focus:outline-none',
          'nm-pressed',
          error ? 'border border-[rgb(var(--color-neumorphic-accent-tertiary))]' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className
        ]"
        @input="handleInput"
        @blur="handleBlur"
      />
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
import { computed, ref } from 'vue';
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
  type: {
    type: String,
    default: 'text'
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

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substring(2, 9)}`);

// If name is provided, integrate with vee-validate
const fieldName = computed(() => props.name || '');
const { errorMessage, value, handleBlur: fieldBlur, handleChange } = fieldName.value
  ? useField(fieldName.value, undefined, {
      validateOnValueUpdate: props.validateOn === 'input'
    })
  : { errorMessage: ref(''), value: ref(props.modelValue), handleBlur: () => {}, handleChange: () => {} };

// Computed error message (from props or vee-validate)
const errorMsg = computed(() => props.error || errorMessage.value);

// Handle input changes
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);

  if (fieldName.value) {
    handleChange(target.value);
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
