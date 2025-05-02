<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Profile Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-[rgb(var(--color-neumorphic-text))]">
          Your Profile
        </h1>
        <p class="text-[rgb(var(--color-neumorphic-text))/70]">
          Manage your account information and settings
        </p>
      </div>
      
      <!-- Profile Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Sidebar -->
        <div class="col-span-1">
          <NeumorphicCard variant="flat" class="mb-6">
            <div class="flex flex-col items-center">
              <div class="w-24 h-24 rounded-full nm-flat flex items-center justify-center mb-4">
                <svg v-if="!user?.photoURL" class="w-12 h-12 text-[rgb(var(--color-neumorphic-text))/50]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <img v-else :src="user.photoURL" alt="Profile" class="w-24 h-24 rounded-full object-cover" />
              </div>
              
              <h2 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))]">
                {{ user?.displayName || 'User' }}
              </h2>
              <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mb-4">
                {{ user?.email }}
              </p>
              
              <div class="flex items-center mb-2">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="user?.emailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                >
                  <svg 
                    class="mr-1.5 h-2 w-2" 
                    :class="user?.emailVerified ? 'text-green-400' : 'text-yellow-400'"
                    fill="currentColor" 
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  {{ user?.emailVerified ? 'Email Verified' : 'Email Not Verified' }}
                </span>
              </div>
              
              <NeumorphicButton
                v-if="!user?.emailVerified"
                variant="flat"
                size="sm"
                @click="handleSendVerificationEmail"
                :disabled="isVerificationLoading"
                class="mb-4"
              >
                {{ isVerificationLoading ? 'Sending...' : 'Verify Email' }}
              </NeumorphicButton>
            </div>
            
            <div class="mt-4">
              <NeumorphicButton
                variant="flat"
                color="primary"
                class="w-full"
                @click="activeTab = 'profile'"
              >
                Edit Profile
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
          
          <div class="nm-flat rounded-lg overflow-hidden">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = tab.id"
              class="w-full text-left px-4 py-3 transition-colors duration-200"
              :class="activeTab === tab.id ? 'bg-[rgb(var(--color-neumorphic-accent))/10] text-[rgb(var(--color-neumorphic-accent))]' : 'text-[rgb(var(--color-neumorphic-text))] hover:bg-[rgb(var(--color-neumorphic-dark))/10]'"
            >
              <div class="flex items-center">
                <span class="mr-3">{{ tab.icon }}</span>
                {{ tab.name }}
              </div>
            </button>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="col-span-1 md:col-span-2">
          <!-- Profile Tab -->
          <NeumorphicCard v-if="activeTab === 'profile'" title="Edit Profile" variant="flat">
            <form @submit.prevent="handleUpdateProfile">
              <NeumorphicInput
                v-model="profileForm.displayName"
                label="Display Name"
                placeholder="Enter your name"
                :error="profileErrors.displayName"
                class="mb-4"
              />
              
              <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
                  Profile Picture
                </label>
                <div class="nm-pressed p-4 rounded-lg">
                  <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mb-2">
                    Profile picture functionality will be implemented in a future update.
                  </p>
                </div>
              </div>
              
              <div v-if="profileUpdateSuccess" class="mb-4 p-3 bg-green-100 rounded-lg text-green-700 text-sm">
                Profile updated successfully!
              </div>
              
              <div v-if="profileUpdateError" class="mb-4 p-3 bg-[rgb(var(--color-neumorphic-accent-tertiary))/10] rounded-lg text-[rgb(var(--color-neumorphic-accent-tertiary))] text-sm">
                {{ profileUpdateError }}
              </div>
              
              <NeumorphicButton
                type="submit"
                variant="convex"
                color="primary"
                class="w-full"
                :disabled="isProfileLoading"
              >
                {{ isProfileLoading ? 'Updating...' : 'Update Profile' }}
              </NeumorphicButton>
            </form>
          </NeumorphicCard>
          
          <!-- Email Tab -->
          <NeumorphicCard v-if="activeTab === 'email'" title="Change Email" variant="flat">
            <form @submit.prevent="handleUpdateEmail">
              <NeumorphicInput
                v-model="emailForm.currentEmail"
                label="Current Email"
                type="email"
                :readonly="true"
                class="mb-4"
              />
              
              <NeumorphicInput
                v-model="emailForm.newEmail"
                label="New Email"
                type="email"
                placeholder="Enter your new email"
                :error="emailErrors.newEmail"
                class="mb-4"
              />
              
              <NeumorphicInput
                v-model="emailForm.password"
                label="Password"
                type="password"
                placeholder="Enter your password to confirm"
                :error="emailErrors.password"
                class="mb-6"
              />
              
              <div v-if="emailUpdateSuccess" class="mb-4 p-3 bg-green-100 rounded-lg text-green-700 text-sm">
                Email update initiated! Please check your new email for verification.
              </div>
              
              <div v-if="emailUpdateError" class="mb-4 p-3 bg-[rgb(var(--color-neumorphic-accent-tertiary))/10] rounded-lg text-[rgb(var(--color-neumorphic-accent-tertiary))] text-sm">
                {{ emailUpdateError }}
              </div>
              
              <NeumorphicButton
                type="submit"
                variant="convex"
                color="primary"
                class="w-full"
                :disabled="isEmailLoading"
              >
                {{ isEmailLoading ? 'Updating...' : 'Update Email' }}
              </NeumorphicButton>
            </form>
          </NeumorphicCard>
          
          <!-- Password Tab -->
          <NeumorphicCard v-if="activeTab === 'password'" title="Change Password" variant="flat">
            <form @submit.prevent="handleUpdatePassword">
              <NeumorphicInput
                v-model="passwordForm.currentPassword"
                label="Current Password"
                type="password"
                placeholder="Enter your current password"
                :error="passwordErrors.currentPassword"
                class="mb-4"
              />
              
              <NeumorphicInput
                v-model="passwordForm.newPassword"
                label="New Password"
                type="password"
                placeholder="Enter your new password"
                :error="passwordErrors.newPassword"
                class="mb-4"
              />
              
              <NeumorphicInput
                v-model="passwordForm.confirmPassword"
                label="Confirm New Password"
                type="password"
                placeholder="Confirm your new password"
                :error="passwordErrors.confirmPassword"
                class="mb-6"
              />
              
              <div v-if="passwordUpdateSuccess" class="mb-4 p-3 bg-green-100 rounded-lg text-green-700 text-sm">
                Password updated successfully!
              </div>
              
              <div v-if="passwordUpdateError" class="mb-4 p-3 bg-[rgb(var(--color-neumorphic-accent-tertiary))/10] rounded-lg text-[rgb(var(--color-neumorphic-accent-tertiary))] text-sm">
                {{ passwordUpdateError }}
              </div>
              
              <NeumorphicButton
                type="submit"
                variant="convex"
                color="primary"
                class="w-full"
                :disabled="isPasswordLoading"
              >
                {{ isPasswordLoading ? 'Updating...' : 'Update Password' }}
              </NeumorphicButton>
            </form>
          </NeumorphicCard>
          
          <!-- Settings Tab -->
          <NeumorphicCard v-if="activeTab === 'settings'" title="Account Settings" variant="flat">
            <div class="space-y-6">
              <!-- Dark Mode Setting -->
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="text-[rgb(var(--color-neumorphic-text))] font-medium">Dark Mode</h3>
                  <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">
                    Toggle between light and dark theme
                  </p>
                </div>
                <DarkModeToggle />
              </div>
              
              <!-- Notification Settings -->
              <div>
                <h3 class="text-[rgb(var(--color-neumorphic-text))] font-medium mb-2">Notifications</h3>
                <div class="space-y-2">
                  <NeumorphicCheckbox
                    v-model="settings.emailNotifications"
                    label="Email Notifications"
                    description="Receive email notifications about account activity"
                  />
                  
                  <NeumorphicCheckbox
                    v-model="settings.marketingEmails"
                    label="Marketing Emails"
                    description="Receive promotional emails and updates"
                  />
                </div>
              </div>
              
              <!-- Privacy Settings -->
              <div>
                <h3 class="text-[rgb(var(--color-neumorphic-text))] font-medium mb-2">Privacy</h3>
                <div class="space-y-2">
                  <NeumorphicCheckbox
                    v-model="settings.profileVisibility"
                    label="Public Profile"
                    description="Make your profile visible to other users"
                  />
                </div>
              </div>
              
              <div v-if="settingsUpdateSuccess" class="p-3 bg-green-100 rounded-lg text-green-700 text-sm">
                Settings updated successfully!
              </div>
              
              <NeumorphicButton
                variant="convex"
                color="primary"
                class="w-full"
                @click="handleUpdateSettings"
                :disabled="isSettingsLoading"
              >
                {{ isSettingsLoading ? 'Saving...' : 'Save Settings' }}
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
          
          <!-- Danger Zone Tab -->
          <NeumorphicCard v-if="activeTab === 'danger'" title="Danger Zone" variant="flat">
            <div class="space-y-6">
              <div class="p-4 border border-[rgb(var(--color-neumorphic-accent-tertiary))/30] rounded-lg">
                <h3 class="text-[rgb(var(--color-neumorphic-accent-tertiary))] font-medium mb-2">Delete Account</h3>
                <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <NeumorphicButton
                  variant="flat"
                  color="danger"
                  @click="showDeleteConfirmation = true"
                >
                  Delete Account
                </NeumorphicButton>
              </div>
            </div>
          </NeumorphicCard>
        </div>
      </div>
    </div>
    
    <!-- Delete Account Confirmation Modal -->
    <NeumorphicModal
      v-model="showDeleteConfirmation"
      title="Delete Account"
      description="Are you sure you want to delete your account? This action cannot be undone."
    >
      <div class="mb-6">
        <NeumorphicInput
          v-model="deleteConfirmation"
          label="Type 'delete' to confirm"
          placeholder="delete"
          :error="deleteError"
        />
      </div>
      
      <div class="flex justify-end space-x-3">
        <NeumorphicButton
          variant="flat"
          @click="showDeleteConfirmation = false"
        >
          Cancel
        </NeumorphicButton>
        
        <NeumorphicButton
          variant="convex"
          color="danger"
          @click="handleDeleteAccount"
          :disabled="isDeleteLoading || deleteConfirmation !== 'delete'"
        >
          {{ isDeleteLoading ? 'Deleting...' : 'Delete Account' }}
        </NeumorphicButton>
      </div>
    </NeumorphicModal>
    
    <!-- Verification Email Modal -->
    <NeumorphicModal
      v-model="showVerificationModal"
      title="Verification Email Sent"
      description="A verification email has been sent to your email address. Please check your inbox and click on the verification link."
    >
      <div class="flex justify-end">
        <NeumorphicButton
          variant="convex"
          color="primary"
          @click="showVerificationModal = false"
        >
          Close
        </NeumorphicButton>
      </div>
    </NeumorphicModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import NeumorphicCard from '~/components/neumorphic/Card.vue';
