import { Tool } from "@langchain/core/tools";
import { H3Event } from "h3";
import { FirebaseReadTool, FirebaseUpdateTool } from "../../../../ai/tools/firebase/crud";
import { ChatOpenAI } from "@langchain/openai";

/**
 * Tool for polishing documents using AI
 */
export class DocumentPolishingTool extends Tool {
  name = "document_polishing";
  description = "Polishes an existing document using AI to improve grammar, style, and clarity. Input should be a JSON string with documentId and optionally polishingType (grammar, style, clarity, all).";

  private event: H3Event;
  private readTool: FirebaseReadTool;
  private updateTool: FirebaseUpdateTool;
  private llm: ChatOpenAI;

  constructor(event: H3Event) {
    super();
    this.event = event;
    this.readTool = new FirebaseReadTool(event);
    this.updateTool = new FirebaseUpdateTool(event);

    // Initialize LLM using environment variable
    this.llm = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
      modelName: "gpt-4o"
    });
  }

  /** @ignore */
  async _call(input: string): Promise<string> {
    try {
      // Parse the input as JSON
      const params = JSON.parse(input);
      const { documentId, polishingType = 'all' } = params;

      if (!documentId) {
        return JSON.stringify({
          success: false,
          message: "Document ID is required"
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

      // Get the document content and format
      const { content, title, format } = docData;

      // Create the polishing prompt based on the polishing type
      let polishingPrompt = "";
      switch (polishingType) {
        case 'grammar':
          polishingPrompt = `Improve the grammar and correct any errors in the following ${format} document titled "${title}". Maintain the original format and structure:\n\n${content}`;
          break;
        case 'style':
          polishingPrompt = `Enhance the writing style of the following ${format} document titled "${title}". Make it more engaging and professional while maintaining the original format and structure:\n\n${content}`;
          break;
        case 'clarity':
          polishingPrompt = `Improve the clarity and readability of the following ${format} document titled "${title}". Make it easier to understand while maintaining the original format and structure:\n\n${content}`;
          break;
        case 'all':
        default:
          polishingPrompt = `Polish the following ${format} document titled "${title}". Improve grammar, style, clarity, and overall quality while maintaining the original format and structure:\n\n${content}`;
      }

      // Generate the polished content
      const response = await this.llm.invoke(polishingPrompt);
      const polishedContent = response.content.toString();

      // Prepare update data
      const updateData = {
        content: polishedContent,
        version: (docData.version || 1) + 1,
        metadata: {
          ...docData.metadata,
          word_count: polishedContent.split(/\s+/).length,
          character_count: polishedContent.length,
          last_edited_by: 'ai',
          polishing_type: polishingType,
          polishing_date: new Date().toISOString()
        }
      };

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
          message: `Document polished successfully (${polishingType})`,
          document: {
            id: documentId,
            title,
            format,
            updated_at: new Date().toISOString(),
            version: updateData.version,
            polishing_type: polishingType
          }
        });
      } else {
        return JSON.stringify({
          success: false,
          message: parsedUpdateResult.message || "Failed to polish document"
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return JSON.stringify({
          success: false,
          message: `Document polishing error: ${error.message}`
        });
      }
      return JSON.stringify({
        success: false,
        message: 'An unknown error occurred in document polishing'
      });
    }
  }
}
