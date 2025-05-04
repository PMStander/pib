<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="nm-flat bg-[rgb(var(--color-neumorphic-bg))] rounded-xl w-full max-w-4xl h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="flex justify-between items-center p-4 border-b border-[rgb(var(--color-neumorphic-text))/10]">
        <div class="flex items-center">
          <h2 class="text-xl font-semibold text-[rgb(var(--color-neumorphic-text))]">{{ document.title }} - Suggestions</h2>
        </div>
        
        <div class="flex space-x-2">
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
      
      <!-- Content -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Document with Highlighted Suggestions -->
        <div class="w-2/3 overflow-auto p-6 nm-pressed rounded-lg m-4">
          <div class="document-content relative">
            <template v-if="document.format === 'markdown'">
              <div v-html="renderMarkdownWithHighlights(document.content, suggestions)" class="prose prose-sm max-w-none"></div>
            </template>
            <template v-else-if="document.format === 'html'">
              <div v-html="renderHtmlWithHighlights(document.content, suggestions)"></div>
            </template>
            <template v-else>
              <div v-html="renderTextWithHighlights(document.content, suggestions)" class="whitespace-pre-wrap"></div>
            </template>
          </div>
        </div>
        
        <!-- Suggestions Panel -->
        <div class="w-1/3 overflow-auto p-4 border-l border-[rgb(var(--color-neumorphic-text))/10]">
          <h3 class="text-lg font-medium mb-4 text-[rgb(var(--color-neumorphic-text))]">Suggestions</h3>
          
          <div v-if="suggestions.length === 0" class="text-[rgb(var(--color-neumorphic-text))/70] text-sm">
            No suggestions available yet. Click "Request Suggestions" to get AI-powered writing improvements.
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="(suggestion, index) in suggestions" 
              :key="index"
              class="nm-flat p-3 rounded-lg"
              :class="{ 'opacity-50': suggestion.applied }"
            >
              <div class="mb-2 text-xs text-[rgb(var(--color-neumorphic-text))/70] flex justify-between">
                <span>Suggestion {{ index + 1 }}</span>
                <span v-if="suggestion.applied" class="text-[rgb(var(--color-neumorphic-accent))]">Applied</span>
              </div>
              
              <div class="mb-2">
                <div class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mb-1">Original:</div>
                <div class="nm-pressed p-2 rounded text-sm text-[rgb(var(--color-neumorphic-text))]">{{ suggestion.targetText }}</div>
              </div>
              
              <div class="mb-2">
                <div class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mb-1">Suggested:</div>
                <div class="nm-pressed p-2 rounded text-sm text-[rgb(var(--color-neumorphic-accent))]">{{ suggestion.suggestedText }}</div>
              </div>
              
              <div class="mb-3">
                <div class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mb-1">Reason:</div>
                <div class="text-sm text-[rgb(var(--color-neumorphic-text))]">{{ suggestion.reason }}</div>
              </div>
              
              <div class="flex justify-end space-x-2" v-if="!suggestion.applied">
                <NeumorphicButton
                  variant="flat"
                  size="sm"
                  @click="rejectSuggestion(index)"
                >
                  Ignore
                </NeumorphicButton>
                
                <NeumorphicButton
                  variant="flat"
                  size="sm"
                  color="primary"
                  @click="applySuggestion(index)"
                >
                  Apply
                </NeumorphicButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="p-4 border-t border-[rgb(var(--color-neumorphic-text))/10] flex justify-between">
        <NeumorphicButton
          variant="flat"
          size="sm"
          @click="$emit('close')"
        >
          Close
        </NeumorphicButton>
        
        <NeumorphicButton
          variant="flat"
          size="sm"
          color="primary"
          @click="$emit('request-suggestions', document)"
          :disabled="isLoading"
        >
          <div class="flex items-center">
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isLoading ? 'Generating...' : 'Request Suggestions' }}</span>
          </div>
        </NeumorphicButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import type { DocumentArtifact, DocumentSuggestion } from '~/types/documents';
import { marked } from 'marked';

