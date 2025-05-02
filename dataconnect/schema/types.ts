// TypeScript types for Firebase DataConnect schema

// User type
export interface User {
  id: string;
  email: string;
  display_name: string | null;
  photo_url: string | null;
  created_at: Date;
  updated_at: Date;
}

// Workspace type
export interface Workspace {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

// Profile type
export interface Profile {
  id: string;
  user_id: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
  skills: string[] | null;
  interests: string[] | null;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

// Workspace Member type
export interface WorkspaceMember {
  workspace_id: string;
  user_id: string;
  profile_id: string | null;
  role: 'owner' | 'admin' | 'member' | 'guest';
  joined_at: Date;
}

// Workspace Invitation type
export interface WorkspaceInvitation {
  id: string;
  workspace_id: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
  invited_by: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: Date;
  expires_at: Date | null;
}

// Business Profile type
export interface BusinessProfile {
  id: string;
  workspace_id: string;
  name: string;
  industry: string | null;
  description: string | null;
  location: string | null;
  website: string | null;
  employee_count: number | null;
  created_at: Date;
  updated_at: Date;
}

// Partner Preferences type
export interface PartnerPreferences {
  id: string;
  workspace_id: string;
  industries: string[] | null;
  locations: string[] | null;
  min_employee_count: number | null;
  max_employee_count: number | null;
  skills_needed: string[] | null;
  created_at: Date;
  updated_at: Date;
}

// Extended User type with relationships
export interface UserWithRelationships extends User {
  workspaces?: WorkspaceMember[];
  profiles?: Profile[];
}

// Extended Workspace type with relationships
export interface WorkspaceWithRelationships extends Workspace {
  members?: WorkspaceMember[];
  business_profile?: BusinessProfile;
  partner_preferences?: PartnerPreferences;
}

// Extended Profile type with relationships
export interface ProfileWithRelationships extends Profile {
  user?: User;
  workspaces?: WorkspaceMember[];
}