import NeumorphicInput from '~/components/neumorphic/Input.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import NeumorphicCheckbox from '~/components/neumorphic/Checkbox.vue';
import NeumorphicModal from '~/components/neumorphic/Modal.vue';
import DarkModeToggle from '~/components/neumorphic/DarkModeToggle.vue';

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['delete-account']);

// Initialize Firebase Auth
const { 
  updateUserProfile, 
  updateUserEmail, 
  updateUserPassword, 
  sendVerificationEmail 
} = useFirebaseAuth();

// Active tab
const activeTab = ref('profile');

// Tabs
const tabs = [
  { id: 'profile', name: 'Profile Information', icon: '👤' },
  { id: 'email', name: 'Email Settings', icon: '✉️' },
  { id: 'password', name: 'Password', icon: '🔒' },
  { id: 'settings', name: 'Account Settings', icon: '⚙️' },
  { id: 'danger', name: 'Danger Zone', icon: '⚠️' }
];

// Profile form
const profileForm = reactive({
  displayName: props.user?.displayName || ''
});

const profileErrors = reactive({
  displayName: ''
});

const isProfileLoading = ref(false);
const profileUpdateSuccess = ref(false);
const profileUpdateError = ref<string | null>(null);

// Email form
const emailForm = reactive({
  currentEmail: props.user?.email || '',
  newEmail: '',
  password: ''
});

