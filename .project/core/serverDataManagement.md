# Server-Side Data Management

## Context
This document outlines the server-side data management system for the "Partners in Biz" application, including authentication flow, session management, and CRUD operations.

## Decision
We've implemented a server-side data management system that handles all database operations after the initial authentication. This approach provides better security, centralized data processing, and the ability to generate embeddings for vector search.

## Alternatives
- Client-side only approach using Firebase SDK directly
- Hybrid approach with some operations on client and some on server

## Consequences
- Improved security as sensitive operations happen on the server
- Centralized data processing and validation
- Ability to generate embeddings for vector search
- Additional network requests for each operation
- Need to maintain session state between client and server

## Status
Implemented and operational

## Implementation Details

### Authentication Flow

1. **Client-Side Authentication**:
   - User authenticates with Firebase Authentication using `useFirebaseAuth` composable
   - Upon successful authentication, the Firebase user object and token are available

2. **Session Establishment**:
   - After authentication, the client calls `setSessionServer()` function to establish a server-side session
   - This function sends the authentication state to `/api/auth/set` endpoint
   - The server stores this session in a cookie using `setUserSession()` in `server/ai/session.ts`

3. **Token Management**:
   - The Firebase authentication token (`userCredential._tokenResponse`) must be included in the session data
   - This token is used by the server to authenticate requests to Firebase services

### Server-Side API Endpoints

1. **Data Write** (`/api/data/write.post.ts`):
   - Accepts collection name, data object, and optional embedding fields
   - Validates the request and user session
   - Generates embeddings for specified fields using `createEmbeddings()`
   - Writes data to Firestore with embeddings
   - Returns the created document with ID

2. **Data Read** (`/api/data/read.post.ts`):
   - Accepts collection name, optional ID, filters, pagination, and vector search parameters
   - Validates the request and user session
   - Supports single document retrieval by ID
   - Supports querying with filters, ordering, and pagination
   - Supports vector search using embeddings
   - Returns the requested data

3. **Data Update** (`/api/data/update.post.ts`):
   - Accepts collection name, document ID, data object, and optional embedding fields
   - Validates the request and user session
   - Checks document existence and ownership
   - Generates embeddings for specified fields if needed
   - Updates the document in Firestore
   - Returns the updated document

4. **Data Delete** (`/api/data/delete.post.ts`):
   - Accepts collection name and document ID
   - Validates the request and user session
   - Deletes the document from Firestore
   - Returns confirmation with deleted document ID

### Embedding Generation

1. **Process**:
   - The `createEmbeddings()` function in `server/ai/session.ts` handles embedding generation
   - It uses Google's VertexAI Embeddings API with the `text-embedding-005` model
   - The function concatenates the values of specified fields and generates a vector embedding

2. **Usage**:
   - When writing or updating data, specify which fields to embed in the `embed` array
   - Example: `embed: ['title', 'description', 'type']`
   - The generated embedding is stored in the `embedding` field of the document
   - This embedding can be used for vector search operations

### Vector Search

1. **Implementation**:
   - Vector search is implemented in the read endpoint
   - Specify vector search parameters in the `vec` object:
     ```javascript
     vec: {
       query: "search query text",
       field: "embedding", // field containing the embedding vector
       dimensions: 768,    // dimensions of the embedding vector
       distance: 0.5       // maximum distance threshold
     }
     ```
   - The server generates an embedding for the query text
   - It then searches for documents with similar embeddings

### Firebase Server Integration

1. **Server-Side Firebase**:
   - The `useFirebaseServer()` function in `server/firebase.ts` initializes Firebase on the server
   - It uses the authentication token from the client to authenticate requests
   - In development mode, it connects to Firebase emulators
   - It provides access to Firestore, Auth, and VertexAI services

## Usage Examples

### Writing Data with Embeddings

```javascript
const response = await $fetch('/api/data/write', {
  method: 'POST',
  body: {
    collection: 'research',
    data: {
      title: 'Research Title',
      description: 'Detailed description',
      type: 'market',
      main_category: 'technology',
      sub_category: 'software',
      status: 'active',
      created_at: new Date(),
      updated_at: new Date()
    },
    embed: ['title', 'description', 'type', 'main_category', 'sub_category', 'status']
  }
});
```

### Reading Data with Filters

```javascript
const response = await $fetch('/api/data/read', {
  method: 'POST',
  body: {
    collection: 'research',
    filters: {
      status: 'active',
      main_category: 'technology',
      created_at: { $gte: new Date('2023-01-01') }
    },
    orderBy: 'created_at',
    orderDirection: 'desc',
    limit: 10
  }
});
```

### Vector Search

```javascript
const response = await $fetch('/api/data/read', {
  method: 'POST',
  body: {
    collection: 'research',
    vec: {
      query: 'software development trends',
      field: 'embedding',
      dimensions: 768,
      distance: 0.5
    },
    limit: 5
  }
});
```

### Updating Data

```javascript
const response = await $fetch('/api/data/update', {
  method: 'POST',
  body: {
    collection: 'research',
    id: 'document-id',
    data: {
      title: 'Updated Title',
      status: 'completed',
      updated_at: new Date()
    },
    embed: ['title', 'status']
  }
});
```

### Deleting Data

```javascript
const response = await $fetch('/api/data/delete', {
  method: 'POST',
  body: {
    collection: 'research',
    id: 'document-id'
  }
});
```
