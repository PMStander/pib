import { Tool } from "@langchain/core/tools";
import { H3Event } from "h3";
import { FirebaseCreateTool } from "../../../../ai/tools/firebase/crud";

/**
 * Tool for creating documents in Firestore
 */
export class DocumentCreationTool extends Tool {
  name = "document_creation";
  description = "Creates a new document in the database. Input should be a JSON string with title, content, format (markdown, text, html), and chatId.";

  private event: H3Event;
  private createTool: FirebaseCreateTool;

  constructor(event: H3Event) {
    super();
    this.event = event;
    this.createTool = new FirebaseCreateTool(event);
  }

  /** @ignore */
  async _call(input: string): Promise<string> {
    try {
      // Parse the input as JSON
      const params = JSON.parse(input);
      const { title, content, format = 'markdown', chatId } = params;

      if (!title || !content) {
        return JSON.stringify({
          success: false,
          message: "Title and content are required"
        });
      }

      if (!chatId) {
        return JSON.stringify({
          success: false,
          message: "Chat ID is required to link the document to a chat session"
        });
      }

      // Prepare document data
      const documentData = {
        title,
        content,
        format,
        chat_id: chatId,
        status: 'active',
        version: 1,
        tags: [],
        metadata: {
          word_count: content.split(/\s+/).length,
          character_count: content.length,
          created_by: 'ai'
        }
      };

      // Use the Firebase Create Tool to create the document
      const createInput = JSON.stringify({
        collection: 'documents',
        data: documentData
      });

      const result = await this.createTool._call(createInput);
      const parsedResult = JSON.parse(result);

      // Format the response to match the expected format
      if (parsedResult.success) {
        return JSON.stringify({
          success: true,
          message: "Document created successfully",
          document: {
            id: parsedResult.data.id,
            title,
            format,
            created_at: new Date().toISOString()
          }
        });
      } else {
        return JSON.stringify({
          success: false,
          message: parsedResult.message || "Failed to create document"
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return JSON.stringify({
          success: false,
          message: `Document creation error: ${error.message}`
        });
      }
      return JSON.stringify({
        success: false,
        message: 'An unknown error occurred in document creation'
      });
    }
  }
}