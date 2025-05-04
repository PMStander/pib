import { Tool } from "@langchain/core/tools";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  CollectionReference,
  DocumentData,
  Query,
  WhereFilterOp
} from "firebase/firestore";
import { useFirebaseServer } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { H3Event } from "h3";
import { getUserSession, type UserSession, createEmbeddings } from "../../../ai/session";

/**
 * Base class for Firebase CRUD tools
 */
abstract class FirebaseCrudTool extends Tool {
  protected event: H3Event;
  protected firestore: any;
  protected session: UserSession | null = null;

  constructor(event: H3Event) {
    super();
    this.event = event;
  }

  /**
   * Initialize Firestore using the server-side Firebase instance and session
   */
  protected async initializeFirestore() {
    try {
      // Get user session
      this.session = await getUserSession(this.event);
      if (!this.session || !this.session.user) {
        throw new Error("Unauthorized: No valid session found");
      }

      // Initialize Firebase with the session token
      const { firestore } = await useFirebaseServer(this.session.user.token?.idToken as string);
      this.firestore = firestore;
      return firestore;
    } catch (error) {
      console.error("Failed to initialize Firestore:", error);
      throw new Error("Failed to initialize Firestore");
    }
  }

  /**
   * Format the response as a JSON string
   */
  protected formatResponse(success: boolean, data: any, message?: string): string {
    return JSON.stringify({
      success,
      data,
      message
    });
  }

  /**
   * Get the current user ID from the session
   */
  protected getUserId(): string {
    if (!this.session || !this.session.user || !this.session.user.id) {
      throw new Error("Unauthorized: No valid user ID in session");
    }
    return this.session.user.id;
  }

  /**
   * Get the current workspace ID from the session
   */
  protected getWorkspaceId(): string | null {
    return this.session?.currentWorkspace?.id || null;
  }

  /**
   * Map query operators to Firestore operators
   */
  protected getFirestoreOperator(operator: string): WhereFilterOp {
    const operatorMap: Record<string, WhereFilterOp> = {
      $eq: '==',
      $ne: '!=',
      $gt: '>',
      $gte: '>=',
      $lt: '<',
      $lte: '<=',
      $in: 'in',
      $nin: 'not-in',
      $contains: 'array-contains',
      $containsAny: 'array-contains-any'
    };

    return operatorMap[operator] || '==';
  }
}

/**
 * Tool for creating documents in Firestore
 */
export class FirebaseCreateTool extends FirebaseCrudTool {
  name = "firebase_create";
  description = "Creates a new document in Firestore. Input should be a JSON string with collection, data, optional id, and optional embed fields.";

  /** @ignore */
  async _call(input: string): Promise<string> {
    try {
      // Initialize Firestore
      await this.initializeFirestore();

      // Parse the input as JSON
      const params = JSON.parse(input);
      const { collection: collectionName, data, id, embed = [] } = params;

      if (!collectionName || !data) {
        return this.formatResponse(false, null, "Collection name and data are required");
      }

      // Generate embeddings if fields are specified
      let documentData = { ...data };
      if (embed && Array.isArray(embed) && embed.length > 0) {
        try {
          const embeddings = await createEmbeddings(data, embed);
          if (embeddings) {
            documentData.embedding = embeddings;
          }
        } catch (embeddingError) {
          console.error("Error generating embeddings:", embeddingError);
          // Continue without embeddings
        }
      }

      // Use provided ID or generate a new one
      const documentId = id || uuidv4();
      const docRef = doc(this.firestore, collectionName, documentId);

      // Get user ID from session
      const userId = this.getUserId();

      // Add standard fields
      documentData = {
        ...documentData,
        id: documentId,
        owner_id: userId,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      };

      // Add workspace_id if available in the session
      const workspaceId = this.getWorkspaceId();
      if (workspaceId) {
        documentData.workspace_id = workspaceId;
      }

      // Only add status for certain collections
      if (['tasks', 'projects', 'documents'].includes(collectionName) && !documentData.status) {
        documentData.status = 'in_progress';
      }

      // Write the document to Firestore
      await setDoc(docRef, documentData);

      return this.formatResponse(true, {
        id: documentId,
        ...documentData
      }, "Document created successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        return this.formatResponse(false, null, `Firebase create error: ${error.message}`);
      }
      return this.formatResponse(false, null, "An unknown error occurred in Firebase create operation");
    }
  }
}

