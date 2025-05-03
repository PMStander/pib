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
    console.log("write.post: ", data)
    console.log("write.post: ", collection)
    console.log("write.post: ", embed)
    if (!workspaceId || !data || !collection) {
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
    const newWriteId = uuidv4()
    const newWriteRef = doc(firestore, collection, newWriteId)
    const newWriteData = {
      workspace_id: workspaceId,
      owner_id: session.user?.id,
      ...data,
      status: 'in_progress',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      deleted_at: null,
      id: newWriteId
    }
    console.log("write.post newWriteData: ", newWriteData)
    try {
     let setDocResult = await setDoc(newWriteRef, newWriteData)
     console.log("------> setDocResult: ", setDocResult)
    } catch (error) {
      console.error('Error writing document:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to create document'
      })
    }
   
    console.log(">>>>>>>>>>")
    return {
      statusCode: 200,
      data: newWriteId
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create document'
    })
  }
})

// Helper function to extract text from specified fields
function getTextFromFields(data: any, fields: string[]): string {
  if (!data) return '';
  
  // Collect text from all fields
  const texts: string[] = [];
  
  fields.forEach(field => {
    // Handle nested fields (e.g., metadata.tags)
    const fieldParts = field.split('.');
    let value = data;
    
    // Navigate through nested objects
    for (const part of fieldParts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        value = undefined;
        break;
      }
    }
    
    // Add field value to texts if it exists
    if (value !== undefined) {
      if (Array.isArray(value)) {
        // Join array values with space
        texts.push(value.join(' '));
      } else if (typeof value === 'string') {
        texts.push(value);
      } else {
        // Convert to string
        texts.push(String(value));
      }
    }
  });
  
  return texts.join(' ').trim();
}