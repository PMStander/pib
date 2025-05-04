<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center justify-between w-full px-4 py-2 text-sm nm-flat rounded-lg text-[rgb(var(--color-neumorphic-text))]"
      :class="{ 'nm-pressed': isOpen }"
    >
      <div class="flex items-center">
        <span v-if="selectedModel" class="mr-2">{{ selectedModel.displayName }}</span>
        <span v-else class="mr-2">Select Model</span>
      </div>
      <svg
        class="w-5 h-5 ml-2"
        :class="{ 'transform rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-10 w-full mt-2 nm-flat rounded-lg shadow-lg bg-[rgb(var(--color-neumorphic-bg))] max-h-96 overflow-y-auto"
    >
      <div class="p-2">
        <div v-for="group in modelGroups" :key="group.provider" class="mb-2">
          <div
            class="px-3 py-2 text-xs font-semibold text-[rgb(var(--color-neumorphic-text))/70] border-b border-[rgb(var(--color-neumorphic-text))/10]"
          >
            {{ group.displayName }}
            <span v-if="!group.isConfigured" class="text-[rgb(var(--color-neumorphic-accent-tertiary))]">
              (No API Key)
            </span>
          </div>
          <div class="mt-1">
            <button
              v-for="model in group.models"
              :key="model.id"
              @click="selectModel(model)"
              class="flex items-center w-full px-3 py-2 text-sm hover:bg-[rgb(var(--color-neumorphic-accent))/10] rounded-md"
              :class="{
                'bg-[rgb(var(--color-neumorphic-accent))/20]': selectedModel && selectedModel.id === model.id,
                'opacity-50 cursor-not-allowed': !group.isConfigured && model.requiresApiKey
              }"
              :disabled="!group.isConfigured && model.requiresApiKey"
            >
              <div class="flex-1 text-left">
                <div class="font-medium text-[rgb(var(--color-neumorphic-text))]">{{ model.displayName }}</div>
                <div class="text-xs text-[rgb(var(--color-neumorphic-text))/70]">{{ model.description }}</div>
              </div>
              <div class="flex flex-wrap ml-2">
                <span
                  v-for="(capability, index) in model.capabilities.slice(0, 3)"
                  :key="index"
                  class="px-1.5 py-0.5 text-xs rounded-full nm-flat text-[rgb(var(--color-neumorphic-text))/70] mr-1 mb-1"
                >
                  {{ formatCapability(capability) }}
                </span>
                <span
                  v-if="model.capabilities.length > 3"
                  class="px-1.5 py-0.5 text-xs rounded-full nm-flat text-[rgb(var(--color-neumorphic-text))/70] mr-1 mb-1"
                >
                  +{{ model.capabilities.length - 3 }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import type { LLMModel, LLMModelGroup, ModelCapability } from '~/types/llm-models';
import { getModelGroups, getModelById } from '~/utils/llm-models';
import { useLLMKeys } from '~/composables/useLLMKeys';

const props = defineProps<{
  modelId?: string;
}>();

const emit = defineEmits<{
  (e: 'select', model: LLMModel): void;
}>();

const isOpen = ref(false);
const selectedModel = ref<LLMModel | null>(null);
const modelGroups = ref<LLMModelGroup[]>([]);
const { getConfiguredProviders } = useLLMKeys();

// Toggle dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Select model
const selectModel = (model: LLMModel) => {
  selectedModel.value = model;
  emit('select', model);
  isOpen.value = false;
};

// Format capability
const formatCapability = (capability: ModelCapability): string => {
  const formattedCapabilities: Record<ModelCapability, string> = {
    'chat': 'Chat',
    'completion': 'Completion',
    'embedding': 'Embedding',
    'function-calling': 'Functions',
    'vision': 'Vision',
    'audio': 'Audio',
    'code': 'Code',
    'reasoning': 'Reasoning',
    'document-generation': 'Docs',
    'document-analysis': 'Analysis'
  };
  return formattedCapabilities[capability] || capability;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    isOpen.value = false;
  }
};

// Initialize
onMounted(async () => {
  // Get configured providers
  const configuredProviders = await getConfiguredProviders();
  
  // Get model groups
  modelGroups.value = getModelGroups(configuredProviders);
  
  // Set selected model if provided
  if (props.modelId) {
    const model = getModelById(props.modelId);
    if (model) {
      selectedModel.value = model;
    }
  }
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside);
});

// Clean up
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Watch for model ID changes
watch(() => props.modelId, (newModelId) => {
  if (newModelId) {
    const model = getModelById(newModelId);
    if (model) {
      selectedModel.value = model;
    }
  } else {
    selectedModel.value = null;
  }
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
