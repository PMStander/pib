<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        class="nm-flat bg-[rgb(var(--color-neumorphic-bg))] p-6 rounded-xl w-full max-w-md"
        :class="[className]"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 v-if="title" class="text-xl font-semibold">{{ title }}</h2>
          <button 
            v-if="showCloseButton" 
            @click="$emit('update:modelValue', false)"
            class="text-[rgb(var(--color-neumorphic-text))] hover:text-[rgb(var(--color-neumorphic-accent-tertiary))] transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div v-if="description" class="mb-4 text-[rgb(var(--color-neumorphic-text))/70] text-sm">
          {{ description }}
        </div>
        
        <slot></slot>
        
        <div v-if="$slots.footer" class="mt-6">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  showCloseButton: {
    type: Boolean,
    default: true
  },
  className: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>
