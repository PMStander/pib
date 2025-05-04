import { createSupervisor } from "@langchain/langgraph-supervisor";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createContentDepartment } from "./departments/content";
import { z } from "zod";

// Zod schema for CEO response
export const CEOResponseSchema = z.object({
  task: z.string().describe("The task that was processed"),
  result: z.string().describe("The result of the task"),
  department: z.string().describe("The department that handled the task")
});

/**
 * Creates the CEO that coordinates all departments
 */
export function createCEO(userId: string, workspaceId: string | null = null, authToken: string, openaiKey: string, chatId: string | null = null) {
  // Initialize the LLM
  const model = new ChatOpenAI({
    apiKey: openaiKey,
    modelName: "gpt-4o"
  });

  // Create the content department
  const contentDepartment = createContentDepartment(userId, workspaceId, authToken, openaiKey);

  // CEO supervisor prompt
  const ceoPrompt = `
    You are the CEO of Partners in Biz, coordinating the following departments:
    - content_department: Handles all content creation and management tasks

    Based on the user request, decide which department should handle the task.

    For document-related tasks (e.g., creating, editing, polishing documents), assign to content_department.

    Always return your decision in the following JSON format:
    {
      "task": "<task description>",
      "result": "<task result>",
      "department": "<assigned department name>"
    }

    Always include the chat ID (${chatId}) in your task description to ensure proper document linking.
  `;

  // Create and compile the CEO
  const ceo = createSupervisor({
    agents: [contentDepartment],
    llm: model,
    prompt: ceoPrompt
  });

  const checkpointer = new MemorySaver();
  return ceo.compile({
    name: "ceo",
    checkpointer
  });
}
