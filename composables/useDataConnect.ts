import { ref, computed } from 'vue';
import { useFirebase } from './useFirebase';
import type { 
  User, 
  Workspace, 
  Profile, 
  WorkspaceMember,
  WorkspaceInvitation,
  BusinessProfile,
  PartnerPreferences
} from '~/types/dataconnect';

export const useDataConnect = () => {
  const { auth } = useFirebase();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Current user profile
  const currentUser = ref<User | null>(null);
  const currentUserProfiles = ref<Profile[]>([]);
  const currentUserWorkspaces = ref<Workspace[]>([]);

  // Get current user data
  const fetchCurrentUser = async () => {
    if (!auth.currentUser) {
      currentUser.value = null;
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // In a real implementation, this would be a DataConnect query
      // For now, we'll simulate the response
      const userData: User = {
        id: auth.currentUser.uid,
        email: auth.currentUser.email || '',
        display_name: auth.currentUser.displayName || null,
        photo_url: auth.currentUser.photoURL || null,
        created_at: new Date(),
        updated_at: new Date()
      };

      currentUser.value = userData;
      return userData;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user data';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Get user profiles
  const fetchUserProfiles = async (userId: string = auth.currentUser?.uid || '') => {
    if (!userId) {
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // In a real implementation, this would be a DataConnect query
      // For now, we'll simulate the response
      const profiles: Profile[] = [{
        id: '1',
        user_id: userId,
        name: 'Default Profile',
        bio: null,
        avatar_url: null,
        skills: null,
        interests: null,
        is_default: true,
        created_at: new Date(),
        updated_at: new Date()
      }];

      if (userId === auth.currentUser?.uid) {
        currentUserProfiles.value = profiles;
      }

      return profiles;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user profiles';
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Get user workspaces
  const fetchUserWorkspaces = async (userId: string = auth.currentUser?.uid || '') => {
    if (!userId) {
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // In a real implementation, this would be a DataConnect query
      // For now, we'll simulate the response
      const workspaces: Workspace[] = [];

      if (userId === auth.currentUser?.uid) {
        currentUserWorkspaces.value = workspaces;
      }

      return workspaces;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user workspaces';
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Create a new workspace
  const createWorkspace = async (data: { name: string; description?: string; logo_url?: string }) => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to create a workspace';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // In a real implementation, this would be a DataConnect mutation
      // For now, we'll simulate the response
      const workspace: Workspace = {
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description || null,
        logo_url: data.logo_url || null,
        created_by: auth.currentUser.uid,
        created_at: new Date(),
        updated_at: new Date()
      };

      // Add to current user workspaces
      currentUserWorkspaces.value = [...currentUserWorkspaces.value, workspace];

      return workspace;
    } catch (err: any) {
      error.value = err.message || 'Failed to create workspace';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Create a new profile
  const createProfile = async (data: { name: string; bio?: string; avatar_url?: string; skills?: string[]; interests?: string[]; is_default?: boolean }) => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to create a profile';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // In a real implementation, this would be a DataConnect mutation
      // For now, we'll simulate the response
      const profile: Profile = {
        id: crypto.randomUUID(),
        user_id: auth.currentUser.uid,
        name: data.name,
        bio: data.bio || null,
        avatar_url: data.avatar_url || null,
        skills: data.skills || null,
        interests: data.interests || null,
        is_default: data.is_default || false,
        created_at: new Date(),
        updated_at: new Date()
      };

      // Add to current user profiles
      currentUserProfiles.value = [...currentUserProfiles.value, profile];

      return profile;
    } catch (err: any) {
      error.value = err.message || 'Failed to create profile';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Invite a user to a workspace
  const inviteToWorkspace = async (data: { workspace_id: string; email: string; role: 'admin' | 'member' | 'guest' }) => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to invite users';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // In a real implementation, this would be a DataConnect mutation
      // For now, we'll simulate the response
      const invitation: WorkspaceInvitation = {
        id: crypto.randomUUID(),
        workspace_id: data.workspace_id,
        email: data.email,
        role: data.role,
        invited_by: auth.currentUser.uid,
        status: 'pending',
        created_at: new Date(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      };

      return invitation;
    } catch (err: any) {
      error.value = err.message || 'Failed to invite user';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Initialize user data after authentication
  const initUserData = async () => {
    if (!auth.currentUser) return;
    
    await fetchCurrentUser();
    await fetchUserProfiles();
    await fetchUserWorkspaces();
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
    initUserData
  };
};
