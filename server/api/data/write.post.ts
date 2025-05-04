import { defineEventHandler } from 'h3'
import { getUserSession, type UserSession } from '../../ai/session'
import { useFirebaseServer } from '../../firebase'
import { collection, query as firestoreQuery, where, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { createError, readBody } from 'h3'
import { createEmbeddings} from '../../ai/session'
import {
  FieldValue,
} from "@google-cloud/firestore";

export default defineEventHandler(async (event) => {
  try {

    // Get user session
    const session: UserSession | null = await getUserSession(event)
    if (!session) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    // Get query parameters
    const body = await readBody(event)
    const workspaceId = session.currentWorkspace?.id
    const data = body.data as any
    const collection = body.collection
    const embed = body.embed // Use the same parameter name as in useCreatorData

    console.log("API - write.post.ts: Request data:", {
      collection,
      data,
      embed,
      workspaceId: workspaceId
    })

    // Only require workspaceId for collections that need it
    const requiresWorkspace = ['documents', 'tasks', 'projects'];
    const needsWorkspaceId = requiresWorkspace.includes(collection);

    if ((!workspaceId && needsWorkspaceId) || !data || !collection) {
      console.error("API - write.post.ts: Missing required parameters", {
        hasWorkspaceId: !!workspaceId,
        needsWorkspaceId,
        hasData: !!data,
        hasCollection: !!collection
      });
      throw createError({
        statusCode: 400,
        message: 'Missing required parameters'
      })
    }
console.log("-----------------------")
    // Generate embeddings if fields are specified
    if (embed && Array.isArray(embed) && embed.length > 0) {
      const embeddings = await createEmbeddings(data, embed)
      console.log("write.post embeddings: ", embeddings)
      if (embeddings) data['embedding'] = embeddings // Use 'embedding' for consistency
    }
    console.log('token: ', session.user?.token?.idToken)
    const { firestore } = await useFirebaseServer(session.user?.token?.idToken as string);

    // Create new document
    // Use provided ID if available, otherwise generate a new one
    const documentId = data.id || uuidv4();
    console.log(`API - write.post.ts: Using document ID: ${documentId}`);

    const documentRef = doc(firestore, collection, documentId);

    // Prepare document data
    let documentData = { ...data };

    // Only add workspace_id if needed
    if (needsWorkspaceId) {
      documentData.workspace_id = workspaceId;
    }

    // Add standard fields if they don't exist
    if (!documentData.owner_id) {
      documentData.owner_id = session.user?.id;
    }

    // Only add status for certain collections
    if (['tasks', 'projects', 'documents'].includes(collection) && !documentData.status) {
      documentData.status = 'in_progress';
    }

    // Add timestamps if not provided
    if (!documentData.created_at) {
      documentData.created_at = serverTimestamp();
    }

    if (!documentData.updated_at) {
      documentData.updated_at = serverTimestamp();
    }

    // Ensure ID is set
    documentData.id = documentId;

    console.log("API - write.post.ts: Final document data:", documentData);

    try {
      console.log(`API - write.post.ts: Writing document to collection '${collection}'`);
      await setDoc(documentRef, documentData);
      console.log(`API - write.post.ts: Document written successfully with ID: ${documentId}`);
    } catch (error) {
      console.error('API - write.post.ts: Error writing document:', error);
      throw createError({
        statusCode: 500,
        message: 'Failed to create document'
      });
    }

    console.log(`API - write.post.ts: Returning success response with document ID: ${documentId}`);
    return {
      statusCode: 200,
      data: {
        id: documentId,
        ...documentData
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create document'
    })
  }
})