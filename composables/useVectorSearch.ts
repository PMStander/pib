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

// Import types for the results
import type {
  SearchProfilesByBioData,
  SearchBusinessProfilesByDescriptionData,
  SearchPartnerPreferencesData
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

      const result = await searchProfilesByBioConnector({
        searchText,
        limit
      });
      
      const profilesData = result.data?.profiles_bioEmbedding_similarity || [];

      if (Array.isArray(profilesData)) {
        return profilesData.map(profile => ({
          item: {
            id: profile.id,
            userId: profile.userId,
            name: profile.name,
            bio: profile.bio || '',
            avatarUrl: profile.avatarUrl || '',
            skills: profile.skills || [],
            interests: profile.interests || [],
            isDefault: false, // Default value since it's not returned in the query
            createdAt: new Date(),
            updatedAt: new Date()
          } as Profile,
          distance: 0 // Since _metadata is not available
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

      const result = await searchBusinessProfilesByDescriptionConnector({
        searchText,
        limit
      });
      
      const businessesData = result.data?.businessProfiles_descriptionEmbedding_similarity || [];

      if (Array.isArray(businessesData)) {
        return businessesData.map(business => ({
          item: {
            id: business.id,
            workspaceId: business.workspaceId,
            name: business.name,
            industry: business.industry || '',
            description: business.description || '',
            location: business.location || '',
            website: business.website || '',
            employeeCount: business.employeeCount || 0,
            createdAt: new Date(),
            updatedAt: new Date()
          } as BusinessProfile,
          distance: 0 // Since _metadata is not available
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

      const result = await searchPartnerPreferencesConnector({
        searchText,
        limit
      });
      
      const prefsData = result.data?.partnerPreferencess_combinedEmbedding_similarity || [];

      if (Array.isArray(prefsData)) {
        return prefsData.map(prefs => ({
          item: {
            id: prefs.id,
            workspaceId: prefs.workspaceId,
            industries: prefs.industries || [],
            locations: prefs.locations || [],
            minEmployeeCount: prefs.minEmployeeCount || 0,
            maxEmployeeCount: prefs.maxEmployeeCount || 0,
            skillsNeeded: prefs.skillsNeeded || [],
            createdAt: new Date(),
            updatedAt: new Date()
          } as PartnerPreferences,
          distance: 0 // Since _metadata is not available
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

  // Match a profile to business profiles - this is a simplified implementation
  // In a full implementation, we would need to manually implement the vector similarity search
  // by retrieving the profile's embedding and then using it to search business profiles
  const matchProfileToBusinesses = async (profileId: string, limit: number = 5): Promise<SearchResult<BusinessProfile>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to match profiles';
      return [];
    }

    error.value = 'Direct profile-to-business matching is not fully implemented yet. Use searchBusinessProfilesByDescription instead.';
    return [];
  };

  // Match a business profile to user profiles - this is a simplified implementation
  // In a full implementation, we would need to manually implement the vector similarity search
  // by retrieving the business profile's embedding and then using it to search profiles
  const matchBusinessToProfiles = async (businessProfileId: string, limit: number = 5): Promise<SearchResult<Profile>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to match business profiles';
      return [];
    }

    error.value = 'Direct business-to-profile matching is not fully implemented yet. Use searchProfilesByBio instead.';
    return [];
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
