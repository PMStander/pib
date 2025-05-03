import { useFirebase } from './useFirebase';
import { useAppState } from './useAppState';
import { ref, computed } from 'vue';
import type {
  User,
  Profile,
  Workspace
} from '~/types/dataconnect';

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
      const response = await $fetch('/api/data/read', {
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
        // User doesn't exist, create a new record
        const userData: User = {
          id: auth.currentUser.uid,
          email: auth.currentUser.email || '',
          displayName: auth.currentUser.displayName || null,
          photoUrl: auth.currentUser.photoURL || null,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // Create the user document via server API
        const createResponse = await $fetch('/api/data/write', {
          method: 'POST',
          body: {
            collection: 'users',
            data: {
              ...userData,
              id: auth.currentUser.uid,
              created_at: new Date(),
              updated_at: new Date()
            }
          }
        });

        if (createResponse?.data) {
          const userData = createResponse.data as any;

          const createdUser: User = {
            id: userData.id,
            email: userData.email,
            displayName: userData.display_name || userData.displayName,
            photoUrl: userData.photo_url || userData.photoUrl,
            createdAt: userData.created_at ? new Date(userData.created_at) :
                      userData.createdAt ? new Date(userData.createdAt) : new Date(),
            updatedAt: userData.updated_at ? new Date(userData.updated_at) :
                      userData.updatedAt ? new Date(userData.updatedAt) : new Date()
          };

          appState.setCurrentUser(createdUser);
          return createdUser;
        }

        // Fallback to local data if server API fails
        appState.setCurrentUser(userData);
        return userData;
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
      const response = await $fetch('/api/data/read', {
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
        const createResponse = await $fetch('/api/data/write', {
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
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // First, get workspace members for the current user via server API
      const membersResponse = await $fetch('/api/data/read', {
        method: 'POST',
        body: {
          collection: 'workspaceMembers',
          filters: {
            userId: auth.currentUser.uid
          }
        }
      });

      if (membersResponse?.data && Array.isArray(membersResponse.data) && membersResponse.data.length > 0) {
        // Get all workspace IDs the user is a member of
        const workspaceIds = membersResponse.data.map((member: any) => member.workspace_id || member.workspaceId);

        // Fetch all these workspaces
        const workspaces: Workspace[] = [];

        // Get workspaces by IDs
        for (const workspaceId of workspaceIds) {
          const workspaceResponse = await $fetch('/api/data/read', {
            method: 'POST',
            body: {
              collection: 'workspaces',
              id: workspaceId
            }
          });

          if (workspaceResponse?.data) {
            const data = workspaceResponse.data as any;
            workspaces.push({
              id: data.id,
              name: data.name,
              description: data.description || null,
              logoUrl: data.logo_url || data.logoUrl || null,
              createdBy: data.created_by || data.createdBy,
              createdAt: data.created_at ? new Date(data.created_at) :
                        data.createdAt ? new Date(data.createdAt) : new Date(),
              updatedAt: data.updated_at ? new Date(data.updated_at) :
                        data.updatedAt ? new Date(data.updatedAt) : new Date()
            });
          }
        }

        console.log('Processed workspaces:', workspaces);
        appState.setUserWorkspaces(workspaces);
        return workspaces;
      } else {
        // No workspaces found
        const workspaces: Workspace[] = [];
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
      error.value = 'You must be logged in to create a workspace';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Create workspace data
      const workspaceId = crypto.randomUUID();
      const workspace: Workspace = {
        id: workspaceId,
        name: data.name,
        description: data.description || null,
        logoUrl: data.logo_url || null,
        createdBy: auth.currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Create the workspace document via server API
      const workspaceResponse = await $fetch('/api/data/write', {
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

      console.log('Workspace created successfully:', workspaceResponse?.data);

      // Create workspace member relationship
      const membershipId = crypto.randomUUID();

      // Create the workspace member document via server API
      const membershipResponse = await $fetch('/api/data/write', {
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

      console.log('User linked to workspace successfully:', membershipResponse?.data);

      // Refresh workspaces after creation
      await fetchUserWorkspaces();
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
      const profileResponse = await $fetch('/api/data/write', {
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
        const profilesResponse = await $fetch('/api/data/read', {
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
              await $fetch('/api/data/update', {
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
      const invitationResponse = await $fetch('/api/data/write', {
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
      const userResponse = await $fetch('/api/data/read', {
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
      const createResponse = await $fetch('/api/data/write', {
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

    // Ensure the user record exists in Firestore
    const userExists = await ensureUserExists();
    if (!userExists) {
      console.error('Could not ensure user exists in Firestore, aborting initialization');
      return;
    }

    console.log('User record confirmed in Firestore, proceeding with initialization');

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
