import { Tool } from "@langchain/core/tools";
import { H3Event } from "h3";
import { FirebaseReadTool, FirebaseCreateTool } from "../../../../ai/tools/firebase/crud";
import { ChatOpenAI } from "@langchain/openai";

/**
 * Tool for generating suggestions for documents
 */
export class DocumentSuggestionTool extends Tool {
  name = "document_suggestion";
  description = "Generates suggestions for improving a document. Input should be a JSON string with documentId and optionally suggestionType (content, structure, style).";

  private event: H3Event;
  private readTool: FirebaseReadTool;
  private createTool: FirebaseCreateTool;
  private llm: ChatOpenAI;

  constructor(event: H3Event) {
    super();
    this.event = event;
    this.readTool = new FirebaseReadTool(event);
    this.createTool = new FirebaseCreateTool(event);

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
      const { documentId, suggestionType = 'content' } = params;

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

      // Create the suggestion prompt based on the suggestion type
      let suggestionPrompt = "";
      switch (suggestionType) {
        case 'content':
          suggestionPrompt = `Analyze the following ${format} document titled "${title}" and provide 3-5 specific suggestions to improve its content. Focus on adding valuable information, removing redundancies, and enhancing the overall message:\n\n${content}`;
          break;
        case 'structure':
          suggestionPrompt = `Analyze the following ${format} document titled "${title}" and provide 3-5 specific suggestions to improve its structure. Focus on organization, flow, and logical progression of ideas:\n\n${content}`;
          break;
        case 'style':
          suggestionPrompt = `Analyze the following ${format} document titled "${title}" and provide 3-5 specific suggestions to improve its writing style. Focus on tone, voice, and language choices:\n\n${content}`;
          break;
        default:
          suggestionPrompt = `Analyze the following ${format} document titled "${title}" and provide 3-5 specific suggestions to improve it. Consider content, structure, and style:\n\n${content}`;
      }

      // Generate the suggestions
      const response = await this.llm.invoke(suggestionPrompt);
      const suggestions = response.content.toString();

      // Store the suggestions in Firestore using the Create Tool
      const suggestionData = {
        document_id: documentId,
        content: suggestions,
        type: suggestionType,
        status: 'active',
        applied: false
      };

      const createInput = JSON.stringify({
        collection: 'documentSuggestions',
        data: suggestionData
      });

      const createResult = await this.createTool._call(createInput);
      const parsedCreateResult = JSON.parse(createResult);

      // Format the response to match the expected format
      if (parsedCreateResult.success) {
        return JSON.stringify({
          success: true,
          message: `Document suggestions generated successfully (${suggestionType})`,
          suggestion: {
            id: parsedCreateResult.data.id,
            document_id: documentId,
            type: suggestionType,
            content: suggestions,
            created_at: new Date().toISOString()
          }
        });
      } else {
        return JSON.stringify({
          success: false,
          message: parsedCreateResult.message || "Failed to store document suggestions"
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return JSON.stringify({
          success: false,
          message: `Document suggestion error: ${error.message}`
        });
      }
      return JSON.stringify({
        success: false,
        message: 'An unknown error occurred in document suggestion generation'
      });
    }
  }
}
