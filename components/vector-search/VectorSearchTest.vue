<template>
  <NeumorphicCard title="Vector Search" variant="flat" class="mb-8">
    <div class="mb-6">
      <h3 class="text-lg font-medium text-[rgb(var(--color-neumorphic-text))] mb-4">
        AI-Powered Search
      </h3>
      <p class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mb-4">
        Test the vector search capabilities using Vertex AI embeddings. Try searching for profiles, businesses, or partner preferences using natural language.
      </p>
      
      <NeumorphicSelect
        v-model="searchType"
        label="Search Type"
        class="mb-4"
      >
        <option value="profiles">Search Profiles by Bio</option>
        <option value="businesses">Search Business Profiles by Description</option>
        <option value="preferences">Search Partner Preferences</option>
      </NeumorphicSelect>
      
      <NeumorphicInput
        v-model="searchQuery"
        label="Search Query"
        placeholder="Enter your search query"
        class="mb-4"
      />
      
      <div class="flex justify-end">
        <NeumorphicButton
          variant="convex"
          color="primary"
          :loading="isSearching"
          @click="performSearch"
        >
          Search
        </NeumorphicButton>
      </div>
    </div>
    
    <div v-if="isSearching" class="text-center py-8">
      <p class="text-[rgb(var(--color-neumorphic-text))/70]">
        Searching...
      </p>
    </div>
    
    <div v-else-if="error" class="nm-flat p-4 rounded-lg mb-4 bg-[rgb(var(--color-neumorphic-danger))/10]">
      <p class="text-[rgb(var(--color-neumorphic-danger))]">{{ error }}</p>
    </div>
    
    <div v-else-if="searchPerformed && noResults" class="text-center py-8">
      <svg class="w-12 h-12 mx-auto text-[rgb(var(--color-neumorphic-text))/30]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      <p class="mt-4 text-[rgb(var(--color-neumorphic-text))/70]">
        No results found for your search
      </p>
    </div>
    
    <!-- Profile Search Results -->
    <div v-else-if="searchPerformed && searchType === 'profiles'" class="space-y-4">
      <h4 class="text-md font-medium text-[rgb(var(--color-neumorphic-text))]">
        Profile Results
      </h4>
      
      <div 
        v-for="(result, index) in profileResults" 
        :key="index"
        class="nm-flat p-4 rounded-lg"
      >
        <div class="flex items-start">
          <div class="w-10 h-10 rounded-full nm-flat flex items-center justify-center mr-3">
            <span v-if="result.item.avatarUrl" class="w-full h-full">
              <img :src="result.item.avatarUrl" alt="Profile" class="w-full h-full object-cover rounded-full" />
            </span>
            <span v-else class="text-lg font-bold text-[rgb(var(--color-neumorphic-accent))]">
              {{ result.item.name.charAt(0) }}
            </span>
          </div>
          <div>
            <h5 class="font-medium text-[rgb(var(--color-neumorphic-text))]">
              {{ result.item.name }}
            </h5>
            <p v-if="result.item.bio" class="text-sm text-[rgb(var(--color-neumorphic-text))/70]">
              {{ truncate(result.item.bio, 100) }}
            </p>
            <div v-if="result.item.skills && result.item.skills.length" class="mt-2 flex flex-wrap gap-1">
              <span 
                v-for="(skill, i) in result.item.skills" 
                :key="i"
                class="px-2 py-0.5 text-xs rounded-full nm-flat text-[rgb(var(--color-neumorphic-text))/70]"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Business Search Results -->
    <div v-else-if="searchPerformed && searchType === 'businesses'" class="space-y-4">
      <h4 class="text-md font-medium text-[rgb(var(--color-neumorphic-text))]">
        Business Results
      </h4>
      
      <div 
        v-for="(result, index) in businessResults" 
        :key="index"
        class="nm-flat p-4 rounded-lg"
      >
        <h5 class="font-medium text-[rgb(var(--color-neumorphic-text))]">
          {{ result.item.name }}
        </h5>
        <div class="flex gap-2 text-xs text-[rgb(var(--color-neumorphic-text))/70] mt-1">
          <span v-if="result.item.industry">{{ result.item.industry }}</span>
          <span v-if="result.item.location">• {{ result.item.location }}</span>
          <span v-if="result.item.employeeCount">• {{ result.item.employeeCount }} employees</span>
        </div>
        <p v-if="result.item.description" class="text-sm text-[rgb(var(--color-neumorphic-text))/70] mt-2">
          {{ truncate(result.item.description, 150) }}
        </p>
        <a 
          v-if="result.item.website" 
          :href="result.item.website" 
          target="_blank" 
          class="text-xs text-[rgb(var(--color-neumorphic-accent))] mt-2 inline-block"
        >
          {{ result.item.website }}
        </a>
      </div>
    </div>
    
    <!-- Partner Preferences Search Results -->
    <div v-else-if="searchPerformed && searchType === 'preferences'" class="space-y-4">
      <h4 class="text-md font-medium text-[rgb(var(--color-neumorphic-text))]">
        Partner Preference Results
      </h4>
      
      <div 
        v-for="(result, index) in preferenceResults" 
        :key="index"
        class="nm-flat p-4 rounded-lg"
      >
        <div>
          <h5 class="font-medium text-[rgb(var(--color-neumorphic-text))] mb-2">
            Partner Preference
          </h5>
          
          <div class="space-y-2">
            <div v-if="result.item.industries && result.item.industries.length">
              <div class="text-xs font-medium text-[rgb(var(--color-neumorphic-text))/70]">Industries</div>
              <div class="flex flex-wrap gap-1 mt-1">
                <span 
                  v-for="(industry, i) in result.item.industries" 
                  :key="i"
                  class="px-2 py-0.5 text-xs rounded-full nm-flat text-[rgb(var(--color-neumorphic-text))/70]"
                >
                  {{ industry }}
                </span>
              </div>
            </div>
            
            <div v-if="result.item.locations && result.item.locations.length">
              <div class="text-xs font-medium text-[rgb(var(--color-neumorphic-text))/70]">Locations</div>
              <div class="flex flex-wrap gap-1 mt-1">
                <span 
                  v-for="(location, i) in result.item.locations" 
                  :key="i"
                  class="px-2 py-0.5 text-xs rounded-full nm-flat text-[rgb(var(--color-neumorphic-text))/70]"
                >
                  {{ location }}
                </span>
              </div>
            </div>
            
            <div v-if="result.item.skillsNeeded && result.item.skillsNeeded.length">
              <div class="text-xs font-medium text-[rgb(var(--color-neumorphic-text))/70]">Skills Needed</div>
              <div class="flex flex-wrap gap-1 mt-1">
                <span 
                  v-for="(skill, i) in result.item.skillsNeeded" 
                  :key="i"
                  class="px-2 py-0.5 text-xs rounded-full nm-flat text-[rgb(var(--color-neumorphic-accent))/70]"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
            
            <div v-if="result.item.minEmployeeCount || result.item.maxEmployeeCount">
              <div class="text-xs font-medium text-[rgb(var(--color-neumorphic-text))/70]">Company Size</div>
              <div class="text-sm text-[rgb(var(--color-neumorphic-text))]">
                {{ formatEmployeeCount(result.item.minEmployeeCount, result.item.maxEmployeeCount) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NeumorphicCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import NeumorphicCard from '~/components/neumorphic/Card.vue';
import NeumorphicButton from '~/components/neumorphic/Button.vue';
import NeumorphicInput from '~/components/neumorphic/Input.vue';
import NeumorphicSelect from '~/components/neumorphic/Select.vue';
import { useVectorSearch } from '~/composables/useVectorSearch';
import type { Profile, BusinessProfile, PartnerPreferences, SearchResult } from '~/types/dataconnect';

// Search state
const searchType = ref('profiles');
const searchQuery = ref('');
// Use specific types for each search result array
const profileResults = ref<SearchResult<Profile>[]>([]);
const businessResults = ref<SearchResult<BusinessProfile>[]>([]);
const preferenceResults = ref<SearchResult<PartnerPreferences>[]>([]);
const searchPerformed = ref(false);
const isSearching = ref(false);

// Computed property to determine if we have any results
const noResults = computed(() => {
  switch (searchType.value) {
    case 'profiles':
      return profileResults.value.length === 0;
    case 'businesses':
      return businessResults.value.length === 0;
    case 'preferences':
      return preferenceResults.value.length === 0;
    default:
      return true;
  }
});

// Get vector search composable
const { 
  isLoading,
  error,
  searchProfilesByBio,
  searchBusinessProfilesByDescription,
  searchPartnerPreferences
} = useVectorSearch();

// Perform search based on the selected type
async function performSearch() {
  if (!searchQuery.value) return;
  
  isSearching.value = true;
  // Reset all result arrays
  profileResults.value = [];
  businessResults.value = [];
  preferenceResults.value = [];
  searchPerformed.value = true;
  
  try {
    switch (searchType.value) {
      case 'profiles':
        profileResults.value = await searchProfilesByBio(searchQuery.value);
        break;
      case 'businesses':
        businessResults.value = await searchBusinessProfilesByDescription(searchQuery.value);
        break;
      case 'preferences':
        preferenceResults.value = await searchPartnerPreferences(searchQuery.value);
        break;
    }
  } catch (err) {
    console.error('Error performing search:', err);
  } finally {
    isSearching.value = false;
  }
}

// Helper functions
function truncate(text: string | null | undefined, length: number): string {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}

function formatEmployeeCount(min?: number | null, max?: number | null): string {
  if (min && max) {
    return `${min} - ${max} employees`;
  } else if (min) {
    return `${min}+ employees`;
  } else if (max) {
    return `Up to ${max} employees`;
  }
  return 'Not specified';
}
</script>