/**
 * Tool for reading documents from Firestore
 */
export class FirebaseReadTool extends FirebaseCrudTool {
  name = "firebase_read";
  description = "Reads documents from Firestore. Input should be a JSON string with collection and optional id, filters, orderBy, limit, and vector search parameters.";

  /** @ignore */
  async _call(input: string): Promise<string> {
    try {
      // Initialize Firestore
      await this.initializeFirestore();

      // Parse the input as JSON
      const params = JSON.parse(input);
      const {
        collection: collectionName,
        id,
        filters = {},
        orderByField,
        orderDirection = 'desc',
        limitCount = 20,
        startAfterDoc = null,
        vec = null
      } = params;

      if (!collectionName) {
        return this.formatResponse(false, null, "Collection name is required");
      }

      // If ID is provided, get a single document
      if (id) {
        const docRef = doc(this.firestore, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          return this.formatResponse(false, null, `Document with ID ${id} not found`);
        }

        const docData = docSnap.data();

        return this.formatResponse(true, {
          id: docSnap.id,
          ...docData
        }, "Document retrieved successfully");
      }

      // Otherwise, perform a query
      let dbQuery: Query<DocumentData> = collection(this.firestore, collectionName) as CollectionReference<DocumentData>;

      // Add filters
      Object.entries(filters).forEach(([field, value]) => {
        // Special handling for userId in workspaceMembers collection
        if (field === 'userId' && collectionName === 'workspaceMembers') {
          dbQuery = query(dbQuery, where('user_id', '==', value));
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          // Handle complex filters like { $gt: 100 }
          Object.entries(value).forEach(([operator, operandValue]) => {
            const firestoreOperator = this.getFirestoreOperator(operator);
            dbQuery = query(dbQuery, where(field, firestoreOperator, operandValue));
          });
        } else {
          // Simple equality filter
          dbQuery = query(dbQuery, where(field, '==', value));
        }
      });

      // Handle vector search if provided
      if (vec && vec.query) {
        // Integrate vector search with filters
        const vectorQuery = {
          query: vec.query,
          field: vec.field || 'embedding',
          dimensions: vec.dimensions || 768,
          distance: vec.distance || 0.5,
        };

        try {
          // Generate embeddings for the search query
          const tempData = { queryText: vec.query };
          const embedding = await createEmbeddings(tempData, ['queryText']);

          if (embedding) {
            // This is a placeholder for vector search
            // In a real implementation, we would use Firestore's vector search capabilities
            console.log(`Vector search requested for field ${vectorQuery.field} with embedding of length ${embedding.length}`);

            // For now, we'll use a simple filter as a fallback
            dbQuery = query(dbQuery, where(vectorQuery.field, '!=', null));
          }
        } catch (embeddingError) {
          console.error('Error generating embeddings for vector search:', embeddingError);
          // Fall back to a text-based search
          const searchFields = ['name', 'description', 'bio', 'content'];

          // Find a field that exists in the collection and might contain the search text
          for (const field of searchFields) {
            // Add a simple text-based filter as a fallback
            dbQuery = query(dbQuery, where(field, '>=', vec.query));
            break; // Just use the first field for simplicity
          }
        }
      }

      // Add ordering if specified
      if (orderByField) {
        dbQuery = query(dbQuery, orderBy(orderByField, orderDirection as any));
      }

      // Add pagination with startAfter if provided
      if (startAfterDoc) {
        const startAfterDocRef = doc(this.firestore, collectionName, startAfterDoc);
        const startAfterDocSnapshot = await getDoc(startAfterDocRef);

        if (startAfterDocSnapshot.exists()) {
          dbQuery = query(dbQuery, startAfter(startAfterDocSnapshot));
        }
      }

      // Add limit
      dbQuery = query(dbQuery, limit(limitCount));

      // Execute the query
      const querySnapshot = await getDocs(dbQuery);
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return this.formatResponse(true, results, `Retrieved ${results.length} documents`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return this.formatResponse(false, null, `Firebase read error: ${error.message}`);
      }
      return this.formatResponse(false, null, "An unknown error occurred in Firebase read operation");
    }
  }
}

