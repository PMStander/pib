<template>
  <button
    :type="type"
    :class="[
      'relative rounded-lg px-4 py-2 transition-all duration-300 focus:outline-none',
      variant === 'flat' ? 'nm-flat' : '',
      variant === 'pressed' ? 'nm-pressed' : '',
      variant === 'concave' ? 'nm-concave' : '',
      variant === 'convex' ? 'nm-convex' : '',
      size === 'sm' ? 'text-sm' : '',
      size === 'md' ? 'text-base' : '',
      size === 'lg' ? 'text-lg' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      color === 'primary' ? 'text-[rgb(var(--color-neumorphic-accent))]' : '',
      color === 'secondary' ? 'text-[rgb(var(--color-neumorphic-accent-secondary))]' : '',
      color === 'danger' ? 'text-[rgb(var(--color-neumorphic-accent-tertiary))]' : '',
      color === 'default' ? 'text-[rgb(var(--color-neumorphic-text))]' : '',
      className
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  variant: {
    type: String,
    default: 'flat',
    validator: (value) => ['flat', 'pressed', 'concave', 'convex'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  color: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary', 'danger'].includes(value)
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

defineEmits(['click']);
</script>
