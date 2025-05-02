import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { isAuthenticated, isLoading } from '~/composables/useFirebaseAuth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Wait for auth state to be determined
  if (isLoading.value) {
    // In a real app, you might want to show a loading state
    // For now, we'll just wait a bit to let Firebase auth initialize
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // If user is not authenticated and trying to access a protected route
  if (!isAuthenticated.value && to.path !== '/login' && to.path !== '/signup') {
    return navigateTo('/login');
  }
  
  // If user is authenticated and trying to access login/signup
  if (isAuthenticated.value && (to.path === '/login' || to.path === '/signup')) {
    return navigateTo('/dashboard');
  }
});
