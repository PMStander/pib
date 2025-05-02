import type { Profile, BusinessProfile, PartnerPreferences } from './dataconnect';
import type { SearchResult } from './search';

export type MessageSender = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  hasResults?: boolean;
  profileResults?: SearchResult<Profile>[];
  businessResults?: SearchResult<BusinessProfile>[];
  preferenceResults?: SearchResult<PartnerPreferences>[];
}

export type ChatIntent = 
  | 'search_profiles'
  | 'search_businesses'
  | 'search_preferences'
  | 'match_profile_to_businesses'
  | 'match_business_to_profiles'
  | 'general_question'
  | 'greeting'
  | 'help'
  | 'unknown';

export interface ParsedQuery {
  intent: ChatIntent;
  entities: {
    searchText?: string;
    profileId?: string;
    businessId?: string;
    limit?: number;
    skills?: string[];
    industries?: string[];
    locations?: string[];
  };
  originalText: string;
}
