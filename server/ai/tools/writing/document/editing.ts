import { Tool } from "@langchain/core/tools";
import { H3Event } from "h3";
import { FirebaseReadTool, FirebaseUpdateTool } from "../../../../ai/tools/firebase/crud";

/**
 * Tool for editing existing documents in Firestore
 */
export class DocumentEditingTool extends Tool {
  name = "document_editing";
  description = "Edits an existing document in the database. Input should be a JSON string with documentId, content, and optionally title and format.";

  private event: H3Event;
  private readTool: FirebaseReadTool;
  private updateTool: FirebaseUpdateTool;

  constructor(event: H3Event) {
    super();
    this.event = event;
    this.readTool = new FirebaseReadTool(event);
    this.updateTool = new FirebaseUpdateTool(event);
  }

  /** @ignore */
  async _call(input: string): Promise<string> {
    try {
      // Parse the input as JSON
      const params = JSON.parse(input);
      const { documentId, content, title, format } = params;

      if (!documentId || !content) {
        return JSON.stringify({
          success: false,
          message: "Document ID and content are required"
        });
      }

      // First, get the existing document
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

      // Prepare update data
      const updateData: any = {
        content,
        version: (docData.version || 1) + 1,
        metadata: {
          ...docData.metadata,
          word_count: content.split(/\s+/).length,
          character_count: content.length,
          last_edited_by: 'ai'
        }
      };

      // Add optional fields if provided
      if (title) updateData.title = title;
      if (format) updateData.format = format;

      // Use the Firebase Update Tool to update the document
      const updateInput = JSON.stringify({
        collection: 'documents',
        id: documentId,
        data: updateData
      });

      const updateResult = await this.updateTool._call(updateInput);
      const parsedUpdateResult = JSON.parse(updateResult);

      // Format the response to match the expected format
      if (parsedUpdateResult.success) {
        return JSON.stringify({
          success: true,
          message: "Document updated successfully",
          document: {
            id: documentId,
            title: title || docData.title,
            format: format || docData.format,
            updated_at: new Date().toISOString(),
            version: updateData.version
          }
        });
      } else {
        return JSON.stringify({
          success: false,
          message: parsedUpdateResult.message || "Failed to update document"
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return JSON.stringify({
          success: false,
          message: `Document editing error: ${error.message}`
        });
      }
      return JSON.stringify({
        success: false,
        message: 'An unknown error occurred in document editing'
      });
    }
  }
}
