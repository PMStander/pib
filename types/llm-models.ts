/**
 * LLM model types for the model selector
 */
import type { LLMProvider } from '~/composables/useLLMKeys';

// LLM model capability
export type ModelCapability = 
  | 'chat'
  | 'completion'
  | 'embedding'
  | 'function-calling'
  | 'vision'
  | 'audio'
  | 'code'
  | 'reasoning'
  | 'document-generation'
  | 'document-analysis';

// LLM model
export interface LLMModel {
  id: string;
  provider: LLMProvider;
  name: string;
  displayName: string;
  description: string;
  capabilities: ModelCapability[];
  contextWindow: number;
  requiresApiKey: boolean;
  isLocal: boolean;
  maxOutputTokens?: number;
}

// LLM model group
export interface LLMModelGroup {
  provider: LLMProvider;
  displayName: string;
  models: LLMModel[];
  requiresApiKey: boolean;
  isConfigured: boolean;
}

// Model configuration
export interface ModelConfig {
  provider: LLMProvider;
  model: string;
  temperature: number;
  topP: number;
  topK: number;
  maxOutputTokens: number;
}
