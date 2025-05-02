import { ref, reactive, computed } from 'vue';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';

// Import the useFirebase composable
import { useFirebase } from './useFirebase';

// Get Firebase auth instance from the useFirebase composable
const { auth } = useFirebase();

// User type
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

// Auth state
export const useFirebaseAuth = () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  // Convert Firebase user to our User type
  const formatUser = (firebaseUser: FirebaseUser): User => {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified
    };
  };

  // Initialize auth state listener
  onAuthStateChanged(auth, (firebaseUser) => {
    isLoading.value = false;
    if (firebaseUser) {
      user.value = formatUser(firebaseUser);
    } else {
      user.value = null;
    }
  });

  // Sign in with email and password
  const signIn = async (email: string, password: string): Promise<User> => {
    try {
      error.value = null;
      isLoading.value = true;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = formatUser(userCredential.user);
      return user.value;
    } catch (e: any) {
      error.value = translateFirebaseError(e.code);
      throw new Error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName?: string): Promise<User> => {
    try {
      error.value = null;
      isLoading.value = true;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile if display name is provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }

      user.value = formatUser(userCredential.user);
      return user.value;
    } catch (e: any) {
      error.value = translateFirebaseError(e.code);
      throw new Error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    try {
      error.value = null;
      await firebaseSignOut(auth);
      user.value = null;
    } catch (e: any) {
      error.value = translateFirebaseError(e.code);
      throw new Error(error.value);
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<void> => {
    try {
      error.value = null;
      isLoading.value = true;
      await sendPasswordResetEmail(auth, email);
    } catch (e: any) {
      error.value = translateFirebaseError(e.code);
      throw new Error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  // Translate Firebase error codes to user-friendly messages
  const translateFirebaseError = (code: string): string => {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'This email is already in use. Please use a different email or try logging in.',
      'auth/invalid-email': 'The email address is not valid.',
      'auth/user-disabled': 'This account has been disabled. Please contact support.',
      'auth/user-not-found': 'No account found with this email. Please check your email or sign up.',
      'auth/wrong-password': 'Incorrect password. Please try again or reset your password.',
      'auth/weak-password': 'Password is too weak. Please use a stronger password.',
      'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.',
      'auth/too-many-requests': 'Too many unsuccessful login attempts. Please try again later.',
      'auth/network-request-failed': 'A network error occurred. Please check your connection and try again.'
    };

    return errorMessages[code] || 'An unknown error occurred. Please try again.';
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword
  };
};

// Export a singleton instance for use across the app
export const {
  user,
  isAuthenticated,
  isLoading,
  error,
  signIn,
  signUp,
  signOut,
  resetPassword
} = useFirebaseAuth();
