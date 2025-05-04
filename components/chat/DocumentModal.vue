<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="close"></div>
    <div class="relative z-10 w-full max-w-4xl">
      <DocumentView 
        :document="document" 
        @close="close" 
        @update="handleUpdate"
        @polish="handlePolish"
        @suggest="handleSuggest"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import DocumentView from '~/components/chat/DocumentView.vue';
import type { DocumentArtifact } from '~/types/documents';

const props = defineProps<{
  modelValue: boolean;
  document: DocumentArtifact;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update', document: DocumentArtifact): void;
  (e: 'polish', document: DocumentArtifact): void;
  (e: 'suggest', document: DocumentArtifact): void;
}>();

const isOpen = ref(props.modelValue);

// Watch for changes to modelValue prop
watch(() => props.modelValue, (newValue) => {
  isOpen.value = newValue;
});

// Watch for changes to isOpen and emit update:modelValue event
watch(isOpen, (newValue) => {
  emit('update:modelValue', newValue);
});

// Close the modal
const close = () => {
  isOpen.value = false;
};

// Handle document update
const handleUpdate = (updatedDocument: DocumentArtifact) => {
  emit('update', updatedDocument);
};

// Handle document polish request
const handlePolish = (document: DocumentArtifact) => {
  emit('polish', document);
};

// Handle document suggestion request
const handleSuggest = (document: DocumentArtifact) => {
  emit('suggest', document);
};
</script>
