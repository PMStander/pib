import { ToolRegistry } from "../../core/ToolRegistry";
import { supportTools } from "./index";

/**
 * Register all customer support tools with the tool registry
 */
export function registerSupportTools(): void {
  const registry = ToolRegistry.getInstance();
  
  // Register the ticketing system tool
  registry.registerTool("ticketing_system", supportTools[0], {
    id: "ticketing_system",
    version: "1.0",
    name: "Ticketing System Tool",
    description: "Creates and manages support tickets",
    category: ["support", "tickets"],
    requiresAuth: false
  });
  
  registry.registerTool("knowledge_base", supportTools[1], {
    id: "knowledge_base",
    version: "1.0",
    name: "Knowledge Base Tool",
    description: "Searches and retrieves knowledge base articles",
    category: ["support", "knowledge"],
    requiresAuth: false
  });
  
  console.log("Customer Support tools registered successfully");
}
