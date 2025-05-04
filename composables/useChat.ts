import { ref } from 'vue';
import { useChatAgency } from './useChatAgency';
import type { ChatMessage } from '~/types/chat';

/**
 * Composable for chat functionality
 * This is now a wrapper around useChatAgency that uses WebSockets to communicate with the server
 */
export const useChat = () => {
  // Use the new WebSocket-based chat agency
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
    // State
    messages: chatAgency.messages,
    isLoading: chatAgency.isLoading,
    error: chatAgency.error,

    // Methods
    sendMessage: chatAgency.sendMessage,
    clearChat: chatAgency.clearChat
  };
};
