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
        ref="inputRef"
        type="text"
        :value="displayValue"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="true"
        :class="[
          'w-full px-4 py-2 bg-[rgb(var(--color-neumorphic-bg))] rounded-lg text-[rgb(var(--color-neumorphic-text))] transition-all duration-300 focus:outline-none',
          'nm-pressed',
          error ? 'border border-[rgb(var(--color-neumorphic-accent-tertiary))]' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          className
        ]"
        @click="!disabled && toggleCalendar()"
      />
      
      <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <svg class="w-5 h-5 text-[rgb(var(--color-neumorphic-text))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
    </div>
    
    <!-- Calendar Dropdown -->
    <div 
      v-if="showCalendar" 
      class="absolute z-10 mt-1 nm-flat rounded-lg p-4 bg-[rgb(var(--color-neumorphic-bg))] w-64 dark-mode-transition"
    >
      <!-- Calendar Header -->
      <div class="flex justify-between items-center mb-4">
        <button 
          @click="prevMonth" 
          class="p-1 rounded-full hover:bg-[rgb(var(--color-neumorphic-dark)/0.2)]"
          type="button"
        >
          <svg class="w-5 h-5 text-[rgb(var(--color-neumorphic-text))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <div class="text-[rgb(var(--color-neumorphic-text))] font-medium">
          {{ currentMonthName }} {{ currentYear }}
        </div>
        
        <button 
          @click="nextMonth" 
          class="p-1 rounded-full hover:bg-[rgb(var(--color-neumorphic-dark)/0.2)]"
          type="button"
        >
          <svg class="w-5 h-5 text-[rgb(var(--color-neumorphic-text))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      
      <!-- Weekday Headers -->
      <div class="grid grid-cols-7 gap-1 mb-2">
        <div 
          v-for="day in weekdays" 
          :key="day" 
          class="text-center text-xs font-medium text-[rgb(var(--color-neumorphic-text))/70]"
        >
          {{ day }}
        </div>
      </div>
      
      <!-- Calendar Days -->
      <div class="grid grid-cols-7 gap-1">
        <div 
          v-for="(day, index) in calendarDays" 
          :key="index"
          class="text-center py-1 text-sm rounded-md transition-colors duration-200"
          :class="[
            day.isCurrentMonth ? 'text-[rgb(var(--color-neumorphic-text))]' : 'text-[rgb(var(--color-neumorphic-text))/40]',
            day.isToday ? 'bg-[rgb(var(--color-neumorphic-accent)/0.2)]' : '',
            day.isSelected ? 'bg-[rgb(var(--color-neumorphic-accent))] text-white' : '',
            day.isCurrentMonth && !day.isSelected ? 'hover:bg-[rgb(var(--color-neumorphic-dark)/0.2)] cursor-pointer' : '',
            !day.isCurrentMonth ? 'cursor-default' : 'cursor-pointer'
          ]"
          @click="day.isCurrentMonth && selectDate(day)"
        >
          {{ day.day }}
        </div>
      </div>
      
      <!-- Today Button -->
      <div class="mt-4 flex justify-between">
        <NeumorphicButton 
          size="sm" 
          variant="flat" 
          @click="selectToday"
          type="button"
        >
          Today
        </NeumorphicButton>
        
        <NeumorphicButton 
          size="sm" 
          variant="flat" 
          @click="closeCalendar"
          type="button"
        >
          Close
        </NeumorphicButton>
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
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import NeumorphicButton from './Button.vue';

const props = defineProps({
  modelValue: {
    type: [Date, String],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select date'
  },
  format: {
    type: String,
    default: 'MM/DD/YYYY'
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
  }
});

const emit = defineEmits(['update:modelValue']);

// Refs
const inputRef = ref<HTMLInputElement | null>(null);
const showCalendar = ref(false);
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const selectedDate = ref<Date | null>(null);

// Initialize selected date from model value
onMounted(() => {
  if (props.modelValue) {
    selectedDate.value = typeof props.modelValue === 'string' 
      ? new Date(props.modelValue) 
      : props.modelValue;
    
    // Set current month and year to match the selected date
    if (selectedDate.value && !isNaN(selectedDate.value.getTime())) {
      currentMonth.value = selectedDate.value.getMonth();
      currentYear.value = selectedDate.value.getFullYear();
    }
  }
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside);
});

// Clean up event listener
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Watch for model value changes
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    selectedDate.value = typeof newValue === 'string' ? new Date(newValue) : newValue;
  } else {
    selectedDate.value = null;
  }
});

// Computed properties
const inputId = computed(() => props.id || `date-picker-${Math.random().toString(36).substring(2, 9)}`);

const weekdays = computed(() => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);

const currentMonthName = computed(() => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[currentMonth.value];
});

const calendarDays = computed(() => {
  const days = [];
  
  // Get first day of the month
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);
  
  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // Add days from previous month
  const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const date = new Date(currentYear.value, currentMonth.value - 1, day);
    days.push({
      day,
      date,
      isCurrentMonth: false,
      isToday: isSameDay(date, new Date()),
      isSelected: selectedDate.value && isSameDay(date, selectedDate.value)
    });
  }
  
  // Add days for current month
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    const date = new Date(currentYear.value, currentMonth.value, day);
    days.push({
      day,
      date,
      isCurrentMonth: true,
      isToday: isSameDay(date, new Date()),
      isSelected: selectedDate.value && isSameDay(date, selectedDate.value)
    });
  }
  
  // Add days from next month to fill the calendar grid (6 rows x 7 days = 42 cells)
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, day);
    days.push({
      day,
      date,
      isCurrentMonth: false,
      isToday: isSameDay(date, new Date()),
      isSelected: selectedDate.value && isSameDay(date, selectedDate.value)
    });
  }
  
  return days;
});

const displayValue = computed(() => {
  if (!selectedDate.value || isNaN(selectedDate.value.getTime())) {
    return '';
  }
  
  // Format the date based on the format prop
  return formatDate(selectedDate.value, props.format);
});

// Methods
function toggleCalendar() {
  showCalendar.value = !showCalendar.value;
}

function closeCalendar() {
  showCalendar.value = false;
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (inputRef.value && !inputRef.value.contains(target) && showCalendar.value) {
    // Check if the click is inside the calendar
    const calendar = document.querySelector('.calendar-dropdown');
    if (calendar && !calendar.contains(target)) {
      closeCalendar();
    }
  }
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}

function selectDate(day: { date: Date }) {
  selectedDate.value = day.date;
  emit('update:modelValue', day.date);
  closeCalendar();
}

function selectToday() {
  const today = new Date();
  selectedDate.value = today;
  currentMonth.value = today.getMonth();
  currentYear.value = today.getFullYear();
  emit('update:modelValue', today);
}

// Helper functions
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

function formatDate(date: Date, format: string): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  // Replace format tokens with actual values
  return format
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('YYYY', year.toString())
    .replace('YY', year.toString().slice(-2))
    .replace('M', month.toString())
    .replace('D', day.toString());
}
</script>
