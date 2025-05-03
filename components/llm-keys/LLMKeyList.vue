<template>
  <div class="space-y-4">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="w-2 h-2 rounded-full bg-[rgb(var(--color-neumorphic-accent))] animate-bounce"></div>
      <div class="w-2 h-2 rounded-full bg-[rgb(var(--color-neumorphic-accent))] animate-bounce ml-1" style="animation-delay: 0.2s"></div>
      <div class="w-2 h-2 rounded-full bg-[rgb(var(--color-neumorphic-accent))] animate-bounce ml-1" style="animation-delay: 0.4s"></div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!keys.length" class="nm-flat p-6 rounded-xl text-center">
      <p class="text-[rgb(var(--color-neumorphic-text))/70]">No LLM keys found.</p>
      <NeumorphicButton
        variant="convex"
        color="primary"
        class="mt-4"
        @click="$emit('add')"
      >
        Add Key
      </NeumorphicButton>
    </div>

    <!-- Keys list -->
    <div v-else class="space-y-4">
      <div v-for="key in keys" :key="key.id" class="nm-flat p-4 rounded-xl">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))]">
              {{ getProviderLabel(key.provider) }}
            </h3>
            <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">
              Added {{ formatDate(key.createdAt) }}
            </p>
          </div>
          <div class="flex space-x-2">
            <NeumorphicButton
              variant="flat"
              size="sm"
              @click="$emit('edit', key)"
            >
              Edit
            </NeumorphicButton>
          </div>
        </div>
        
        <!-- Provider-specific details -->
        <div class="mt-3 text-sm text-[rgb(var(--color-neumorphic-text))/70]">
          <template v-if="key.provider === 'openai'">
            <p v-if="key.config.organizationId">Organization ID: {{ key.config.organizationId }}</p>
            <p v-if="key.config.baseUrl">Base URL: {{ key.config.baseUrl }}</p>
          </template>
          
          <template v-else-if="key.provider === 'anthropic'">
            <p v-if="key.config.baseUrl">Base URL: {{ key.config.baseUrl }}</p>
          </template>
          
          <template v-else-if="key.provider === 'gemini'">
            <p v-if="key.config.projectId">Project ID: {{ key.config.projectId }}</p>
          </template>
          
          <template v-else-if="key.provider === 'ollama'">
            <p>URL: {{ key.config.url || 'http://localhost:11434' }}</p>
          </template>
        </div>
      </div>
      
      <!-- Add button -->
      <div class="flex justify-center mt-4">
        <NeumorphicButton
          variant="convex"
          color="primary"
          @click="$emit('add')"
        >
          Add Key
        </NeumorphicButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import type { LLMKey, LLMProvider } from '~/composables/useLLMKeys';

const props = defineProps<{
  keys: LLMKey[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'add'): void;
  (e: 'edit', key: LLMKey): void;
}>();

// Helper function to get provider label
const getProviderLabel = (provider: LLMProvider): string => {
  const providers: Record<LLMProvider, string> = {
    'openai': 'OpenAI',
    'anthropic': 'Anthropic',
    'gemini': 'Gemini',
    'ollama': 'Ollama',
    'xai': 'XAI'
  };
  
  return providers[provider] || provider;
};

// Helper function to format date
const formatDate = (date: Date): string => {
  if (!date) return '';
  
  // Convert to local date string
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>
