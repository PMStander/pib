import { useFirebase } from './useFirebase';
import { useAppState } from './useAppState';
import { ref, computed } from 'vue';
import type {
  User,
  Profile,
  Workspace
} from '~/types/dataconnect';

// Define API response types
interface ApiResponse<T> {
  statusCode: number;
  data?: T;
}

export const useFirestore = () => {
  // Get Firebase instance
  const { auth } = useFirebase();

  // Get app state
  const appState = useAppState();

  // Local state
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Use computed properties to access app state
  const currentUser = computed(() => appState.currentUser.value);
  const currentUserProfiles = computed(() => appState.userProfiles.value);
  const currentUserWorkspaces = computed(() => appState.userWorkspaces.value);

  // Get current user data
  const fetchCurrentUser = async () => {
    if (!auth.currentUser) {
      appState.setCurrentUser(null);
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Get user document from server API
      const response = await $fetch<ApiResponse<any>>('/api/data/read', {
        method: 'POST',
        body: {
          collection: 'users',
          id: auth.currentUser.uid
        }
      });

      if (response?.data) {
        // Convert the data to our User type
        const userData = response.data as any;

        // Ensure dates are properly converted
        const user: User = {
          id: userData.id,
          email: userData.email,
          displayName: userData.display_name || userData.displayName,
          photoUrl: userData.photo_url || userData.photoUrl,
          createdAt: userData.created_at ? new Date(userData.created_at) :
                    userData.createdAt ? new Date(userData.createdAt) : new Date(),
          updatedAt: userData.updated_at ? new Date(userData.updated_at) :
                    userData.updatedAt ? new Date(userData.updatedAt) : new Date()
        };

        appState.setCurrentUser(user);
        return user;
      } else {
        // User doesn't exist in the database
        console.log('User not found in database during fetchCurrentUser');

        // Create a temporary user object from Firebase Auth data
        // but don't save it to the database (that's handled by ensureUserExists)
        const tempUserData: User = {
          id: auth.currentUser.uid,
          email: auth.currentUser.email || '',
          displayName: auth.currentUser.displayName || 'User',
          photoUrl: auth.currentUser.photoURL || null,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // Set the temporary user in app state
        appState.setCurrentUser(tempUserData);
        return tempUserData;
      }
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

      // Query profiles for the current user via server API
      const response = await $fetch<ApiResponse<any[]>>('/api/data/read', {
        method: 'POST',
        body: {
          collection: 'profiles',
          filters: {
            userId: auth.currentUser.uid
          }
        }
      });

      if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
        // Convert the data to our Profile type
        const profiles: Profile[] = response.data.map((profile: any) => {
          return {
            id: profile.id,
            userId: profile.user_id || profile.userId,
            name: profile.name,
            bio: profile.bio || null,
            avatarUrl: profile.avatar_url || profile.avatarUrl || null,
            skills: profile.skills || null,
            interests: profile.interests || null,
            isDefault: profile.is_default || profile.isDefault || false,
            createdAt: profile.created_at ? new Date(profile.created_at) :
                      profile.createdAt ? new Date(profile.createdAt) : new Date(),
            updatedAt: profile.updated_at ? new Date(profile.updated_at) :
                      profile.updatedAt ? new Date(profile.updatedAt) : new Date()
          };
        });

        appState.setUserProfiles(profiles);
        return profiles;
      } else {
        // No profiles found, create a default one
        const defaultProfile: Profile = {
          id: crypto.randomUUID(),
          userId: auth.currentUser.uid,
          name: auth.currentUser.displayName || 'Default Profile',
          bio: null,
          avatarUrl: null,
          skills: null,
          interests: null,
          isDefault: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // Create the profile document via server API
        const createResponse = await $fetch<ApiResponse<any>>('/api/data/write', {
          method: 'POST',
          body: {
            collection: 'profiles',
            data: {
              ...defaultProfile,
              id: defaultProfile.id,
              user_id: auth.currentUser.uid, // Use snake_case for server API
              is_default: true,
              created_at: new Date(),
              updated_at: new Date()
            },
            embed: ['name', 'bio'] // Embed name and bio for vector search
          }
        });

        if (createResponse?.data) {
          const profileData = createResponse.data as any;

          const createdProfile: Profile = {
            id: profileData.id || defaultProfile.id,
            userId: profileData.user_id || profileData.userId || defaultProfile.userId,
            name: profileData.name || defaultProfile.name,
            bio: profileData.bio || defaultProfile.bio,
            avatarUrl: profileData.avatar_url || profileData.avatarUrl || defaultProfile.avatarUrl,
            skills: profileData.skills || defaultProfile.skills,
            interests: profileData.interests || defaultProfile.interests,
            isDefault: profileData.is_default || profileData.isDefault || defaultProfile.isDefault,
            createdAt: profileData.created_at ? new Date(profileData.created_at) :
                      profileData.createdAt ? new Date(profileData.createdAt) : defaultProfile.createdAt,
            updatedAt: profileData.updated_at ? new Date(profileData.updated_at) :
                      profileData.updatedAt ? new Date(profileData.updatedAt) : defaultProfile.updatedAt
          };

          appState.setUserProfiles([createdProfile]);
          return [createdProfile];
        }

        // Fallback to local data if server API fails
        appState.setUserProfiles([defaultProfile]);
        return [defaultProfile];
      }
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
      console.log('useFirestore - fetchUserWorkspaces: No authenticated user');
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      console.log('useFirestore - fetchUserWorkspaces: Fetching workspaces for user:', auth.currentUser.uid);

      // First, get workspace members for the current user via server API
      console.log('useFirestore - fetchUserWorkspaces: Fetching workspace memberships');
      const membersResponse = await $fetch<ApiResponse<any[]>>('/api/data/read', {
        method: 'POST',
        body: {
          collection: 'workspaceMembers',
          filters: {
            userId: auth.currentUser.uid
          }
        }
      });

      console.log('useFirestore - fetchUserWorkspaces: Membership response:', membersResponse);

      if (membersResponse?.data && Array.isArray(membersResponse.data) && membersResponse.data.length > 0) {
        // Get all workspace IDs the user is a member of
        const workspaceIds = membersResponse.data.map((member: any) => member.workspace_id || member.workspaceId);
        console.log('useFirestore - fetchUserWorkspaces: Found workspace IDs:', workspaceIds);

        // Fetch all these workspaces
        const workspaces: Workspace[] = [];

        // Get workspaces by IDs
        for (const workspaceId of workspaceIds) {
          console.log('useFirestore - fetchUserWorkspaces: Fetching workspace details for ID:', workspaceId);
          const workspaceResponse = await $fetch<ApiResponse<any>>('/api/data/read', {
            method: 'POST',
            body: {
              collection: 'workspaces',
              id: workspaceId
            }
          });

          console.log('useFirestore - fetchUserWorkspaces: Workspace response for ID', workspaceId, ':', workspaceResponse);

          if (workspaceResponse?.data) {
            const data = workspaceResponse.data as any;
            const workspace = {
              id: data.id,
              name: data.name,
              description: data.description || null,
              logoUrl: data.logo_url || data.logoUrl || null,
              createdBy: data.created_by || data.createdBy,
              createdAt: data.created_at ? new Date(data.created_at) :
                        data.createdAt ? new Date(data.createdAt) : new Date(),
              updatedAt: data.updated_at ? new Date(data.updated_at) :
                        data.updatedAt ? new Date(data.updatedAt) : new Date()
            };
            console.log('useFirestore - fetchUserWorkspaces: Processed workspace:', workspace);
            workspaces.push(workspace);
          } else {
            console.log('useFirestore - fetchUserWorkspaces: No data found for workspace ID:', workspaceId);
          }
        }

        console.log('useFirestore - fetchUserWorkspaces: All processed workspaces:', workspaces);
        console.log('useFirestore - fetchUserWorkspaces: Setting workspaces in app state');
        appState.setUserWorkspaces(workspaces);
        return workspaces;
      } else {
        // No workspaces found
        console.log('useFirestore - fetchUserWorkspaces: No workspace memberships found for user');
        const workspaces: Workspace[] = [];
        console.log('useFirestore - fetchUserWorkspaces: Setting empty workspaces array in app state');
        appState.setUserWorkspaces(workspaces);
        return workspaces;
      }
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
      console.error('Cannot create workspace: No authenticated user');
      error.value = 'You must be logged in to create a workspace';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      console.log('useFirestore - Creating workspace with data:', data);

      // Create workspace data with a UUID
      const workspaceId = crypto.randomUUID();
      console.log('useFirestore - Generated workspace ID:', workspaceId);

      const workspace: Workspace = {
        id: workspaceId,
        name: data.name,
        description: data.description || null,
        logoUrl: data.logo_url || null,
        createdBy: auth.currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      console.log('useFirestore - Prepared workspace object:', workspace);

      // Create the workspace document via server API
      console.log('useFirestore - Sending workspace creation request to server API');
      const workspaceResponse = await $fetch<ApiResponse<any>>('/api/data/write', {
        method: 'POST',
        body: {
          collection: 'workspaces',
          data: {
            id: workspaceId,
            name: data.name,
            description: data.description || null,
            logo_url: data.logo_url || null, // Use snake_case for server API
            created_by: auth.currentUser.uid,
            created_at: new Date(),
            updated_at: new Date()
          },
          embed: ['name', 'description'] // Embed name and description for vector search
        }
      });

      console.log('useFirestore - Workspace created successfully:', workspaceResponse?.data);

      // Create workspace member relationship
      const membershipId = crypto.randomUUID();
      console.log('useFirestore - Generated membership ID:', membershipId);

      // Create the workspace member document via server API
      console.log('useFirestore - Creating workspace membership for user:', auth.currentUser.uid);
      const membershipResponse = await $fetch<ApiResponse<any>>('/api/data/write', {
        method: 'POST',
        body: {
          collection: 'workspaceMembers',
          data: {
            id: membershipId,
            workspace_id: workspaceId, // Use snake_case for server API
            user_id: auth.currentUser.uid,
            profile_id: null,
            role: 'owner',
            joined_at: new Date()
          }
        }
      });

      console.log('useFirestore - User linked to workspace successfully:', membershipResponse?.data);

      // Refresh workspaces after creation
      console.log('useFirestore - Refreshing workspaces list after creation');
      const updatedWorkspaces = await fetchUserWorkspaces();
      console.log('useFirestore - Updated workspaces after creation:', updatedWorkspaces);

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
  const createProfile = async (data: {
    name: string;
    bio?: string;
    avatar_url?: string;
    skills?: string[];
    interests?: string[];
    is_default?: boolean
  }) => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to create a profile';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Create profile data
      const profileId = crypto.randomUUID();
      const profile: Profile = {
        id: profileId,
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

      // Create the profile document via server API
      const profileResponse = await $fetch<ApiResponse<any>>('/api/data/write', {
        method: 'POST',
        body: {
          collection: 'profiles',
          data: {
            id: profileId,
            user_id: auth.currentUser.uid, // Use snake_case for server API
            name: data.name,
            bio: data.bio || null,
            avatar_url: data.avatar_url || null,
            skills: data.skills || null,
            interests: data.interests || null,
            is_default: data.is_default || false,
            created_at: new Date(),
            updated_at: new Date()
          },
          embed: ['name', 'bio', 'skills', 'interests'] // Embed relevant fields for vector search
        }
      });

      console.log('Profile created successfully:', profileResponse?.data);

      // If this is the default profile, update other profiles to not be default
      if (profile.isDefault) {
        // Get all profiles for the current user
        const profilesResponse = await $fetch<ApiResponse<any[]>>('/api/data/read', {
          method: 'POST',
          body: {
            collection: 'profiles',
            filters: {
              user_id: auth.currentUser.uid,
              is_default: true
            }
          }
        });

        if (profilesResponse?.data && Array.isArray(profilesResponse.data)) {
          // Update each profile that is not the newly created one
          for (const otherProfile of profilesResponse.data) {
            if (otherProfile.id !== profileId) {
              await $fetch<ApiResponse<any>>('/api/data/update', {
                method: 'POST',
                body: {
                  collection: 'profiles',
                  id: otherProfile.id,
                  data: {
                    is_default: false,
                    updated_at: new Date()
                  }
                }
              });
            }
          }
        }
      }

      // Refresh profiles after creation
      await fetchUserProfiles();
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
  const inviteToWorkspace = async (data: {
    workspace_id: string;
    email: string;
    role: 'admin' | 'member' | 'guest'
  }) => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to invite users';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Create invitation data
      const invitationId = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

      // Create the invitation via server API
      const invitationResponse = await $fetch<ApiResponse<any>>('/api/data/write', {
        method: 'POST',
        body: {
          collection: 'workspaceInvitations',
          data: {
            id: invitationId,
            workspace_id: data.workspace_id,
            email: data.email,
            role: data.role,
            invited_by: auth.currentUser.uid,
            status: 'pending',
            created_at: new Date(),
            expires_at: expiresAt
          }
        }
      });

      if (invitationResponse?.data) {
        return {
          id: invitationId,
          workspaceId: data.workspace_id,
          email: data.email,
          role: data.role,
          invitedBy: auth.currentUser.uid,
          status: 'pending',
          createdAt: new Date(),
          expiresAt: expiresAt
        };
      }

      return null;
    } catch (err: any) {
      error.value = err.message || 'Failed to invite user';
      console.error('Error inviting user:', err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Ensure user record exists in Firestore
  const ensureUserExists = async () => {
    if (!auth.currentUser) return false;

    try {
      // Check if the user already exists via server API
      const userResponse = await $fetch<ApiResponse<any>>('/api/data/read', {
        method: 'POST',
        body: {
          collection: 'users',
          id: auth.currentUser.uid
        }
      });

      if (userResponse?.data) {
        console.log('User record already exists in database');
        return true;
      }

      // If not, create the user record
      console.log('Creating user record in database...');

      // Ensure displayName is never empty/null
      const displayName = auth.currentUser.displayName || 'User';

      // Create the user via server API
      const createResponse = await $fetch<ApiResponse<any>>('/api/data/write', {
        method: 'POST',
        body: {
          collection: 'users',
          data: {
            id: auth.currentUser.uid,
            email: auth.currentUser.email || '',
            display_name: displayName, // Use snake_case for server API
            photo_url: auth.currentUser.photoURL || null,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
      });

      if (createResponse?.data) {
        console.log('User record created successfully in database');
        return true;
      }

      return false;
    } catch (err) {
      console.error('Error ensuring user exists in database:', err);
      return false;
    }
  };

  // Initialize user data after authentication
  const initUserData = async () => {
    if (!auth.currentUser) return;

    console.log('Initializing user data for:', auth.currentUser.email);

    // First, check if the user already exists by trying to fetch it
    console.log('Checking if user already exists in database...');
    try {
      const userResponse = await $fetch<ApiResponse<any>>('/api/data/read', {
        method: 'POST',
        body: {
          collection: 'users',
          id: auth.currentUser.uid
        }
      });

      // If user exists, we can skip the user creation step
      if (userResponse?.data) {
        console.log('User record already exists in database, skipping creation');
      } else {
        // User doesn't exist, create it
        console.log('User record not found, creating new user record');
        await ensureUserExists();
      }
    } catch (err) {
      console.error('Error checking if user exists:', err);
      // Continue with initialization even if this check fails
    }

    console.log('Proceeding with user data initialization');

    // Fetch user data from Firestore
    const user = await fetchCurrentUser();
    const profiles = await fetchUserProfiles();
    const workspaces = await fetchUserWorkspaces();

    // If user doesn't have any workspaces, create a default one
    if (workspaces.length === 0) {
      console.log('No workspaces found, creating default workspace');
      // Use a non-empty name for the workspace
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

  // Vector search implementation
  const vectorSearch = async (collection: string, query: string, limit: number = 5) => {
    try {
      isLoading.value = true;
      error.value = null;

      // Use the server API for vector search
      const response = await $fetch('/api/data/read', {
        method: 'POST',
        body: {
          collection: collection,
          vec: {
            query: query,
            field: 'embedding',
            dimensions: 768, // Standard dimension for text-embedding-005
            distance: 0.5    // Default distance threshold
          },
          limit: limit
        }
      });

      if (response?.data && Array.isArray(response.data)) {
        return response.data;
      }

      return [];
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
    ensureUserExists,
    createDefaultWorkspace,
    initUserData,
    vectorSearch
  };
};
