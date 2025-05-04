# LLM Model Selector Implementation Plan

## Overview
This plan outlines the implementation of an LLM model selector in the chat interface, allowing users to choose which LLM model to use for their conversations. The selector will only show models for which the user has configured API keys.

## Phase 1: Core Model Types and Utilities

### 1.1 Model Types (Estimated time: 0.5 day)
- Create new types in `types/llm.ts`:
  ```typescript
  // LLM model types
  export interface LLMModel {
    id: string;
    provider: LLMProvider; // 'openai' | 'anthropic' | 'gemini' | 'ollama' | 'xai'
    name: string;
    displayName: string;
    description: string;
    capabilities: string[];
    requiresApiKey: boolean;
    isLocal: boolean;
  }

  export interface LLMModelGroup {
    provider: LLMProvider;
    displayName: string;
    models: LLMModel[];
  }
  ```

### 1.2 Model Registry (Estimated time: 1 day)
- Create `utils/llm-models.ts`:
  - Define available models for each provider
  - Include model capabilities and requirements
  - Group models by provider
  - Add utility functions for model filtering

### 1.3 Extend LLM Key Management (Estimated time: 1 day)
- Update `composables/useLLMKeys.ts`:
  - Add function to get available models based on configured keys
  - Implement model filtering based on provider
  - Add function to check if a model is available
  - Include utility for getting model details

## Phase 2: Ollama Integration

### 2.1 Ollama API Client (Estimated time: 1 day)
- Create `utils/ollama-client.ts`:
  - Implement function to check if Ollama is running
  - Add function to get available Ollama models
  - Include model details retrieval
  - Add error handling for Ollama API

### 2.2 Ollama Server Endpoint (Estimated time: 1 day)
- Create `server/api/ollama/models.get.ts`:
  - Implement endpoint to get available Ollama models
  - Add caching for model list
  - Include error handling
  - Add model filtering options

## Phase 3: Model Selector Component

### 3.1 Model Selector Component (Estimated time: 2 days)
- Create `components/chat/ModelSelector.vue`:
  - Dropdown for selecting LLM model
  - Group models by provider
  - Show model capabilities
  - Disable unavailable models
  - Follow neumorphic design system

### 3.2 Model Info Component (Estimated time: 1 day)
- Create `components/chat/ModelInfo.vue`:
  - Display detailed model information
  - Show capabilities and limitations
  - Include provider information
  - Follow neumorphic design system

### 3.3 Update Chat Interface (Estimated time: 1 day)
- Modify `components/chat/ChatInterface.vue`:
  - Add model selector to the top of the chat
  - Handle model selection changes
  - Update chat agency configuration
  - Add model information display

## Phase 4: Integration with Chat System

### 4.1 Update Chat Agency (Estimated time: 1 day)
- Modify `composables/useChatAgency.ts`:
  - Add model selection parameter
  - Update WebSocket initialization with model info
  - Handle model-specific configurations
  - Add fallback logic for unavailable models

### 4.2 Update WebSocket Handler (Estimated time: 1 day)
- Update `server/api/chat/main.ts`:
  - Handle model selection in initialization
  - Update LangGraph workflow with selected model
  - Add model-specific configurations
  - Include error handling for model selection

### 4.3 Integration and Testing (Estimated time: 1 day)
- Connect all components:
  - Link model selector to chat agency
  - Update WebSocket communication
  - Test with different models
  - Verify model selection persistence

## Testing Plan
1. Unit tests for model selector component
2. Integration tests for Ollama API client
3. End-to-end tests for model selection
4. Performance testing with different models

## Implementation Sequence
1. Start with core model types and registry
2. Extend LLM key management
3. Implement Ollama integration
4. Create model selector component
5. Update chat interface
6. Integrate with chat agency
7. Final testing and refinement

## Success Criteria
- Users can select from available LLM models
- Only models with configured API keys are shown
- Ollama models are detected and available for selection
- Model selection persists between chat sessions
- Model-specific capabilities are correctly utilized
- All functionality follows the neumorphic design system
