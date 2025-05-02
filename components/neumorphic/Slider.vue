<template>
  <div class="mb-4">
    <div class="flex justify-between items-center mb-2">
      <label
        v-if="label"
        :for="id"
        class="block text-sm font-medium text-[rgb(var(--color-neumorphic-text))]"
      >
        {{ label }}
      </label>
      <div v-if="showValue" class="text-sm text-[rgb(var(--color-neumorphic-text))]">
        {{ displayValue }}
      </div>
    </div>
    
    <div class="relative">
      <div 
        class="h-2 rounded-full nm-pressed"
        :class="[disabled ? 'opacity-50' : '']"
      >
        <!-- Track Fill -->
        <div 
          class="absolute h-2 rounded-full bg-[rgb(var(--color-neumorphic-accent))]"
          :style="{ width: `${percentage}%` }"
        ></div>
      </div>
      
      <!-- Thumb -->
      <div 
        ref="thumbRef"
        class="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full nm-convex cursor-pointer"
        :class="[
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          dragging ? 'scale-110' : ''
        ]"
        :style="{ left: `calc(${percentage}% - 10px)` }"
        @mousedown="!disabled && startDrag"
        @touchstart="!disabled && startDrag"
      ></div>
      
      <!-- Hidden Input for Form Submission -->
      <input 
        :id="id"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :name="name"
        :disabled="disabled"
        class="sr-only"
        @input="updateValue($event.target.value)"
      />
    </div>
    
    <!-- Min/Max Labels -->
    <div v-if="showMinMax" class="flex justify-between mt-1">
      <span class="text-xs text-[rgb(var(--color-neumorphic-text))/70]">{{ min }}</span>
      <span class="text-xs text-[rgb(var(--color-neumorphic-text))/70]">{{ max }}</span>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Number, String],
    required: true
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: [Number, String],
    default: 1
  },
  label: {
    type: String,
    default: ''
  },
  showValue: {
    type: Boolean,
    default: true
  },
  showMinMax: {
    type: Boolean,
    default: false
  },
  valuePrefix: {
    type: String,
    default: ''
  },
  valueSuffix: {
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
  }
});

const emit = defineEmits(['update:modelValue']);

// Refs
const thumbRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const dragging = ref(false);

// Computed properties
const inputId = computed(() => props.id || `slider-${Math.random().toString(36).substring(2, 9)}`);

const currentValue = computed(() => {
  const value = typeof props.modelValue === 'string' 
    ? parseFloat(props.modelValue) 
    : props.modelValue;
  
  return Math.min(Math.max(value, props.min), props.max);
});

const percentage = computed(() => {
  return ((currentValue.value - props.min) / (props.max - props.min)) * 100;
});

const displayValue = computed(() => {
  return `${props.valuePrefix}${currentValue.value}${props.valueSuffix}`;
});

// Methods
function updateValue(value: string | number) {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  emit('update:modelValue', numValue);
}

function startDrag(event: MouseEvent | TouchEvent) {
  event.preventDefault();
  dragging.value = true;
  
  // Add event listeners for drag
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
  
  // Initial drag
  onDrag(event);
}

function onDrag(event: MouseEvent | TouchEvent) {
  if (!dragging.value || !thumbRef.value?.parentElement) return;
  
  const track = thumbRef.value.parentElement;
  const trackRect = track.getBoundingClientRect();
  
  // Get clientX from either mouse or touch event
  const clientX = 'touches' in event 
    ? event.touches[0].clientX 
    : event.clientX;
  
  // Calculate position relative to track
  let position = clientX - trackRect.left;
  position = Math.max(0, Math.min(position, trackRect.width));
  
  // Calculate value based on position
  const percentage = position / trackRect.width;
  const value = props.min + percentage * (props.max - props.min);
  
  // Round to step
  const step = typeof props.step === 'string' ? parseFloat(props.step) : props.step;
  const roundedValue = Math.round(value / step) * step;
  
  // Update value
  updateValue(roundedValue);
}

function stopDrag() {
  dragging.value = false;
  
  // Remove event listeners
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
}

// Lifecycle hooks
onMounted(() => {
  // Ensure value is within bounds
  if (currentValue.value < props.min || currentValue.value > props.max) {
    updateValue(Math.min(Math.max(currentValue.value, props.min), props.max));
  }
});

onBeforeUnmount(() => {
  // Clean up event listeners
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
});
</script>
