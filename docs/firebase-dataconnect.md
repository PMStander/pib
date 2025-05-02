# Firebase DataConnect Integration

This document provides an overview of how Firebase DataConnect is integrated into the Partners in Biz application.

## What is Firebase DataConnect?

Firebase DataConnect is Firebase's relational database solution that allows developers to create secure and scalable apps with Cloud SQL for PostgreSQL. It provides:

- Type-safe SDKs for mobile and web development
- Simple and secure query management
- Local development tools for building and iterating on features
- Integration with other Firebase services

## Architecture

In Partners in Biz, we use Firebase DataConnect to store and manage:

- User profiles
- Workspaces
- User-workspace relationships
- Business data
- Partner matching information

## Schema Design

Our database schema is designed to support the following relationships:

1. **Users to Workspaces**: Many-to-many relationship
   - A user can belong to multiple workspaces
   - A workspace can have multiple users

2. **Users to Profiles**: One-to-many relationship
   - A user can have multiple profiles
   - Each profile is owned by one user

3. **Profiles to Workspaces**: Many-to-many relationship
   - A profile can be used in multiple workspaces
   - A workspace can have multiple profiles

## Local Development

For local development, we use Firebase Emulators to simulate the DataConnect service. This allows us to:

- Develop and test without connecting to production databases
- Reset data easily during development
- Test authentication flows with emulated Firebase Auth

## Authentication Integration

Firebase DataConnect integrates with Firebase Authentication to provide row-level security:

- Users can only access their own data
- Workspace access is controlled by membership
- Profile access is controlled by ownership

## Usage in the Application

The application uses DataConnect through the following pattern:

1. **Authentication**: User signs in through Firebase Auth
2. **Data Access**: Authenticated users can query their data through DataConnect
3. **Row-Level Security**: DataConnect enforces access controls based on user identity
4. **Type Safety**: All database operations are type-safe through generated TypeScript types

## Next Steps

- Implement email verification
- Add social authentication providers
- Create user profile management
- Implement workspace invitation system
