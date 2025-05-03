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
  type WhereFilterOp
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
  // This would be replaced with the actual Firestore vector search implementation
  // For now, we'll return a dummy where clause to avoid type errors
  // In a real implementation, this would use Firebase's vector search capabilities
  return where(field, '==', embedding[0]) as any; // Type assertion as a temporary solution
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
      if (typeof value === 'object' && value !== null) {
        // Handle range queries like { $gte: '2023-01-01' }
        Object.entries(value).forEach(([operator, operandValue]) => {
          const firestoreOperator = getFirestoreOperator(operator);
          dbQuery = query(dbQuery, where(field, firestoreOperator, operandValue));
        });
      } else {
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

      // Generate embeddings for the search query using the existing createEmbeddings function
      // Create a temporary object with the query text and a key for createEmbeddings to use
      const tempData = { queryText: vec.query };
      const embedding = await createEmbeddings(tempData, ['queryText']);

      // Add vector search parameters
      dbQuery = query(
        dbQuery,
        // Using a placeholder for Firestore vector search feature
        // This would use the actual Firestore vector search syntax
        vectorSearch(vectorQuery.field, embedding, vectorQuery.dimensions, vectorQuery.distance)
      );
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
    const querySnapshot = await getDocs(dbQuery);

    const results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { statusCode: 200, data: results}
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error reading data',
    });
  }
});