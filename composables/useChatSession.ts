import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useFirebaseAuth } from './useFirebaseAuth';
import { useAppState } from './useAppState';
import type { ChatSession, ChatPrivacy, ChatMessage } from '~/types/chat';

export const useChatSession = () => {
  // Get auth state
  const { isAuthenticated, user } = useFirebaseAuth();
  const appState = useAppState();
  
  // Local state
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentChatId = ref<string | null>(null);
  
  // Create a new chat session
  const createChatSession = async (
    title: string = 'New Chat',
    privacy: ChatPrivacy = 'PRIVATE',
    initialMessages: ChatMessage[] = []
  ): Promise<string | null> => {
    if (!isAuthenticated.value || !user.value) {
      error.value = 'You must be logged in to create a chat session';
      return null;
    }
    
    try {
      isLoading.value = true;
      error.value = null;
      
      // Generate a new chat ID
      const chatId = uuidv4();
      
      // Create chat session data
      const chatSession: ChatSession = {
        id: chatId,
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: user.value.uid,
        privacy,
        participants: [
          {
            id: user.value.uid,
            name: user.value.displayName || 'User',
            email: user.value.email || undefined,
            avatarUrl: user.value.photoURL || undefined,
            role: 'owner',
            joinedAt: new Date()
          }
        ],
        messages: initialMessages,
        lastMessageAt: new Date()
      };
      
      // Save to Firestore via server API
      const response = await $fetch<any>('/api/data/write', {
        method: 'POST',
        body: {
          collection: 'chatSessions',
          data: {
            id: chatId,
            title,
            created_at: new Date(),
            updated_at: new Date(),
            owner_id: user.value.uid,
            privacy,
            last_message_at: new Date(),
            workspace_id: appState.currentWorkspace?.value?.id || null,
            model_config: {
              provider: 'langchain',
              model: 'gpt-4o',
              temperature: 0.7,
              top_p: 0.9,
              top_k: 40,
              max_output_tokens: 2048
            }
          }
        }
      });
      
      console.log('Chat session created:', response);
      
      // Create initial participants
      await $fetch<any>('/api/data/write', {
        method: 'POST',
        body: {
          collection: 'chatParticipants',
          data: {
            id: uuidv4(),
            chat_id: chatId,
            user_id: user.value.uid,
            role: 'owner',
            joined_at: new Date()
          }
        }
      });
      
      // Set current chat ID
      currentChatId.value = chatId;
      
      return chatId;
    } catch (err: any) {
      console.error('Error creating chat session:', err);
      error.value = err.message || 'Failed to create chat session';
      return null;
    } finally {
      isLoading.value = false;
    }
  };
  
  // Update a chat session
  const updateChatSession = async (
    chatId: string,
    updates: Partial<ChatSession>
  ): Promise<boolean> => {
    if (!isAuthenticated.value || !user.value) {
      error.value = 'You must be logged in to update a chat session';
      return false;
    }
    
    try {
      isLoading.value = true;
      error.value = null;
      
      // Convert to snake_case for server API
      const serverUpdates: Record<string, any> = {};
      
      if (updates.title) serverUpdates.title = updates.title;
      if (updates.privacy) serverUpdates.privacy = updates.privacy;
      if (updates.modelConfig) {
        serverUpdates.model_config = {
          provider: updates.modelConfig.provider,
          model: updates.modelConfig.model,
          temperature: updates.modelConfig.temperature,
          top_p: updates.modelConfig.topP,
          top_k: updates.modelConfig.topK,
          max_output_tokens: updates.modelConfig.maxOutputTokens
        };
      }
      
      // Always update the updated_at timestamp
      serverUpdates.updated_at = new Date();
      
      // Update in Firestore via server API
      await $fetch<any>('/api/data/update', {
        method: 'POST',
        body: {
          collection: 'chatSessions',
          id: chatId,
          data: serverUpdates
        }
      });
      
      return true;
    } catch (err: any) {
      console.error('Error updating chat session:', err);
      error.value = err.message || 'Failed to update chat session';
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  
  // Add a message to a chat session
  const addMessageToChatSession = async (
    chatId: string,
    message: ChatMessage
  ): Promise<boolean> => {
    if (!isAuthenticated.value || !user.value) {
      error.value = 'You must be logged in to add a message';
      return false;
    }
    
    try {
      isLoading.value = true;
      error.value = null;
      
      // Save message to Firestore via server API
      await $fetch<any>('/api/data/write', {
        method: 'POST',
        body: {
          collection: 'chatMessages',
          data: {
            id: message.id,
            chat_id: chatId,
            text: message.text,
            sender: message.sender,
            timestamp: message.timestamp,
            has_results: message.hasResults || false,
            user_id: user.value.uid
          }
        }
      });
      
      // Update the last_message_at timestamp
      await updateChatSession(chatId, {
        lastMessageAt: new Date()
      });
      
      return true;
    } catch (err: any) {
      console.error('Error adding message to chat session:', err);
      error.value = err.message || 'Failed to add message';
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  
  // Get a chat session by ID
  const getChatSession = async (chatId: string): Promise<ChatSession | null> => {
    if (!isAuthenticated.value || !user.value) {
      error.value = 'You must be logged in to get a chat session';
      return null;
    }
    
    try {
      isLoading.value = true;
      error.value = null;
      
      // Get chat session from Firestore via server API
      const response = await $fetch<any>('/api/data/read', {
        method: 'POST',
        body: {
          collection: 'chatSessions',
          id: chatId
        }
      });
      
      if (!response?.data) {
        return null;
      }
      
      // Get participants
      const participantsResponse = await $fetch<any>('/api/data/read', {
        method: 'POST',
        body: {
          collection: 'chatParticipants',
          filters: {
            chat_id: chatId
          }
        }
      });
      
      const participants = participantsResponse?.data || [];
      
      // Get messages
      const messagesResponse = await $fetch<any>('/api/data/read', {
        method: 'POST',
        body: {
          collection: 'chatMessages',
          filters: {
            chat_id: chatId
          },
          orderBy: {
            field: 'timestamp',
            direction: 'asc'
          }
        }
      });
      
      const messages = messagesResponse?.data || [];
      
      // Convert from snake_case to camelCase
      const chatSession: ChatSession = {
        id: response.data.id,
        title: response.data.title,
        createdAt: new Date(response.data.created_at),
        updatedAt: new Date(response.data.updated_at),
        ownerId: response.data.owner_id,
        privacy: response.data.privacy,
        participants: participants.map((p: any) => ({
          id: p.user_id,
          name: p.name || 'User',
          email: p.email,
          avatarUrl: p.avatar_url,
          role: p.role,
          joinedAt: new Date(p.joined_at)
        })),
        messages: messages.map((m: any) => ({
          id: m.id,
          text: m.text,
          sender: m.sender,
          timestamp: new Date(m.timestamp),
          hasResults: m.has_results
        })),
        lastMessageAt: new Date(response.data.last_message_at),
        modelConfig: response.data.model_config ? {
          provider: response.data.model_config.provider,
          model: response.data.model_config.model,
          temperature: response.data.model_config.temperature,
          topP: response.data.model_config.top_p,
          topK: response.data.model_config.top_k,
          maxOutputTokens: response.data.model_config.max_output_tokens
        } : undefined
      };
      
      return chatSession;
    } catch (err: any) {
      console.error('Error getting chat session:', err);
      error.value = err.message || 'Failed to get chat session';
      return null;
    } finally {
      isLoading.value = false;
    }
  };
  
  // Set the current chat ID
  const setCurrentChatId = (chatId: string | null) => {
    currentChatId.value = chatId;
  };
  
  return {
    // State
    isLoading,
    error,
    currentChatId,
    
    // Methods
    createChatSession,
    updateChatSession,
    addMessageToChatSession,
    getChatSession,
    setCurrentChatId
  };
};
