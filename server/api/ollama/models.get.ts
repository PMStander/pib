import { defineEventHandler, createError } from 'h3';
import type { LLMModel } from '~/types/llm-models';

/**
 * Get available Ollama models
 * @returns List of available Ollama models
 */
export default defineEventHandler(async (event) => {
  try {
    // Check if Ollama is running
    let isOllamaRunning = false;
    try {
      const versionResponse = await fetch('http://localhost:11434/api/version');
      isOllamaRunning = versionResponse.ok;
    } catch (err) {
      console.error('Error checking Ollama availability:', err);
      return {
        models: [],
        isOllamaRunning: false,
        error: 'Ollama is not running'
      };
    }

    if (!isOllamaRunning) {
      return {
        models: [],
        isOllamaRunning: false,
        error: 'Ollama is not running'
      };
    }

    // Get available models
    const modelsResponse = await fetch('http://localhost:11434/api/tags');
    
    if (!modelsResponse.ok) {
      return {
        models: [],
        isOllamaRunning: true,
        error: `Failed to fetch Ollama models: ${modelsResponse.statusText}`
      };
    }

    const modelsData = await modelsResponse.json();
    
    if (!modelsData.models || !Array.isArray(modelsData.models)) {
      return {
        models: [],
        isOllamaRunning: true,
        error: 'Invalid response from Ollama API'
      };
    }

    // Transform Ollama models to LLMModel format
    const ollamaModels: LLMModel[] = modelsData.models.map((model: any) => {
      const modelName = model.name;
      const displayName = formatModelName(modelName);
      
      return {
        id: modelName,
        provider: 'ollama',
        name: modelName,
        displayName,
        description: `Local ${displayName} model`,
        capabilities: determineCapabilities(modelName),
        contextWindow: determineContextWindow(modelName),
        requiresApiKey: false,
        isLocal: true,
        maxOutputTokens: 2048
      };
    });

    return {
      models: ollamaModels,
      isOllamaRunning: true,
      error: null
    };
  } catch (err: any) {
    console.error('Error fetching Ollama models:', err);
    return createError({
      statusCode: 500,
      statusMessage: err.message || 'Failed to fetch Ollama models'
    });
  }
});

/**
 * Format model name for display
 */
function formatModelName(modelName: string): string {
  // Remove version numbers and tags
  const baseName = modelName.split(':')[0];
  
  // Capitalize words
  return baseName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Determine model capabilities based on name
 */
function determineCapabilities(modelName: string): string[] {
  const capabilities = ['chat', 'completion'];
  
  if (modelName.includes('code') || modelName.includes('starcoder') || modelName.includes('codellama')) {
    capabilities.push('code');
  }
  
  if (modelName.includes('llava') || modelName.includes('bakllava') || modelName.includes('vision')) {
    capabilities.push('vision');
  }
  
  if (modelName.includes('llama') || modelName.includes('mistral') || modelName.includes('mixtral')) {
    capabilities.push('reasoning');
  }
  
  return capabilities;
}

/**
 * Determine context window based on model name
 */
function determineContextWindow(modelName: string): number {
  if (modelName.includes('llama3') || modelName.includes('llama-3')) {
    return 8192;
  }
  
  if (modelName.includes('llama2') || modelName.includes('llama-2')) {
    return 4096;
  }
  
  if (modelName.includes('mistral') || modelName.includes('mixtral')) {
    return 8192;
  }
  
  if (modelName.includes('codellama')) {
    return 16384;
  }
  
  // Default context window
  return 4096;
}
