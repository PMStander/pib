// server/utils/supervisorWorkflow.js
import { createSupervisor } from "@langchain/langgraph-supervisor";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { MemorySaver } from "@langchain/langgraph";

// Zod schema for supervisor response
export const SupervisorResponseSchema = z.object({
  task: z.string().describe("The task that was processed"),
  result: z.union([
    z.number().describe("Numerical result for math tasks"),
    z.string().describe("Textual result for research tasks"),
  ]),
  agent: z.string().describe("The agent that handled the task"),
});

// Define tools
const add = tool(
  async (args) => args.a + args.b,
  {
    name: "add",
    description: "Add two numbers.",
    schema: z.object({ a: z.number(), b: z.number() }),
  }
);

const multiply = tool(
  async (args) => args.a * args.b,
  {
    name: "multiply",
    description: "Multiply two numbers.",
    schema: z.object({ a: z.number(), b: z.number() }),
  }
);

const webSearch = tool(
  async (args) => `Search results for ${args.query}`,
  {
    name: "webSearch",
    description: "Search the web for information.",
    schema: z.object({ query: z.string() }),
  }
);
const cnf = useRuntimeConfig();
console.log('======> CONFIG KEY', cnf.openaiKey)
// Initialize model and agents
const model = new ChatOpenAI({ apiKey: cnf.openaiKey, modelName: "gpt-4o" });
const mathAgent = createReactAgent({  name: "math_expert",
    prompt: "You are a math expert. Always use one tool at a time.", llm: model, tools: [add, multiply] });
const researchAgent = createReactAgent({name: "research_expert",
    prompt: "You are a world class researcher with access to web search. Do not do any math.", llm: model, tools: [webSearch] });

// Supervisor prompt
const supervisorPrompt = `
  You are a team supervisor managing the following workers: {members}.
  Based on the user request, decide which worker should handle the task next.
  Each worker will execute the task and return a result.
  Always return your decision in the following JSON format:
  {
    "task": "<task description>",
    "result": "<task result, number or string>",
    "agent": "<assigned agent name>"
  }
`;

// Create and compile workflow
export function createWorkflow() {
  const workflow = createSupervisor({
    agents: [researchAgent, mathAgent],
    llm: model,
    prompt: supervisorPrompt,
  });

  const checkpointer = new MemorySaver();
  return workflow.compile({ checkpointer });
}