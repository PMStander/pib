# Active Context: LangGraph Multi-Agent System with WebSocket Communication

## Context
This document tracks the current work focus and state of the "Partners in Biz" project.

## Current Focus
- Implementing LangGraph-based multi-agent system for AI chat
- Creating WebSocket communication layer between frontend and backend
- Developing department and team structure for AI agents
- Enhancing AI chat interface with real-time communication
- Implementing specialized agents for different business functions
- Integrating vector search capabilities with LangGraph agents
- Implementing secure LLM key management system
- Creating UI components for managing LLM keys
- Integrating with multiple LLM providers
- Enhancing AI capabilities of the application
- Improving security for sensitive API keys

## Project State
- Basic Nuxt.js application structure is in place
- Neumorphic UI components have been implemented (Button, Card, Input, Toggle, Checkbox, Radio, Select, Modal, DatePicker, Slider)
- Memory Bank directory structure is populated with task logs
- Project is in active development stage
- Form validation with Zod has been implemented
- Firebase authentication has been integrated
- Login, signup, and password reset functionality is working
- Protected routes with authentication middleware are implemented
- Basic dashboard for authenticated users is in place
- Migrated from Firebase DataConnect to Firestore for data storage
- Implemented Firestore schema for users, workspaces, profiles, and other entities
- Created useFirestore composable for data access with Firestore
- Updated useDataConnect as a compatibility layer that uses useFirestore internally
- Implemented vector search using Firestore's findNearest method
- Created Cloud Functions for server-side vector search
- Implemented client-side composable for interacting with Cloud Functions
- Added fallback mechanisms for when Cloud Functions are not available
- Form components have been refactored into dedicated components
- Fixed readonly warnings in NeumorphicInput component
- Created reusable modal component for consistent UI
- Expanded neumorphic component library with Checkbox, Radio, and Select components
- Implemented dark mode support with theme toggle
- Created reusable page components structure
- Added DatePicker and Slider components
- Refactored dashboard to use page component
- Implemented email verification functionality
- Created user profile management with update capabilities
- Fixed component resolution warnings
- Enhanced Firebase auth composable with additional methods
- Fixed import issue in dark mode plugin using Nuxt's recommended import pattern
- Implemented workspace management features with component-based architecture
- Created workspace card, form, and invite components
- Developed a comprehensive workspaces page with filtering and pagination
- Fixed issues with workspaces not showing up in the dashboard
- Implemented Nuxt's useState for better state management of shared data
- Created a new useAppState composable for centralized state management
- Updated useDataConnect and useFirebaseAuth to use the app state
- Enhanced sign-out method to properly clear the app state
- Removed duplicate Firebase connector dependency from package.json
- Implemented vector search functionality with mock data for testing
- Added cross-entity matching between profiles and businesses
- Created a simple text similarity function for mock searches
- Added proper error handling and loading states for search operations
- Implemented AI chat interface for interacting with vector search
- Created natural language processing utilities for query understanding
- Added response generation for formatting search results as natural language
- Implemented a chat composable for managing conversation state
- Created a navigation component for improved user experience
- Added a dedicated chat page with feature cards
- Fixed authentication issues in the chat page
- Fixed workspaces display issues in the workspaces tab
- Standardized authentication handling across pages
- Improved state management consistency for workspaces data
- Implemented secure LLM key management system with AES-256-GCM encryption
- Created UI components for managing LLM keys at user, profile, and workspace levels
- Added settings pages for managing LLM keys
- Implemented utilities for integrating with multiple LLM providers
- Added support for OpenAI, Anthropic, Gemini, Ollama, and XAI

## Next Steps
1. Deploy and test Cloud Functions:
   - Deploy the Cloud Functions to Firebase
   - Test the embedding generation with real data
   - Optimize the embedding generation process
   - Add more comprehensive testing for the Cloud Functions

2. Integrate LLM key management with chat interface:
   - Connect the chat interface to use the configured LLM providers
   - Implement fallback mechanisms when keys are not available
   - Add provider selection in the chat interface
   - Implement streaming responses for supported providers

3. Enhance AI chat interface:
   - Improve NLP capabilities with more sophisticated techniques
   - Add support for follow-up questions and conversation context
   - Implement more advanced response generation with better explanations
   - Add support for more complex queries and entity extraction
   - Integrate with a real NLP service for better query understanding

