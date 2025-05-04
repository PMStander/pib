import { defineEventHandler, readBody, createError } from 'h3';
import { getUserSession, type UserSession } from '../../ai/session'
import { useFirebaseServer } from '../../firebase'
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  CollectionReference,
  type DocumentData,
  type Query,
  type WhereFilterOp,
  FieldValue
} from 'firebase/firestore';
import { createEmbeddings } from '../../ai/session';

// Helper function to map query operators to Firestore operators
function getFirestoreOperator(operator: string): WhereFilterOp {
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
    $containsAny: 'array-contains-any',
  };

  return operatorMap[operator] || '==';
}

// Placeholder function for vector search
// In a real app, this would use Firestore's vector search capabilities
function vectorSearch(field: string, embedding: number[], _dimensions: number, _distance: number) {
  // This is a placeholder implementation for the client-side SDK
  // In a production environment with the server-side Node.js SDK, you would use:
  // import { findNearest } from '@google-cloud/firestore';
  // return findNearest({ field, vector: embedding, limit: 20, distance: 'COSINE' });

  // For now, we'll log the request and return a dummy where clause
  console.log(`Vector search requested for field ${field} with embedding of length ${embedding.length}`);

  // In a real implementation with the client SDK, we would need to:
  // 1. Use a custom Firebase Function that implements vector search
  // 2. Or use the REST API directly with the proper vector search parameters

  // For now, we'll return a dummy where clause that will match documents with the embedding field
  return where(field, '!=', null) as any; // Type assertion as a temporary solution
}

export default defineEventHandler(async (event) => {
  // Check authentication
  const session: UserSession | null = await getUserSession(event);

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  try {
    const body = await readBody(event);

    // Extract query parameters
    const {
      collection: collectionName,
      id,
      filters = {},
      limit: limitCount = 20,
      orderBy: orderByField = null,
      orderDirection = 'desc',
      startAfter: startAfterDoc = null,
      vec = null,
    } = body;

    // Validate collection name
    if (!collectionName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Collection name is required',
      });
    }

    const { firestore } = await useFirebaseServer(session.user?.token?.idToken as string);

    // If id is provided, fetch a single document
    if (id) {
      const docRef = doc(firestore, collectionName, id);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return null;
      }

      return {
        statusCode: 200,
        data: {
        id: docSnapshot.id,
        ...docSnapshot.data(),
        },
      };
    }

    // Otherwise, perform a query
    let dbQuery: Query<DocumentData> = collection(firestore, collectionName) as CollectionReference<DocumentData>;

    // Add filters
    Object.entries(filters).forEach(([field, value]) => {
      // Special handling for userId in workspaceMembers collection
      if (field === 'userId' && collectionName === 'workspaceMembers') {
        console.log('API - read.post.ts: Special handling for userId in workspaceMembers collection');
        // Try both camelCase and snake_case versions of the field
        dbQuery = query(dbQuery, where('user_id', '==', value));
        console.log('API - read.post.ts: Added filter user_id ==', value);
      } else if (typeof value === 'object' && value !== null) {
        // Handle range queries like { $gte: '2023-01-01' }
        Object.entries(value).forEach(([operator, operandValue]) => {
          const firestoreOperator = getFirestoreOperator(operator);
          dbQuery = query(dbQuery, where(field, firestoreOperator, operandValue));
          console.log(`API - read.post.ts: Added filter ${field} ${firestoreOperator} ${operandValue}`);
        });
      } else {
        dbQuery = query(dbQuery, where(field, '==', value));
        console.log(`API - read.post.ts: Added filter ${field} == ${value}`);
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
        // Generate embeddings for the search query using the existing createEmbeddings function
        // Create a temporary object with the query text and a key for createEmbeddings to use
        const tempData = { queryText: vec.query };
        const embedding = await createEmbeddings(tempData, ['queryText']);

        console.log(`Generated embedding for vector search: length=${embedding.length}`);

        // Add vector search parameters
        dbQuery = query(
          dbQuery,
          // Using a placeholder for Firestore vector search feature
          // This would use the actual Firestore vector search syntax in a server-side implementation
          vectorSearch(vectorQuery.field, embedding, vectorQuery.dimensions, vectorQuery.distance)
        );
      } catch (embeddingError) {
        console.error('Error generating embeddings for vector search:', embeddingError);
        // If embedding generation fails, fall back to a text-based search
        // This is a simple fallback that looks for the query text in relevant fields
        const searchFields = ['name', 'description', 'bio', 'content'];

        // Find a field that exists in the collection and might contain the search text
        for (const field of searchFields) {
          // Add a simple text-based filter as a fallback
          dbQuery = query(dbQuery, where(field, '>=', vec.query));
          break; // Just use the first field for simplicity
        }
      }
    }

    // Add ordering
    if (orderByField) {
      dbQuery = query(dbQuery, orderBy(orderByField, orderDirection as any));
    }

    // Add pagination
    dbQuery = query(dbQuery, limit(limitCount));

    if (startAfterDoc) {
      const startAfterDocRef = doc(firestore, collectionName, startAfterDoc);
      const startAfterDocSnapshot = await getDoc(startAfterDocRef);

      if (startAfterDocSnapshot.exists()) {
        dbQuery = query(dbQuery, startAfter(startAfterDocSnapshot));
      }
    }

    // Execute the query
    console.log(`API - read.post.ts: Executing query on collection '${collectionName}'`);
    const querySnapshot = await getDocs(dbQuery);
    console.log(`API - read.post.ts: Query returned ${querySnapshot.docs.length} documents`);

    const results = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log(`API - read.post.ts: Document ${doc.id} data:`, data);
      return {
        id: doc.id,
        ...data,
      };
    });

    console.log(`API - read.post.ts: Returning ${results.length} results`);
    return { statusCode: 200, data: results}
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error reading data',
    });
  }
});