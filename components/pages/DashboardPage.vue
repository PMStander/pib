<template>
  <div class="p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Dashboard Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-[rgb(var(--color-neumorphic-text))]">
          Welcome, {{ user?.displayName || 'User' }}
        </h1>
        <p class="text-[rgb(var(--color-neumorphic-text))/70]">
          Here's an overview of your account
        </p>
      </div>
      
      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Profile Card -->
        <NeumorphicCard title="Your Profile" variant="flat" class="col-span-1">
          <div class="flex flex-col items-center mb-4">
            <div class="w-20 h-20 rounded-full nm-flat flex items-center justify-center mb-4">
              <svg class="w-12 h-12 text-[rgb(var(--color-neumorphic-text))/50]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))]">
              {{ user?.displayName || 'User' }}
            </h3>
            <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">
              {{ user?.email || 'user@example.com' }}
            </p>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">Email Verified</span>
              <span class="text-sm font-medium" :class="user?.emailVerified ? 'text-green-500' : 'text-[rgb(var(--color-neumorphic-accent-tertiary))]'">
                {{ user?.emailVerified ? 'Yes' : 'No' }}
              </span>
            </div>
            
            <div class="flex justify-between">
              <span class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">Account Created</span>
              <span class="text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
                {{ formatDate(new Date()) }}
              </span>
            </div>
          </div>
          
          <div class="mt-6">
            <NeumorphicButton
              variant="convex"
              color="primary"
              class="w-full"
              @click="$emit('edit-profile')"
            >
              Edit Profile
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
        
        <!-- Workspaces Card -->
        <NeumorphicCard title="Your Workspaces" variant="flat" class="col-span-1">
          <div v-if="workspaces.length === 0" class="text-center py-8">
            <svg class="w-12 h-12 mx-auto text-[rgb(var(--color-neumorphic-text))/30]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <p class="mt-4 text-[rgb(var(--color-neumorphic-text))/70]">
              No workspaces yet
            </p>
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="workspace in workspaces" 
              :key="workspace.id"
              class="p-3 rounded-lg nm-flat"
            >
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-md nm-convex flex items-center justify-center mr-3">
                  <span class="text-lg font-bold text-[rgb(var(--color-neumorphic-accent))]">
                    {{ workspace.name.charAt(0) }}
                  </span>
                </div>
                <div>
                  <h4 class="font-medium text-[rgb(var(--color-neumorphic-text))]">
                    {{ workspace.name }}
                  </h4>
                  <p class="text-xs text-[rgb(var(--color-neumorphic-text))/70]">
                    {{ workspace.description || 'No description' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-6">
            <NeumorphicButton
              variant="convex"
              color="primary"
              class="w-full"
              @click="$emit('create-workspace')"
            >
              {{ workspaces.length === 0 ? 'Create Workspace' : 'Manage Workspaces' }}
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
        
        <!-- Activity Card -->
        <NeumorphicCard title="Recent Activity" variant="flat" class="col-span-1">
          <div v-if="activities.length === 0" class="text-center py-8">
            <svg class="w-12 h-12 mx-auto text-[rgb(var(--color-neumorphic-text))/30]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="mt-4 text-[rgb(var(--color-neumorphic-text))/70]">
              No recent activity
            </p>
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="(activity, index) in activities" 
              :key="index"
              class="flex items-start"
            >
              <div class="w-8 h-8 rounded-full nm-flat flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-[rgb(var(--color-neumorphic-accent))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-[rgb(var(--color-neumorphic-text))]">
                  {{ activity.description }}
                </p>
                <p class="text-xs text-[rgb(var(--color-neumorphic-text))/70]">
                  {{ formatDate(activity.date) }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="mt-6">
            <NeumorphicButton
              variant="flat"
              class="w-full"
              @click="$emit('view-all-activity')"
            >
              View All Activity
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      </div>
      
      <!-- Component Showcase -->
      <div class="mt-12">
        <h2 class="text-xl font-bold text-[rgb(var(--color-neumorphic-text))] mb-6">
          Component Showcase
        </h2>
        
        <NeumorphicCard variant="flat" class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))] mb-4">
                Form Controls
              </h3>
              
              <NeumorphicInput
                v-model="showcaseInput"
                label="Text Input"
                placeholder="Enter some text"
                hint="This is a hint text"
              />
              
              <NeumorphicSelect
                v-model="showcaseSelect"
                label="Select Input"
                hint="Choose an option"
              >
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </NeumorphicSelect>
              
              <div class="mb-4">
                <label class="block mb-2 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
                  Checkbox Group
                </label>
                <div class="space-y-2">
                  <NeumorphicCheckbox
                    v-model="showcaseCheckbox1"
                    label="Option 1"
                  />
                  <NeumorphicCheckbox
                    v-model="showcaseCheckbox2"
                    label="Option 2"
                  />
                </div>
              </div>
              
              <div class="mb-4">
                <label class="block mb-2 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
                  Radio Group
                </label>
                <div class="space-y-2">
                  <NeumorphicRadio
                    v-model="showcaseRadio"
                    :value="'radio1'"
                    name="radio-group"
                    label="Radio 1"
                  />
                  <NeumorphicRadio
                    v-model="showcaseRadio"
                    :value="'radio2'"
                    name="radio-group"
                    label="Radio 2"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))] mb-4">
                Advanced Controls
              </h3>
              
              <NeumorphicDatePicker
                v-model="showcaseDate"
                label="Date Picker"
                hint="Select a date"
              />
              
              <NeumorphicSlider
                v-model="showcaseSlider"
                :min="0"
                :max="100"
                :step="1"
                label="Slider"
                valueSuffix="%"
                showMinMax
                hint="Drag to adjust value"
              />
              
              <div class="mb-4">
                <label class="block mb-2 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
                  Toggle Switch
                </label>
                <NeumorphicToggle
                  v-model="showcaseToggle"
                  label="Enable feature"
                />
              </div>
              
              <div class="mb-4">
                <label class="block mb-2 text-sm font-medium text-[rgb(var(--color-neumorphic-text))]">
                  Buttons
                </label>
                <div class="flex flex-wrap gap-2">
                  <NeumorphicButton variant="flat">Flat</NeumorphicButton>
                  <NeumorphicButton variant="convex" color="primary">Convex</NeumorphicButton>
                  <NeumorphicButton variant="concave" color="secondary">Concave</NeumorphicButton>
                  <NeumorphicButton variant="pressed" color="danger">Pressed</NeumorphicButton>
                </div>
              </div>
              
              <div class="mt-4">
                <NeumorphicButton 
                  variant="convex" 
                  color="primary"
                  @click="showModal = true"
                >
                  Open Modal
                </NeumorphicButton>
              </div>
            </div>
          </div>
        </NeumorphicCard>
      </div>
    </div>
    
    <!-- Modal Example -->
    <NeumorphicModal
      v-model="showModal"
      title="Modal Example"
      description="This is an example of the NeumorphicModal component."
    >
      <div class="mb-6">
        <p class="text-[rgb(var(--color-neumorphic-text))]">
          You can put any content inside this modal. It's a reusable component that can be used throughout the application.
        </p>
      </div>
      
      <div class="flex justify-end space-x-3">
        <NeumorphicButton
          variant="flat"
          @click="showModal = false"
        >
          Close
        </NeumorphicButton>
        
        <NeumorphicButton
          variant="convex"
          color="primary"
          @click="showModal = false"
        >
          Confirm
        </NeumorphicButton>
      </div>
    </NeumorphicModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NeumorphicCard from '~/components/neumorphic/Card.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import NeumorphicInput from '~/components/neumorphic/Input.vue';