4. Enhance LLM key management:
   - Implement key validation before saving
   - Add key usage analytics to track API usage
   - Consider adding key rotation and expiration features
   - Implement more robust error handling for encryption/decryption failures

5. Implement workspace detail page:
   - Create workspace detail view
   - Add member management functionality
   - Implement workspace settings
   - Create business profile management

6. Prepare for production deployment:
   - Set up CI/CD pipeline
   - Configure production environment
   - Implement error tracking and monitoring
   - Optimize performance and bundle size

## Last Updated
- Date: May 10, 2024
- Session: Fix Signup Process and Workspace Display Issues

## Session Summary (2024-05-10)
In this session, we fixed issues with the signup process and workspace creation/display, and updated the Cloud Functions code to use mock embeddings until Vertex AI integration is properly implemented.

### Key Accomplishments:
- Fixed the signup process by creating a new useSessionServer composable and updating the server-side session endpoints
- Fixed workspace creation and display issues by improving the useFirestore.ts composable and server-side API endpoints
- Updated the Cloud Functions code to use mock embeddings for now
- Added extensive logging throughout the codebase to help with debugging
- Improved error handling and edge case management in the server-side API endpoints

### Technical Details:
- Created a new useSessionServer.ts composable for managing server-side sessions
- Updated the signup.vue and login.vue files to use the new composable
- Fixed the server-side session endpoints for setting and clearing sessions
- Added checks to avoid creating duplicate user records
- Updated the fetchUserWorkspaces function to properly handle workspace memberships
- Updated the createWorkspace function to properly create workspaces
- Updated the dashboard.vue file to properly fetch and display workspaces
- Added a handler for the userId filter in the server-side API
- Added more logging to the read.post.ts and write.post.ts files
- Fixed the workspace_id requirement in the write.post.ts file
- Improved the document creation process in the write.post.ts file

### Implementation Approach:
- Analyzed the existing code to understand the issues
- Created a new composable for server-side session management
- Added extensive logging to help with debugging
- Updated the server-side API endpoints to be more robust
- Fixed both client-side and server-side issues
- Improved error handling and edge case management

### Next Steps:
1. Deploy and test the Cloud Functions with the mock embeddings
2. Implement proper Vertex AI integration for embedding generation
3. Add comprehensive testing for the signup process and workspace creation
4. Improve error handling and user feedback during signup and workspace creation
5. Consider adding more validation to the server-side API endpoints

## Session Summary (2024-05-09)
In this session, we implemented actual embedding generation using Google's Vertex AI in the Cloud Functions. We replaced the mock implementation with a real Vertex AI integration while maintaining fallback capabilities.

### Key Accomplishments:
- Implemented Vertex AI embedding generation in the generateEmbeddings Cloud Function
- Added proper error handling with fallback to mock embeddings when Vertex AI fails
- Created a new generateAndStore function that combines embedding generation and document storage
- Added detailed documentation and comments explaining the implementation

### Technical Details:
- Used the @google-cloud/aiplatform package to interact with Vertex AI
- Implemented the textembedding-gecko@003 model for high-quality text embeddings
- Added proper error handling and fallback mechanisms
- Created a combined function for generating embeddings and storing documents in one operation

### Implementation Approach:
- Analyzed existing code and examples in the codebase
- Implemented Vertex AI integration with proper error handling
- Added fallback to mock embeddings when Vertex AI fails
- Created a new utility function for combined operations
- Added detailed documentation and comments

### Next Steps:
1. Deploy the Cloud Functions to Firebase
2. Test the embedding generation with real data
3. Optimize the embedding generation process
4. Add more comprehensive testing for the Cloud Functions

## Session Summary (2024-05-08 - Part 2)
In this session, we implemented server-side vector search using Firebase Cloud Functions. We created three Cloud Functions:

1. **vectorSearch**: Performs vector search using Firestore's findNearest method
2. **generateEmbeddings**: Generates embeddings for text (currently using a mock implementation)
3. **storeWithEmbeddings**: Stores documents with embeddings in Firestore

We also created a client-side composable (useCloudFunctions.ts) for interacting with these Cloud Functions and updated the useVectorSearch composable to use the Cloud Functions with fallback to the client-side implementation.

### Key Accomplishments:
- Implemented server-side vector search using Cloud Functions
- Created a client-side composable for interacting with Cloud Functions
- Added fallback mechanisms for when Cloud Functions are not available
- Added detailed comments explaining how to implement embedding generation with Vertex AI

