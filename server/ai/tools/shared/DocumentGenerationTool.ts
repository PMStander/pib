import { BaseTool } from "./BaseTool";

interface DocumentRequest {
  template: string;
  variables: Record<string, any>;
  format?: 'text' | 'html' | 'markdown' | 'pdf';
}

/**
 * Tool for generating documents from templates
 */
export class DocumentGenerationTool extends BaseTool {
  constructor(id: string) {
    super(
      id,
      "document_generation",
      "Generates documents from templates with variable substitution"
    );
  }
  
  async _call(input: string): Promise<string> {
    try {
      // Parse the input as JSON
      let request: DocumentRequest;
      try {
        request = JSON.parse(input);
      } catch (error) {
        return "Invalid input. Please provide a JSON object with template, variables, and optional format.";
      }
      
      const { template, variables, format = 'text' } = request;
      
      if (!template || !variables) {
        return "Missing required fields: template and variables";
      }
      
      // Process the template by replacing variables
      let document = template;
      
      for (const [key, value] of Object.entries(variables)) {
        const placeholder = `{{${key}}}`;
        document = document.replace(new RegExp(placeholder, 'g'), String(value));
      }
      
      // In a real implementation, you would handle different formats
      // For now, we'll just return the text
      
      return `Generated document (${format}):\n\n${document}`;
    } catch (error) {
      return this.handleError(error, "document generation");
    }
  }
}
