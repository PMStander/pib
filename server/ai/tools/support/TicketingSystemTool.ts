import { StructuredTool } from "@langchain/core/tools";
import { z } from "zod";

/**
 * Tool for managing support tickets
 */
export class TicketingSystemTool extends StructuredTool {
  name = "ticketing_system";
  description = "Creates and manages support tickets";
  
  schema = z.object({
    ticketInfo: z.string().describe("JSON string containing ticket information")
  });
  
  constructor() {
    super();
  }
  
  /**
   * Create or update a support ticket
   * @param input A JSON string containing ticket information
   */
  async _call({ ticketInfo }: { ticketInfo: string }): Promise<string> {
    try {
      // Parse ticket information
      const ticket = JSON.parse(ticketInfo);
      
      // Process the ticket and generate a response
      const result = this.processTicket(ticket);
      
      return JSON.stringify(result, null, 2);
    } catch (error) {
      return `Error processing ticket: ${error.message}`;
    }
  }
  
  /**
   * Process a ticket and generate a ticket record
   * @param ticket The ticket information object
   */
  private processTicket(ticket: any): any {
    // Generate a ticket ID if not provided
    const ticketId = ticket.id || this.generateTicketId();
    
    // Set default values for missing fields
    const subject = ticket.subject || "Support Request";
    const category = ticket.category || this.determineCategory(subject);
    const priority = ticket.priority || this.determinePriority(subject, category);
    const status = ticket.status || "New";
    const description = ticket.description || "No description provided";
    
    // Generate SLA targets based on priority
    const slaTargets = this.generateSLATargets(priority);
    
    // Determine the assignee group based on category
    const assigneeGroup = this.determineAssigneeGroup(category);
    
    // Create the ticket record
    return {
      ticket_id: ticketId,
      subject: subject,
      category: category,
      priority: priority,
      status: status,
      description: description,
      customer: {
        name: ticket.customer_name || "Customer",
        email: ticket.customer_email || "customer@example.com"
      },
      sla: slaTargets,
      assignee_group: assigneeGroup,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      next_steps: [
        "Support agent will review your ticket",
        "You will receive updates via email",
        "You can check status using your ticket ID"
      ]
    };
  }
  
  /**
   * Generate a unique ticket ID
   */
  private generateTicketId(): string {
    const prefix = "TKT";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${timestamp}-${random}`;
  }
  
  /**
   * Determine the ticket category based on the subject
   * @param subject The ticket subject
   */
  private determineCategory(subject: string): string {
    const subjectLower = subject.toLowerCase();
    
    if (subjectLower.includes('login') || subjectLower.includes('password') || subjectLower.includes('account')) {
      return "Account";
    } else if (subjectLower.includes('payment') || subjectLower.includes('billing') || subjectLower.includes('subscription')) {
      return "Billing";
    } else if (subjectLower.includes('error') || subjectLower.includes('bug') || subjectLower.includes('crash')) {
      return "Technical Issue";
    } else if (subjectLower.includes('feature') || subjectLower.includes('enhancement') || subjectLower.includes('suggestion')) {
      return "Feature Request";
    } else if (subjectLower.includes('question') || subjectLower.includes('how to') || subjectLower.includes('help with')) {
      return "General Inquiry";
    } else {
      return "General";
    }
  }
  
  /**
   * Determine the ticket priority based on the subject and category
   * @param subject The ticket subject
   * @param category The ticket category
   */
  private determinePriority(subject: string, category: string): string {
    const subjectLower = subject.toLowerCase();
    
    // High priority indicators
    if (
      subjectLower.includes('urgent') || 
      subjectLower.includes('critical') || 
      subjectLower.includes('emergency') ||
      subjectLower.includes('down') ||
      subjectLower.includes('not working')
    ) {
      return "High";
    }
    
    // Category-based priority
    switch (category) {
      case "Technical Issue":
        return "Medium";
      case "Billing":
        return "Medium";
      case "Feature Request":
        return "Low";
      case "Account":
        return "Medium";
      default:
        return "Low";
    }
  }
  
  /**
   * Generate SLA targets based on priority
   * @param priority The ticket priority
   */
  private generateSLATargets(priority: string): any {
    const now = new Date();
    
    // Initial response target
    let responseHours;
    switch (priority.toLowerCase()) {
      case 'high':
        responseHours = 1;
        break;
      case 'medium':
        responseHours = 4;
        break;
      case 'low':
        responseHours = 8;
        break;
      default:
        responseHours = 8;
    }
    
    // Resolution target
    let resolutionHours;
    switch (priority.toLowerCase()) {
      case 'high':
        resolutionHours = 24;
        break;
      case 'medium':
        resolutionHours = 48;
        break;
      case 'low':
        resolutionHours = 72;
        break;
      default:
        resolutionHours = 72;
    }
    
    // Calculate target times
    const responseTarget = new Date(now.getTime() + responseHours * 60 * 60 * 1000);
    const resolutionTarget = new Date(now.getTime() + resolutionHours * 60 * 60 * 1000);
    
    return {
      first_response: {
        target_hours: responseHours,
        target_time: responseTarget.toISOString()
      },
      resolution: {
        target_hours: resolutionHours,
        target_time: resolutionTarget.toISOString()
      }
    };
  }
  
  /**
   * Determine the assignee group based on category
   * @param category The ticket category
   */
  private determineAssigneeGroup(category: string): string {
    switch (category) {
      case "Account":
        return "Account Management Team";
      case "Billing":
        return "Billing Support Team";
      case "Technical Issue":
        return "Technical Support Team";
      case "Feature Request":
        return "Product Management Team";
      default:
        return "General Support Team";
    }
  }
}
