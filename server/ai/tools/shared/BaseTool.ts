import { Tool } from "@langchain/core/tools";
import { ITool } from "../../core/types/tool";

/**
 * Base abstract class for all tools in the system
 */
export abstract class BaseTool extends Tool implements ITool {
  id: string;
  
  constructor(id: string, name: string, description: string) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
  }
  
  /**
   * Run the tool with the given input
   * @param input The input to the tool
   */
  async run(input: string): Promise<any> {
    return this._call(input);
  }
  
  /**
   * Helper method for error handling
   * @param error The error to handle
   * @param operation The operation that caused the error
   */
  protected handleError(error: any, operation: string): string {
    console.error(`Error in ${this.name} during ${operation}:`, error);
    return `Error in ${this.name} during ${operation}: ${error.message || 'Unknown error'}`;
  }
}
