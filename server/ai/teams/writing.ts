import { createSupervisor } from "@langchain/langgraph-supervisor";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createDocumentCreatorAgent } from "../agents/document/creator";
import { createDocumentEditorAgent } from "../agents/document/editor";
import { createDocumentEnhancerAgent } from "../agents/document/enhancer";
import { H3Event } from "h3";

/**
 * Creates a writing team with specialized agents for document creation, editing, and enhancement
 */
export function createWritingTeam(event: H3Event, openaiKey: string) {
  // Initialize the LLM
  const model = new ChatOpenAI({
    apiKey: openaiKey,
    modelName: "gpt-4o"
  });

  // Create specialized document agents
  const documentCreatorAgent = createDocumentCreatorAgent(event, openaiKey);
  const documentEditorAgent = createDocumentEditorAgent(event, openaiKey);
  const documentEnhancerAgent = createDocumentEnhancerAgent(event, openaiKey);

  // Writing team supervisor prompt
  const writingTeamPrompt = `
    You are a writing team supervisor managing the following specialists:
    - document_creator: Creates new documents based on user requests
    - document_editor: Makes edits to existing documents
    - document_enhancer: Polishes documents and provides suggestions for improvement

    Based on the user request, decide which specialist should handle the task.

    For document creation tasks (e.g., "create a document about...", "write a...", etc.), assign to document_creator.
    For document editing tasks (e.g., "edit the document...", "update the document...", etc.), assign to document_editor.
    For document enhancement tasks (e.g., "polish the document...", "suggest improvements for...", etc.), assign to document_enhancer.

    Always return your decision in the following JSON format:
    {
      "task": "<task description>",
      "result": "<task result>",
      "agent": "<assigned agent name>"
    }
  `;

  // Create and compile the writing team
  const writingTeam = createSupervisor({
    agents: [documentCreatorAgent, documentEditorAgent, documentEnhancerAgent],
    llm: model,
    prompt: writingTeamPrompt
  });

  const checkpointer = new MemorySaver();
  return writingTeam.compile({
    name: "writing_team",
    checkpointer
  });
}