const emailErrors = reactive({
  newEmail: '',
  password: ''
});

const isEmailLoading = ref(false);
const emailUpdateSuccess = ref(false);
const emailUpdateError = ref<string | null>(null);

// Password form
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const passwordErrors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const isPasswordLoading = ref(false);
const passwordUpdateSuccess = ref(false);
const passwordUpdateError = ref<string | null>(null);

// Settings
const settings = reactive({
  emailNotifications: true,
  marketingEmails: false,
  profileVisibility: true
});

const isSettingsLoading = ref(false);
const settingsUpdateSuccess = ref(false);

// Delete account
const showDeleteConfirmation = ref(false);
const deleteConfirmation = ref('');
const deleteError = ref('');
const isDeleteLoading = ref(false);

// Email verification
const isVerificationLoading = ref(false);
const showVerificationModal = ref(false);

// Update profile
const handleUpdateProfile = async () => {
  // Validate form
  profileErrors.displayName = '';
  profileUpdateError.value = null;
  profileUpdateSuccess.value = false;
  
  if (!profileForm.displayName.trim()) {
    profileErrors.displayName = 'Display name is required';
    return;
  }
  
  try {
    isProfileLoading.value = true;
    await updateUserProfile(profileForm.displayName);
    profileUpdateSuccess.value = true;
    
    // Emit event to update user in parent component
    emit('update-profile');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      profileUpdateSuccess.value = false;
    }, 3000);
  } catch (error: any) {
    profileUpdateError.value = error.message;
  } finally {
    isProfileLoading.value = false;
  }
};

