# Firebase DataConnect Integration

This document provides an overview of how Firebase DataConnect is integrated into the Partners in Biz application.

## Overview

Partners in Biz uses Firebase DataConnect to store and manage relational data with the following key entities:

- Users
- Workspaces
- Profiles
- Workspace Members (many-to-many relationship)
- Business Profiles
- Partner Preferences

## Schema Structure

The DataConnect schema is organized in the following directories:

- `dataconnect/schema/` - Contains schema definitions
  - `schema.sql` - SQL schema with tables, constraints, and indexes
  - `schema.gql` - GraphQL schema with table definitions
  - `types.ts` - TypeScript type definitions

- `dataconnect/connector/` - Contains queries and mutations
  - `queries.gql` - GraphQL queries for data retrieval
  - `mutations.gql` - GraphQL mutations for data manipulation
  - `connector.yaml` - Connector configuration

## Package Configuration

The DataConnect connector is configured with the package name `@pib/connector` in `dataconnect/connector/connector.yaml`. This package is referenced in `package.json` and used throughout the application for data access.

## Entity Relationships

1. **Users to Workspaces**: Many-to-many relationship
   - A user can belong to multiple workspaces
   - A workspace can have multiple users
   - Implemented through the `workspace_members` table

2. **Users to Profiles**: One-to-many relationship
   - A user can have multiple profiles
   - Each profile is owned by one user

3. **Profiles to Workspaces**: Many-to-many relationship
   - A profile can be used in multiple workspaces
   - A workspace can have multiple profiles
   - Implemented through the `workspace_members` table

## Authentication Integration

When a user signs up through Firebase Authentication, a corresponding user record is automatically created in the DataConnect database through triggers. This ensures that every authenticated user has a corresponding database entry.

## Usage in the Application

To use DataConnect in the application:

1. Import the connector:
   ```typescript
   import { getCurrentUser } from '@pib/connector';
   ```

2. Use the queries and mutations:
   ```typescript
   // Example: Get current user
   const { data } = await getCurrentUser();
   
   // Example: Create a workspace
   const { data } = await createWorkspace({
     variables: {
       name: 'My Workspace',
       description: 'A workspace for my team'
     }
   });
   ```

## Signup and Login Flow

1. **Signup**:
   - User registers with email/password through Firebase Authentication
   - A trigger automatically creates a user record in DataConnect
   - A default profile is created for the user

2. **Login**:
   - User authenticates through Firebase Authentication
   - The application loads the user's data from DataConnect
   - User is redirected to their dashboard

## Next Steps

- Implement the signup and login flow with DataConnect integration
- Create UI components for profile management
- Implement workspace creation and management
- Add business profile creation and editing
- Develop the partner matching algorithm
