# Chat System Documentation

## Overview

The Partners in Biz chat system provides an AI-powered assistant that helps users find business partners, search profiles, and get recommendations. The system uses LangChain's LangGraph to create a flexible and powerful AI workflow.

## Architecture

The chat system follows a client-server architecture with WebSocket communication:

1. **Frontend Components**:
   - `ChatInterface.vue`: The UI component that displays messages and handles user input
   - `useChat.ts`: A composable that provides a simple interface for chat functionality
   - `useChatAgency.ts`: A composable that handles WebSocket communication with the server

2. **Backend Components**:
   - `/server/api/chat/main.ts`: WebSocket endpoint that handles chat messages
   - `/server/ai/teams/test.ts`: LangGraph workflow implementation with supervisor and agents
   - `/server/ai/logger.ts`: Logging utility for chat messages

3. **Data Flow**:
   - User sends a message through the ChatInterface
   - Message is sent to the server via WebSocket
   - Server processes the message using LangGraph workflow
   - Response is streamed back to the client via WebSocket
   - Client displays the response in the ChatInterface

## Frontend Implementation

### useChatAgency Composable

The `useChatAgency` composable handles WebSocket communication with the server:

```typescript
export const useChatAgency = (config: ChatAgencyConfig = { provider: 'langchain' }) => {
  // WebSocket setup
  const { data, status, send, open, close } = useWebSocket('/api/chat/main', {
    autoReconnect: true,
    heartbeat: {
      message: 'ping',
      interval: 30000,
      pongTimeout: 5000
    },
    // ... handlers for connection events
  });

  // Send a message via WebSocket
  const sendMessage = async (text: string): Promise<void> => {
    // ... implementation
  };

  // ... other methods and state
};
```

### useChat Composable

The `useChat` composable provides a simple interface for chat functionality:

```typescript
export const useChat = () => {
  // Use the WebSocket-based chat agency
  const chatAgency = useChatAgency({
    provider: 'langchain',
    modelConfig: {
      model: 'gpt-4o',
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 2048
    },
    functionGroups: ['vector_search', 'data_access']
  });
  
  // Return the same interface as before for backward compatibility
  return {
    messages: chatAgency.messages,
    isLoading: chatAgency.isLoading,
    error: chatAgency.error,
    sendMessage: chatAgency.sendMessage,
    clearChat: chatAgency.clearChat
  };
};
```

### ChatInterface Component

The `ChatInterface` component displays messages and handles user input:

```vue
<template>
  <NeumorphicCard title="AI Chat Assistant" variant="flat" class="mb-8">
    <!-- Connection Status -->
    <div v-if="connectionStatus !== 'Connected'" class="...">
      <div class="..."></div>
      {{ connectionStatus }}
    </div>
    
    <!-- Chat Messages -->
    <div ref="messagesContainer" class="...">
      <!-- Message display logic -->
    </div>
    
    <!-- Message Input -->
    <div class="flex">
      <NeumorphicInput v-model="newMessage" ... />
      <NeumorphicButton @click="sendMessage" ... />
    </div>
  </NeumorphicCard>
</template>
```

## Backend Implementation

### WebSocket Endpoint

The `/server/api/chat/main.ts` file defines a WebSocket endpoint that handles chat messages:

```typescript
export default defineWebSocketHandler({
  async open(peer) {
    // Handle connection open
  },

  async message(peer, message) {
    // Parse and process messages
    // Initialize LangGraph workflow
    // Stream responses back to the client
  },

  async close(peer) {
    // Clean up resources
  },

  async error(peer, error) {
    // Handle errors
  },
});
```

### LangGraph Workflow

The `/server/ai/teams/test.ts` file defines a LangGraph workflow with a supervisor and agents:

```typescript
export function createWorkflow() {
  const workflow = createSupervisor({
    agents: [researchAgent, mathAgent],
    llm: model,
    prompt: supervisorPrompt,
  });

  const checkpointer = new MemorySaver();
  return workflow.compile({ checkpointer });
}
```

## Message Format

### Client to Server

```json
{
  "type": "message",
  "data": {
    "message": {
      "id": "message-id",
      "role": "user",
      "content": "User message text",
      "text": "User message text",
      "time": "12:34:56",
      "attachments": []
    }
  }
}
```

### Server to Client

```json
{
  "type": "message",
  "data": {
    "message": {
      "id": "response-id",
      "role": "assistant",
      "content": "AI response text",
      "text": "AI response text",
      "time": "12:34:57",
      "type": "received",
      "attachments": []
    }
  }
}
```

## Future Enhancements

1. **Multiple Teams**: Implement different teams for different business functions (sales, support, research)
2. **Department Structure**: Create a hierarchical structure with departments containing teams
3. **Tool Integration**: Add more tools for agents to use (CRM, email, calendar)
4. **User Context**: Incorporate user profile and workspace data into the chat context
5. **Multi-modal Support**: Add support for images, audio, and other media types
