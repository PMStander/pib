import { useFirestore } from './useFirestore';
import { ref, computed } from 'vue';

// This file now serves as a compatibility layer for existing code
// It uses the new useFirestore composable internally but maintains the same API

export const useDataConnect = () => {
  // Use the new Firestore service
  const firestoreService = useFirestore();

  // Local state
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Use computed properties to access app state from the Firestore service
  const currentUser = computed(() => firestoreService.currentUser.value);
  const currentUserProfiles = computed(() => firestoreService.currentUserProfiles.value);
  const currentUserWorkspaces = computed(() => firestoreService.currentUserWorkspaces.value);

  // Get current user data
  const fetchCurrentUser = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      // Use the Firestore service to fetch the current user
      const userData = await firestoreService.fetchCurrentUser();

      // The Firestore service already updates the app state
      return userData;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user data';
      console.error('Error fetching user data:', err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Get user profiles
  const fetchUserProfiles = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      // Use the Firestore service to fetch user profiles
      const profiles = await firestoreService.fetchUserProfiles();

      // The Firestore service already updates the app state
      return profiles;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user profiles';
      console.error('Error fetching user profiles:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Get user workspaces
  const fetchUserWorkspaces = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      // Use the Firestore service to fetch user workspaces
      const workspaces = await firestoreService.fetchUserWorkspaces();

      // The Firestore service already updates the app state
      return workspaces;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user workspaces';
      console.error('Error fetching user workspaces:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Create a new workspace
  const createWorkspace = async (data: { name: string; description?: string; logo_url?: string }) => {
    try {
      isLoading.value = true;
      error.value = null;

      // Use the Firestore service to create a workspace
      const workspace = await firestoreService.createWorkspace(data);

      // The Firestore service already updates the app state
      return workspace;
    } catch (err: any) {
      error.value = err.message || 'Failed to create workspace';
      console.error('Error creating workspace:', err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Create a new profile
  const createProfile = async (data: { name: string; bio?: string; avatar_url?: string; skills?: string[]; interests?: string[]; is_default?: boolean }) => {
    try {
      isLoading.value = true;
      error.value = null;

      // Use the Firestore service to create a profile
      const profile = await firestoreService.createProfile(data);

      // The Firestore service already updates the app state
      return profile;
    } catch (err: any) {
      error.value = err.message || 'Failed to create profile';
      console.error('Error creating profile:', err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Invite a user to a workspace
  const inviteToWorkspace = async (data: { workspace_id: string; email: string; role: 'admin' | 'member' | 'guest' }) => {
    try {
      isLoading.value = true;
      error.value = null;

      // Use the Firestore service to invite a user to a workspace
      const invitation = await firestoreService.inviteToWorkspace(data);

      return invitation;
    } catch (err: any) {
      error.value = err.message || 'Failed to invite user';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // This function is kept for backward compatibility but uses Firestore internally

  // Initialize user data after authentication
  const initUserData = async () => {
    try {
      // Use the Firestore service to initialize user data
      const userData = await firestoreService.initUserData();
      return userData;
    } catch (err) {
      console.error('Error initializing user data:', err);
      if (err instanceof Error) {
        console.error('User Data Initialization Error Details:', err.message, err.stack);
      }
      return null;
    }
  };

  // Create a default workspace for the user
  const createDefaultWorkspace = async (userName: string = 'My') => {
    try {
      return await firestoreService.createDefaultWorkspace(userName);
    } catch (err) {
      console.error('Failed to create default workspace:', err);
      return null;
    }
  };

  // Add vector search capability
  const vectorSearch = async (collection: string, query: string, limit: number = 5) => {
    try {
      isLoading.value = true;
      error.value = null;

      return await firestoreService.vectorSearch(collection, query, limit);
    } catch (err: any) {
      error.value = err.message || 'Failed to perform vector search';
      console.error('Error performing vector search:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    isLoading,
    error,
    currentUser,
    currentUserProfiles,
    currentUserWorkspaces,

    // Methods
    fetchCurrentUser,
    fetchUserProfiles,
    fetchUserWorkspaces,
    createWorkspace,
    createProfile,
    inviteToWorkspace,
    createDefaultWorkspace,
    initUserData,
    vectorSearch
  };
};
