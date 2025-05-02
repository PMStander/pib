<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="id"
        type="checkbox"
        :checked="modelValue"
        :name="name"
        :disabled="disabled"
        :readonly="readonly"
        class="sr-only peer"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      <div
        :class="[
          'relative w-5 h-5 rounded-md transition-all duration-300 nm-flat',
          'after:content-[\'\'] after:absolute after:opacity-0 after:top-[2px] after:left-[6px]',
          'after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-[rgb(var(--color-neumorphic-accent))]',
          'after:rotate-45 after:transition-opacity',
          'peer-checked:after:opacity-100',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          readonly ? 'opacity-70 cursor-default' : '',
          error ? 'border border-[rgb(var(--color-neumorphic-accent-tertiary))]' : '',
          className
        ]"
        @click="!disabled && !readonly && $emit('update:modelValue', !modelValue)"
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
    type: Boolean,
    default: false
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

const inputId = computed(() => props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`);
</script>
