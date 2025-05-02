<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="id"
        type="radio"
        :value="value"
        :checked="modelValue === value"
        :name="name"
        :disabled="disabled"
        :readonly="readonly"
        class="sr-only peer"
        @change="$emit('update:modelValue', value)"
      />
      <div
        :class="[
          'relative w-5 h-5 rounded-full transition-all duration-300 nm-flat',
          'after:content-[\'\'] after:absolute after:opacity-0 after:top-[5px] after:left-[5px]',
          'after:w-[10px] after:h-[10px] after:rounded-full after:bg-[rgb(var(--color-neumorphic-accent))]',
          'after:scale-0 after:transition-all',
          'peer-checked:after:opacity-100 peer-checked:after:scale-50',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          readonly ? 'opacity-70 cursor-default' : '',
          error ? 'border border-[rgb(var(--color-neumorphic-accent-tertiary))]' : '',
          className
        ]"
        @click="!disabled && !readonly && $emit('update:modelValue', value)"
      ></div>
    </div>
    <div class="ml-3 text-sm">
      <label 
        v-if="label" 
        :for="id" 
        class="font-medium text-[rgb(var(--color-neumorphic-text))]"
        :class="{ 'cursor-pointer': !disabled && !readonly, 'cursor-not-allowed': disabled, 'cursor-default': readonly }"
      >
        {{ label }}
      </label>
      <p v-if="description" class="text-[rgb(var(--color-neumorphic-text))/70]">{{ description }}</p>
      <p v-if="error" class="mt-1 text-sm text-[rgb(var(--color-neumorphic-accent-tertiary))]">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    required: true
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  description: {
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
  className: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);

const inputId = computed(() => props.id || `radio-${Math.random().toString(36).substring(2, 9)}`);
</script>