const props = defineProps<{
  document: DocumentArtifact;
  suggestions: DocumentSuggestion[];
  isLoading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'apply-suggestion', suggestionIndex: number, updatedDocument: DocumentArtifact): void;
  (e: 'reject-suggestion', suggestionIndex: number): void;
  (e: 'request-suggestions', document: DocumentArtifact): void;
}>();

// Apply a suggestion
const applySuggestion = (index: number) => {
  const suggestion = props.suggestions[index];
  if (!suggestion || suggestion.applied) return;
  
  // Create a new document with the suggestion applied
  let newContent = props.document.content;
  
  // Replace the target text with the suggested text
  if (suggestion.position && suggestion.position.startIndex !== undefined && suggestion.position.endIndex !== undefined) {
    // Use position if available
    newContent = 
      newContent.substring(0, suggestion.position.startIndex) + 
      suggestion.suggestedText + 
      newContent.substring(suggestion.position.endIndex);
  } else {
    // Fall back to simple string replacement
    newContent = newContent.replace(suggestion.targetText, suggestion.suggestedText);
  }
  
  const updatedDocument = {
    ...props.document,
    content: newContent,
    updatedAt: new Date()
  };
  
  emit('apply-suggestion', index, updatedDocument);
};

// Reject a suggestion
const rejectSuggestion = (index: number) => {
  emit('reject-suggestion', index);
};

// Render markdown with highlighted suggestions
const renderMarkdownWithHighlights = (content: string, suggestions: DocumentSuggestion[]): string => {
  try {
    // First highlight the suggestions
    const contentWithHighlights = highlightSuggestions(content, suggestions);
    // Then render the markdown
    return marked(contentWithHighlights);
  } catch (error) {
    console.error('Error rendering markdown with highlights:', error);
    return content;
  }
};

// Render HTML with highlighted suggestions
const renderHtmlWithHighlights = (content: string, suggestions: DocumentSuggestion[]): string => {
  try {
    // Highlight the suggestions in the HTML
    return highlightSuggestions(content, suggestions);
  } catch (error) {
    console.error('Error rendering HTML with highlights:', error);
    return content;
  }
};

// Render text with highlighted suggestions
const renderTextWithHighlights = (content: string, suggestions: DocumentSuggestion[]): string => {
  try {
    // Highlight the suggestions and convert newlines to <br>
    const contentWithHighlights = highlightSuggestions(content, suggestions);
    return contentWithHighlights.replace(/\n/g, '<br>');
  } catch (error) {
    console.error('Error rendering text with highlights:', error);
    return content.replace(/\n/g, '<br>');
  }
};

// Highlight suggestions in content
const highlightSuggestions = (content: string, suggestions: DocumentSuggestion[]): string => {
  if (!suggestions || suggestions.length === 0) return content;
  
  // Sort suggestions by position (end to start) to avoid offset issues
  const sortedSuggestions = [...suggestions].sort((a, b) => {
    if (a.position && b.position) {
      return b.position.startIndex - a.position.startIndex;
    }
    return 0;
  });
  
  let result = content;
  
  for (const suggestion of sortedSuggestions) {
    if (suggestion.applied) continue;
    
    if (suggestion.position && suggestion.position.startIndex !== undefined && suggestion.position.endIndex !== undefined) {
      // Use position if available
      const before = result.substring(0, suggestion.position.startIndex);
      const highlighted = `<span class="suggestion-highlight" data-suggestion-id="${suggestion.id}">${result.substring(suggestion.position.startIndex, suggestion.position.endIndex)}</span>`;
      const after = result.substring(suggestion.position.endIndex);
      result = before + highlighted + after;
    } else {
      // Fall back to simple string replacement
      result = result.replace(
        suggestion.targetText,
        `<span class="suggestion-highlight" data-suggestion-id="${suggestion.id}">${suggestion.targetText}</span>`
      );
    }
  }
  
  return result;
};
</script>

<style>
.suggestion-highlight {
  @apply bg-[rgb(var(--color-neumorphic-accent))/20] border-b-2 border-[rgb(var(--color-neumorphic-accent))] cursor-pointer relative;
}

.suggestion-highlight:hover {
  @apply bg-[rgb(var(--color-neumorphic-accent))/30];
}

/* Document content styles (same as DocumentView.vue) */
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
