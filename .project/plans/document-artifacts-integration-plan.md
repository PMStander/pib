# Document Artifacts Integration Plan

## Overview
This plan outlines the steps to integrate the already implemented document artifact components into the chat interface. The document artifact system allows users to create, view, edit, and receive suggestions for documents within the chat.

## Current Status
- Core document types have been created in `types/documents.ts`
- DocumentPreview.vue component has been implemented
- DocumentView.vue component has been implemented
- These components follow the neumorphic design system

## Integration Steps

### 1. Update ChatMessage Type (Estimated time: 0.5 day)
- Modify `types/chat.ts` to ensure ChatMessage includes document artifacts:
  ```typescript
  export interface ChatMessage {
    id: string;
    text: string;
    sender: MessageSender;
    timestamp: Date;
    hasResults?: boolean;
    profileResults?: any[];
    businessResults?: any[];
    preferenceResults?: any[];
    documentArtifact?: DocumentArtifact;
    documentSuggestions?: DocumentSuggestion[];
  }
  ```

### 2. Update ChatInterface.vue (Estimated time: 1 day)
- Modify `components/chat/ChatInterface.vue` to handle document artifacts:
  - Add conditional rendering for document artifacts in messages
  - Include DocumentPreview component for messages with document artifacts
  - Add document-related actions to the message display
  - Update the message rendering logic to handle different message types

### 3. Create DocumentModal Component (Estimated time: 0.5 day)
- Create `components/chat/DocumentModal.vue`:
  - Wrapper for DocumentView component
  - Handle modal open/close logic
  - Manage document state during editing
  - Pass document updates back to the chat interface

### 4. Update useChatAgency.ts (Estimated time: 1 day)
- Modify `composables/useChatAgency.ts`:
  - Add methods for handling document artifacts
  - Update message processing to include document artifacts
  - Add document-related WebSocket message types
  - Handle document updates and suggestions

### 5. Create Document Generation Tool (Estimated time: 1 day)
- Create `server/ai/tools/shared/DocumentGenerationTool.ts`:
  - Implement document generation logic
  - Add support for different formats (text, markdown, HTML)
  - Include template processing
  - Add metadata handling

### 6. Update WebSocket Handler (Estimated time: 1 day)
- Modify `server/api/chat/main.ts`:
  - Add support for document-related message types
  - Implement document artifact creation
  - Add document state management
  - Handle document update messages

### 7. Add Document Commands to Chat (Estimated time: 0.5 day)
- Update chat interface to recognize document-related commands:
  - `/document create [title]` - Create a new document
  - `/document edit [id]` - Edit an existing document
  - `/document polish [id]` - Request improvements for a document
  - `/document suggest [id]` - Request targeted suggestions for a document

### 8. Testing and Refinement (Estimated time: 1 day)
- Test document creation, viewing, and editing
- Ensure proper rendering of different document formats
- Verify document state management
- Test document-related commands
- Optimize performance for large documents

## Implementation Sequence
1. Update ChatMessage type to include document artifacts
2. Modify ChatInterface.vue to handle document artifacts
3. Create DocumentModal component
4. Update useChatAgency.ts to handle document artifacts
5. Create Document Generation Tool
6. Update WebSocket handler for document-related messages
7. Add document commands to chat
8. Test and refine the implementation

## Success Criteria
- Users can request document generation in chat
- Documents are displayed in a preview format in chat messages
- Users can expand documents to full view
- Documents can be edited and updated
- All functionality follows the neumorphic design system
- Performance remains smooth with large documents

## Dependencies
- Existing DocumentPreview.vue component
- Existing DocumentView.vue component
- Document types in types/documents.ts
- WebSocket communication layer
- LangGraph multi-agent system

## Estimated Timeline
- Total estimated time: 6.5 days
- Can be completed in 1-2 weeks depending on resource allocation
