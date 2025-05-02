import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { parseQuery, generateResponseTemplate } from '~/utils/nlp';
import { generateResponse } from '~/utils/responseGenerator';
import { useVectorSearch } from '~/composables/useVectorSearch';
import type { ChatMessage, ParsedQuery } from '~/types/chat';
import type { Profile, BusinessProfile, PartnerPreferences } from '~/types/dataconnect';
import type { SearchResult } from '~/types/search';

/**
 * Composable for chat functionality
 */
export const useChat = () => {
  // Get vector search composable
  const { 
    searchProfilesByBio,
    searchBusinessProfilesByDescription,
    searchPartnerPreferences,
    matchProfileToBusinesses,
    matchBusinessToProfiles,
    error: searchError
  } = useVectorSearch();
  
  // Chat state
  const messages = useState<ChatMessage[]>('chat-messages', () => []);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const conversationContext = ref<{
    lastIntent?: string;
    lastEntities?: Record<string, any>;
    lastProfileResults?: SearchResult<Profile>[];
    lastBusinessResults?: SearchResult<BusinessProfile>[];
    lastPreferenceResults?: SearchResult<PartnerPreferences>[];
  }>({});
  
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
    profileResults?: SearchResult<Profile>[],
    businessResults?: SearchResult<BusinessProfile>[],
    preferenceResults?: SearchResult<PartnerPreferences>[]
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
  
  // Process a user message and generate a response
  const processMessage = async (text: string): Promise<void> => {
    try {
      // Parse the query to determine intent and extract entities
      const parsedQuery = parseQuery(text);
      
      // Update conversation context
      conversationContext.value = {
        lastIntent: parsedQuery.intent,
        lastEntities: parsedQuery.entities
      };
      
      // Handle different intents
      let profileResults: SearchResult<Profile>[] | undefined;
      let businessResults: SearchResult<BusinessProfile>[] | undefined;
      let preferenceResults: SearchResult<PartnerPreferences>[] | undefined;
      
      const limit = parsedQuery.entities.limit || 5;
      
      switch (parsedQuery.intent) {
        case 'search_profiles':
          profileResults = await searchProfilesByBio(text, limit);
          break;
          
        case 'search_businesses':
          businessResults = await searchBusinessProfilesByDescription(text, limit);
          break;
          
        case 'search_preferences':
          preferenceResults = await searchPartnerPreferences(text, limit);
          break;
          
        case 'match_profile_to_businesses':
          // For now, we'll just search businesses with the query text
          // In a real implementation, we would get the current user's profile ID
          businessResults = await searchBusinessProfilesByDescription(text, limit);
          break;
          
        case 'match_business_to_profiles':
          // For now, we'll just search profiles with the query text
          // In a real implementation, we would get the current user's business ID
          profileResults = await searchProfilesByBio(text, limit);
          break;
          
        case 'greeting':
        case 'help':
          // No search needed for these intents
          break;
          
        case 'general_question':
        case 'unknown':
        default:
          // Try all search types and see what returns results
          profileResults = await searchProfilesByBio(text, limit);
          businessResults = await searchBusinessProfilesByDescription(text, limit);
          preferenceResults = await searchPartnerPreferences(text, limit);
          break;
      }
      
      // Update conversation context with search results
      conversationContext.value.lastProfileResults = profileResults;
      conversationContext.value.lastBusinessResults = businessResults;
      conversationContext.value.lastPreferenceResults = preferenceResults;
      
      // Generate response text
      let responseText: string;
      
      if (parsedQuery.intent === 'greeting' || parsedQuery.intent === 'help') {
        // Use template response for greeting and help
        responseText = generateResponseTemplate(parsedQuery);
      } else {
        // Generate response based on search results
        responseText = generateResponse(
          parsedQuery,
          profileResults,
          businessResults,
          preferenceResults
        );
      }
      
      // Add AI message with response and results
      addAIMessage(responseText, profileResults, businessResults, preferenceResults);
      
    } catch (err: any) {
      console.error('Error processing message:', err);
      error.value = err.message || 'Failed to process message';
      
      // Add error message
      addAIMessage(
        `I'm sorry, I encountered an error while processing your message: ${error.value}`
      );
    }
  };
  
  // Send a message
  const sendMessage = async (text: string): Promise<void> => {
    if (!text.trim()) return;
    
    try {
      isLoading.value = true;
      error.value = null;
      
      // Add user message
      addUserMessage(text);
      
      // Process the message and generate a response
      await processMessage(text);
      
    } catch (err: any) {
      console.error('Error sending message:', err);
      error.value = err.message || 'Failed to send message';
    } finally {
      isLoading.value = false;
    }
  };
  
  // Clear chat history
  const clearChat = (): void => {
    messages.value = [];
    conversationContext.value = {};
  };
  
  return {
    // State
    messages,
    isLoading,
    error,
    
    // Methods
    sendMessage,
    clearChat
  };
};
