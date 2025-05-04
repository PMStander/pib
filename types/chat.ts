import type { Profile, BusinessProfile, PartnerPreferences } from './dataconnect';
import type { SearchResult } from './search';
import type { DocumentArtifact, DocumentSuggestion } from './documents';

export type MessageSender = 'user' | 'ai';

// Chat privacy settings
export enum ChatPrivacy {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

// Chat participant
export interface ChatParticipant {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: Date;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  hasResults?: boolean;
  profileResults?: SearchResult<Profile>[];
  businessResults?: SearchResult<BusinessProfile>[];
  preferenceResults?: SearchResult<PartnerPreferences>[];
  // Document artifact
  documentArtifact?: DocumentArtifact;
  documentSuggestions?: DocumentSuggestion[];
  // Response voting
  upvotes?: number;
  downvotes?: number;
  userVote?: 'up' | 'down' | null;
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

// Chat session for managing conversations
export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  privacy: ChatPrivacy;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  lastMessageAt: Date;
  modelConfig?: {
    provider: string;
    model: string;
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
  };
}
