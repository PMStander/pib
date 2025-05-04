import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { DocumentRetrievalTool } from "../../tools/writing/document/retrieval";
import { DocumentEditingTool } from "../../tools/writing/document/editing";
import { H3Event } from "h3";

/**
 * Creates a document editing agent that specializes in modifying existing documents
 */
export function createDocumentEditorAgent(
  event: H3Event,
  openaiKey: string
) {
  // Initialize the LLM
  const model = new ChatOpenAI({
    apiKey: openaiKey,
    modelName: "gpt-4o"
  });

  // Create the document editing agent
  return createReactAgent({
    name: "document_editor",
    prompt: `
      You are a document editing specialist. You excel at making precise edits to existing documents based on user requests.

      When editing documents:
      1. First retrieve the document using the document_retrieval tool
      2. Understand the user's requested changes
      3. Make precise, targeted edits to the document
      4. Preserve the original structure and formatting
      5. Save the updated document using the document_editing tool

      Always use the document_retrieval tool first to get the current document:
      - documentId: "document_id"

      Then use the document_editing tool with the following parameters:
      - documentId: "document_id"
      - content: "Updated document content"
      - title: "Updated title" (if title is being changed)
      - format: "markdown" (or the original format if not changing)

      Always ensure you're working with the correct document by checking the document ID.
    `,
    llm: model,
    tools: [
      new DocumentRetrievalTool(event),
      new DocumentEditingTool(event)
    ]
  });
}
