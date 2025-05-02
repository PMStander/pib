<template>
  <div 
    :class="[
      'rounded-xl p-6 transition-all duration-300',
      variant === 'flat' ? 'nm-flat' : '',
      variant === 'pressed' ? 'nm-pressed' : '',
      variant === 'concave' ? 'nm-concave' : '',
      variant === 'convex' ? 'nm-convex' : '',
      className
    ]"
  >
    <div v-if="title" class="mb-4 text-lg font-medium text-[rgb(var(--color-neumorphic-text))]">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'flat',
    validator: (value) => ['flat', 'pressed', 'concave', 'convex'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  }
});
</script>
