import { ref, computed } from 'vue';
import { useDataConnect } from '~/composables/useDataConnect';
import { useFirebaseAuth } from '~/composables/useFirebaseAuth';
import { useAppState } from '~/composables/useAppState';
import { encrypt, decrypt } from '~/utils/encryption';

// Define the LLM provider types
export type LLMProvider = 'openai' | 'anthropic' | 'gemini' | 'ollama' | 'xai';

// Define the entity types
export type EntityType = 'user' | 'profile' | 'workspace';

// Define the LLM key interface
export interface LLMKey {
  id: string;
  entityType: EntityType;
  entityId: string;
  provider: LLMProvider;
  apiKey?: string; // Decrypted key (only available client-side)
  config: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Define the provider-specific configuration interfaces
export interface OpenAIConfig {
  organizationId?: string;
  baseUrl?: string;
}

export interface AnthropicConfig {
  baseUrl?: string;
}

export interface GeminiConfig {
  projectId?: string;
}

export interface OllamaConfig {
  url: string;
}

export interface XAIConfig {
  // No specific config for XAI yet
}

/**
 * Composable for managing LLM keys
 */
export const useLLMKeys = () => {
  const dataConnect = useDataConnect();
  const { isAuthenticated, currentUser } = useFirebaseAuth();
  const { activeWorkspace, activeProfile } = useAppState();

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Get all LLM keys for a user
  const getUserLLMKeys = async (): Promise<LLMKey[]> => {
    if (!isAuthenticated.value || !currentUser.value) {
      error.value = 'You must be logged in to access LLM keys';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      const result = await dataConnect.GetLLMKeysByEntity({
        entityType: 'user',
        entityId: currentUser.value.id
      });

      return (result.data?.lLMKeys || []).map(key => ({
        ...key,
        config: key.config ? JSON.parse(key.config) : {}
      }));
    } catch (err: any) {
      console.error('Error fetching user LLM keys:', err);
      error.value = err.message || 'Failed to fetch user LLM keys';
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Get all LLM keys for a profile
  const getProfileLLMKeys = async (profileId: string): Promise<LLMKey[]> => {
    if (!isAuthenticated.value) {
      error.value = 'You must be logged in to access LLM keys';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      const result = await dataConnect.GetLLMKeysByEntity({
        entityType: 'profile',
        entityId: profileId
      });

      return (result.data?.lLMKeys || []).map(key => ({
        ...key,
        config: key.config ? JSON.parse(key.config) : {}
      }));
    } catch (err: any) {
      console.error('Error fetching profile LLM keys:', err);
      error.value = err.message || 'Failed to fetch profile LLM keys';
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Get all LLM keys for a workspace
  const getWorkspaceLLMKeys = async (workspaceId: string): Promise<LLMKey[]> => {
    if (!isAuthenticated.value) {
      error.value = 'You must be logged in to access LLM keys';
      return [];
    }

    try {
      isLoading.value = true;
      error.value = null;

      const result = await dataConnect.GetLLMKeysByEntity({
        entityType: 'workspace',
        entityId: workspaceId
      });

      return (result.data?.lLMKeys || []).map(key => ({
        ...key,
        config: key.config ? JSON.parse(key.config) : {}
      }));
    } catch (err: any) {
      console.error('Error fetching workspace LLM keys:', err);
      error.value = err.message || 'Failed to fetch workspace LLM keys';
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Get a specific LLM key by provider and entity
  const getLLMKeyByProviderAndEntity = async (
    provider: LLMProvider,
    entityType: EntityType,
    entityId: string
  ): Promise<LLMKey | null> => {
    if (!isAuthenticated.value) {
      error.value = 'You must be logged in to access LLM keys';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      const result = await dataConnect.GetLLMKeyByProviderAndEntity({
        provider,
        entityType,
        entityId
      });

      const key = result.data?.lLMKeys?.[0];

      if (!key) {
        return null;
      }

      // Decrypt the API key if it exists
      let apiKey: string | undefined;
      if (key.encryptedKey && key.encryptionIV) {
        try {
          apiKey = decrypt(key.encryptedKey, key.encryptionIV);
        } catch (decryptError) {
          console.error('Error decrypting API key:', decryptError);
        }
      }

      return {
        ...key,
        apiKey,
        config: key.config ? JSON.parse(key.config) : {}
      };
    } catch (err: any) {
      console.error('Error fetching LLM key:', err);
      error.value = err.message || 'Failed to fetch LLM key';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Get the effective LLM key for a provider based on priority order
  const getEffectiveLLMKey = async (provider: LLMProvider): Promise<LLMKey | null> => {
    if (!isAuthenticated.value || !currentUser.value) {
      error.value = 'You must be logged in to access LLM keys';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // 1. Check workspace key if active workspace exists
      if (activeWorkspace.value?.id) {
        const workspaceKey = await getLLMKeyByProviderAndEntity(
          provider,
          'workspace',
          activeWorkspace.value.id
        );

        if (workspaceKey) {
          return workspaceKey;
        }
      }

      // 2. Check profile key if active profile exists
      if (activeProfile.value?.id) {
        const profileKey = await getLLMKeyByProviderAndEntity(
          provider,
          'profile',
          activeProfile.value.id
        );

        if (profileKey) {
          return profileKey;
        }
      }

      // 3. Check user key
      const userKey = await getLLMKeyByProviderAndEntity(
        provider,
        'user',
        currentUser.value.id
      );

      return userKey;
    } catch (err: any) {
      console.error('Error fetching effective LLM key:', err);
      error.value = err.message || 'Failed to fetch effective LLM key';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Create a new LLM key
  const createLLMKey = async (
    entityType: EntityType,
    entityId: string,
    provider: LLMProvider,
    apiKey: string | null,
    config: Record<string, any> = {}
  ): Promise<LLMKey | null> => {
    if (!isAuthenticated.value) {
      error.value = 'You must be logged in to create LLM keys';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Encrypt the API key if it exists
      let encryptedKey: string | undefined;
      let encryptionIV: string | undefined;

      if (apiKey) {
        const { encryptedData, iv } = encrypt(apiKey);
        encryptedKey = encryptedData;
        encryptionIV = iv;
      }

      const result = await dataConnect.CreateLLMKey({
        entityType,
        entityId,
        provider,
        encryptedKey,
        encryptionIV,
        config: JSON.stringify(config)
      });

      const key = result.data?.createLLMKey;

      if (!key) {
        return null;
      }

      return {
        ...key,
        apiKey,
        config
      };
    } catch (err: any) {
      console.error('Error creating LLM key:', err);
      error.value = err.message || 'Failed to create LLM key';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Update an existing LLM key
  const updateLLMKey = async (
    id: string,
    apiKey: string | null,
    config: Record<string, any> = {}
  ): Promise<LLMKey | null> => {
    if (!isAuthenticated.value) {
      error.value = 'You must be logged in to update LLM keys';
      return null;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Encrypt the API key if it exists
      let encryptedKey: string | undefined;
      let encryptionIV: string | undefined;

      if (apiKey) {
        const { encryptedData, iv } = encrypt(apiKey);
        encryptedKey = encryptedData;
        encryptionIV = iv;
      }

      const result = await dataConnect.UpdateLLMKey({
        id,
        encryptedKey,
        encryptionIV,
        config: JSON.stringify(config)
      });

      const key = result.data?.updateLLMKey;

      if (!key) {
        return null;
      }

      return {
        ...key,
        apiKey,
        config
      };
    } catch (err: any) {
      console.error('Error updating LLM key:', err);
      error.value = err.message || 'Failed to update LLM key';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Delete an LLM key
  const deleteLLMKey = async (id: string): Promise<boolean> => {
    if (!isAuthenticated.value) {
      error.value = 'You must be logged in to delete LLM keys';
      return false;
    }

    try {
      isLoading.value = true;
      error.value = null;

      const result = await dataConnect.DeleteLLMKey({
        id
      });

      return result.data?.deleteLLMKey || false;
    } catch (err: any) {
      console.error('Error deleting LLM key:', err);
      error.value = err.message || 'Failed to delete LLM key';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // Helper function to get provider-specific configuration
  const getProviderConfig = (provider: LLMProvider, key: LLMKey | null): Record<string, any> => {
    if (!key) {
      return {};
    }

    switch (provider) {
      case 'openai':
        return {
          apiKey: key.apiKey,
          organization: key.config.organizationId,
          baseURL: key.config.baseUrl
        };

      case 'anthropic':
        return {
          apiKey: key.apiKey,
          baseURL: key.config.baseUrl
        };

      case 'gemini':
        return {
          apiKey: key.apiKey,
          projectId: key.config.projectId
        };

      case 'ollama':
        return {
          url: key.config.url
        };

      case 'xai':
        return {
          apiKey: key.apiKey
        };

      default:
        return {};
    }
  };

  // Get all configured providers
  const getConfiguredProviders = async (): Promise<LLMProvider[]> => {
    if (!isAuthenticated.value || !currentUser.value) {
      return [];
    }

    try {
      // Get user keys
      const userKeys = await getUserLLMKeys();

      // Get profile keys if active profile exists
      let profileKeys: LLMKey[] = [];
      if (activeProfile.value?.id) {
        profileKeys = await getProfileLLMKeys(activeProfile.value.id);
      }

      // Get workspace keys if active workspace exists
      let workspaceKeys: LLMKey[] = [];
      if (activeWorkspace.value?.id) {
        workspaceKeys = await getWorkspaceLLMKeys(activeWorkspace.value.id);
      }

      // Combine all keys and extract unique providers
      const allKeys = [...userKeys, ...profileKeys, ...workspaceKeys];
      const providers = new Set<LLMProvider>();

      allKeys.forEach(key => {
        providers.add(key.provider);
      });

      // Always include Ollama as it doesn't require an API key
      providers.add('ollama');

      return Array.from(providers);
    } catch (err) {
      console.error('Error getting configured providers:', err);
      return ['ollama']; // Always include Ollama as fallback
    }
  };

  // Check if Ollama is available
  const checkOllamaAvailability = async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:11434/api/version');
      return response.ok;
    } catch (err) {
      console.error('Error checking Ollama availability:', err);
      return false;
    }
  };

  return {
    // State
    isLoading,
    error,

    // Methods
    getUserLLMKeys,
    getProfileLLMKeys,
    getWorkspaceLLMKeys,
    getLLMKeyByProviderAndEntity,
    getEffectiveLLMKey,
    createLLMKey,
    updateLLMKey,
    deleteLLMKey,
    getProviderConfig,
    getConfiguredProviders,
    checkOllamaAvailability
  };
};
