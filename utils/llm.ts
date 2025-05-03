import { useLLMKeys, type LLMProvider } from '~/composables/useLLMKeys';

/**
 * Get the configuration for an LLM provider
 * @param provider The LLM provider
 * @returns The provider configuration
 */
export async function getLLMConfig(provider: LLMProvider) {
  const { getEffectiveLLMKey, getProviderConfig } = useLLMKeys();
  
  // Get the effective key for the provider
  const key = await getEffectiveLLMKey(provider);
  
  // Get the provider-specific configuration
  return getProviderConfig(provider, key);
}

/**
 * Check if an LLM provider is configured
 * @param provider The LLM provider
 * @returns True if the provider is configured
 */
export async function isLLMConfigured(provider: LLMProvider): Promise<boolean> {
  const config = await getLLMConfig(provider);
  
  // Check if the configuration is valid
  switch (provider) {
    case 'openai':
    case 'anthropic':
    case 'gemini':
    case 'xai':
      return !!config.apiKey;
      
    case 'ollama':
      return !!config.url;
      
    default:
      return false;
  }
}

/**
 * Get all configured LLM providers
 * @returns Array of configured providers
 */
export async function getConfiguredLLMProviders(): Promise<LLMProvider[]> {
  const providers: LLMProvider[] = ['openai', 'anthropic', 'gemini', 'ollama', 'xai'];
  const configuredProviders: LLMProvider[] = [];
  
  // Check each provider
  for (const provider of providers) {
    if (await isLLMConfigured(provider)) {
      configuredProviders.push(provider);
    }
  }
  
  return configuredProviders;
}

/**
 * Create an OpenAI client with the configured API key
 */
export async function createOpenAIClient() {
  const config = await getLLMConfig('openai');
  
  if (!config.apiKey) {
    throw new Error('OpenAI API key not configured');
  }
  
  // This is a placeholder - you would import the actual OpenAI client here
  // import OpenAI from 'openai';
  // return new OpenAI(config);
  
  return {
    apiKey: config.apiKey,
    organization: config.organization,
    baseURL: config.baseURL
  };
}

/**
 * Create an Anthropic client with the configured API key
 */
export async function createAnthropicClient() {
  const config = await getLLMConfig('anthropic');
  
  if (!config.apiKey) {
    throw new Error('Anthropic API key not configured');
  }
  
  // This is a placeholder - you would import the actual Anthropic client here
  // import Anthropic from '@anthropic-ai/sdk';
  // return new Anthropic(config);
  
  return {
    apiKey: config.apiKey,
    baseURL: config.baseURL
  };
}

/**
 * Create a Gemini client with the configured API key
 */
export async function createGeminiClient() {
  const config = await getLLMConfig('gemini');
  
  if (!config.apiKey) {
    throw new Error('Gemini API key not configured');
  }
  
  // This is a placeholder - you would import the actual Gemini client here
  // import { GoogleGenerativeAI } from '@google/generative-ai';
  // return new GoogleGenerativeAI(config.apiKey);
  
  return {
    apiKey: config.apiKey,
    projectId: config.projectId
  };
}

/**
 * Create an Ollama client with the configured URL
 */
export async function createOllamaClient() {
  const config = await getLLMConfig('ollama');
  
  if (!config.url) {
    throw new Error('Ollama URL not configured');
  }
  
  // This is a placeholder - you would import the actual Ollama client here
  // import { Ollama } from 'ollama';
  // return new Ollama({ url: config.url });
  
  return {
    url: config.url
  };
}

/**
 * Create an XAI client with the configured API key
 */
export async function createXAIClient() {
  const config = await getLLMConfig('xai');
  
  if (!config.apiKey) {
    throw new Error('XAI API key not configured');
  }
  
  // This is a placeholder - you would import the actual XAI client here
  // import { XAI } from 'xai';
  // return new XAI(config.apiKey);
  
  return {
    apiKey: config.apiKey
  };
}
