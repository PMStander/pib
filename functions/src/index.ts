/**
 * Firebase Cloud Functions for Partners in Biz
 *
 * This file contains Cloud Functions for the Partners in Biz application,
 * including vector search functionality using Firestore and embedding generation
 * using Google's Vertex AI.
 */

import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as aiplatform from "@google-cloud/aiplatform";

// Initialize Firebase Admin
initializeApp();

// Get Firestore instance
const db = getFirestore();

// Initialize Vertex AI
// Note: These variables are kept for future implementation of actual Vertex AI integration
// const projectId = 'partners-in-biz-85059'; // Project ID
// const location = 'us-central1'; // Common location for Vertex AI services
// const modelName = 'text-embedding-005'; // Vertex AI embedding model
// const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/${modelName}`;

/**
 * Cloud Function to generate embeddings for text
 *
 * This function takes text input and returns embeddings using Google's Vertex AI.
 * Uses the textembedding-gecko@003 model for high-quality text embeddings.
 */
export const generateEmbeddings = onCall({
  maxInstances: 10,
}, async (request) => {
  try {
    // Extract parameters from the request
    const { text } = request.data;

    // Validate required parameters
    if (!text || typeof text !== 'string') {
      throw new Error("Text is required and must be a string");
    }

    logger.info(`Generating embeddings for text: ${text.substring(0, 50)}...`);

    try {
      // In a production environment, you would use Google's Vertex AI to generate embeddings
      // For now, we'll return a mock embedding vector until we fix the API integration
      logger.info("Using mock embeddings until Vertex AI integration is fixed");

      // Mock embedding generation - in production, replace with actual API call
      const embedding = Array(768).fill(0).map(() => Math.random() - 0.5);

      logger.info(`Generated mock embedding with length: ${embedding.length}`);

      return { embedding, isMock: true };
    } catch (vertexError) {
      logger.error("Error calling Vertex AI:", vertexError);

      // Fallback to mock embeddings if Vertex AI fails
      logger.info("Falling back to mock embeddings");
      const mockEmbedding = Array(768).fill(0).map(() => Math.random() - 0.5);
      logger.info(`Generated mock embedding with length: ${mockEmbedding.length}`);

      return {
        embedding: mockEmbedding,
        isMock: true,
        error: vertexError instanceof Error ? vertexError.message : String(vertexError)
      };
    }
  } catch (error: unknown) {
    logger.error("Error in generateEmbeddings function:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate embeddings: ${error.message}`);
    } else {
      throw new Error(`Failed to generate embeddings: ${String(error)}`);
    }
  }
});

/**
 * Cloud Function for vector search using Firestore's findNearest method
 *
 * This function takes a collection name, query vector, and optional parameters
 * and returns the nearest documents based on vector similarity.
 */
export const vectorSearch = onCall({
  maxInstances: 10,
}, async (request) => {
  try {
    // Extract parameters from the request
    const {
      collection: collectionName,
      vector,
      field = "embedding",
      limit = 10,
      distanceMeasure = "COSINE",
      filters = {},
      distanceThreshold = null,
    } = request.data;

    // Validate required parameters
    if (!collectionName) {
      throw new Error("Collection name is required");
    }

    if (!vector || !Array.isArray(vector)) {
      throw new Error("Query vector is required and must be an array");
    }

    logger.info(`Performing vector search on collection ${collectionName}`, {
      collection: collectionName,
      vectorLength: vector.length,
      limit,
      distanceMeasure,
    });

    // Create a reference to the collection
    const collectionRef = db.collection(collectionName);

    // Build a query with filters if provided
    // Using any type to avoid TypeScript errors with the findNearest method
    let baseQuery: any = collectionRef;
    if (filters && Object.keys(filters).length > 0) {
      // Apply filters one by one
      for (const [fieldPath, value] of Object.entries(filters)) {
        baseQuery = baseQuery.where(fieldPath, "==", value);
      }
    }

    // Create the vector search options
    const searchOptions: any = {
      vectorField: field,
      queryVector: vector,
      limit: limit,
      distanceMeasure: distanceMeasure,
    };

    // Add distance threshold if provided
    if (distanceThreshold !== null) {
      searchOptions.distanceThreshold = distanceThreshold;
    }

    // Add a field to store the distance in the results
    searchOptions.distanceResultField = "_distance";

    // Perform the vector search
    // @ts-ignore - findNearest is available in the admin SDK but TypeScript doesn't recognize it
    const querySnapshot = await baseQuery.findNearest(searchOptions).get();

    // Process the results
    const results = querySnapshot.docs.map((doc: any) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        _distance: data._distance || 0,
      };
    });

    logger.info(`Vector search completed with ${results.length} results`);

    return { results };
  } catch (error: unknown) {
    logger.error("Error in vectorSearch function:", error);
    if (error instanceof Error) {
      throw new Error(`Vector search failed: ${error.message}`);
    } else {
      throw new Error(`Vector search failed: ${String(error)}`);
    }
  }
});

