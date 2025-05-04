import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { DocumentCreationTool } from "../../tools/writing/document/creation";
import { H3Event } from "h3";

/**
 * Creates a document creation agent that specializes in generating and storing documents
 */
export function createDocumentCreatorAgent(
  event: H3Event,
  openaiKey: string
) {
  // Initialize the LLM
  const model = new ChatOpenAI({
    apiKey: openaiKey,
    modelName: "gpt-4o"
  });

  // Create the document creation agent
  return createReactAgent({
    name: "document_creator",
    prompt: `
      You are a document creation specialist. You excel at creating well-structured, informative documents based on user requests.

      When creating documents:
      1. Understand the user's request thoroughly
      2. Generate high-quality, well-structured content
      3. Use appropriate formatting (markdown, text, or HTML)
      4. Include relevant sections, headings, and organization
      5. Always save the document to the database using the document_creation tool

      Always use the document_creation tool with the following parameters:
      - title: "Document title"
      - content: "Document content"
      - format: "markdown" (or "text" or "html")
      - chatId: "The ID of the current chat session"

      Always ensure the document is linked to the chat by including the chatId in your requests.
    `,
    llm: model,
    tools: [new DocumentCreationTool(event)]
  });
}
