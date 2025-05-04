<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="nm-flat bg-[rgb(var(--color-neumorphic-bg))] rounded-xl w-full max-w-4xl h-[90vh] flex flex-col">
      <!-- Document Header -->
      <div class="flex justify-between items-center p-4 border-b border-[rgb(var(--color-neumorphic-text))/10]">
        <div class="flex items-center">
          <h2 class="text-xl font-semibold text-[rgb(var(--color-neumorphic-text))]">{{ document.title }}</h2>
          <span class="ml-2 text-xs px-2 py-1 rounded-full nm-flat text-[rgb(var(--color-neumorphic-text))/70]">
            {{ formatType(document.format) }}
          </span>
        </div>
        
        <div class="flex space-x-2">
          <!-- Navigation Controls -->
          <NeumorphicButton
            variant="flat"
            size="sm"
            @click="$emit('close')"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </NeumorphicButton>
        </div>
      </div>
      
      <!-- Document Content -->
      <div class="flex-1 overflow-auto p-6 nm-pressed rounded-lg m-4">
        <div v-if="isEditing" class="h-full">
          <textarea
            v-model="editableContent"
            class="w-full h-full p-4 bg-[rgb(var(--color-neumorphic-bg))] text-[rgb(var(--color-neumorphic-text))] rounded-lg focus:outline-none nm-pressed"
            :placeholder="'Enter your ' + document.format + ' content here...'"
          ></textarea>
        </div>
        <div v-else class="document-content">
          <div v-if="document.format === 'markdown'" v-html="renderMarkdown(document.content)" class="prose prose-sm max-w-none"></div>
          <div v-else-if="document.format === 'html'" v-html="document.content"></div>
          <div v-else class="whitespace-pre-wrap">{{ document.content }}</div>
        </div>
      </div>
      
      <!-- Document Actions -->
      <div class="p-4 border-t border-[rgb(var(--color-neumorphic-text))/10] flex justify-between">
        <div class="flex space-x-2">
          <!-- Edit/Save Toggle -->
          <NeumorphicButton
            variant="flat"
            size="sm"
            @click="toggleEditing"
          >
            <div class="flex items-center">
              <svg v-if="!isEditing" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isEditing ? 'Save' : 'Edit' }}
            </div>
          </NeumorphicButton>
          
          <!-- Copy Button -->
          <NeumorphicButton
            variant="flat"
            size="sm"
            @click="copyDocument"
          >
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </div>
          </NeumorphicButton>
        </div>
        
        <div class="flex space-x-2">
          <!-- Polish Button -->
          <NeumorphicButton
            variant="flat"
            size="sm"
            color="primary"
            @click="$emit('polish', document)"
          >
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Polish
            </div>
          </NeumorphicButton>
          
          <!-- Suggestions Button -->
          <NeumorphicButton
            variant="flat"
            size="sm"
            color="primary"
            @click="$emit('suggest', document)"
          >
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Suggestions
            </div>
          </NeumorphicButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import type { DocumentArtifact } from '~/types/documents';
import { marked } from 'marked';

const props = defineProps<{
  document: DocumentArtifact;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', document: DocumentArtifact): void;
  (e: 'polish', document: DocumentArtifact): void;
  (e: 'suggest', document: DocumentArtifact): void;
}>();

// Editable content
const isEditing = ref(false);
const editableContent = ref(props.document.content);

// Format document type
const formatType = (format: string): string => {
  const formatLabels: Record<string, string> = {
    'text': 'Text',
    'markdown': 'Markdown',
    'html': 'HTML'
  };
  return formatLabels[format] || format;
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

// Toggle editing mode
const toggleEditing = () => {
  if (isEditing.value) {
    // Save changes
    const updatedDocument = {
      ...props.document,
      content: editableContent.value,
      updatedAt: new Date()
    };
    emit('update', updatedDocument);
  }
  isEditing.value = !isEditing.value;
};

// Copy document content to clipboard
const copyDocument = async () => {
  try {
    await navigator.clipboard.writeText(props.document.content);
    // You could add a toast notification here
    console.log('Document copied to clipboard');
  } catch (error) {
    console.error('Failed to copy document:', error);
  }
};

// Reset editable content when document changes
onMounted(() => {
  editableContent.value = props.document.content;
});
</script>

<style>
.document-content {
  @apply text-[rgb(var(--color-neumorphic-text))];
}

.document-content h1, 
.document-content h2, 
.document-content h3, 
.document-content h4, 
.document-content h5, 
.document-content h6 {
  @apply font-bold mb-4;
}

.document-content h1 {
  @apply text-2xl;
}

.document-content h2 {
  @apply text-xl;
}

.document-content h3 {
  @apply text-lg;
}

.document-content p {
  @apply mb-4;
}

.document-content ul, 
.document-content ol {
  @apply mb-4 ml-6;
}

.document-content ul {
  @apply list-disc;
}

.document-content ol {
  @apply list-decimal;
}

.document-content a {
  @apply text-[rgb(var(--color-neumorphic-accent))] underline;
}

.document-content blockquote {
  @apply border-l-4 border-[rgb(var(--color-neumorphic-text))/20] pl-4 italic my-4;
}

.document-content pre {
  @apply bg-[rgb(var(--color-neumorphic-bg))/50] p-4 rounded-lg overflow-x-auto my-4;
}

.document-content code {
  @apply font-mono bg-[rgb(var(--color-neumorphic-bg))/50] px-1 py-0.5 rounded;
}

.document-content table {
  @apply w-full border-collapse my-4;
}

.document-content th, 
.document-content td {
  @apply border border-[rgb(var(--color-neumorphic-text))/20] p-2;
}

.document-content th {
  @apply bg-[rgb(var(--color-neumorphic-bg))/50];
}
</style>
