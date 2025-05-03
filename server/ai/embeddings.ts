import { OpenAIEmbeddings } from "@langchain/openai";
import { AzureOpenAIEmbeddings } from "@langchain/openai";
import { BedrockEmbeddings } from "@langchain/aws";
import { VertexAIEmbeddings } from "@langchain/google-vertexai";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { CohereEmbeddings } from "@langchain/cohere";
import type { EmbeddingConfig, EmbeddingResult, GoogleCredentials } from './types/embeddings';
import { readFileSync } from 'fs';
import { join } from 'path';

export class EmbeddingsHandler {
  private config: EmbeddingConfig;
  private runtimeConfig = useRuntimeConfig();
  private isDev = process.env.NODE_ENV === 'development';

  constructor(config?: Partial<EmbeddingConfig>) {
    try {
      // Default to system config (VertexAI)
      this.config = {
        provider: this.isDev ? 'openai' : 'vertexai', // Use OpenAI in dev for better emulation
        projectId: this.runtimeConfig.vertexProjectId as string,
        model: this.runtimeConfig.vertexEmbeddingModel as string || 'text-embedding-005',
        ...config
      } as EmbeddingConfig;

      // Load Google credentials if using VertexAI and not in dev
      if (this.config.provider === 'vertexai' && !this.isDev) {
        try {
          const credentialsPath = join(process.cwd(), 'google-credentials.json');
          
          const credentials = JSON.parse(readFileSync(credentialsPath, 'utf-8')) as GoogleCredentials;
          
     

          // Use project ID from credentials if not provided in config
          if (!this.config.projectId && credentials.project_id) {
            this.config.projectId = credentials.project_id;
          }

          // Store credentials
          this.config.googleCredentials = credentials;

          // Validate required config for VertexAI
          if (!this.config.projectId) {
            console.warn('[Embeddings] No project ID found for VertexAI');
            throw new Error('Project ID is required for VertexAI embeddings');
          }
        } catch (error) {
          console.error('[Embeddings] Failed to load Google credentials:', {
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
          });
          throw error;
        }
      }
    } catch (error) {
      console.error('[Embeddings] Error in constructor:', {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }

  private getApiKey(provider: string): string {
    try {
      // First check user provided key
      if (this.config.apiKey) {
        return this.config.apiKey;
      }

      // Then check runtime config
      const configKey = `${provider.toUpperCase()}_API_KEY`;
      const key = this.runtimeConfig[configKey];
      
      if (key && typeof key === 'string') {
        return key;
      }

      throw new Error(`No API key found for provider ${provider}`);
    } catch (error) {
      console.error('[Embeddings] Error getting API key:', {
        provider,
        error: error instanceof Error ? error.message : error
      });
      throw error;
    }
  }

  async getEmbeddingModel() {
    try {

      switch (this.config.provider) {
        case 'vertexai':
          if (!this.config.projectId) {
            throw new Error('Project ID is required for VertexAI embeddings');
          }
          
          if (!this.config.googleCredentials) {
            throw new Error('Google credentials are required for VertexAI embeddings');
          }

          const location = this.runtimeConfig.vertexLocation || 'us-central1';

      

          return new VertexAIEmbeddings({
            model: this.config.model || 'text-embedding-005',
            ...this.config.googleCredentials
          });

        case 'openai':
          const apiKey = this.getApiKey('openai');
          
          return new OpenAIEmbeddings({
            openAIApiKey: apiKey,
            modelName: this.config.model || 'text-embedding-3-large'
          });

        case 'azure':
          return new AzureOpenAIEmbeddings({
            azureOpenAIApiKey: this.getApiKey('azure'),
            azureOpenAIApiInstanceName: this.config.azureApiInstanceName,
            azureOpenAIApiVersion: this.config.azureApiVersion || '2024-02-01',
            azureOpenAIApiEmbeddingsDeploymentName: this.config.azureDeploymentName || 'text-embedding-ada-002'
          });

        case 'bedrock':
          return new BedrockEmbeddings({
            region: this.config.awsRegion || this.runtimeConfig.bedrockAwsRegion,
            model: this.config.model || 'amazon.titan-embed-text-v1'
          });

        case 'mistral':
          return new MistralAIEmbeddings({
            apiKey: this.getApiKey('mistral'),
            model: this.config.model || 'mistral-embed'
          });

        case 'cohere':
          return new CohereEmbeddings({
            apiKey: this.getApiKey('cohere'),
            model: this.config.model || 'embed-english-v3.0'
          });

        default:
          throw new Error(`Unsupported embedding provider: ${this.config.provider}`);
      }
    } catch (error) {
      console.error('[Embeddings] Error creating embedding model:', {
        provider: this.config.provider,
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }

  async getEmbedding(text: string): Promise<EmbeddingResult> {
    try {
     

      const model = await this.getEmbeddingModel();
      
      const embedding = await model.embedQuery(text);
      

     

      return { embedding };
    } catch (error) {
      console.error('[Embeddings] Error generating embedding:', {
        provider: this.config.provider,
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        textLength: text.length,
        textPreview: text.substring(0, 100)
      });
      return {
        embedding: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
    try {
      const model = await this.getEmbeddingModel();
      
      let embeddings;
      try {
        embeddings = await model.embedDocuments(texts);
       
      } catch (embedError) {
        console.error('[Embeddings] Error in embedDocuments:', {
          error: embedError instanceof Error ? embedError.message : embedError,
          stack: embedError instanceof Error ? embedError.stack : undefined,
          model: model.constructor.name
        });
        throw embedError;
      }

      if (!embeddings || !Array.isArray(embeddings)) {
        console.error('[Embeddings] Invalid embeddings result:', {
          type: typeof embeddings,
          value: embeddings
        });
        throw new Error('Invalid embeddings result');
      }

      if (embeddings.length === 0) {
        console.error('[Embeddings] Empty embeddings array returned');
        throw new Error('Empty embeddings array returned');
      }

      if (!embeddings[0] || !Array.isArray(embeddings[0])) {
        console.error('[Embeddings] Invalid first embedding:', {
          type: typeof embeddings[0],
          value: embeddings[0]
        });
        throw new Error('Invalid embedding format');
      }

      return embeddings.map(embedding => ({ embedding }));
    } catch (error) {
      console.error('[Embeddings] Error generating embeddings:', {
        provider: this.config.provider,
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        textsCount: texts.length,
        sampleText: texts[0]?.substring(0, 100)
      });

      return texts.map(() => ({
        embedding: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }));
    }
  }
}