# System Patterns

## Context
This document outlines the architecture and design patterns used in the "Partners in Biz" application.

## Architecture Overview
The application follows a modern web architecture based on the Nuxt.js framework, which implements the Vue.js component-based approach. The architecture consists of the following layers:

1. **Presentation Layer**
   - Vue.js components for UI elements
   - Nuxt.js layouts for page structure
   - Tailwind CSS for styling

2. **Application Layer**
   - Vue.js composables for reusable logic
   - Nuxt.js pages for routing
   - State management using Vue's Composition API

3. **Data Layer**
   - API integration for backend communication
   - Local storage for client-side data persistence
   - Data models for consistent data structure

## Design Patterns

### Component-Based Architecture
- Reusable UI components with clear responsibilities
- Component composition for complex UI elements
- Props and events for component communication
- Page components that encapsulate page-level functionality
- Form components that handle validation and submission
- Feature-specific components organized by domain (e.g., workspace)

### Composition Pattern
- Use of Vue.js Composition API for logic organization
- Composables for shared functionality
- Separation of concerns within components

### Repository Pattern
- Centralized data access through repository services
- Abstraction of API calls and data manipulation
- Consistent error handling and data transformation

### Responsive Design Pattern
- Mobile-first approach using Tailwind CSS
- Responsive components that adapt to different screen sizes
- Consistent user experience across devices

### Neumorphic Design Pattern
- Soft UI approach with subtle shadows and highlights
- Consistent color palette with light/dark shadow pairs
- Multiple effect variants (flat, pressed, concave, convex)
- Accessible and responsive neumorphic components
- Dark mode support with appropriate shadow adjustments
- Comprehensive component library (Button, Card, Input, Toggle, Checkbox, Radio, Select, Modal, DatePicker, Slider)

### Firebase DataConnect Patterns

#### Many-to-Many Relationships (e.g., Users & Workspaces)

**Context:** Handling many-to-many relationships where entities from two tables (e.g., `User`, `Workspace`) can be associated with each other, potentially with additional attributes (e.g., `role`).

**Pattern:**

1.  **Schema Definition (`schema.gql`):**
    *   Define the two main entity types (`User`, `Workspace`).
    *   Create a **Join Table Type** (e.g., `WorkspaceUser`) to link the two main types.
    *   In the Join Table Type:
        *   Reference the main entity types directly using their **Type names** (e.g., `workspace: Workspace!`, `user: User!`), **not** just their IDs. This enables DataConnect to understand the relationship.
        *   Define the primary key in the `@table` directive using the **field names** of the Type references (e.g., `key: ["workspace", "user"]`).
        *   Add any additional relationship attributes (e.g., `role`, `joinedAt`). Use `@col` only for primitive type fields.

    ```graphql
    # Main Entity 1
    type User @table {
      id: String! @col(name: "id")
      email: String! @col(name: "email", dataType: "varchar(255)")
      # ... other fields
    }

    # Main Entity 2
    type Workspace @table {
      id: UUID! @default(expr: "uuidV4()")
      name: String! @col(name: "name", dataType: "varchar(100)")
      # ... other fields
    }

    # Join Table
    type WorkspaceUser @table(name: "workspace_users", key: ["workspace", "user"]) {
      workspace: Workspace! # FK reference via Type
      user: User!         # FK reference via Type
      role: String! @col(name: "role", dataType: "varchar(20)")
      joinedAt: Timestamp! @default(expr: "request.time") @col(name: "joined_at")
    }
    ```

2.  **Creating Links (Mutations - `mutations.gql`):**
    *   Define a mutation to insert into the **Join Table Type** (`WorkspaceUser`).
    *   In the `data` input, reference the related entities using nested objects containing their **primary keys** (e.g., `workspace: { id: $workspaceId }`, `user: { id: $userId }`).

    ```graphql
    mutation JoinWorkspaceUser(
      $workspaceId: UUID!,
      $userId: String!,
      $role: String!
    ) @auth(level: USER) {
      createWorkspaceUser: workspaceUser_insert(
        data: {
          workspace: { id: $workspaceId }, # Link via ID
          user: { id: $userId },         # Link via ID
          role: $role,
          joinedAt_expr: "request.time"
        }
      )
    }
    ```

3.  **Querying Related Data (Queries - `queries.gql`):**
    *   Query the **Join Table Type** (`workspaceUsers`) directly.
    *   Use a `where` clause to filter based on one of the related entities (e.g., find all workspaces for a specific user: `where: { user: { id: { eq: $userId } } }`).
    *   Within the query results, you can **directly access the fields of the related entities** by nesting them (e.g., accessing `workspace` fields within the `workspaceUsers` query).
    *   *Limitation Note:* As observed (May 2024), DataConnect SDK generation does *not* seem to support accessing fields from the *other* side of the join table in the same query (e.g., accessing `user` fields when querying `workspaceUsers` filtered by `workspaceId`). For that, fetch IDs and make separate queries if needed.

    ```graphql
    # Get all Workspaces a specific User belongs to
    query GetUserWorkspaces($userId: String!) @auth(level: USER) {
      workspaceUsers(where: { user: { id: { eq: $userId } } }) { # Filter join table by user.id
        # Access fields of the *other* related entity (Workspace)
        workspace {
          id
          name
          description
          # ... other workspace fields
        }
        # Can also access join table fields directly if needed
        # role
        # joinedAt
      }
    }
    ```

**Rationale:** This pattern correctly defines the relationship in the schema, allows for creating links via mutations, and provides a way to query related data efficiently by filtering the join table and accessing the desired related entity's fields directly within the query results.

## Folder Structure
```
/
├── assets/              # Static assets (images, fonts, etc.)
│   └── css/             # CSS files including Tailwind configuration
├── components/          # Reusable Vue components
│   ├── forms/           # Form components for different features
│   ├── neumorphic/      # Neumorphic design system components
│   ├── pages/           # Page-level components
│   └── workspace/       # Workspace-specific components
├── composables/         # Shared composition functions
├── layouts/             # Page layouts
├── pages/               # Application pages and routes
│   └── workspaces/      # Workspace-related pages
├── plugins/             # Nuxt plugins
├── public/              # Public static files
├── server/              # Server-side code
└── utils/               # Utility functions
    └── validations/     # Validation schemas
```

## Coding Standards
- Follow Vue.js style guide recommendations
- Use TypeScript for type safety
- Implement consistent naming conventions
- Write unit tests for critical functionality

## Performance Considerations
- Implement lazy loading for components and routes
- Optimize asset loading and caching
- Use server-side rendering for improved SEO and initial load performance
- Implement code splitting to reduce bundle size

## Last Updated
- Date: May 2, 2024
- By: Development Team
- Changes: Updated folder structure and component-based architecture details