// Update email
const handleUpdateEmail = async () => {
  // Validate form
  emailErrors.newEmail = '';
  emailErrors.password = '';
  emailUpdateError.value = null;
  emailUpdateSuccess.value = false;
  
  if (!emailForm.newEmail.trim()) {
    emailErrors.newEmail = 'New email is required';
    return;
  }
  
  if (!emailForm.password.trim()) {
    emailErrors.password = 'Password is required';
    return;
  }
  
  try {
    isEmailLoading.value = true;
    await updateUserEmail(emailForm.newEmail, emailForm.password);
    emailUpdateSuccess.value = true;
    
    // Reset form
    emailForm.newEmail = '';
    emailForm.password = '';
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      emailUpdateSuccess.value = false;
    }, 5000);
  } catch (error: any) {
    emailUpdateError.value = error.message;
  } finally {
    isEmailLoading.value = false;
  }
};

// Update password
const handleUpdatePassword = async () => {
  // Validate form
  passwordErrors.currentPassword = '';
  passwordErrors.newPassword = '';
  passwordErrors.confirmPassword = '';
  passwordUpdateError.value = null;
  passwordUpdateSuccess.value = false;
  
  if (!passwordForm.currentPassword.trim()) {
    passwordErrors.currentPassword = 'Current password is required';
    return;
  }
  
  if (!passwordForm.newPassword.trim()) {
    passwordErrors.newPassword = 'New password is required';
    return;
  }
  
  if (passwordForm.newPassword.length < 6) {
    passwordErrors.newPassword = 'Password must be at least 6 characters';
    return;
  }
  
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = 'Passwords do not match';
    return;
  }
  
  try {
    isPasswordLoading.value = true;
    await updateUserPassword(passwordForm.currentPassword, passwordForm.newPassword);
    passwordUpdateSuccess.value = true;
    
    // Reset form
    passwordForm.currentPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      passwordUpdateSuccess.value = false;
    }, 3000);
  } catch (error: any) {
    passwordUpdateError.value = error.message;
  } finally {
    isPasswordLoading.value = false;
  }
};

// Update settings
const handleUpdateSettings = async () => {
  // This would typically save settings to a database
  isSettingsLoading.value = true;
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  settingsUpdateSuccess.value = true;
  isSettingsLoading.value = false;
  
  // Hide success message after 3 seconds
  setTimeout(() => {
    settingsUpdateSuccess.value = false;
  }, 3000);
};

// Delete account
const handleDeleteAccount = async () => {
  deleteError.value = '';
  
  if (deleteConfirmation.value !== 'delete') {
    deleteError.value = 'Please type "delete" to confirm';
    return;
  }
  
  try {
    isDeleteLoading.value = true;
    
    // This would typically delete the user account
    // For now, we'll just emit an event to the parent component
    emit('delete-account');
    
    // Close modal
    showDeleteConfirmation.value = false;
  } catch (error: any) {
    deleteError.value = error.message;
  } finally {
    isDeleteLoading.value = false;
  }
};

// Send verification email
const handleSendVerificationEmail = async () => {
  try {
    isVerificationLoading.value = true;
    await sendVerificationEmail();
    showVerificationModal.value = true;
  } catch (error: any) {
    console.error('Failed to send verification email:', error);
  } finally {
    isVerificationLoading.value = false;
  }
};

// Initialize component
onMounted(() => {
  // Set initial values from user prop
  if (props.user) {
    profileForm.displayName = props.user.displayName || '';
    emailForm.currentEmail = props.user.email || '';
  }
});
</script>
