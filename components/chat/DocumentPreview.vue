<template>
  <div class="nm-flat p-4 rounded-lg mb-2 w-full max-w-md">
    <!-- Document Header -->
    <div class="flex items-center mb-2">
      <div class="w-8 h-8 rounded-full nm-flat flex items-center justify-center mr-2 text-[rgb(var(--color-neumorphic-accent))]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div class="flex-1">
        <h3 class="font-medium text-[rgb(var(--color-neumorphic-text))]">
          {{ document.title }}
        </h3>
        <div class="flex items-center text-xs text-[rgb(var(--color-neumorphic-text))/70]">
          <span>{{ formatTimestamp(document.createdAt) }}</span>
          <span class="mx-1">•</span>
          <span>{{ formatType(document.format) }}</span>
        </div>
      </div>
    </div>

    <!-- Document Preview Content -->
    <div class="nm-pressed p-3 rounded-lg text-sm text-[rgb(var(--color-neumorphic-text))] mb-3 max-h-32 overflow-hidden">
      <div v-if="document.format === 'markdown'" v-html="renderMarkdown(truncateContent(document.content))"></div>
      <div v-else-if="document.format === 'html'" v-html="truncateContent(document.content)"></div>
      <div v-else>{{ truncateContent(document.content) }}</div>
    </div>

    <!-- Actions -->
    <div class="flex justify-between">
      <NeumorphicButton
        variant="flat"
        size="sm"
        @click="$emit('view', document)"
      >
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Document
        </div>
      </NeumorphicButton>
      
      <NeumorphicButton
        variant="flat"
        size="sm"
        @click="$emit('copy', document)"
      >
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </div>
      </NeumorphicButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import type { DocumentArtifact } from '~/types/documents';
import { marked } from 'marked';

const props = defineProps<{
  document: DocumentArtifact;
}>();

const emit = defineEmits<{
  (e: 'view', document: DocumentArtifact): void;
  (e: 'copy', document: DocumentArtifact): void;
}>();

// Format timestamp
const formatTimestamp = (date: Date): string => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Format document type
const formatType = (format: string): string => {
  const formatLabels: Record<string, string> = {
    'text': 'Text',
    'markdown': 'Markdown',
    'html': 'HTML'
  };
  return formatLabels[format] || format;
};

// Truncate content for preview
const truncateContent = (content: string): string => {
  const maxLength = 200;
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '...';
};

// Render markdown content
const renderMarkdown = (content: string): string => {
  try {
    return marked(content);
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return content;
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
