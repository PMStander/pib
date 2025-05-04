/**
 * Registry of available LLM models
 */
import type { LLMModel, LLMModelGroup } from '~/types/llm-models';
import type { LLMProvider } from '~/composables/useLLMKeys';

// OpenAI models
const openaiModels: LLMModel[] = [
  {
    id: 'gpt-4o',
    provider: 'openai',
    name: 'gpt-4o',
    displayName: 'GPT-4o',
    description: 'Most capable multimodal model for text, vision, and audio tasks',
    capabilities: ['chat', 'completion', 'function-calling', 'vision', 'reasoning', 'code', 'document-generation', 'document-analysis'],
    contextWindow: 128000,
    requiresApiKey: true,
    isLocal: false,
    maxOutputTokens: 4096
  },
  {
    id: 'gpt-4-turbo',
    provider: 'openai',
    name: 'gpt-4-turbo',
    displayName: 'GPT-4 Turbo',
    description: 'Powerful model with improved instruction following',
    capabilities: ['chat', 'completion', 'function-calling', 'reasoning', 'code', 'document-generation', 'document-analysis'],
    contextWindow: 128000,
    requiresApiKey: true,
    isLocal: false,
    maxOutputTokens: 4096
  },
  {
    id: 'gpt-4',
    provider: 'openai',
    name: 'gpt-4',
    displayName: 'GPT-4',
    description: 'Powerful model for complex tasks',
    capabilities: ['chat', 'completion', 'function-calling', 'reasoning', 'code', 'document-generation', 'document-analysis'],
    contextWindow: 8192,
    requiresApiKey: true,
    isLocal: false,
    maxOutputTokens: 4096
  },
  {
    id: 'gpt-3.5-turbo',
    provider: 'openai',
    name: 'gpt-3.5-turbo',
    displayName: 'GPT-3.5 Turbo',
    description: 'Fast and efficient model for most tasks',
    capabilities: ['chat', 'completion', 'function-calling', 'code'],
    contextWindow: 16385,
    requiresApiKey: true,
    isLocal: false,
    maxOutputTokens: 4096
  }
];

// Anthropic models
const anthropicModels: LLMModel[] = [
  {
    id: 'claude-3-opus',
    provider: 'anthropic',
    name: 'claude-3-opus',
    displayName: 'Claude 3 Opus',
    description: 'Most powerful Claude model for complex tasks',
    capabilities: ['chat', 'completion', 'vision', 'reasoning', 'code', 'document-generation', 'document-analysis'],
    contextWindow: 200000,
    requiresApiKey: true,
    isLocal: false,
    maxOutputTokens: 4096
  },
  {
    id: 'claude-3-sonnet',
    provider: 'anthropic',
    name: 'claude-3-sonnet',
    displayName: 'Claude 3 Sonnet',
    description: 'Balanced Claude model for most tasks',
    capabilities: ['chat', 'completion', 'vision', 'reasoning', 'code', 'document-generation', 'document-analysis'],
    contextWindow: 200000,
    requiresApiKey: true,
    isLocal: false,
    maxOutputTokens: 4096
  },
  {
    id: 'claude-3-haiku',
    provider: 'anthropic',
    name: 'claude-3-haiku',
    displayName: 'Claude 3 Haiku',
    description: 'Fast and efficient Claude model',
    capabilities: ['chat', 'completion', 'vision', 'code'],
    contextWindow: 200000,
    requiresApiKey: true,
    isLocal: false,
    maxOutputTokens: 4096
  }
];

