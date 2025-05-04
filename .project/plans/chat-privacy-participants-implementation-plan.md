# Chat Privacy and Participants Implementation Plan

## Overview
This plan outlines the implementation of chat privacy settings and participant management in the chat interface, allowing users to control who can access their conversations and add participants to chats.

## Phase 1: Core Privacy and Participant Types

### 1.1 Privacy and Participant Types (Estimated time: 0.5 day)
- Create new types in `types/chat.ts`:
  ```typescript
  // Chat privacy types
  export enum ChatPrivacy {
    PUBLIC = 'public',
    PRIVATE = 'private'
  }

  export interface ChatParticipant {
    id: string;
    name: string;
    email?: string;
    avatarUrl?: string;
    role: 'owner' | 'editor' | 'viewer';
    joinedAt: Date;
  }

  // Extend ChatSession to include privacy and participants
  export interface ChatSession {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    privacy: ChatPrivacy;
    ownerId: string;
    participants: ChatParticipant[];
    // other properties...
  }
  ```

### 1.2 Chat Session Management (Estimated time: 1 day)
- Create `composables/useChatSession.ts`:
  - Functions for creating and managing chat sessions
  - Privacy setting management
  - Participant management
  - Session persistence

## Phase 2: Privacy Controls

### 2.1 Privacy Selector Component (Estimated time: 1 day)
- Create `components/chat/PrivacySelector.vue`:
  - Dropdown for selecting privacy setting
  - Visual indicators for current privacy
  - Tooltips explaining privacy options
  - Follow neumorphic design system

### 2.2 Privacy Management (Estimated time: 1 day)
- Update `server/api/chat/sessions.ts`:
  - Add endpoints for updating privacy settings
  - Implement access control based on privacy
  - Add validation for privacy changes
  - Include privacy in session metadata

## Phase 3: Participant Management

### 3.1 Participant List Component (Estimated time: 1 day)
- Create `components/chat/ParticipantList.vue`:
  - Display current participants
  - Show participant roles
  - Include owner indicators
  - Follow neumorphic design system

### 3.2 Participant Manager Component (Estimated time: 2 days)
- Create `components/chat/ParticipantManager.vue`:
  - Interface for adding participants
  - Email input for invitations
  - Role selection for new participants
  - Participant removal functionality
  - Follow neumorphic design system

### 3.3 Participant Management API (Estimated time: 2 days)
- Create `server/api/chat/participants.ts`:
  - Endpoints for adding participants
  - Participant removal functionality
  - Role management
  - Email invitation system

## Phase 4: Integration with Chat Interface

### 4.1 Update Chat Interface (Estimated time: 1 day)
- Modify `components/chat/ChatInterface.vue`:
  - Add privacy selector to the top of the chat
  - Include participant management button
  - Handle privacy and participant changes
  - Update UI based on current settings

### 4.2 Participant Modal (Estimated time: 1 day)
- Create `components/chat/ParticipantModal.vue`:
  - Modal for managing participants
  - Include participant list
  - Add participant manager
  - Follow neumorphic design system

### 4.3 Integration with Chat Agency (Estimated time: 1 day)
- Update `composables/useChatAgency.ts`:
  - Add privacy and participant information to WebSocket
  - Handle participant-specific messages
  - Update access control based on privacy
  - Include participant information in chat context

## Phase 5: Server-Side Implementation

### 5.1 Update WebSocket Handler (Estimated time: 1 day)
- Modify `server/api/chat/main.ts`:
  - Add participant validation
  - Implement privacy-based access control
  - Include participant information in responses
  - Handle participant-specific events

### 5.2 Chat Session Storage (Estimated time: 1 day)
- Update `server/api/chat/sessions.ts`:
  - Add privacy and participant storage
  - Implement query filters based on privacy
  - Add participant-based access control
  - Include privacy in session metadata

### 5.3 Integration and Testing (Estimated time: 1 day)
- Connect all components:
  - Link privacy controls to session management
  - Connect participant manager to API
  - Test access control with different privacy settings
  - Verify participant management functionality

## Testing Plan
1. Unit tests for privacy and participant components
2. Integration tests for session management
3. End-to-end tests for privacy controls
4. Access control testing with different user roles

## Implementation Sequence
1. Start with core privacy and participant types
2. Implement privacy selector component
3. Add participant list and manager components
4. Update chat interface with new controls
5. Implement server-side privacy and participant management
6. Final integration and testing

## Success Criteria
- Users can set chat privacy to public or private
- Private chats are only accessible to participants
- Users can add and remove participants
- Participants can be assigned different roles
- UI clearly indicates current privacy setting
- All functionality follows the neumorphic design system
