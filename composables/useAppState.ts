import { useState } from '#app';
import type { User } from 'firebase/auth';
import type { LocalUser, LocalProfile, LocalWorkspace } from '~/types/dataconnect';

/**
 * Composable for managing global application state
 * Uses Nuxt's useState for server/client shared state
 */
export const useAppState = () => {
  // Firebase auth user
  const authUser = useState<User | null>('auth-user', () => null);
  
  // DataConnect user data
  const currentUser = useState<LocalUser | null>('current-user', () => null);
  const userProfiles = useState<LocalProfile[]>('user-profiles', () => []);
  const userWorkspaces = useState<LocalWorkspace[]>('user-workspaces', () => []);
  
  // UI state
  const isLoading = useState<boolean>('is-loading', () => false);
  const isDarkMode = useState<boolean>('is-dark-mode', () => false);
  
  // Error state
  const error = useState<string | null>('error', () => null);

  // Helper functions
  const setAuthUser = (user: User | null) => {
    authUser.value = user;
  };

  const setCurrentUser = (user: LocalUser | null) => {
    currentUser.value = user;
  };

  const setUserProfiles = (profiles: LocalProfile[]) => {
    userProfiles.value = profiles;
  };

  const setUserWorkspaces = (workspaces: LocalWorkspace[]) => {
    console.log('useAppState - Setting user workspaces:', workspaces);
    userWorkspaces.value = workspaces;
  };

  const setIsLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  const setIsDarkMode = (darkMode: boolean) => {
    isDarkMode.value = darkMode;
  };

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage;
  };

  const clearUserData = () => {
    currentUser.value = null;
    userProfiles.value = [];
    userWorkspaces.value = [];
  };

  return {
    // State
    authUser,
    currentUser,
    userProfiles,
    userWorkspaces,
    isLoading,
    isDarkMode,
    error,
    
    // Setters
    setAuthUser,
    setCurrentUser,
    setUserProfiles,
    setUserWorkspaces,
    setIsLoading,
    setIsDarkMode,
    setError,
    clearUserData
  };
};