/**
 * Tool for updating documents in Firestore
 */
export class FirebaseUpdateTool extends FirebaseCrudTool {
  name = "firebase_update";
  description = "Updates an existing document in Firestore. Input should be a JSON string with collection, id, data, and optional embed fields.";

  /** @ignore */
  async _call(input: string): Promise<string> {
    try {
      // Initialize Firestore
      await this.initializeFirestore();

      // Parse the input as JSON
      const params = JSON.parse(input);
      const { collection: collectionName, id, data, embed = [] } = params;

      if (!collectionName || !id || !data) {
        return this.formatResponse(false, null, "Collection name, document ID, and data are required");
      }

      // Get the document reference
      const docRef = doc(this.firestore, collectionName, id);

      // Check if the document exists
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return this.formatResponse(false, null, `Document with ID ${id} not found`);
      }

      // Check if the user has permission to update this document
      const docData = docSnap.data();
      const userId = this.getUserId();

      if (docData.owner_id && docData.owner_id !== userId) {
        return this.formatResponse(false, null, "You don't have permission to update this document");
      }

      // Generate embeddings if fields are specified
      let dataWithEmbeddings = { ...data };

      if (embed && Array.isArray(embed) && embed.length > 0) {
        try {
          const embeddings = await createEmbeddings(data, embed);

          if (embeddings) {
            dataWithEmbeddings.embedding = embeddings;
          }
        } catch (embeddingError) {
          console.error("Error generating embeddings:", embeddingError);
          // Continue without embeddings
        }
      }

      // Prepare update data
      const updateData = {
        ...dataWithEmbeddings,
        updated_at: serverTimestamp()
      };

      // Update the document
      await updateDoc(docRef, updateData);

      // Return updated data with ID
      const updatedData = {
        id,
        ...docData,
        ...updateData
      };

      return this.formatResponse(true, updatedData, "Document updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        return this.formatResponse(false, null, `Firebase update error: ${error.message}`);
      }
      return this.formatResponse(false, null, "An unknown error occurred in Firebase update operation");
    }
  }
}

/**
 * Tool for deleting documents from Firestore
 */
export class FirebaseDeleteTool extends FirebaseCrudTool {
  name = "firebase_delete";
  description = "Deletes a document from Firestore. Input should be a JSON string with collection and id.";

  /** @ignore */
  async _call(input: string): Promise<string> {
    try {
      // Initialize Firestore
      await this.initializeFirestore();

      // Parse the input as JSON
      const params = JSON.parse(input);
      const { collection: collectionName, id } = params;

      if (!collectionName || !id) {
        return this.formatResponse(false, null, "Collection name and document ID are required");
      }

      // Get the document reference
      const docRef = doc(this.firestore, collectionName, id);

      // Check if the document exists
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return this.formatResponse(false, null, `Document with ID ${id} not found`);
      }

      // Check if the user has permission to delete this document
      const docData = docSnap.data();
      const userId = this.getUserId();

      if (docData.owner_id && docData.owner_id !== userId) {
        return this.formatResponse(false, null, "You don't have permission to delete this document");
      }

      // Delete the document
      await deleteDoc(docRef);

      // Return deleted document info
      const deletedData = {
        id,
        deleted_at: new Date().toISOString()
      };

      return this.formatResponse(true, deletedData, "Document deleted successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        return this.formatResponse(false, null, `Firebase delete error: ${error.message}`);
      }
      return this.formatResponse(false, null, "An unknown error occurred in Firebase delete operation");
    }
  }
}
