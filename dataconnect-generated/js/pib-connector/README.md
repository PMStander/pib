# Partners in Biz DataConnect Connector

This package provides a TypeScript/JavaScript client for interacting with the Partners in Biz Firebase DataConnect database.

## Installation

This package is installed automatically as a local dependency in the Partners in Biz project.

## Usage

```typescript
import { getCurrentUser, createWorkspace } from '@pib/connector';

// Get the current user
const { data: user } = await getCurrentUser();

// Create a new workspace
const { data: workspace } = await createWorkspace({
  name: 'My Workspace',
  description: 'A workspace for my team'
});
```

## Available Functions

### User Queries
- `getCurrentUser()` - Get the currently authenticated user
- `getUser(id)` - Get a user by ID
- `getUserProfiles(userId)` - Get all profiles for a user

### Workspace Queries
- `getUserWorkspaces(userId)` - Get all workspaces for a user
- `getWorkspace(id)` - Get a workspace by ID

### User Mutations
- `updateUser(variables)` - Update a user's profile

### Profile Mutations
- `createProfile(variables)` - Create a new profile
- `updateProfile(variables)` - Update an existing profile

### Workspace Mutations
- `createWorkspace(variables)` - Create a new workspace
- `updateWorkspace(variables)` - Update an existing workspace

## Generating the Connector

This package is generated using the Firebase DataConnect CLI tool. To regenerate the connector:

```bash
firebase dataconnect generate js
```

## License

This package is private and for use only within the Partners in Biz project.
