<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Provider Selection -->
    <div>
      <label class="block text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
        LLM Provider
      </label>
      <NeumorphicSelect
        v-model="formData.provider"
        :options="providerOptions"
        class="w-full"
        :disabled="!!existingKey"
      />
    </div>

    <!-- API Key Input (for all providers except Ollama) -->
    <div v-if="formData.provider !== 'ollama'">
      <label class="block text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
        API Key
      </label>
      <NeumorphicInput
        v-model="formData.apiKey"
        type="password"
        placeholder="Enter your API key"
        class="w-full"
      />
    </div>

    <!-- Provider-specific configuration fields -->
    <!-- OpenAI -->
    <template v-if="formData.provider === 'openai'">
      <div>
        <label class="block text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
          Organization ID (optional)
        </label>
        <NeumorphicInput
          v-model="formData.config.organizationId"
          placeholder="Enter your organization ID"
          class="w-full"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
          Base URL (optional)
        </label>
        <NeumorphicInput
          v-model="formData.config.baseUrl"
          placeholder="Enter custom base URL (e.g., for Azure OpenAI)"
          class="w-full"
        />
      </div>
    </template>

    <!-- Anthropic -->
    <template v-if="formData.provider === 'anthropic'">
      <div>
        <label class="block text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
          Base URL (optional)
        </label>
        <NeumorphicInput
          v-model="formData.config.baseUrl"
          placeholder="Enter custom base URL"
          class="w-full"
        />
      </div>
    </template>

    <!-- Gemini -->
    <template v-if="formData.provider === 'gemini'">
      <div>
        <label class="block text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
          Project ID (optional)
        </label>
        <NeumorphicInput
          v-model="formData.config.projectId"
          placeholder="Enter your Google Cloud project ID"
          class="w-full"
        />
      </div>
    </template>

    <!-- Ollama -->
    <template v-if="formData.provider === 'ollama'">
      <div>
        <label class="block text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
          URL
        </label>
        <NeumorphicInput
          v-model="formData.config.url"
          placeholder="Enter Ollama URL (e.g., http://localhost:11434)"
          class="w-full"
        />
      </div>
    </template>

    <!-- XAI -->
    <template v-if="formData.provider === 'xai'">
      <!-- No additional configuration for XAI -->
    </template>

    <!-- Submit Button -->
    <div class="flex justify-end space-x-2">
      <NeumorphicButton
        v-if="existingKey"
        type="button"
        variant="flat"
        color="danger"
        @click="$emit('delete')"
      >
        Delete
      </NeumorphicButton>
      <NeumorphicButton
        type="button"
        variant="flat"
        @click="$emit('cancel')"
      >
        Cancel
      </NeumorphicButton>
      <NeumorphicButton
        type="submit"
        variant="convex"
        color="primary"
        :disabled="isSubmitting"
      >
        {{ existingKey ? 'Update' : 'Save' }}
      </NeumorphicButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import NeumorphicInput from '~/components/neumorphic/Input.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import NeumorphicSelect from '~/components/neumorphic/Select.vue';
import type { LLMProvider } from '~/composables/useLLMKeys';

const props = defineProps<{
  entityType: 'user' | 'profile' | 'workspace';
  entityId: string;
  existingKey?: {
    id: string;
    provider: LLMProvider;
    apiKey?: string;
    config: Record<string, any>;
  };
}>();

const emit = defineEmits<{
  (e: 'submit', data: {
    entityType: string;
    entityId: string;
    provider: LLMProvider;
    apiKey: string | null;
    config: Record<string, any>;
  }): void;
  (e: 'cancel'): void;
  (e: 'delete'): void;
}>();

const isSubmitting = ref(false);

// Provider options
const providerOptions = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'ollama', label: 'Ollama' },
  { value: 'xai', label: 'XAI' }
];

// Form data
const formData = reactive({
  provider: 'openai' as LLMProvider,
  apiKey: '',
  config: {
    // OpenAI
    organizationId: '',
    baseUrl: '',
    // Gemini
    projectId: '',
    // Ollama
    url: 'http://localhost:11434'
  }
});

// Initialize form with existing key data if provided
onMounted(() => {
  if (props.existingKey) {
    formData.provider = props.existingKey.provider;
    formData.apiKey = props.existingKey.apiKey || '';
    
    // Initialize config based on provider
    if (props.existingKey.config) {
      if (formData.provider === 'openai') {
        formData.config.organizationId = props.existingKey.config.organizationId || '';
        formData.config.baseUrl = props.existingKey.config.baseUrl || '';
      } else if (formData.provider === 'anthropic') {
        formData.config.baseUrl = props.existingKey.config.baseUrl || '';
      } else if (formData.provider === 'gemini') {
        formData.config.projectId = props.existingKey.config.projectId || '';
      } else if (formData.provider === 'ollama') {
        formData.config.url = props.existingKey.config.url || 'http://localhost:11434';
      }
    }
  }
});

// Handle form submission
const handleSubmit = () => {
  isSubmitting.value = true;
  
  // Prepare config based on provider
  const config: Record<string, any> = {};
  
  if (formData.provider === 'openai') {
    if (formData.config.organizationId) {
      config.organizationId = formData.config.organizationId;
    }
    if (formData.config.baseUrl) {
      config.baseUrl = formData.config.baseUrl;
    }
  } else if (formData.provider === 'anthropic') {
    if (formData.config.baseUrl) {
      config.baseUrl = formData.config.baseUrl;
    }
  } else if (formData.provider === 'gemini') {
    if (formData.config.projectId) {
      config.projectId = formData.config.projectId;
    }
  } else if (formData.provider === 'ollama') {
    config.url = formData.config.url || 'http://localhost:11434';
  }
  
  // Emit submit event with form data
  emit('submit', {
    entityType: props.entityType,
    entityId: props.entityId,
    provider: formData.provider,
    apiKey: formData.provider === 'ollama' ? null : formData.apiKey || null,
    config
  });
  
  isSubmitting.value = false;
};
</script>
