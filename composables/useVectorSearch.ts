import { ref, computed } from 'vue';
import { useFirebase } from './useFirebase';
import { useFirestore } from './useFirestore';
import { useCloudFunctions } from './useCloudFunctions';

// Import types
import type {
  Profile,
  BusinessProfile,
  PartnerPreferences
} from '~/types/dataconnect';

// Define result types with distance metadata
interface SearchResult<T> {
  item: T;
  distance: number;
}

// Mock data for testing
const mockProfiles: Profile[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'John Smith',
    bio: 'Software engineer with 10 years of experience in web development, specializing in Vue.js and Node.js.',
    avatarUrl: '',
    skills: ['JavaScript', 'Vue.js', 'Node.js', 'TypeScript'],
    interests: ['Web Development', 'Open Source', 'AI'],
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    userId: 'user2',
    name: 'Sarah Johnson',
    bio: 'UX/UI designer with a passion for creating intuitive and beautiful interfaces. 5 years of experience in design systems.',
    avatarUrl: '',
    skills: ['UI Design', 'Figma', 'User Research', 'Prototyping'],
    interests: ['Design Systems', 'Accessibility', 'User Experience'],
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    userId: 'user3',
    name: 'Michael Chen',
    bio: 'Product manager with experience in SaaS products. Focused on data-driven decision making and user-centered design.',
    avatarUrl: '',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Stories'],
    interests: ['SaaS', 'Product Management', 'Growth'],
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockBusinessProfiles: BusinessProfile[] = [
  {
    id: '1',
    workspaceId: 'workspace1',
    name: 'TechSolutions Inc.',
    industry: 'Software Development',
    description: 'We build custom software solutions for businesses of all sizes. Specializing in web applications, mobile apps, and enterprise software.',
    location: 'San Francisco, CA',
    website: 'https://techsolutions.example.com',
    employeeCount: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    workspaceId: 'workspace2',
    name: 'DesignMasters',
    industry: 'Design Agency',
    description: 'Creative design agency focused on branding, UI/UX, and digital marketing materials. We help businesses stand out with beautiful design.',
    location: 'New York, NY',
    website: 'https://designmasters.example.com',
    employeeCount: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    workspaceId: 'workspace3',
    name: 'GrowthPartners',
    industry: 'Marketing',
    description: 'Marketing agency specializing in growth strategies for startups and small businesses. We focus on digital marketing, SEO, and content strategy.',
    location: 'Austin, TX',
    website: 'https://growthpartners.example.com',
    employeeCount: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockPartnerPreferences: PartnerPreferences[] = [
  {
    id: '1',
    workspaceId: 'workspace1',
    industries: ['Software Development', 'SaaS', 'Technology'],
    locations: ['San Francisco', 'Remote'],
    minEmployeeCount: 5,
    maxEmployeeCount: 50,
    skillsNeeded: ['UI Design', 'UX Research', 'Branding'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    workspaceId: 'workspace2',
    industries: ['E-commerce', 'Retail', 'Consumer Goods'],
    locations: ['New York', 'Boston', 'Remote'],
    minEmployeeCount: 10,
    maxEmployeeCount: 100,
    skillsNeeded: ['Web Development', 'Mobile Development', 'API Integration'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    workspaceId: 'workspace3',
    industries: ['Healthcare', 'Biotech', 'Medical Devices'],
    locations: ['Boston', 'San Diego', 'Remote'],
    minEmployeeCount: 20,
    maxEmployeeCount: 200,
    skillsNeeded: ['Data Analysis', 'Machine Learning', 'Regulatory Compliance'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Simple text similarity function for mock search
const calculateTextSimilarity = (text1: string, text2: string): number => {
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);

  // Count matching words
  const matches = words1.filter(word => words2.includes(word)).length;

  // Calculate similarity score (0-1)
  const similarity = matches / Math.max(words1.length, words2.length);

  return similarity;
};

export const useVectorSearch = () => {
  const { auth } = useFirebase();
  const firestoreService = useFirestore();
  const cloudFunctions = useCloudFunctions();
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const useMockData = ref(true); // Set to true to use mock data instead of real API calls

  // Search profiles by bio text
  const searchProfilesByBio = async (searchText: string, limit: number = 5): Promise<SearchResult<Profile>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to search profiles';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Use mock data for testing
      if (useMockData.value) {
        // Calculate similarity scores for each profile
        const results = mockProfiles.map(profile => {
          const bioText = profile.bio || '';
          const similarity = calculateTextSimilarity(searchText, bioText);

          return {
            item: { ...profile },
            distance: similarity
          };
        });

        // Sort by similarity (highest first) and limit results
        return results
          .sort((a, b) => b.distance - a.distance)
          .slice(0, limit);
      }

      // Try to use Cloud Functions for vector search first
      try {
        // Use the Cloud Function for vector search
        return await cloudFunctions.searchProfilesByText(searchText, limit);
      } catch (cloudFunctionError) {
        console.warn('Cloud Function search failed, falling back to Firestore:', cloudFunctionError);

        // Fall back to Firestore vector search
        const results = await firestoreService.vectorSearch('profiles', searchText, limit);

        if (Array.isArray(results)) {
          return results.map(profile => {
            // Type assertion to avoid TypeScript errors
            const profileData = profile as any;

            return {
              item: {
                id: profileData.id,
                userId: profileData.user_id || profileData.userId,
                name: profileData.name,
                bio: profileData.bio || '',
                avatarUrl: profileData.avatar_url || profileData.avatarUrl || '',
                skills: profileData.skills || [],
                interests: profileData.interests || [],
                isDefault: profileData.is_default || profileData.isDefault || false,
                createdAt: profileData.created_at ? new Date(profileData.created_at) :
                          profileData.createdAt ? new Date(profileData.createdAt) : new Date(),
                updatedAt: profileData.updated_at ? new Date(profileData.updated_at) :
                          profileData.updatedAt ? new Date(profileData.updatedAt) : new Date()
              } as Profile,
              distance: profileData._distance || 0
            };
          });
        }
      }

      return [];
    } catch (err: any) {
      error.value = err.message || 'Failed to search profiles';
      console.error('Error searching profiles:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Search business profiles by description text
  const searchBusinessProfilesByDescription = async (searchText: string, limit: number = 5): Promise<SearchResult<BusinessProfile>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to search business profiles';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Use mock data for testing
      if (useMockData.value) {
        // Calculate similarity scores for each business profile
        const results = mockBusinessProfiles.map(business => {
          const descriptionText = business.description || '';
          const nameText = business.name || '';
          const industryText = business.industry || '';

          // Combine all text fields for better matching
          const combinedText = `${nameText} ${descriptionText} ${industryText}`;
          const similarity = calculateTextSimilarity(searchText, combinedText);

          return {
            item: { ...business },
            distance: similarity
          };
        });

        // Sort by similarity (highest first) and limit results
        return results
          .sort((a, b) => b.distance - a.distance)
          .slice(0, limit);
      }

      // Try to use Cloud Functions for vector search first
      try {
        // Use the Cloud Function for vector search
        return await cloudFunctions.searchBusinessProfilesByText(searchText, limit);
      } catch (cloudFunctionError) {
        console.warn('Cloud Function search failed, falling back to Firestore:', cloudFunctionError);

        // Fall back to Firestore vector search
        const results = await firestoreService.vectorSearch('businessProfiles', searchText, limit);

        if (Array.isArray(results)) {
          return results.map(business => {
            // Type assertion to avoid TypeScript errors
            const businessData = business as any;

            return {
              item: {
                id: businessData.id,
                workspaceId: businessData.workspace_id || businessData.workspaceId,
                name: businessData.name,
                industry: businessData.industry || '',
                description: businessData.description || '',
                location: businessData.location || '',
                website: businessData.website || '',
                employeeCount: businessData.employee_count || businessData.employeeCount || 0,
                createdAt: businessData.created_at ? new Date(businessData.created_at) :
                          businessData.createdAt ? new Date(businessData.createdAt) : new Date(),
                updatedAt: businessData.updated_at ? new Date(businessData.updated_at) :
                          businessData.updatedAt ? new Date(businessData.updatedAt) : new Date()
              } as BusinessProfile,
              distance: businessData._distance || 0
            };
          });
        }
      }

      return [];
    } catch (err: any) {
      error.value = err.message || 'Failed to search business profiles';
      console.error('Error searching business profiles:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Search partner preferences by combined text
  const searchPartnerPreferences = async (searchText: string, limit: number = 5): Promise<SearchResult<PartnerPreferences>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to search partner preferences';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Use mock data for testing
      if (useMockData.value) {
        // Calculate similarity scores for each partner preference
        const results = mockPartnerPreferences.map(prefs => {
          // Combine all relevant fields for better matching
          const industriesText = prefs.industries?.join(', ') || '';
          const locationsText = prefs.locations?.join(', ') || '';
          const skillsText = prefs.skillsNeeded?.join(', ') || '';

          const combinedText = `Industries: ${industriesText}. Locations: ${locationsText}. Skills needed: ${skillsText}`;
          const similarity = calculateTextSimilarity(searchText, combinedText);

          return {
            item: { ...prefs },
            distance: similarity
          };
        });

        // Sort by similarity (highest first) and limit results
        return results
          .sort((a, b) => b.distance - a.distance)
          .slice(0, limit);
      }

      // Try to use Cloud Functions for vector search first
      try {
        // Use the Cloud Function for vector search
        return await cloudFunctions.searchPartnerPreferencesByText(searchText, limit);
      } catch (cloudFunctionError) {
        console.warn('Cloud Function search failed, falling back to Firestore:', cloudFunctionError);

        // Fall back to Firestore vector search
        const results = await firestoreService.vectorSearch('partnerPreferences', searchText, limit);

        if (Array.isArray(results)) {
          return results.map(prefs => {
            // Type assertion to avoid TypeScript errors
            const prefsData = prefs as any;

            return {
              item: {
                id: prefsData.id,
                workspaceId: prefsData.workspace_id || prefsData.workspaceId,
                industries: prefsData.industries || [],
                locations: prefsData.locations || [],
                minEmployeeCount: prefsData.min_employee_count || prefsData.minEmployeeCount || 0,
                maxEmployeeCount: prefsData.max_employee_count || prefsData.maxEmployeeCount || 0,
                skillsNeeded: prefsData.skills_needed || prefsData.skillsNeeded || [],
                createdAt: prefsData.created_at ? new Date(prefsData.created_at) :
                          prefsData.createdAt ? new Date(prefsData.createdAt) : new Date(),
                updatedAt: prefsData.updated_at ? new Date(prefsData.updated_at) :
                          prefsData.updatedAt ? new Date(prefsData.updatedAt) : new Date()
              } as PartnerPreferences,
              distance: prefsData._distance || 0
            };
          });
        }
      }

      return [];
    } catch (err: any) {
      error.value = err.message || 'Failed to search partner preferences';
      console.error('Error searching partner preferences:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Match a profile to business profiles
  const matchProfileToBusinesses = async (profileId: string, limit: number = 5): Promise<SearchResult<BusinessProfile>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to match profiles';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Use mock data for testing
      if (useMockData.value) {
        // Find the profile
        const profile = mockProfiles.find(p => p.id === profileId);

        if (!profile) {
          error.value = 'Profile not found';
          return [];
        }

        // Use the profile's bio and skills to match with business descriptions
        const bioText = profile.bio || '';
        const skillsText = profile.skills?.join(' ') || '';
        const interestsText = profile.interests?.join(' ') || '';

        const searchText = `${bioText} ${skillsText} ${interestsText}`;

        // Calculate similarity scores for each business profile
        const results = mockBusinessProfiles.map(business => {
          const descriptionText = business.description || '';
          const nameText = business.name || '';
          const industryText = business.industry || '';

          const businessText = `${nameText} ${descriptionText} ${industryText}`;
          const similarity = calculateTextSimilarity(searchText, businessText);

          return {
            item: { ...business },
            distance: similarity
          };
        });

        // Sort by similarity (highest first) and limit results
        return results
          .sort((a, b) => b.distance - a.distance)
          .slice(0, limit);
      }

      // If not using mock data, provide a message about implementation status
      error.value = 'Direct profile-to-business matching is not fully implemented yet in the API. Use searchBusinessProfilesByDescription instead.';
      return [];
    } catch (err: any) {
      error.value = err.message || 'Failed to match profile to businesses';
      console.error('Error matching profile to businesses:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Match a business profile to user profiles
  const matchBusinessToProfiles = async (businessProfileId: string, limit: number = 5): Promise<SearchResult<Profile>[]> => {
    if (!auth.currentUser) {
      error.value = 'You must be logged in to match business profiles';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Use mock data for testing
      if (useMockData.value) {
        // Find the business profile
        const business = mockBusinessProfiles.find(b => b.id === businessProfileId);

        if (!business) {
          error.value = 'Business profile not found';
          return [];
        }

        // Use the business description and industry to match with profiles
        const descriptionText = business.description || '';
        const nameText = business.name || '';
        const industryText = business.industry || '';

        const searchText = `${nameText} ${descriptionText} ${industryText}`;

        // Calculate similarity scores for each profile
        const results = mockProfiles.map(profile => {
          const bioText = profile.bio || '';
          const skillsText = profile.skills?.join(' ') || '';
          const interestsText = profile.interests?.join(' ') || '';

          const profileText = `${bioText} ${skillsText} ${interestsText}`;
          const similarity = calculateTextSimilarity(searchText, profileText);

          return {
            item: { ...profile },
            distance: similarity
          };
        });

        // Sort by similarity (highest first) and limit results
        return results
          .sort((a, b) => b.distance - a.distance)
          .slice(0, limit);
      }

      // If not using mock data, provide a message about implementation status
      error.value = 'Direct business-to-profile matching is not fully implemented yet in the API. Use searchProfilesByBio instead.';
      return [];
    } catch (err: any) {
      error.value = err.message || 'Failed to match business to profiles';
      console.error('Error matching business to profiles:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Helper function to generate combined text for partner preferences
  const generateCombinedText = (
    industries: string[] | null | undefined,
    skillsNeeded: string[] | null | undefined
  ): string => {
    const parts: string[] = [];

    if (industries && industries.length > 0) {
      parts.push(`Industries: ${industries.join(', ')}`);
    }

    if (skillsNeeded && skillsNeeded.length > 0) {
      parts.push(`Skills needed: ${skillsNeeded.join(', ')}`);
    }

    return parts.join('. ');
  };

  return {
    // State
    isLoading,
    error,

    // Methods
    searchProfilesByBio,
    searchBusinessProfilesByDescription,
    searchPartnerPreferences,
    matchProfileToBusinesses,
    matchBusinessToProfiles,
    generateCombinedText
  };
};
