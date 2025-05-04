import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {
  getFirestore,
  CollectionReference,
  DocumentData,
  Query,
} from "firebase-admin/firestore";

// Initialize Firebase Admin
initializeApp();

// Get Firestore instance
const db = getFirestore();

// Initialize Vertex AI
// Note: These variables are kept for future implementation of Vertex AI
// const projectId = 'partners-in-biz-85059'; // Project ID
// const location = 'us-central1'; // Common location for Vertex AI services
// const modelName = 'text-embedding-005'; // Vertex AI embedding model
// const endpoint = `projects/${projectId}/locations/${location}/` +
//   `publishers/google/models/${modelName}`;

/**
 * Cloud Function to generate embeddings for text
 *
 * This function takes text input and returns embeddings using Vertex AI.
 * Uses the textembedding-gecko@003 model for high-quality embeddings.
 */
export const generateEmbeddings = onCall(async (request) => {
  try {
    // Extract parameters from the request
    const {text} = request.data;

    // Validate required parameters
    if (!text || typeof text !== "string") {
      throw new Error("Text is required and must be a string");
    }

    logger.info(
      `Generating embeddings for text: ${text.substring(0, 50)}...`
    );

    try {
      // In a production environment, you would use Vertex AI for embeddings
      // For now, we'll return a mock embedding vector until API is fixed
      logger.info("Using mock embeddings until Vertex AI integration is fixed");

      // Mock embedding generation - in production, replace with actual API call
      const embedding = Array(768).fill(0).map(() => Math.random() - 0.5);

      logger.info(`Generated mock embedding with length: ${embedding.length}`);

      return {embedding, isMock: true};
    } catch (vertexError) {
      logger.error("Error calling Vertex AI:", vertexError);

      // Fallback to mock embeddings if Vertex AI fails
      logger.info("Falling back to mock embeddings");
      const mockEmbedding = Array(768).fill(0).map(() => Math.random() - 0.5);
      logger.info(
        `Generated mock embedding with length: ${mockEmbedding.length}`
      );

      return {
        embedding: mockEmbedding,
        isMock: true,
        error: vertexError instanceof Error ?
          vertexError.message :
          String(vertexError),
      };
    }
  } catch (error) {
    logger.error("Error in generateEmbeddings function:", error);
    throw new Error(
      `Failed to generate embeddings: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
});

/**
 * Cloud Function for vector search using Firestore's findNearest method
 */
export const vectorSearch = onCall(async (request) => {
  try {
    const {
      collection: collectionName,
      vector,
      field = "embedding",
      limit = 10,
      distanceMeasure = "COSINE",
      filters = {},
      distanceThreshold = null,
    } = request.data;

    if (!collectionName) {
      throw new Error("Collection name is required");
    }

    if (!vector || !Array.isArray(vector)) {
      throw new Error("Query vector is required and must be an array");
    }

    logger.info(`Performing vector search on collection ${collectionName}`);

    const collectionRef: CollectionReference<DocumentData> =
      db.collection(collectionName);
    let baseQuery: Query<DocumentData> = collectionRef;

    if (filters && Object.keys(filters).length > 0) {
      for (const [fieldPath, value] of Object.entries(filters)) {
        baseQuery = baseQuery.where(fieldPath, "==", value);
      }
    }

    interface SearchOptions {
      vectorField: string;
      queryVector: number[];
      limit: number;
      distanceMeasure: string;
      distanceResultField: string;
      distanceThreshold?: number;
    }

    const searchOptions: SearchOptions = {
      vectorField: field,
      queryVector: vector,
      limit,
      distanceMeasure,
      distanceResultField: "_distance",
    };

    if (distanceThreshold !== null) {
      searchOptions.distanceThreshold = distanceThreshold;
    }

    // @typescript-eslint/ban-ts-comment
    // @ts-expect-error findNearest is available in admin SDK but not in types
    const querySnapshot = await baseQuery.findNearest(searchOptions).get();

    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {results};
  } catch (error) {
    logger.error("Error in vectorSearch function:", error);
    throw new Error(
      `Vector search failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
});

/**
 * Cloud Function to store a document with vector embeddings
 */
export const storeWithEmbeddings = onCall(async (request) => {
  try {
    const {
      collection: collectionName,
      data,
      embedding,
      id = null,
    } = request.data;

    if (!collectionName) {
      throw new Error("Collection name is required");
    }

    if (!data || typeof data !== "object") {
      throw new Error("Document data is required and must be an object");
    }

    if (!embedding || !Array.isArray(embedding)) {
      throw new Error("Embedding is required and must be an array");
    }

    logger.info(
      `Storing document with embeddings in collection ${collectionName}`
    );

    const collectionRef = db.collection(collectionName);
    let docRef;

    if (id) {
      docRef = collectionRef.doc(id);
      await docRef.set({
        ...data,
        embedding,
        updated_at: new Date(),
      }, {merge: true});
    } else {
      docRef = await collectionRef.add({
        ...data,
        embedding,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return {
      id: docRef.id,
      success: true,
    };
  } catch (error) {
    logger.error("Error in storeWithEmbeddings function:", error);
    throw new Error(
      `Failed to store document with embeddings: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
});

/**
 * Cloud Function to generate embeddings and store a document in one operation
 */
export const generateAndStore = onCall(async (request) => {
  try {
    const {
      collection: collectionName,
      data,
      text,
      textFields = [],
      id = null,
    } = request.data;

    if (!collectionName) {
      throw new Error("Collection name is required");
    }

    if (!data || typeof data !== "object") {
      throw new Error("Document data is required and must be an object");
    }

    if ((!text && textFields.length === 0) ||
        (text && typeof text !== "string")) {
      throw new Error(
        "Either text or textFields must be provided. Text must be a string."
      );
    }

    logger.info(
      "Generating embeddings and storing document in collection" +
      ` ${collectionName}`
    );

    let textToEmbed = text;
    if (!text && textFields.length > 0) {
      textToEmbed = textFields.map((field: string) => {
        return data[field] || "";
      }).join(" ").trim();

      if (!textToEmbed) {
        throw new Error("Could not generate text from the specified fields");
      }
    }

    let embedding;
    let isMock = false;

    try {
      logger.info("Using mock embeddings until Vertex AI integration is fixed");
      embedding = Array(768).fill(0).map(() => Math.random() - 0.5);
      isMock = true;
      logger.info(`Generated mock embedding with length: ${embedding.length}`);
    } catch (error) {
      logger.error("Error generating mock embeddings:", error);
      embedding = Array(768).fill(0).map(() => Math.random() - 0.5);
      isMock = true;
      logger.info(
        `Generated fallback mock embedding with length: ${embedding.length}`
      );
    }

    const collectionRef = db.collection(collectionName);
    let docRef;

    if (id) {
      docRef = collectionRef.doc(id);
      await docRef.set({
        ...data,
        embedding,
        updated_at: new Date(),
      }, {merge: true});
    } else {
      docRef = await collectionRef.add({
        ...data,
        embedding,
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
  } catch (error) {
    logger.error("Error in generateAndStore function:", error);
    throw new Error(
      `Failed to generate embeddings and store document: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
});
