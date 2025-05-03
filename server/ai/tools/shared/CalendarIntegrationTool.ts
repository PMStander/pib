import { BaseTool } from "./BaseTool";

interface CalendarEvent {
  title: string;
  start: string; // ISO format date-time
  end: string; // ISO format date-time
  description?: string;
  location?: string;
  attendees?: string[];
}

/**
 * Tool for integrating with calendar systems
 */
export class CalendarIntegrationTool extends BaseTool {
  private userId: string;
  
  constructor(id: string, userId: string) {
    super(
      id,
      "calendar_integration",
      "Integrates with calendar systems to manage events"
    );
    
    this.userId = userId;
  }
  
  async _call(input: string): Promise<string> {
    try {
      // Check if input is a JSON object
      let isJsonObject = false;
      let parsedInput: any;
      
      try {
        parsedInput = JSON.parse(input);
        isJsonObject = typeof parsedInput === 'object' && parsedInput !== null;
      } catch {
        // Not JSON, handle as command string
      }
      
      if (isJsonObject && parsedInput.action) {
        return this.handleAction(parsedInput);
      }
      
      // Handle text commands
      if (input.toLowerCase().includes('create event') || input.toLowerCase().includes('add event')) {
        return "To create an event, please provide event details in JSON format with action: 'create'.";
      } else if (input.toLowerCase().includes('list events') || input.toLowerCase().includes('get events')) {
        return this.mockListEvents();
      } else if (input.toLowerCase().includes('find time') || input.toLowerCase().includes('free time')) {
        return this.mockFindFreeTime();
      }
      
      return "Unsupported command. Available commands: create event, list events, find free time.";
    } catch (error) {
      return this.handleError(error, "calendar operation");
    }
  }
  
  private handleAction(action: any): string {
    switch (action.action) {
      case 'create':
        return this.mockCreateEvent(action as CalendarEvent);
      case 'list':
        return this.mockListEvents();
      case 'find_free_time':
        return this.mockFindFreeTime();
      default:
        return `Unsupported action: ${action.action}`;
    }
  }
  
  private mockCreateEvent(event: CalendarEvent): string {
    // Validate required fields
    if (!event.title || !event.start || !event.end) {
      return "Missing required fields: title, start, and end";
    }
    
    // In a real implementation, you would create the event in the calendar system
    return `Event created successfully: "${event.title}" from ${event.start} to ${event.end}`;
  }
  
  private mockListEvents(): string {
    // In a real implementation, you would fetch events from the calendar system
    return "Upcoming events:\n\n" +
      "1. Team Meeting - Monday, 10:00 AM to 11:00 AM\n" +
      "2. Client Call - Monday, 2:00 PM to 3:00 PM\n" +
      "3. Project Review - Tuesday, 11:00 AM to 12:00 PM";
  }
  
  private mockFindFreeTime(): string {
    // In a real implementation, you would analyze the calendar to find free time
    return "Available time slots:\n\n" +
      "Today: 12:00 PM to 2:00 PM\n" +
      "Today: 4:00 PM to 5:00 PM\n" +
      "Tomorrow: 9:00 AM to 10:00 AM";
  }
}
