<template>
  <nav class="fixed top-0 left-0 right-0 z-10 bg-[rgb(var(--color-neumorphic-bg))] shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo and site name -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <div class="w-10 h-10 rounded-full nm-flat flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-[rgb(var(--color-neumorphic-accent))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <span class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))]">Partners in Biz</span>
          </NuxtLink>
        </div>
        
        <!-- Navigation links - Desktop -->
        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink 
            v-for="(item, index) in navigationItems" 
            :key="index"
            :to="item.path"
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="$route.path === item.path ? 'text-[rgb(var(--color-neumorphic-accent))] nm-pressed' : 'text-[rgb(var(--color-neumorphic-text))] hover:text-[rgb(var(--color-neumorphic-accent))]'"
          >
            {{ item.name }}
          </NuxtLink>
          
          <!-- User menu -->
          <div v-if="isAuthenticated" class="relative ml-3">
            <button 
              @click="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center text-sm font-medium text-[rgb(var(--color-neumorphic-text))] hover:text-[rgb(var(--color-neumorphic-accent))] focus:outline-none"
            >
              <span class="mr-2">{{ user?.displayName || 'User' }}</span>
              <div class="w-8 h-8 rounded-full nm-flat flex items-center justify-center">
                <span v-if="user?.photoURL" class="w-full h-full">
                  <img :src="user.photoURL" alt="Profile" class="w-full h-full object-cover rounded-full" />
                </span>
                <span v-else class="text-sm font-bold text-[rgb(var(--color-neumorphic-accent))]">
                  {{ (user?.displayName || 'U').charAt(0) }}
                </span>
              </div>
            </button>
            
            <!-- User dropdown menu -->
            <div 
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 nm-flat rounded-md py-1 shadow-lg z-10"
            >
              <NuxtLink 
                to="/profile" 
                class="block px-4 py-2 text-sm text-[rgb(var(--color-neumorphic-text))] hover:bg-[rgb(var(--color-neumorphic-dark))/10]"
                @click="isUserMenuOpen = false"
              >
                Your Profile
              </NuxtLink>
              <NuxtLink 
                to="/settings" 
                class="block px-4 py-2 text-sm text-[rgb(var(--color-neumorphic-text))] hover:bg-[rgb(var(--color-neumorphic-dark))/10]"
                @click="isUserMenuOpen = false"
              >
                Settings
              </NuxtLink>
              <button 
                @click="handleSignOut"
                class="block w-full text-left px-4 py-2 text-sm text-[rgb(var(--color-neumorphic-text))] hover:bg-[rgb(var(--color-neumorphic-dark))/10]"
              >
                Sign out
              </button>
            </div>
          </div>
          
          <!-- Login/Signup buttons -->
          <div v-else class="flex items-center space-x-2">
            <NuxtLink 
              to="/login"
              class="px-3 py-2 rounded-md text-sm font-medium text-[rgb(var(--color-neumorphic-text))] hover:text-[rgb(var(--color-neumorphic-accent))]"
            >
              Log in
            </NuxtLink>
            <NuxtLink 
              to="/signup"
              class="px-3 py-2 rounded-md text-sm font-medium nm-flat text-[rgb(var(--color-neumorphic-accent))]"
            >
              Sign up
            </NuxtLink>
          </div>
        </div>
        
        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="nm-flat p-2 rounded-md text-[rgb(var(--color-neumorphic-text))] hover:text-[rgb(var(--color-neumorphic-accent))] focus:outline-none"
          >
            <svg 
              v-if="!isMobileMenuOpen"
              class="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              v-else
              class="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div 
      v-if="isMobileMenuOpen"
      class="md:hidden nm-flat"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink 
          v-for="(item, index) in navigationItems" 
          :key="index"
          :to="item.path"
          class="block px-3 py-2 rounded-md text-base font-medium"
          :class="$route.path === item.path ? 'text-[rgb(var(--color-neumorphic-accent))] nm-pressed' : 'text-[rgb(var(--color-neumorphic-text))] hover:text-[rgb(var(--color-neumorphic-accent))]'"
          @click="isMobileMenuOpen = false"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
      
      <!-- Mobile user menu -->
      <div v-if="isAuthenticated" class="pt-4 pb-3 border-t border-[rgb(var(--color-neumorphic-dark))/20]">
        <div class="flex items-center px-5">
          <div class="w-10 h-10 rounded-full nm-flat flex items-center justify-center">
            <span v-if="user?.photoURL" class="w-full h-full">
              <img :src="user.photoURL" alt="Profile" class="w-full h-full object-cover rounded-full" />
            </span>
            <span v-else class="text-sm font-bold text-[rgb(var(--color-neumorphic-accent))]">
              {{ (user?.displayName || 'U').charAt(0) }}
            </span>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-[rgb(var(--color-neumorphic-text))]">
              {{ user?.displayName || 'User' }}
            </div>
            <div class="text-sm font-medium text-[rgb(var(--color-neumorphic-text))/70]">
              {{ user?.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 px-2 space-y-1">
          <NuxtLink 
            to="/profile" 
            class="block px-3 py-2 rounded-md text-base font-medium text-[rgb(var(--color-neumorphic-text))] hover:bg-[rgb(var(--color-neumorphic-dark))/10]"
            @click="isMobileMenuOpen = false"
          >
            Your Profile
          </NuxtLink>
          <NuxtLink 
            to="/settings" 
            class="block px-3 py-2 rounded-md text-base font-medium text-[rgb(var(--color-neumorphic-text))] hover:bg-[rgb(var(--color-neumorphic-dark))/10]"
            @click="isMobileMenuOpen = false"
          >
            Settings
          </NuxtLink>
          <button 
            @click="handleSignOut"
            class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[rgb(var(--color-neumorphic-text))] hover:bg-[rgb(var(--color-neumorphic-dark))/10]"
          >
            Sign out
          </button>
        </div>
      </div>
      
      <!-- Mobile login/signup buttons -->
      <div v-else class="pt-4 pb-3 border-t border-[rgb(var(--color-neumorphic-dark))/20]">
        <div class="px-2 space-y-1">
          <NuxtLink 
            to="/login"
            class="block px-3 py-2 rounded-md text-base font-medium text-[rgb(var(--color-neumorphic-text))] hover:text-[rgb(var(--color-neumorphic-accent))]"
            @click="isMobileMenuOpen = false"
          >
            Log in
          </NuxtLink>
          <NuxtLink 
            to="/signup"
            class="block px-3 py-2 rounded-md text-base font-medium text-[rgb(var(--color-neumorphic-accent))]"
            @click="isMobileMenuOpen = false"
          >
            Sign up
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useRouter } from 'vue-router';

// Get authentication state
const { user, isAuthenticated, signOut } = useFirebaseAuth();
const router = useRouter();

// Navigation state
const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

// Navigation items
const navigationItems = computed(() => {
  const items = [
    { name: 'Home', path: '/' }
  ];
  
  // Add authenticated-only routes
  if (isAuthenticated.value) {
    items.push(
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Workspaces', path: '/workspaces' },
      { name: 'Chat', path: '/chat' }
    );
  }
  
  return items;
});

// Close menus when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (isUserMenuOpen.value) {
    isUserMenuOpen.value = false;
  }
};

// Sign out handler
const handleSignOut = async () => {
  try {
    await signOut();
    isUserMenuOpen.value = false;
    isMobileMenuOpen.value = false;
    router.push('/login');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

// Add click outside listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Remove click outside listener
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