### Technical Details:
- Used the Firebase Admin SDK in Cloud Functions to access Firestore's findNearest method
- Created a mock implementation for embedding generation that can be replaced with Vertex AI
- Added proper error handling and fallback mechanisms
- Maintained backward compatibility with the existing vector search implementation

### Implementation Approach:
- Created Cloud Functions for vector search, embedding generation, and document storage
- Created a client-side composable for interacting with the Cloud Functions
- Updated the useVectorSearch composable to use the Cloud Functions with fallback
- Added detailed comments explaining how to implement embedding generation with Vertex AI

### Next Steps:
1. Deploy the Cloud Functions to Firebase
2. Test the vector search implementation with real data
3. Implement actual embedding generation using Vertex AI
4. Add more comprehensive testing for the Cloud Functions

## Session Summary (2024-05-08 - Part 1)
In this session, we completed the migration from Firebase DataConnect to Firestore by updating the vector search implementation and removing remaining DataConnect dependencies.

### Key Accomplishments:
1. Updated the vector search implementation in server/api/data/read.post.ts to use Firestore's findNearest method
2. Updated the useVectorSearch.ts composable to use Firestore instead of DataConnect
3. Removed DataConnect dependencies from package.json
4. Removed DataConnect-related scripts from package.json
5. Updated documentation to reflect the migration to Firestore

### Technical Details:
- Implemented proper vector search using Firestore's findNearest method with cosine similarity
- Added type assertions in useVectorSearch.ts to handle the transition from DataConnect types to Firestore types
- Maintained backward compatibility with existing code
- Ensured proper error handling for vector search operations

### Implementation Approach:
- Analyzed the existing vector search implementation to understand its structure
- Updated the vectorSearch function to use Firestore's findNearest method
- Updated the useVectorSearch.ts composable to use the new implementation
- Removed all direct dependencies on DataConnect
- Updated documentation to reflect the changes

### Next Steps:
1. Test the vector search implementation with real data
2. Optimize vector search performance
3. Enhance the AI chat interface to better leverage vector search capabilities
4. Consider implementing more advanced vector search features

## Session Summary (2024-05-07)
In this session, we successfully updated the `useFirestore.ts` composable to use server API endpoints instead of direct Firestore access. This architectural improvement enhances security by ensuring all database operations go through the server API.

### Key Accomplishments:
1. Removed direct Firestore imports and dependencies
2. Updated all methods to use the `/api/data/` endpoints:
   - `read.post.ts` for fetching data
   - `write.post.ts` for creating data
   - `update.post.ts` for updating data
3. Added proper type handling and error management
4. Ensured compatibility with both camelCase and snake_case field names
5. Fixed date conversions and authentication handling

### Technical Details:
- Server API endpoints were already implemented, which made this transition smoother
- The endpoints handle authentication, data validation, vector search capabilities, and all CRUD operations
- Updated methods include:
  - `fetchCurrentUser`
  - `fetchUserProfiles`
  - `fetchUserWorkspaces`
  - `createWorkspace`
  - `createProfile`
  - `inviteToWorkspace`
  - `ensureUserExists`
  - `vectorSearch`

### Implementation Approach:
- Analyzed existing server API endpoints to understand their structure and requirements
- Updated each method in useFirestore.ts to use the appropriate endpoint
- Added proper error handling and type casting for API responses
- Ensured backward compatibility with existing code that uses the composable
- Fixed TypeScript errors and warnings

### Next Steps:
1. Test the updated functionality to ensure all operations work correctly
2. Consider updating other components that might still use direct Firestore access
3. Add comprehensive error handling for API responses
4. Continue implementing vector search capabilities for AI-data interaction

## Session Summary (2024-05-06)
In this session, we first migrated from Firebase DataConnect to Firestore due to persistent emulator issues, and then analyzed the server-side data management system to understand how to integrate it with our client-side code.

### Key Observations:
1. DataConnect Emulator Issues:
   - DataConnect emulator was crashing with SIGINT signals
   - Multiple attempts to fix the emulator issues were unsuccessful
   - Port mismatch between firebase.json (9499) and useFirebase.ts (9498) was identified but fixing it didn't resolve the issues

2. Server-Side Data Management:
   - The application has a robust server-side API for CRUD operations
   - Authentication tokens from Firebase need to be passed to the server
   - Vector search capabilities are implemented through embedding generation
   - Session management is handled through cookies

