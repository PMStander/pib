import { Tool } from "@langchain/core/tools";
import { H3Event } from "h3";
import { FirebaseReadTool } from "../../../../ai/tools/firebase/crud";

/**
 * Tool for retrieving documents from Firestore
 */
export class DocumentRetrievalTool extends Tool {
  name = "document_retrieval";
  description = "Retrieves documents from the database. Input should be a JSON string with either documentId for a specific document or chatId to get all documents for a chat.";

  private event: H3Event;
  private readTool: FirebaseReadTool;

  constructor(event: H3Event) {
    super();
    this.event = event;
    this.readTool = new FirebaseReadTool(event);
  }

  /** @ignore */
  async _call(input: string): Promise<string> {
    try {
      // Parse the input as JSON
      const params = JSON.parse(input);
      const { documentId, chatId } = params;

      if (!documentId && !chatId) {
        return JSON.stringify({
          success: false,
          message: "Either documentId or chatId is required"
        });
      }

      // If documentId is provided, get a specific document
      if (documentId) {
        const readInput = JSON.stringify({
          collection: 'documents',
          id: documentId
        });

        const readResult = await this.readTool._call(readInput);
        const parsedReadResult = JSON.parse(readResult);

        if (!parsedReadResult.success) {
          return JSON.stringify({
            success: false,
            message: parsedReadResult.message || `Document with ID ${documentId} not found`
          });
        }

        const docData = parsedReadResult.data;

        // Format the response to match the expected format
        return JSON.stringify({
          success: true,
          document: {
            id: documentId,
            ...docData,
            created_at: docData.created_at?.toDate?.() || docData.created_at,
            updated_at: docData.updated_at?.toDate?.() || docData.updated_at
          }
        });
      }

      // If chatId is provided, get all documents for a chat
      if (chatId) {
        const readInput = JSON.stringify({
          collection: 'documents',
          filters: {
            chat_id: chatId
          }
        });

        const readResult = await this.readTool._call(readInput);
        const parsedReadResult = JSON.parse(readResult);

        if (!parsedReadResult.success) {
          return JSON.stringify({
            success: false,
            message: parsedReadResult.message || "Failed to retrieve documents"
          });
        }

        const documents = parsedReadResult.data.map((doc: any) => ({
          id: doc.id,
          ...doc,
          created_at: doc.created_at?.toDate?.() || doc.created_at,
          updated_at: doc.updated_at?.toDate?.() || doc.updated_at
        }));

        return JSON.stringify({
          success: true,
          documents
        });
      }

      return JSON.stringify({
        success: false,
        message: "Invalid parameters"
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return JSON.stringify({
          success: false,
          message: `Document retrieval error: ${error.message}`
        });
      }
      return JSON.stringify({
        success: false,
        message: 'An unknown error occurred in document retrieval'
      });
    }
  }
}
