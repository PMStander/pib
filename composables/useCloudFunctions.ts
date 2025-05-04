import { useFirebase } from './useFirebase';
import { ref } from 'vue';
import { getFunctions, httpsCallable } from 'firebase/functions';
import type { 
  Profile, 
  BusinessProfile, 
  PartnerPreferences 
} from '~/types/dataconnect';

/**
 * Composable for interacting with Firebase Cloud Functions
 * 
 * This composable provides functions for vector search and embedding generation
 * using Firebase Cloud Functions.
 */
export const useCloudFunctions = () => {
  const { app, auth } = useFirebase();
  const functions = getFunctions(app);
  
  // State
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  /**
   * Generate embeddings for text using Cloud Functions
   * 
   * @param text The text to generate embeddings for
   * @returns An array of numbers representing the embedding vector
   */
  const generateEmbeddings = async (text: string): Promise<number[]> => {
    if (!auth.currentUser) {
      throw new Error('You must be logged in to generate embeddings');
    }
    
    try {
      isLoading.value = true;
      error.value = null;
      
      const generateEmbeddingsFunction = httpsCallable(functions, 'generateEmbeddings');
      const result = await generateEmbeddingsFunction({ text });
      
      const data = result.data as { embedding: number[] };
      return data.embedding;
    } catch (err: any) {
      error.value = err.message || 'Failed to generate embeddings';
      console.error('Error generating embeddings:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  
  /**
   * Store a document with embeddings using Cloud Functions
   * 
   * @param collectionName The name of the collection to store the document in
   * @param data The document data
   * @param embedding The embedding vector
   * @param id Optional document ID
   * @returns The ID of the stored document
   */
  const storeWithEmbeddings = async (
    collectionName: string,
    data: Record<string, any>,
    embedding: number[],
    id?: string
  ): Promise<string> => {
    if (!auth.currentUser) {
      throw new Error('You must be logged in to store documents');
    }
    
    try {
      isLoading.value = true;
      error.value = null;
      
      const storeWithEmbeddingsFunction = httpsCallable(functions, 'storeWithEmbeddings');
      const result = await storeWithEmbeddingsFunction({
        collection: collectionName,
        data,
        embedding,
        id
      });
      
      const responseData = result.data as { id: string; success: boolean };
      
      if (!responseData.success) {
        throw new Error('Failed to store document with embeddings');
      }
      
      return responseData.id;
    } catch (err: any) {
      error.value = err.message || 'Failed to store document with embeddings';
      console.error('Error storing document with embeddings:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  
  /**
   * Search for profiles by text using vector search
   * 
   * @param searchText The text to search for
   * @param limit The maximum number of results to return
   * @returns An array of profiles with similarity scores
   */
  const searchProfilesByText = async (
    searchText: string,
    limit: number = 5
  ): Promise<Array<{ item: Profile; distance: number }>> => {
    if (!auth.currentUser) {
      throw new Error('You must be logged in to search profiles');
    }
    
    try {
      isLoading.value = true;
      error.value = null;
      
      // First, generate embeddings for the search text
      const embedding = await generateEmbeddings(searchText);
      
      // Then, perform vector search
      const vectorSearchFunction = httpsCallable(functions, 'vectorSearch');
      const result = await vectorSearchFunction({
        collection: 'profiles',
        vector: embedding,
        limit
      });
      
      const data = result.data as { results: any[] };
      
      // Map the results to the expected format
      return data.results.map(profile => ({
        item: {
          id: profile.id,
          userId: profile.user_id || profile.userId,
          name: profile.name,
          bio: profile.bio || '',
          avatarUrl: profile.avatar_url || profile.avatarUrl || '',
          skills: profile.skills || [],
          interests: profile.interests || [],
          isDefault: profile.is_default || profile.isDefault || false,
          createdAt: profile.created_at ? new Date(profile.created_at) :
                    profile.createdAt ? new Date(profile.createdAt) : new Date(),
          updatedAt: profile.updated_at ? new Date(profile.updated_at) :
                    profile.updatedAt ? new Date(profile.updatedAt) : new Date()
        } as Profile,
        distance: profile._distance || 0
      }));
    } catch (err: any) {
      error.value = err.message || 'Failed to search profiles';
      console.error('Error searching profiles:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };
  
  /**
   * Search for business profiles by text using vector search
   * 
   * @param searchText The text to search for
   * @param limit The maximum number of results to return
   * @returns An array of business profiles with similarity scores
   */
  const searchBusinessProfilesByText = async (
    searchText: string,
    limit: number = 5
  ): Promise<Array<{ item: BusinessProfile; distance: number }>> => {
    if (!auth.currentUser) {
      throw new Error('You must be logged in to search business profiles');
    }
    
    try {
      isLoading.value = true;
      error.value = null;
      
      // First, generate embeddings for the search text
      const embedding = await generateEmbeddings(searchText);
      
      // Then, perform vector search
      const vectorSearchFunction = httpsCallable(functions, 'vectorSearch');
      const result = await vectorSearchFunction({
        collection: 'businessProfiles',
        vector: embedding,
        limit
      });
      
      const data = result.data as { results: any[] };
      
      // Map the results to the expected format
      return data.results.map(business => ({
        item: {
          id: business.id,
          workspaceId: business.workspace_id || business.workspaceId,
          name: business.name,
          industry: business.industry || '',
          description: business.description || '',
          location: business.location || '',
          website: business.website || '',
          employeeCount: business.employee_count || business.employeeCount || 0,
          createdAt: business.created_at ? new Date(business.created_at) :
                    business.createdAt ? new Date(business.createdAt) : new Date(),
          updatedAt: business.updated_at ? new Date(business.updated_at) :
                    business.updatedAt ? new Date(business.updatedAt) : new Date()
        } as BusinessProfile,
        distance: business._distance || 0
      }));
    } catch (err: any) {
      error.value = err.message || 'Failed to search business profiles';
      console.error('Error searching business profiles:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };
  
  /**
   * Search for partner preferences by text using vector search
   * 
   * @param searchText The text to search for
   * @param limit The maximum number of results to return
   * @returns An array of partner preferences with similarity scores
   */
  const searchPartnerPreferencesByText = async (
    searchText: string,
    limit: number = 5
  ): Promise<Array<{ item: PartnerPreferences; distance: number }>> => {
    if (!auth.currentUser) {
      throw new Error('You must be logged in to search partner preferences');
    }
    
    try {
      isLoading.value = true;
      error.value = null;
      
      // First, generate embeddings for the search text
      const embedding = await generateEmbeddings(searchText);
      
      // Then, perform vector search
      const vectorSearchFunction = httpsCallable(functions, 'vectorSearch');
      const result = await vectorSearchFunction({
        collection: 'partnerPreferences',
        vector: embedding,
        limit
      });
      
      const data = result.data as { results: any[] };
      
      // Map the results to the expected format
      return data.results.map(prefs => ({
        item: {
          id: prefs.id,
          workspaceId: prefs.workspace_id || prefs.workspaceId,
          industries: prefs.industries || [],
          locations: prefs.locations || [],
          minEmployeeCount: prefs.min_employee_count || prefs.minEmployeeCount || 0,
          maxEmployeeCount: prefs.max_employee_count || prefs.maxEmployeeCount || 0,
          skillsNeeded: prefs.skills_needed || prefs.skillsNeeded || [],
          createdAt: prefs.created_at ? new Date(prefs.created_at) :
                    prefs.createdAt ? new Date(prefs.createdAt) : new Date(),
          updatedAt: prefs.updated_at ? new Date(prefs.updated_at) :
                    prefs.updatedAt ? new Date(prefs.updatedAt) : new Date()
        } as PartnerPreferences,
        distance: prefs._distance || 0
      }));
    } catch (err: any) {
      error.value = err.message || 'Failed to search partner preferences';
      console.error('Error searching partner preferences:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };
  
  return {
    // State
    isLoading,
    error,
    
    // Methods
    generateEmbeddings,
    storeWithEmbeddings,
    searchProfilesByText,
    searchBusinessProfilesByText,
    searchPartnerPreferencesByText
  };
};
