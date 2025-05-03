import { TicketingSystemTool } from "./TicketingSystemTool";
import { KnowledgeBaseTool } from "./KnowledgeBaseTool";

export {
  TicketingSystemTool,
  KnowledgeBaseTool
};

// Create and export instances of the tools
export const ticketingSystemTool = new TicketingSystemTool();
export const knowledgeBaseTool = new KnowledgeBaseTool();

// Export all tools in an array for easy registration
export const supportTools = [
  ticketingSystemTool,
  knowledgeBaseTool
];