import NeumorphicSelect from '~/components/neumorphic/Select.vue';
import NeumorphicCheckbox from '~/components/neumorphic/Checkbox.vue';
import NeumorphicRadio from '~/components/neumorphic/Radio.vue';
import NeumorphicToggle from '~/components/neumorphic/Toggle.vue';
import NeumorphicDatePicker from '~/components/neumorphic/DatePicker.vue';
import NeumorphicSlider from '~/components/neumorphic/Slider.vue';
import NeumorphicModal from '~/components/neumorphic/Modal.vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      emailVerified: true
    })
  },
  workspaces: {
    type: Array,
    default: () => [
      {
        id: '1',
        name: 'Personal Workspace',
        description: 'Your personal workspace'
      },
      {
        id: '2',
        name: 'Team Project',
        description: 'Collaborative workspace for the team'
      }
    ]
  },
  activities: {
    type: Array,
    default: () => [
      {
        description: 'You created a new workspace',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        description: 'You updated your profile',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      }
    ]
  }
});

defineEmits(['edit-profile', 'create-workspace', 'view-all-activity']);

// Showcase state
const showcaseInput = ref('');
const showcaseSelect = ref('');
const showcaseCheckbox1 = ref(false);
const showcaseCheckbox2 = ref(true);
const showcaseRadio = ref('radio1');
const showcaseDate = ref(new Date());
const showcaseSlider = ref(50);
const showcaseToggle = ref(true);
const showModal = ref(false);

// Helper functions
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}
</script>