3. Implementation Approach:
   - Created a new useFirestore.ts composable that implements the same functionality as useDataConnect.ts
   - Updated useDataConnect.ts to serve as a compatibility layer that uses useFirestore.ts internally
   - Added vector search capability to both composables
   - Documented the server-side data management system for future reference

## Session Summary (2024-05-04)
In this session, we fixed authentication issues in the chat page and workspaces display issues in the workspaces tab. We also implemented an AI chat interface for interacting with the vector search functionality.

### Key Observations:
1. Authentication Issues:
   - The chat page was using onMounted to check authentication, which was too late
   - The workspaces page was using a local ref with mock data instead of app state
   - Different pages had inconsistent approaches to authentication handling

2. Implementation Challenges:
   - Ensuring consistent state management across pages
   - Fixing timing issues with data fetching
   - Integrating the chat interface with the vector search functionality

3. Implementation Approach:
   - Standardized authentication handling across pages
   - Used computed properties to access app state consistently
   - Added proper data fetching sequence to ensure data is available
   - Created a modular architecture for the chat interface

### Implementation Details:
1. Authentication Fixes:
   - Updated the chat page to use conditional rendering for authentication checks
   - Fixed the workspaces page to use the app state for workspaces data
   - Added proper data fetching in both pages
   - Improved error handling and loading states

2. Chat Interface Implementation:
   - Created a responsive chat interface with message bubbles
   - Implemented a useChat composable for managing chat state
   - Added natural language processing utilities for query understanding
   - Created response generation utilities for formatting search results

3. Navigation and Layout:
   - Created a MainNavigation component for easy access to all pages
   - Updated the default layout to include the navigation
   - Ensured responsive design for mobile and desktop
   - Added proper loading states and error handling

## Current State
The application has been fully migrated from Firebase DataConnect to Firestore for data storage and vector search capabilities. All database operations now go through server API endpoints (`/api/data/write`, `/api/data/read`, `/api/data/update`) which enhances security by ensuring proper authentication and validation.

Vector search has been implemented in two ways:
1. **Client-side**: Using a placeholder implementation in the server API that works with the client-side SDK
2. **Server-side**: Using Firebase Cloud Functions that leverage the Admin SDK's findNearest method

The server-side implementation provides proper vector search capabilities using Firestore's findNearest method with cosine similarity, allowing for semantic search across profiles, businesses, and partner preferences. The client-side implementation serves as a fallback when Cloud Functions are not available.

We've also implemented a client-side composable (useCloudFunctions.ts) for interacting with the Cloud Functions and updated the useVectorSearch composable to use the Cloud Functions with fallback to the client-side implementation. All DataConnect dependencies and scripts have been removed from the project.

## Next Steps
1. Deploy and test Cloud Functions:
   - Deploy the Cloud Functions to Firebase
   - Test the vector search implementation with real data
   - Implement actual embedding generation using Vertex AI
   - Add more comprehensive testing for the Cloud Functions

2. Enhance vector search capabilities:
   - Optimize vector search performance and relevance
   - Implement more advanced vector search features like filtering and faceting
   - Create a test suite for vector search functionality
   - Add support for hybrid search (combining vector and keyword search)

3. Enhance AI chat interface:
   - Improve integration with vector search capabilities
   - Add support for more complex queries and entity extraction
   - Implement conversation context and follow-up questions
   - Add better response formatting and visualization

4. Improve error handling and user experience:
   - Add comprehensive error handling for vector search operations
   - Implement loading states and progress indicators
   - Add retry mechanisms for failed API calls
   - Improve error messages for better user experience

5. Integrate LLM key management with chat interface:
   - Connect the chat interface to use the configured LLM providers
   - Implement fallback mechanisms when keys are not available
   - Add provider selection in the chat interface
   - Implement streaming responses for supported providers

5. Enhance LLM key management:
   - Implement key validation before saving
   - Add key usage analytics to track API usage
   - Consider adding key rotation and expiration features
   - Implement more robust error handling for encryption/decryption failures

6. Enhance AI chat interface:
   - Improve NLP capabilities with more sophisticated techniques
   - Add support for follow-up questions and conversation context
   - Implement more advanced response generation with better explanations
   - Add support for more complex queries and entity extraction
   - Integrate with a real NLP service for better query understanding