// Gemini models
const geminiModels: LLMModel[] = [
  {
    id: 'gemini-1.5-pro',
    provider: 'gemini',
    name: 'gemini-1.5-pro',
    displayName: 'Gemini 1.5 Pro',
    description: 'Powerful multimodal model with long context',
    capabilities: ['chat', 'completion', 'vision', 'reasoning', 'code', 'document-generation', 'document-analysis'],
    contextWindow: 1000000,
    requiresApiKey: true,
    isLocal: false,
    maxOutputTokens: 8192
  },
  {
    id: 'gemini-1.5-flash',
    provider: 'gemini',
    name: 'gemini-1.5-flash',
    displayName: 'Gemini 1.5 Flash',
    description: 'Fast and efficient multimodal model',
    capabilities: ['chat', 'completion', 'vision', 'code'],
    contextWindow: 1000000,
    requiresApiKey: true,
    isLocal: false,
    maxOutputTokens: 8192
  },
  {
    id: 'gemini-1.0-pro',
    provider: 'gemini',
    name: 'gemini-1.0-pro',
    displayName: 'Gemini 1.0 Pro',
    description: 'Balanced model for most tasks',
    capabilities: ['chat', 'completion', 'vision', 'code'],
    contextWindow: 32768,
    requiresApiKey: true,
    isLocal: false,
    maxOutputTokens: 8192
  }
];

// XAI models
const xaiModels: LLMModel[] = [
  {
    id: 'grok-1',
    provider: 'xai',
    name: 'grok-1',
    displayName: 'Grok-1',
    description: 'Conversational AI with real-time knowledge',
    capabilities: ['chat', 'completion', 'reasoning', 'code'],
    contextWindow: 8192,
    requiresApiKey: true,
    isLocal: false,
    maxOutputTokens: 4096
  }
];

// Default Ollama models (will be updated with actual installed models)
const ollamaModels: LLMModel[] = [
  {
    id: 'llama3',
    provider: 'ollama',
    name: 'llama3',
    displayName: 'Llama 3',
    description: 'Local Llama 3 model',
    capabilities: ['chat', 'completion', 'code'],
    contextWindow: 8192,
    requiresApiKey: false,
    isLocal: true,
    maxOutputTokens: 2048
  },
  {
    id: 'mistral',
    provider: 'ollama',
    name: 'mistral',
    displayName: 'Mistral',
    description: 'Local Mistral model',
    capabilities: ['chat', 'completion', 'code'],
    contextWindow: 8192,
    requiresApiKey: false,
    isLocal: true,
    maxOutputTokens: 2048
  },
  {
    id: 'codellama',
    provider: 'ollama',
    name: 'codellama',
    displayName: 'Code Llama',
    description: 'Local Code Llama model for code generation',
    capabilities: ['chat', 'completion', 'code'],
    contextWindow: 8192,
    requiresApiKey: false,
    isLocal: true,
    maxOutputTokens: 2048
  }
];

// All models by provider
export const modelsByProvider: Record<LLMProvider, LLMModel[]> = {
  'openai': openaiModels,
  'anthropic': anthropicModels,
  'gemini': geminiModels,
  'ollama': ollamaModels,
  'xai': xaiModels
};

// Get all models
export const getAllModels = (): LLMModel[] => {
  return Object.values(modelsByProvider).flat();
};

// Get model by ID
export const getModelById = (id: string): LLMModel | undefined => {
  return getAllModels().find(model => model.id === id);
};

// Get models by provider
export const getModelsByProvider = (provider: LLMProvider): LLMModel[] => {
  return modelsByProvider[provider] || [];
};

// Get model groups
export const getModelGroups = (configuredProviders: LLMProvider[] = []): LLMModelGroup[] => {
  return Object.entries(modelsByProvider).map(([provider, models]) => ({
    provider: provider as LLMProvider,
    displayName: getProviderDisplayName(provider as LLMProvider),
    models,
    requiresApiKey: provider !== 'ollama',
    isConfigured: configuredProviders.includes(provider as LLMProvider)
  }));
};

// Get provider display name
export const getProviderDisplayName = (provider: LLMProvider): string => {
  const displayNames: Record<LLMProvider, string> = {
    'openai': 'OpenAI',
    'anthropic': 'Anthropic',
    'gemini': 'Google Gemini',
    'ollama': 'Ollama (Local)',
    'xai': 'xAI'
  };
  return displayNames[provider] || provider;
};

// Update Ollama models with installed models
export const updateOllamaModels = (installedModels: LLMModel[]): void => {
  modelsByProvider.ollama = installedModels;
};
