import { ref, computed, onMounted, onUnmounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useWebSocket } from '@vueuse/core';
import { useFirebaseAuth } from './useFirebaseAuth';
import { useAppState } from './useAppState';
import type { ChatMessage } from '~/types/chat';

export interface ChatAgencyConfig {
  provider: string;
  serverUrl?: string;
  modelConfig?: {
    model: string;
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
  };
  functionGroups?: string[];
  customInstructions?: string;
}

export const useChatAgency = (config: ChatAgencyConfig = { provider: 'langchain' }) => {
  // Get auth state
  const { isAuthenticated, user } = useFirebaseAuth();
  const appState = useAppState();
  
  // Chat state
  const messages = useState<ChatMessage[]>('chat-messages', () => []);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const systemInstruction = ref<string>('You are an AI assistant for Partners in Biz, a platform that helps businesses find partners and collaborators. Help users find potential business partners, search profiles, and get recommendations.');
  
  // Connection state
  const connectionState = ref({
    isConnected: false,
    error: '',
    reconnectAttempts: 0
  });

  // WebSocket setup
  const { data, status, send, open, close } = useWebSocket('/api/chat/main', {
    autoReconnect: true,
    heartbeat: {
      message: 'ping',
      interval: 30000, // Send heartbeat every 30 seconds
      pongTimeout: 5000 // Wait 5 seconds for pong response
    },
    onConnected() {
      console.log(`[useChatAgency] WebSocket connected`);
      connectionState.value.isConnected = true;
      connectionState.value.error = '';

      // Send initialization data
      send(JSON.stringify({
        type: 'init',
        data: {
          agencyType: config.provider,
          functionGroups: config.functionGroups || [],
          systemInstruction: systemInstruction.value,
          modelConfig: config.modelConfig || {
            model: 'gpt-4o',
            temperature: 0.7,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 2048
          },
          customInstructions: config.customInstructions || '',
          userId: user.value?.uid || 'anonymous',
          workspace: appState.currentWorkspace?.value?.id || null
        }
      }));
    },
    onDisconnected() {
      console.log(`[useChatAgency] WebSocket disconnected`);
      connectionState.value.isConnected = false;
    },
    onError(error) {
      console.error(`[useChatAgency] WebSocket error:`, error);
      connectionState.value.error = 'WebSocket connection error';
      connectionState.value.isConnected = false;
    }
  });

  // Process incoming WebSocket messages
  watch(data, (newData) => {
    if (!newData) return;
    
    try {
      const response = JSON.parse(newData);
      console.log('[useChatAgency] Received message:', response);
      
      // Handle different message types
      switch (response.type) {
        case 'message':
          if (response.data?.message) {
            const aiMessage = response.data.message;
            
            // Add AI message to chat
            addAIMessage(
              aiMessage.content || aiMessage.text,
              aiMessage.profileResults,
              aiMessage.businessResults,
              aiMessage.preferenceResults
            );
            
            isLoading.value = false;
          }
          break;
          
        case 'system':
          console.log('[useChatAgency] System message:', response.message);
          break;
          
        case 'error':
          console.error('[useChatAgency] Error message:', response.message, response.details);
          error.value = response.message;
          isLoading.value = false;
          
          // Add error message to chat
          addAIMessage(`I'm sorry, I encountered an error: ${response.message}`);
          break;
          
        case 'state_update':
          console.log('[useChatAgency] State update:', response.data);
          break;
          
        default:
          console.log('[useChatAgency] Unknown message type:', response.type);
      }
    } catch (err) {
      console.error('[useChatAgency] Error parsing WebSocket message:', err, newData);
    }
  });

  // Add a user message
  const addUserMessage = (text: string): ChatMessage => {
    const message: ChatMessage = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    messages.value.push(message);
    return message;
  };
  
  // Add an AI message
  const addAIMessage = (
    text: string, 
    profileResults?: any[],
    businessResults?: any[],
    preferenceResults?: any[]
  ): ChatMessage => {
    const hasResults = !!(
      (profileResults && profileResults.length > 0) || 
      (businessResults && businessResults.length > 0) || 
      (preferenceResults && preferenceResults.length > 0)
    );
    
    const message: ChatMessage = {
      id: uuidv4(),
      text,
      sender: 'ai',
      timestamp: new Date(),
      hasResults,
      profileResults,
      businessResults,
      preferenceResults
    };
    
    messages.value.push(message);
    return message;
  };
  
  // Send a message via WebSocket
  const sendMessage = async (text: string): Promise<void> => {
    if (!text.trim() || isLoading.value) return;
    
    try {
      isLoading.value = true;
      error.value = null;
      
      // Add user message to chat
      addUserMessage(text);
      
      // Check connection
      if (!connectionState.value.isConnected) {
        console.log('[useChatAgency] WebSocket not connected, attempting to reconnect...');
        open();
        
        // Wait for connection
        await new Promise((resolve) => {
          const checkConnection = setInterval(() => {
            if (connectionState.value.isConnected) {
              clearInterval(checkConnection);
              resolve(true);
            }
            
            connectionState.value.reconnectAttempts++;
            
            if (connectionState.value.reconnectAttempts > 5) {
              clearInterval(checkConnection);
              throw new Error('Failed to connect to chat server');
            }
          }, 1000);
        });
      }
      
      // Send message via WebSocket
      send(JSON.stringify({
        type: 'message',
        data: {
          message: {
            id: uuidv4(),
            role: 'user',
            content: text,
            text: text,
            type: 'sent',
            time: new Date().toLocaleTimeString(),
            attachments: []
          }
        }
      }));
      
    } catch (err: any) {
      console.error('[useChatAgency] Error sending message:', err);
      error.value = err.message || 'Failed to send message';
      isLoading.value = false;
      
      // Add error message to chat
      addAIMessage(`I'm sorry, I encountered an error while sending your message: ${error.value}`);
    }
  };
  
  // Clear chat history
  const clearChat = (): void => {
    messages.value = [];
  };
  
  // Set custom system instruction
  const setSystemInstruction = (instruction: string): void => {
    systemInstruction.value = instruction;
    
    // If connected, send updated instruction
    if (connectionState.value.isConnected) {
      send(JSON.stringify({
        type: 'init',
        data: {
          systemInstruction: instruction
        }
      }));
    }
  };
  
  // Clean up on component unmount
  onUnmounted(() => {
    if (connectionState.value.isConnected) {
      close();
    }
  });
  
  return {
    // State
    messages,
    isLoading,
    error,
    connectionState,
    systemInstruction,
    
    // Methods
    sendMessage,
    clearChat,
    setSystemInstruction
  };
};