/**
 * Cloud Function to store a document with vector embeddings
 *
 * This function takes a collection name, document data, and embeddings,
 * and stores the document in Firestore with the embeddings. The embeddings
 * can be generated using the generateEmbeddings function.
 */
export const storeWithEmbeddings = onCall({
  maxInstances: 10,
}, async (request) => {
  try {
    // Extract parameters from the request
    const {
      collection: collectionName,
      data,
      embedding,
      id = null,
    } = request.data;

    // Validate required parameters
    if (!collectionName) {
      throw new Error("Collection name is required");
    }

    if (!data || typeof data !== 'object') {
      throw new Error("Document data is required and must be an object");
    }

    if (!embedding || !Array.isArray(embedding)) {
      throw new Error("Embedding is required and must be an array");
    }

    logger.info(`Storing document with embeddings in collection ${collectionName}`);

    // Create a reference to the collection
    const collectionRef = db.collection(collectionName);

    // Create or update the document
    let docRef;
    if (id) {
      docRef = collectionRef.doc(id);
      await docRef.set({
        ...data,
        embedding: embedding,
        updated_at: new Date(),
      }, { merge: true });
    } else {
      docRef = await collectionRef.add({
        ...data,
        embedding: embedding,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    logger.info(`Document stored successfully with ID: ${docRef.id}`);

    return {
      id: docRef.id,
      success: true,
    };
  } catch (error: unknown) {
    logger.error("Error in storeWithEmbeddings function:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to store document with embeddings: ${error.message}`);
    } else {
      throw new Error(`Failed to store document with embeddings: ${String(error)}`);
    }
  }
});

/**
 * Cloud Function to generate embeddings and store a document in one operation
 *
 * This function combines the generateEmbeddings and storeWithEmbeddings functions
 * to provide a single endpoint for generating embeddings and storing a document.
 */
export const generateAndStore = onCall({
  maxInstances: 10,
}, async (request) => {
  try {
    // Extract parameters from the request
    const {
      collection: collectionName,
      data,
      text,
      textFields = [],
      id = null,
    } = request.data;

    // Validate required parameters
    if (!collectionName) {
      throw new Error("Collection name is required");
    }

    if (!data || typeof data !== 'object') {
      throw new Error("Document data is required and must be an object");
    }

    if ((!text && textFields.length === 0) || (text && typeof text !== 'string')) {
      throw new Error("Either text or textFields must be provided. Text must be a string.");
    }

    logger.info(`Generating embeddings and storing document in collection ${collectionName}`);

    // Generate text from fields if textFields are provided
    let textToEmbed = text;
    if (!text && textFields.length > 0) {
      textToEmbed = textFields.map((field: string) => {
        if (data[field]) {
          return data[field];
        }
        return '';
      }).join(' ').trim();

      if (!textToEmbed) {
        throw new Error("Could not generate text from the specified fields");
      }
    }

    // Generate embeddings
    let embedding;
    let isMock = false;

    try {
      // In a production environment, you would use Google's Vertex AI to generate embeddings
      // For now, we'll return a mock embedding vector until we fix the API integration
      logger.info("Using mock embeddings until Vertex AI integration is fixed");

      // Mock embedding generation - in production, replace with actual API call
      embedding = Array(768).fill(0).map(() => Math.random() - 0.5);
      isMock = true;

      logger.info(`Generated mock embedding with length: ${embedding.length}`);
    } catch (error) {
      // Handle any unexpected errors
      logger.error("Error generating mock embeddings:", error);
      embedding = Array(768).fill(0).map(() => Math.random() - 0.5);
      isMock = true;
      logger.info(`Generated fallback mock embedding with length: ${embedding.length}`);
    }

    // Create a reference to the collection
    const collectionRef = db.collection(collectionName);

    // Create or update the document
    let docRef;
    if (id) {
      docRef = collectionRef.doc(id);
      await docRef.set({
        ...data,
        embedding: embedding,
        updated_at: new Date(),
      }, { merge: true });
    } else {
      docRef = await collectionRef.add({
        ...data,
        embedding: embedding,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return {
      id: docRef.id,
      success: true,
      embeddingLength: embedding.length,
      isMockEmbedding: isMock,
    };
  } catch (error: unknown) {
    logger.error("Error in generateAndStore function:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate embeddings and store document: ${error.message}`);
    } else {
      throw new Error(`Failed to generate embeddings and store document: ${String(error)}`);
    }
  }
});
