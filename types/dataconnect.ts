// TypeScript types for Firebase DataConnect schema

// User type
export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: boolean;

  // Legacy fields for backward compatibility
  display_name?: string | null;
  photo_url?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

// Workspace type
export interface Workspace {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;

  // Legacy fields for backward compatibility
  logo_url?: string | null;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Profile type
export interface Profile {
  id: string;
  userId: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  skills: string[] | null;
  interests: string[] | null;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Legacy fields for backward compatibility
  user_id?: string;
  avatar_url?: string | null;
  is_default?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Workspace Member type
export interface WorkspaceMember {
  workspaceId: string;
  userId: string;
  profileId: string | null;
  role: 'owner' | 'admin' | 'member' | 'guest';
  joinedAt: Date;

  // Legacy fields for backward compatibility
  workspace_id?: string;
  user_id?: string;
  profile_id?: string | null;
  joined_at?: Date;
}

// Workspace Invitation type
export interface WorkspaceInvitation {
  id: string;
  workspaceId: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
  invitedBy: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  expiresAt: Date | null;

  // Legacy fields for backward compatibility
  workspace_id?: string;
  invited_by?: string;
  created_at?: Date;
  expires_at?: Date | null;
}

// Business Profile type
export interface BusinessProfile {
  id: string;
  workspaceId: string;
  name: string;
  industry: string | null;
  description: string | null;
  location: string | null;
  website: string | null;
  employeeCount: number | null;
  createdAt: Date;
  updatedAt: Date;

  // Legacy fields for backward compatibility
  workspace_id?: string;
  employee_count?: number | null;
  created_at?: Date;
  updated_at?: Date;
}

// Partner Preferences type
export interface PartnerPreferences {
  id: string;
  workspaceId: string;
  industries: string[] | null;
  locations: string[] | null;
  minEmployeeCount: number | null;
  maxEmployeeCount: number | null;
  skillsNeeded: string[] | null;
  createdAt: Date;
  updatedAt: Date;

  // Legacy fields for backward compatibility
  workspace_id?: string;
  min_employee_count?: number | null;
  max_employee_count?: number | null;
  skills_needed?: string[] | null;
  created_at?: Date;
  updated_at?: Date;
}

// Extended User type with relationships
export interface UserWithRelationships extends User {
  workspaces?: WorkspaceMember[];
  profiles?: Profile[];
}

// Extended Workspace type with relationships
export interface WorkspaceWithRelationships extends Workspace {
  members?: WorkspaceMember[];
  businessProfile?: BusinessProfile;
  partnerPreferences?: PartnerPreferences;

  // Legacy fields for backward compatibility
  business_profile?: BusinessProfile;
  partner_preferences?: PartnerPreferences;
}

// Extended Profile type with relationships
export interface ProfileWithRelationships extends Profile {
  user?: User;
  workspaces?: WorkspaceMember[];
}

// Search Result type for vector search
export interface SearchResult<T> {
  item: T;
  distance: number;
}

// Activity type for user activities
export interface Activity {
  description: string;
  date: Date;
  type?: string;
  userId?: string;
  workspaceId?: string;
  relatedEntityId?: string;
}
