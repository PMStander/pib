<template>
  <NeumorphicModal
    :show="show"
    @close="$emit('close')"
    :title="existingKey ? 'Edit LLM Key' : 'Add LLM Key'"
    size="md"
  >
    <LLMKeyForm
      :entity-type="entityType"
      :entity-id="entityId"
      :existing-key="existingKey"
      @submit="handleSubmit"
      @cancel="$emit('close')"
      @delete="handleDelete"
    />
  </NeumorphicModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NeumorphicModal from '~/components/neumorphic/Modal.vue';
import LLMKeyForm from '~/components/llm-keys/LLMKeyForm.vue';
import { useLLMKeys, type LLMProvider } from '~/composables/useLLMKeys';

const props = defineProps<{
  show: boolean;
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
  (e: 'close'): void;
  (e: 'saved'): void;
  (e: 'deleted'): void;
}>();

const { createLLMKey, updateLLMKey, deleteLLMKey, isLoading, error } = useLLMKeys();

// Handle form submission
const handleSubmit = async (data: {
  entityType: string;
  entityId: string;
  provider: LLMProvider;
  apiKey: string | null;
  config: Record<string, any>;
}) => {
  try {
    if (props.existingKey) {
      // Update existing key
      await updateLLMKey(
        props.existingKey.id,
        data.apiKey,
        data.config
      );
    } else {
      // Create new key
      await createLLMKey(
        data.entityType as 'user' | 'profile' | 'workspace',
        data.entityId,
        data.provider,
        data.apiKey,
        data.config
      );
    }
    
    emit('saved');
    emit('close');
  } catch (err) {
    console.error('Error saving LLM key:', err);
  }
};

// Handle key deletion
const handleDelete = async () => {
  if (!props.existingKey) return;
  
  try {
    await deleteLLMKey(props.existingKey.id);
    emit('deleted');
    emit('close');
  } catch (err) {
    console.error('Error deleting LLM key:', err);
  }
};
</script>
