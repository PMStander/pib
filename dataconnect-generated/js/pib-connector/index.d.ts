/**
 * Partners in Biz DataConnect Connector TypeScript Declarations
 * 
 * This is a placeholder file that will be replaced by the generated code
 * when the DataConnect CLI tool is run.
 */

// User types
export interface User {
  id: string;
  email: string;
  display_name?: string;
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

// Profile types
export interface Profile {
  id: string;
  user_id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  skills?: string[];
  interests?: string[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// Workspace types
export interface Workspace {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// Query response types
export interface QueryResponse<T> {
  data: T | null;
  error?: Error;
}

// User queries
export function getCurrentUser(): Promise<QueryResponse<User>>;
export function getUser(id: string): Promise<QueryResponse<User>>;
export function getUserProfiles(userId: string): Promise<QueryResponse<Profile[]>>;

// Workspace queries
export function getUserWorkspaces(userId: string): Promise<QueryResponse<Workspace[]>>;
export function getWorkspace(id: string): Promise<QueryResponse<Workspace>>;

// User mutations
export interface UpdateUserVariables {
  id: string;
  displayName?: string;
  photoUrl?: string;
}
export function updateUser(variables: UpdateUserVariables): Promise<QueryResponse<User>>;

// Profile mutations
export interface CreateProfileVariables {
  name: string;
  bio?: string;
  avatarUrl?: string;
  skills?: string[];
  interests?: string[];
  isDefault?: boolean;
}
export function createProfile(variables: CreateProfileVariables): Promise<QueryResponse<Profile>>;

export interface UpdateProfileVariables {
  id: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  skills?: string[];
  interests?: string[];
  isDefault?: boolean;
}
export function updateProfile(variables: UpdateProfileVariables): Promise<QueryResponse<Profile>>;

// Workspace mutations
export interface CreateWorkspaceVariables {
  name: string;
  description?: string;
  logoUrl?: string;
}
export function createWorkspace(variables: CreateWorkspaceVariables): Promise<QueryResponse<Workspace>>;

export interface UpdateWorkspaceVariables {
  id: string;
  name?: string;
  description?: string;
  logoUrl?: string;
}
export function updateWorkspace(variables: UpdateWorkspaceVariables): Promise<QueryResponse<Workspace>>;

// Default export
declare const _default: {
  getCurrentUser: typeof getCurrentUser;
  getUser: typeof getUser;
  getUserProfiles: typeof getUserProfiles;
  getUserWorkspaces: typeof getUserWorkspaces;
  getWorkspace: typeof getWorkspace;
  updateUser: typeof updateUser;
  createProfile: typeof createProfile;
  updateProfile: typeof updateProfile;
  createWorkspace: typeof createWorkspace;
  updateWorkspace: typeof updateWorkspace;
};
export default _default;
