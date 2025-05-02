import { ref, computed } from 'vue';
import { useFirebase } from './useFirebase';

// Define local types that match the camelCase field names in the schema
interface LocalUser {
  id: string;
  email: string;
  displayName: string | null;
  photoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface LocalProfile {
  id: string;
  userId: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  skills: string[] | null;
  interests: string[] | null;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface LocalWorkspace {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface LocalWorkspaceInvitation {
  id: string;
  workspaceId: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
  invitedBy: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  expiresAt: Date | null;
}

// Import DataConnect connector functions
import {
  getCurrentUser as getConnectorCurrentUser,
  getUserProfiles as getConnectorUserProfiles,
  getUserWorkspaces as getConnectorUserWorkspaces,
  createWorkspace as createWorkspaceConnector,
  createProfile as createProfileConnector
} from '@pib/connector';

// Wrapper functions will be defined inside the composable to use the dataConnect instance

export const useDataConnect = () => {
  const { auth, dataConnect } = useFirebase();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Current user profile
  const currentUser = ref<LocalUser | null>(null);
  const currentUserProfiles = ref<LocalProfile[]>([]);
  const currentUserWorkspaces = ref<LocalWorkspace[]>([]);

  // Create wrapper functions with proper parameters using the dataConnect instance
  const getCurrentUser = async () => {
    try {
      if (!dataConnect) {
        throw new Error('DataConnect is not initialized');
      }
      return await getConnectorCurrentUser(dataConnect);
    } catch (err) {
      console.error('Error in getCurrentUser:', err);
      throw err;
    }
  };

  const getUserProfiles = async () => {
    try {
      if (!dataConnect) {
        throw new Error('DataConnect is not initialized');
      }
      return await getConnectorUserProfiles(dataConnect);
    } catch (err) {
      console.error('Error in getUserProfiles:', err);
      throw err;
    }
  };

  const getUserWorkspaces = async () => {
    try {
      if (!dataConnect) {
        throw new Error('DataConnect is not initialized');
      }
      return await getConnectorUserWorkspaces(dataConnect);
    } catch (err) {
      console.error('Error in getUserWorkspaces:', err);
      throw err;
    }
  };

  // Get current user data
  const fetchCurrentUser = async () => {
    if (!auth.currentUser) {
      currentUser.value = null;
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Use the DataConnect connector to fetch the current user
      try {
        const { data } = await getCurrentUser();

        if (data) {
          // Convert the data to our LocalUser type
          // Use type assertion to handle the connector data
          const userData: LocalUser = {
            id: (data as any).id,
            email: (data as any).email,
            displayName: (data as any).displayName,
            photoUrl: (data as any).photoUrl,
            createdAt: new Date((data as any).createdAt),
            updatedAt: new Date((data as any).updatedAt)
          };

          currentUser.value = userData;
          return userData;
        }
      } catch (connectorErr) {
        console.error('Error using connector:', connectorErr);
        // Continue to fallback
      }

      // Fallback if DataConnect query fails or returns no data
      const userData: LocalUser = {
        id: auth.currentUser.uid,
        email: auth.currentUser.email || '',
        displayName: auth.currentUser.displayName || null,
        photoUrl: auth.currentUser.photoURL || null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      currentUser.value = userData;
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
    if (!auth.currentUser) {
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Use the DataConnect connector to fetch user profiles
      try {
        const { data } = await getUserProfiles();

        if (data && Array.isArray(data)) {
          // Convert the data to our LocalProfile type
          // Use type assertion to handle the connector data
          const profiles: LocalProfile[] = data.map(profile => ({
            id: (profile as any).id,
            userId: (profile as any).userId,
            name: (profile as any).name,
            bio: (profile as any).bio || null,
            avatarUrl: (profile as any).avatarUrl,
            skills: (profile as any).skills || null,
            interests: (profile as any).interests || null,
            isDefault: (profile as any).isDefault,
            createdAt: new Date((profile as any).createdAt),
            updatedAt: new Date((profile as any).updatedAt)
          }));

          currentUserProfiles.value = profiles;
          return profiles;
        }
      } catch (connectorErr) {
        console.error('Error using connector for profiles:', connectorErr);
        // Continue to fallback
      }

      // Fallback if DataConnect query fails or returns no data
      const profiles: LocalProfile[] = [{
        id: '1',
        userId: auth.currentUser.uid,
        name: 'Default Profile',
        bio: null,
        avatarUrl: null,
        skills: null,
        interests: null,
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }];

      currentUserProfiles.value = profiles;
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
    if (!auth.currentUser) {
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Use the DataConnect connector to fetch user workspaces
      try {
        const { data } = await getUserWorkspaces();

        if (data && Array.isArray(data)) {
          // Convert the data to our Workspace type
          // First get the workspaceIds from the workspace members
          const workspaceIds = data.map((member: any) => member.workspaceId);

          // Then fetch each workspace by ID
          const workspaces: LocalWorkspace[] = [];

          for (const workspaceId of workspaceIds) {
            try {
              // This is a simplified approach - in a real implementation,
              // we would batch these requests or use a more efficient query
              const response = await fetch(`/api/workspaces/${workspaceId}`);
              if (response.ok) {
                const workspaceData = await response.json();
                workspaces.push({
                  id: workspaceData.id,
                  name: workspaceData.name,
                  description: workspaceData.description || null,
                  logoUrl: workspaceData.logoUrl || null,
                  createdBy: workspaceData.createdBy,
                  createdAt: new Date(workspaceData.createdAt),
                  updatedAt: new Date(workspaceData.updatedAt)
                });
              }
            } catch (fetchErr) {
              console.error(`Error fetching workspace ${workspaceId}:`, fetchErr);
            }
          }

          currentUserWorkspaces.value = workspaces;
          return workspaces;
        }
      } catch (connectorErr) {
        console.error('Error using connector for workspaces:', connectorErr);
        // Continue to fallback
      }

      // Fallback if DataConnect query fails or returns no data
      const workspaces: LocalWorkspace[] = [];
      currentUserWorkspaces.value = workspaces;
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
    if (!auth.currentUser) {
      error.value = 'You must be logged in to create a workspace';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Use the DataConnect connector to create a workspace
      if (!dataConnect) {
        throw new Error('DataConnect is not initialized');
      }

      console.log('Creating workspace with DataConnect:', {
        name: data.name,
        description: data.description,
        logoUrl: data.logo_url
      });

      try {
        const { data: workspaceData } = await createWorkspaceConnector(dataConnect, {
          name: data.name,
          description: data.description,
          logoUrl: data.logo_url
        });

        console.log('Workspace created successfully:', workspaceData);

        if (workspaceData) {
          // Refresh workspaces after creation
          await fetchUserWorkspaces();
          return workspaceData;
        }
      } catch (connectorErr) {
        console.error('DataConnect error creating workspace:', connectorErr);
        // Continue to fallback
      }

      // Fallback if DataConnect mutation fails
      console.log('Using fallback for workspace creation');
      const workspace: LocalWorkspace = {
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description || null,
        logoUrl: data.logo_url || null,
        createdBy: auth.currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Add to current user workspaces
      currentUserWorkspaces.value = [...currentUserWorkspaces.value, workspace];
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
    if (!auth.currentUser) {
      error.value = 'You must be logged in to create a profile';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Use the DataConnect connector to create a profile
      if (!dataConnect) {
        throw new Error('DataConnect is not initialized');
      }

      console.log('Creating profile with DataConnect:', {
        name: data.name,
        bio: data.bio,
        avatarUrl: data.avatar_url,
        skills: data.skills,
        interests: data.interests,
        isDefault: data.is_default
      });

      try {
        const { data: profileData } = await createProfileConnector(dataConnect, {
          name: data.name,
          bio: data.bio,
          avatarUrl: data.avatar_url,
          skills: data.skills,
          interests: data.interests,
          isDefault: data.is_default
        });

        console.log('Profile created successfully:', profileData);

        if (profileData) {
          // Refresh profiles after creation
          await fetchUserProfiles();
          return profileData;
        }
      } catch (connectorErr) {
        console.error('DataConnect error creating profile:', connectorErr);
        // Continue to fallback
      }

      // Fallback if DataConnect mutation fails
      console.log('Using fallback for profile creation');
      const profile: LocalProfile = {
        id: crypto.randomUUID(),
        userId: auth.currentUser.uid,
        name: data.name,
        bio: data.bio || null,
        avatarUrl: data.avatar_url || null,
        skills: data.skills || null,
        interests: data.interests || null,
        isDefault: data.is_default || false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Add to current user profiles
      currentUserProfiles.value = [...currentUserProfiles.value, profile];
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
    if (!auth.currentUser) {
      error.value = 'You must be logged in to invite users';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // In a real implementation, this would be a DataConnect mutation
      // For now, we'll simulate the response
      const invitation: LocalWorkspaceInvitation = {
        id: crypto.randomUUID(),
        workspaceId: data.workspace_id,
        email: data.email,
        role: data.role,
        invitedBy: auth.currentUser.uid,
        status: 'pending',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
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

    // Fetch user data from DataConnect
    const user = await fetchCurrentUser();
    const profiles = await fetchUserProfiles();
    const workspaces = await fetchUserWorkspaces();

    // If user doesn't have any workspaces, create a default one
    if (workspaces.length === 0) {
      console.log('No workspaces found, creating default workspace');
      const userName = user?.displayName || profiles[0]?.name || 'My';
      await createWorkspace({
        name: `${userName}'s Workspace`,
        description: 'Default workspace'
      });

      // Refresh workspaces list
      await fetchUserWorkspaces();
    }

    return {
      user,
      profiles,
      workspaces: currentUserWorkspaces.value
    };
  };

  // Create a default workspace for the user
  const createDefaultWorkspace = async (userName: string = 'My') => {
    try {
      return await createWorkspace({
        name: `${userName}'s Workspace`,
        description: 'Default workspace'
      });
    } catch (err) {
      console.error('Failed to create default workspace:', err);
      return null;
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
    initUserData
  };
};
