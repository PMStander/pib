import { ref, computed } from 'vue';
import { useFirebase } from './useFirebase';

// Import types
import type { 
  Profile, 
  BusinessProfile, 
  PartnerPreferences 
} from '~/types/dataconnect';

// Import DataConnect connector functions for vector search
import {
  searchProfilesByBio as searchProfilesByBioConnector,
  searchBusinessProfilesByDescription as searchBusinessProfilesByDescriptionConnector,
  searchPartnerPreferences as searchPartnerPreferencesConnector,
  matchProfileToBusinesses as matchProfileToBusinessesConnector,
  matchBusinessToProfiles as matchBusinessToProfilesConnector
} from '@pib/connector';

// Define result types with distance metadata
interface SearchResult<T> {
  item: T;
  distance: number;
}

export const useVectorSearch = () => {
  const { auth } = useFirebase();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Search profiles by bio text
  const searchProfilesByBio = async (searchText: string, limit: number = 5): Promise<SearchResult<Profile>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to search profiles';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      const { data } = await searchProfilesByBioConnector({
        searchText,
        limit
      });

      if (data && Array.isArray(data)) {
        return data.map(profile => ({
          item: {
            id: profile.id,
            userId: profile.userId,
            name: profile.name,
            bio: profile.bio,
            avatarUrl: profile.avatarUrl,
            skills: profile.skills,
            interests: profile.interests,
            isDefault: profile.isDefault,
            createdAt: new Date(profile.createdAt),
            updatedAt: new Date(profile.updatedAt)
          } as Profile,
          distance: profile._metadata?.distance || 0
        }));
      }

      return [];
    } catch (err: any) {
      error.value = err.message || 'Failed to search profiles';
      console.error('Error searching profiles:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Search business profiles by description text
  const searchBusinessProfilesByDescription = async (searchText: string, limit: number = 5): Promise<SearchResult<BusinessProfile>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to search business profiles';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      const { data } = await searchBusinessProfilesByDescriptionConnector({
        searchText,
        limit
      });

      if (data && Array.isArray(data)) {
        return data.map(profile => ({
          item: {
            id: profile.id,
            workspaceId: profile.workspaceId,
            name: profile.name,
            industry: profile.industry,
            description: profile.description,
            location: profile.location,
            website: profile.website,
            employeeCount: profile.employeeCount,
            createdAt: new Date(profile.createdAt),
            updatedAt: new Date(profile.updatedAt)
          } as BusinessProfile,
          distance: profile._metadata?.distance || 0
        }));
      }

      return [];
    } catch (err: any) {
      error.value = err.message || 'Failed to search business profiles';
      console.error('Error searching business profiles:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Search partner preferences by combined text
  const searchPartnerPreferences = async (searchText: string, limit: number = 5): Promise<SearchResult<PartnerPreferences>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to search partner preferences';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      const { data } = await searchPartnerPreferencesConnector({
        searchText,
        limit
      });

      if (data && Array.isArray(data)) {
        return data.map(prefs => ({
          item: {
            id: prefs.id,
            workspaceId: prefs.workspaceId,
            industries: prefs.industries,
            locations: prefs.locations,
            minEmployeeCount: prefs.minEmployeeCount,
            maxEmployeeCount: prefs.maxEmployeeCount,
            skillsNeeded: prefs.skillsNeeded,
            createdAt: new Date(prefs.createdAt),
            updatedAt: new Date(prefs.updatedAt)
          } as PartnerPreferences,
          distance: prefs._metadata?.distance || 0
        }));
      }

      return [];
    } catch (err: any) {
      error.value = err.message || 'Failed to search partner preferences';
      console.error('Error searching partner preferences:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Match a profile to business profiles
  const matchProfileToBusinesses = async (profileId: string, limit: number = 5): Promise<SearchResult<BusinessProfile>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to match profiles';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // First, get the profile with its embedding
      const { data: profileData } = await matchProfileToBusinessesConnector({
        profileId,
        limit
      });

      if (!profileData || !profileData.bioEmbedding) {
        error.value = 'Profile has no bio embedding';
        return [];
      }

      // Then, use the embedding to search for business profiles
      // This would be implemented in the connector, but for now we'll return an empty array
      return [];
    } catch (err: any) {
      error.value = err.message || 'Failed to match profile to businesses';
      console.error('Error matching profile to businesses:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Match a business profile to user profiles
  const matchBusinessToProfiles = async (businessProfileId: string, limit: number = 5): Promise<SearchResult<Profile>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to match business profiles';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // First, get the business profile with its embedding
      const { data: businessData } = await matchBusinessToProfilesConnector({
        businessProfileId,
        limit
      });

      if (!businessData || !businessData.descriptionEmbedding) {
        error.value = 'Business profile has no description embedding';
        return [];
      }

      // Then, use the embedding to search for profiles
      // This would be implemented in the connector, but for now we'll return an empty array
      return [];
    } catch (err: any) {
      error.value = err.message || 'Failed to match business to profiles';
      console.error('Error matching business to profiles:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Helper function to generate combined text for partner preferences
  const generateCombinedText = (
    industries: string[] | null | undefined,
    skillsNeeded: string[] | null | undefined
  ): string => {
    const parts: string[] = [];
    
    if (industries && industries.length > 0) {
      parts.push(`Industries: ${industries.join(', ')}`);
    }
    
    if (skillsNeeded && skillsNeeded.length > 0) {
      parts.push(`Skills needed: ${skillsNeeded.join(', ')}`);
    }
    
    return parts.join('. ');
  };

  return {
    // State
    isLoading,
    error,

    // Methods
    searchProfilesByBio,
    searchBusinessProfilesByDescription,
    searchPartnerPreferences,
    matchProfileToBusinesses,
    matchBusinessToProfiles,
    generateCombinedText
  };
};
