import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';

// Import composables
import { useFirebase } from './useFirebase';
import { useAppState } from './useAppState';

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
  // Get Firebase auth instance from the useFirebase composable
  const { auth } = useFirebase();

  // Get app state
  const appState = useAppState();

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
      appState.setAuthUser(firebaseUser);
    } else {
      user.value = null;
      appState.setAuthUser(null);
      // Clear user data when signing out
      appState.clearUserData();
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
      // Clear app state
      appState.setAuthUser(null);
      appState.clearUserData();
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

  // Send email verification
  const sendVerificationEmail = async (): Promise<void> => {
    try {
      error.value = null;
      isLoading.value = true;

      if (!auth.currentUser) {
        throw new Error('No user is currently signed in');
      }

      await sendEmailVerification(auth.currentUser);
    } catch (e: any) {
      error.value = translateFirebaseError(e.code);
      throw new Error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  // Verify email with action code
  const verifyEmail = async (actionCode: string): Promise<void> => {
    try {
      error.value = null;
      isLoading.value = true;
      await applyActionCode(auth, actionCode);

      // Refresh the user to update emailVerified status
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser) {
          user.value = formatUser(auth.currentUser);
        }
      }
    } catch (e: any) {
      error.value = translateFirebaseError(e.code);
      throw new Error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  // Confirm password reset
  const confirmPasswordReset = async (actionCode: string, newPassword: string): Promise<void> => {
    try {
      error.value = null;
      isLoading.value = true;
      await verifyPasswordResetCode(auth, actionCode);
      await confirmPasswordReset(auth, actionCode, newPassword);
    } catch (e: any) {
      error.value = translateFirebaseError(e.code);
      throw new Error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  // Update user profile
  const updateUserProfile = async (displayName: string, photoURL?: string): Promise<void> => {
    try {
      error.value = null;
      isLoading.value = true;

      if (!auth.currentUser) {
        throw new Error('No user is currently signed in');
      }

      await updateProfile(auth.currentUser, { displayName, photoURL: photoURL || null });

      // Update local user state
      if (auth.currentUser) {
        user.value = formatUser(auth.currentUser);
      }
    } catch (e: any) {
      error.value = translateFirebaseError(e.code);
      throw new Error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  // Update user email
  const updateUserEmail = async (newEmail: string, password: string): Promise<void> => {
    try {
      error.value = null;
      isLoading.value = true;

      if (!auth.currentUser || !auth.currentUser.email) {
        throw new Error('No user is currently signed in or user has no email');
      }

      // Reauthenticate user before changing email
      const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update email
      await updateEmail(auth.currentUser, newEmail);

      // Send verification email for new email
      await sendEmailVerification(auth.currentUser);

      // Update local user state
      user.value = formatUser(auth.currentUser);
    } catch (e: any) {
      error.value = translateFirebaseError(e.code);
      throw new Error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  // Update user password
  const updateUserPassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      error.value = null;
      isLoading.value = true;

      if (!auth.currentUser || !auth.currentUser.email) {
        throw new Error('No user is currently signed in or user has no email');
      }

      // Reauthenticate user before changing password
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update password
      await updatePassword(auth.currentUser, newPassword);
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
      'auth/network-request-failed': 'A network error occurred. Please check your connection and try again.',
      'auth/requires-recent-login': 'This operation requires recent authentication. Please log in again before retrying.',
      'auth/email-already-exists': 'The email address is already in use by another account.',
      'auth/invalid-action-code': 'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
      'auth/expired-action-code': 'The action code has expired. Please request a new one.',
      'auth/invalid-verification-code': 'The verification code is invalid.',
      'auth/invalid-verification-id': 'The verification ID is invalid.',
      'auth/missing-verification-code': 'The verification code is missing.',
      'auth/missing-verification-id': 'The verification ID is missing.',
      'auth/quota-exceeded': 'The quota for this operation has been exceeded. Please try again later.',
      'auth/unauthorized-domain': 'The domain of this URL is not authorized for OAuth operations.'
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
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
    confirmPasswordReset,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword
  };
};

// Don't export a singleton instance directly
// Instead, use the composable in your components or plugins
