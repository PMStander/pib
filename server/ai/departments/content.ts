import { createSupervisor } from "@langchain/langgraph-supervisor";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createWritingTeam } from "../teams/writing";

/**
 * Creates a content department with specialized teams for different content types
 */
export function createContentDepartment(userId: string, workspaceId: string | null = null, authToken: string, openaiKey: string) {
  // Initialize the LLM
  const model = new ChatOpenAI({
    apiKey: openaiKey,
    modelName: "gpt-4o"
  });

  // Create the writing team
  const writingTeam = createWritingTeam(userId, workspaceId, authToken, openaiKey);

  // Content department supervisor prompt
  const contentDepartmentPrompt = `
    You are a content department supervisor managing the following teams:
    - writing_team: Handles document creation, editing, and enhancement

    Based on the user request, decide which team should handle the task.

    For document-related tasks (e.g., creating, editing, polishing documents), assign to writing_team.

    Always return your decision in the following JSON format:
    {
      "task": "<task description>",
      "result": "<task result>",
      "agent": "<assigned team name>"
    }
  `;

  // Create and compile the content department
  const contentDepartment = createSupervisor({
    agents: [writingTeam],
    llm: model,
    prompt: contentDepartmentPrompt
  });

  const checkpointer = new MemorySaver();
  return contentDepartment.compile({
    name: "content_department",
    checkpointer
  });
}
