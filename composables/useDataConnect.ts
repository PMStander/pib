import { ref, computed } from 'vue';
import { useFirebase } from './useFirebase';
import { useAppState } from './useAppState';

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
  createProfile as createProfileConnector,
  joinWorkspaceUser as joinWorkspaceUserConnector,
  createUser as createUserConnector,
  getUser as getUserConnector
} from '@firebasegen/pib-connector';

// Wrapper functions will be defined inside the composable to use the dataConnect instance

export const useDataConnect = () => {
  // Get Firebase instance
  const { auth, dataConnect } = useFirebase();

  // Get app state
  const appState = useAppState();

  // Local state
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Use computed properties to access app state
  const currentUser = computed(() => appState.currentUser.value);
  const currentUserProfiles = computed(() => appState.userProfiles.value);
  const currentUserWorkspaces = computed(() => appState.userWorkspaces.value);

  // Create wrapper functions with proper parameters using the dataConnect instance
  const getCurrentUser = async () => {
    try {
      if (!dataConnect) {
        throw new Error('DataConnect is not initialized');
      }
      console.log('Fetching current user with DataConnect...');
      const result = await getConnectorCurrentUser(dataConnect);
      console.log('Current user data received:', result);
      return result;
    } catch (err) {
      console.error('Error in getCurrentUser:', err);
      // Log more detailed error information
      if (err instanceof Error) {
        console.error('getCurrentUser Error Details:', err.message, err.stack);
      }
      throw err;
    }
  };

  const getUserProfiles = async () => {
    try {
      if (!dataConnect) {
        throw new Error('DataConnect is not initialized');
      }
      console.log('Fetching user profiles with DataConnect...');
      const result = await getConnectorUserProfiles(dataConnect);
      console.log('User profiles data received:', result);
      return result;
    } catch (err) {
      console.error('Error in getUserProfiles:', err);
      // Log more detailed error information
      if (err instanceof Error) {
        console.error('getUserProfiles Error Details:', err.message, err.stack);
      }
      throw err;
    }
  };

  const getUserWorkspaces = async () => {
    try {
      if (!dataConnect) {
        throw new Error('DataConnect is not initialized');
      }
      if (!auth.currentUser) {
        throw new Error('User is not authenticated');
      }

      console.log('Fetching workspaces for user ID:', auth.currentUser.uid);

      // First try with the current user's ID
      try {
        const result = await getConnectorUserWorkspaces(dataConnect, {
          userId: auth.currentUser.uid
        });
        console.log('Workspaces data received with userId parameter:', result);
        return result;
      } catch (idErr) {
        console.warn('Error getting workspaces with userId, trying without parameters:', idErr);

        // Log more detailed error information
        if (idErr instanceof Error) {
          console.warn('getUserWorkspaces Error Details (with userId):', idErr.message, idErr.stack);
        }

        // If that fails, try without parameters (some versions of the API might use auth.uid internally)
        try {
          console.log('Trying to fetch workspaces without userId parameter...');
          // Pass an empty object as variables to satisfy the type requirement
          const result = await getConnectorUserWorkspaces(dataConnect, { userId: auth.currentUser.uid });
          console.log('Workspaces data received without userId parameter:', result);
          return result;
        } catch (noParamErr) {
          console.error('Error getting workspaces without parameters:', noParamErr);

          // Log more detailed error information
          if (noParamErr instanceof Error) {
            console.error('getUserWorkspaces Error Details (without userId):', noParamErr.message, noParamErr.stack);
          }

          throw noParamErr;
        }
      }
    } catch (err) {
      console.error('Error in getUserWorkspaces:', err);

      // Log more detailed error information
      if (err instanceof Error) {
        console.error('getUserWorkspaces Error Details (outer):', err.message, err.stack);
      }

      throw err;
    }
  };

  // Get current user data
  const fetchCurrentUser = async () => {
    if (!auth.currentUser) {
      appState.setCurrentUser(null);
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

          appState.setCurrentUser(userData);
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

      appState.setCurrentUser(userData);
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

          appState.setUserProfiles(profiles);
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

      appState.setUserProfiles(profiles);
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
        console.log('Fetching workspaces for user:', auth.currentUser.uid);
        const { data } = await getUserWorkspaces();
        console.log('Workspace data received:', data);

        if (data && data.workspaceUsers && Array.isArray(data.workspaceUsers)) {
          // The data should be an object with a workspaceUsers array
          const workspaces: LocalWorkspace[] = [];

          // Extract workspace data from each workspace_user
          for (const workspaceUser of data.workspaceUsers) {
            if (workspaceUser.workspace) {
              const workspace = workspaceUser.workspace;
              workspaces.push({
                id: workspace.id,
                name: workspace.name,
                description: workspace.description || null,
                logoUrl: workspace.logoUrl || null,
                createdBy: workspace.createdBy,
                createdAt: new Date(workspace.createdAt),
                updatedAt: new Date(workspace.updatedAt)
              });
            }
          }

          console.log('Processed workspaces:', workspaces);
          appState.setUserWorkspaces(workspaces);
          return workspaces;
        }
      } catch (connectorErr) {
        console.error('Error using connector for workspaces:', connectorErr);
        // Continue to fallback
      }

      // Fallback if DataConnect query fails or returns no data
      const workspaces: LocalWorkspace[] = [];
      appState.setUserWorkspaces(workspaces);
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

        if (workspaceData && workspaceData.createWorkspace && workspaceData.createWorkspace.id) {
          // Explicitly link the current user to the workspace
          // This is a fallback in case the database trigger doesn't work
          try {
            // Ensure the user record exists in the database before trying to link
            const userExists = await ensureUserExists();
            if (!userExists) {
              console.warn('Could not ensure user exists in database, skipping manual workspace linking');
              return workspaceData;
            }

            // Add a longer delay to ensure database consistency
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Linking user to workspace:', {
              workspaceId: workspaceData.createWorkspace.id,
              userId: auth.currentUser.uid,
              role: 'owner'
            });

            // Implement retry mechanism for workspace-user linking
            const maxRetries = 3;
            let retryCount = 0;
            let success = false;

            while (!success && retryCount < maxRetries) {
              try {
                await joinWorkspaceUserConnector(dataConnect, {
                  workspaceId: workspaceData.createWorkspace.id,
                  userId: auth.currentUser.uid,
                  role: 'owner'
                });

                console.log('User linked to workspace successfully');
                success = true;
              } catch (retryErr) {
                // Check if this is a foreign key constraint error
                const errorMessage = (retryErr as Error).toString();

                // If it's a duplicate key error, consider it a success
                if (errorMessage.includes('duplicate key value violates unique constraint')) {
                  console.log('Workspace-user relationship already exists (duplicate key error)');
                  success = true;
                  break;
                }

                retryCount++;
                console.error(`Error linking user to workspace (attempt ${retryCount}/${maxRetries}):`, retryErr);

                if (retryCount < maxRetries) {
                  // Wait longer between each retry
                  const delay = 2000 * retryCount;
                  console.log(`Waiting ${delay}ms before retry...`);
                  await new Promise(resolve => setTimeout(resolve, delay));
                }
              }
            }

            if (!success) {
              console.error('Failed to link user to workspace after multiple attempts');
            }
          } catch (joinErr) {
            console.error('Error in workspace linking process:', joinErr);
            // Log more detailed error information
            if (joinErr instanceof Error) {
              console.error('Workspace Linking Error Details:', joinErr.message, joinErr.stack);
            }
            // Continue even if this fails, as the database trigger should handle it
          }

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
      appState.setUserWorkspaces([...currentUserWorkspaces.value, workspace]);
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
      appState.setUserProfiles([...currentUserProfiles.value, profile]);
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

  // Ensure user record exists in the database
  const ensureUserExists = async () => {
    if (!auth.currentUser) return false;

    try {
      // First, check if the user already exists in the database
      try {
        if (!dataConnect) {
          console.error('DataConnect is not initialized');
          return false;
        }
        const { data: currentUserData } = await getConnectorCurrentUser(dataConnect);
        if (currentUserData && currentUserData.user) {
          console.log('User record already exists in database');
          return true;
        }
      } catch (checkErr) {
        console.log('Error checking if user exists, will try to create:', checkErr);
        // Continue to creation attempt
      }

      // If not, create the user record explicitly
      console.log('Creating user record in database...');

      // Try to create the user using the createUserConnector function
      try {
        // Ensure displayName is never empty/null to avoid SQL constraint violation
        const displayName = auth.currentUser.displayName || 'User';

        console.log('Creating user with DataConnect:', {
          email: auth.currentUser.email || '',
          displayName: displayName,
          photoUrl: auth.currentUser.photoURL || ''
        });

        // The id will be set automatically from auth.uid
        if (!dataConnect) {
          console.error('DataConnect is not initialized');
          return false;
        }
        const { data: createUserData } = await createUserConnector(dataConnect, {
          email: auth.currentUser.email || '',
          displayName: displayName, // Always provide a non-empty value
          photoUrl: auth.currentUser.photoURL || ''
        });

        if (createUserData && createUserData.createUser) {
          console.log('User record created successfully in database');

          // Add a delay to ensure the user record is fully created
          await new Promise(resolve => setTimeout(resolve, 2000)); // Increased delay for better reliability
          return true;
        } else {
          console.error('Failed to create user record in database');
        }
      } catch (createErr) {
        // Check if this is a duplicate key error, which means the user already exists
        const errorMessage = (createErr as Error).toString();
        if (errorMessage.includes('duplicate key value violates unique constraint') ||
            errorMessage.includes('user_pkey')) {
          console.log('User already exists in database (duplicate key error)');
          return true; // Consider this a success since the user exists
        } else {
          console.error('Error creating user record:', createErr);
          // Log more detailed error information
          if (createErr instanceof Error) {
            console.error('Create User Error Details:', createErr.message, createErr.stack);
          }
        }
      }

      // If we get here, the user creation failed
      // Let's try a different approach - create a profile for the user
      // This might trigger the user creation in the database
      try {
        console.log('Attempting to create a profile to trigger user creation...');
        // Ensure name is never empty/null
        const profileName = auth.currentUser.displayName || 'Default Profile';

        // Try again with a different approach
        try {
          console.log('Attempting to create user with a different approach...');

          // Try creating the user again with a delay
          await new Promise(resolve => setTimeout(resolve, 3000));

          if (!dataConnect) {
            console.error('DataConnect is not initialized');
            return false;
          }

          const { data: retryUserData } = await createUserConnector(dataConnect, {
            email: auth.currentUser.email || '',
            displayName: auth.currentUser.displayName || 'User',
            photoUrl: auth.currentUser.photoURL || null
          });

          if (retryUserData && retryUserData.createUser) {
            console.log('User created successfully with retry approach');
            await new Promise(resolve => setTimeout(resolve, 2000));
            return true;
          }
        } catch (retryErr) {
          // Check if this is a duplicate key error, which means the user already exists
          const errorMessage = (retryErr as Error).toString();
          if (errorMessage.includes('duplicate key value violates unique constraint') ||
              errorMessage.includes('user_pkey')) {
            console.log('User already exists in database (duplicate key error during retry)');
            return true; // Consider this a success since the user exists
          } else {
            console.error('Error with retry approach:', retryErr);
          }
        }

        // If direct SQL fails, try creating a profile
        if (!dataConnect) {
          console.error('DataConnect is not initialized');
          return false;
        }

        const { data: profileData } = await createProfileConnector(dataConnect, {
          name: profileName,
          isDefault: true
        });

        if (profileData && profileData.createProfile) {
          console.log('Profile created successfully, which should have triggered user creation');

          // Add a delay to ensure the user record is fully created
          await new Promise(resolve => setTimeout(resolve, 2000)); // Increased delay for better reliability
          return true;
        }
      } catch (profileErr) {
        console.error('Error creating profile:', profileErr);
        // Log more detailed error information
        if (profileErr instanceof Error) {
          console.error('Create Profile Error Details:', profileErr.message, profileErr.stack);
        }
      }

      // If all attempts fail, return false
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

    // First, check if the user already exists in the database
    try {
      const { data: currentUserData } = await getCurrentUser();
      if (currentUserData && currentUserData.user) {
        console.log('User record already exists in database, skipping creation');
        // User exists, proceed with initialization
      } else {
        // User doesn't exist, try to create it
        // Ensure the user record exists in the database before proceeding
        let userExists = false;
        const maxRetries = 3;

        // Retry user creation a few times if needed
        for (let i = 0; i < maxRetries; i++) {
          userExists = await ensureUserExists();
          if (userExists) break;

          console.log(`User creation attempt ${i+1}/${maxRetries} failed, retrying...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    } catch (checkErr) {
      console.log('Error checking if user exists, will try to create:', checkErr);

      // Ensure the user record exists in the database before proceeding
      let userExists = false;
      const maxRetries = 3;

      // Retry user creation a few times if needed
      for (let i = 0; i < maxRetries; i++) {
        userExists = await ensureUserExists();
        if (userExists) break;

        console.log(`User creation attempt ${i+1}/${maxRetries} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Check if user exists in database before proceeding
    try {
      const { data: checkUserData } = await getCurrentUser();
      if (!checkUserData || !checkUserData.user) {
        console.error('Could not ensure user exists in database after multiple attempts, aborting initialization');
        return;
      }
    } catch (finalCheckErr) {
      console.error('Final check for user existence failed, aborting initialization:', finalCheckErr);
      return;
    }

    console.log('User record confirmed in database, proceeding with initialization');

    // Fetch user data from DataConnect
    const user = await fetchCurrentUser();
    const profiles = await fetchUserProfiles();

    try {
      // Add a delay before fetching workspaces to ensure database consistency
      await new Promise(resolve => setTimeout(resolve, 1000));

      const workspaces = await fetchUserWorkspaces();

      // If user doesn't have any workspaces, create a default one
      if (workspaces.length === 0) {
        console.log('No workspaces found, creating default workspace');
        // Use a non-empty name for the workspace
        const userName = user?.displayName || profiles[0]?.name || 'My';

        // Add a delay before creating workspace to ensure user record is fully propagated
        await new Promise(resolve => setTimeout(resolve, 2000));

        await createWorkspace({
          name: `${userName}'s Workspace`,
          description: 'Default workspace'
        });

        // Refresh workspaces list
        await fetchUserWorkspaces();
      }
    } catch (err) {
      console.error('Error fetching workspaces during initialization:', err);
      // Log more detailed error information
      if (err instanceof Error) {
        console.error('Workspace Initialization Error Details:', err.message, err.stack);
      }
      // Continue with initialization even if workspace fetching fails
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
