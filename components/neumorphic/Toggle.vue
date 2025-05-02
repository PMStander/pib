<template>
  <div class="flex items-center">
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        :checked="modelValue"
        class="sr-only peer"
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.checked)"
      >
      <div
        :class="[
          'relative w-11 h-6 rounded-full transition-all duration-300 nm-flat',
          'after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px]',
          'after:bg-white after:rounded-full after:h-5 after:w-5',
          'after:transition-all after:duration-300 after:nm-convex',
          'peer-checked:after:translate-x-full peer-checked:after:border-white',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          className
        ]"
      ></div>
      <span v-if="label" class="ml-3 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>
