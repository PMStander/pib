import { useFirebaseAuth } from './useFirebaseAuth';
import { useAppState } from './useAppState';
import { useFirebase } from './useFirebase';

export const useSessionServer = () => {
  const { user } = useFirebaseAuth();
  const appState = useAppState();

  // Set server-side session
  const setSessionServer = async () => {
    try {
      if (!user.value) {
        console.error('Cannot set server session: No authenticated user');
        return false;
      }

      // Get the current user's Firebase ID token
      const { auth } = useFirebase();
      const idToken = await auth.currentUser?.getIdToken(true);

      if (!idToken) {
        console.error('Cannot set server session: Failed to get ID token');
        return false;
      }

      // Prepare session data
      const sessionData = {
        user: {
          id: user.value.uid,
          email: user.value.email,
          username: user.value.displayName || 'User',
          token: {
            idToken
          }
        },
        currentWorkspace: appState.userWorkspaces.value[0] || null,
        currentProfile: appState.userProfiles.value[0] || null,
        workspaces: appState.userWorkspaces.value,
        isAuthenticated: true,
        id: user.value.uid
      };
console.log('---------------->', sessionData);
      // Send session data to server
      const response = await $fetch('/api/auth/set', {
        method: 'POST',
        body: sessionData
      });

      console.log('Server session set successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to set server session:', error);
      return false;
    }
  };

  // Clear server-side session
  const clearSessionServer = async () => {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST'
      });
      console.log('Server session cleared successfully');
      return true;
    } catch (error) {
      console.error('Failed to clear server session:', error);
      return false;
    }
  };

  return {
    setSessionServer,
    clearSessionServer
  };
};
