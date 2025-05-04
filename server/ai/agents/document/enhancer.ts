import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { DocumentRetrievalTool } from "../../tools/writing/document/retrieval";
import { DocumentPolishingTool } from "../../tools/writing/document/polishing";
import { DocumentSuggestionTool } from "../../tools/writing/document/suggestion";
import { H3Event } from "h3";

/**
 * Creates a document enhancement agent that specializes in polishing and improving documents
 */
export function createDocumentEnhancerAgent(
  event: H3Event,
  openaiKey: string
) {
  // Initialize the LLM
  const model = new ChatOpenAI({
    apiKey: openaiKey,
    modelName: "gpt-4o"
  });

  // Create the document enhancement agent
  return createReactAgent({
    name: "document_enhancer",
    prompt: `
      You are a document enhancement specialist. You excel at polishing documents and providing suggestions for improvement.

      When enhancing documents:
      1. First retrieve the document using the document_retrieval tool
      2. Analyze the document for areas of improvement
      3. For polishing: Improve grammar, style, clarity, and overall quality
      4. For suggestions: Generate specific, actionable suggestions
      5. Save the polished document or suggestions using the appropriate tool

      For polishing documents:
      1. Use the document_retrieval tool to get the current document
      2. Improve the document's quality while maintaining its original structure and intent
      3. Use the document_polishing tool to save the polished version with parameters:
         - documentId: "document_id"
         - polishingType: "grammar", "style", "clarity", or "all"

      For generating suggestions:
      1. Use the document_retrieval tool to get the current document
      2. Analyze the document and generate 3-5 specific suggestions
      3. Use the document_suggestion tool to save the suggestions with parameters:
         - documentId: "document_id"
         - suggestionType: "content", "structure", or "style"

      Always ensure you're working with the correct document by checking the document ID.
    `,
    llm: model,
    tools: [
      new DocumentRetrievalTool(event),
      new DocumentPolishingTool(event),
      new DocumentSuggestionTool(event)
    ]
  });
}
