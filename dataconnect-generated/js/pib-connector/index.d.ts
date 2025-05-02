import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;



export interface AcceptInvitationData {
  acceptInvitation?: WorkspaceInvitation_Key | null;
}

export interface AcceptInvitationVariables {
  invitationId: UUIDString;
}

export interface AddWorkspaceMemberData {
  addWorkspaceMember: WorkspaceMember_Key;
}

export interface AddWorkspaceMemberVariables {
  workspaceId: UUIDString;
  userId: string;
  profileId?: UUIDString | null;
  role: string;
}

export interface BusinessProfile_Key {
  id: UUIDString;
  __typename?: 'BusinessProfile_Key';
}

export interface BusinessProfilesBySimilarityData {
  businessProfiles_descriptionEmbedding_similarity: ({
    id: UUIDString;
    workspaceId: UUIDString;
    name: string;
    industry?: string | null;
    description?: string | null;
    location?: string | null;
    website?: string | null;
    employeeCount?: number | null;
  } & BusinessProfile_Key)[];
}

export interface BusinessProfilesBySimilarityVariables {
  bioText: string;
  limit?: number | null;
}

export interface CreateBusinessProfileData {
  createBusinessProfile: BusinessProfile_Key;
}

export interface CreateBusinessProfileVariables {
  workspaceId: UUIDString;
  name: string;
  industry?: string | null;
  description?: string | null;
  location?: string | null;
  website?: string | null;
  employeeCount?: number | null;
}

export interface CreateBusinessProfileWithDescriptionData {
  createBusinessProfile: BusinessProfile_Key;
}

export interface CreateBusinessProfileWithDescriptionVariables {
  workspaceId: UUIDString;
  name: string;
  industry?: string | null;
  description: string;
  location?: string | null;
  website?: string | null;
  employeeCount?: number | null;
}

export interface CreatePartnerPreferencesData {
  createPartnerPreferences: PartnerPreferences_Key;
}

export interface CreatePartnerPreferencesVariables {
  workspaceId: UUIDString;
  industries?: string[] | null;
  locations?: string[] | null;
  minEmployeeCount?: number | null;
  maxEmployeeCount?: number | null;
  skillsNeeded?: string[] | null;
}

export interface CreatePartnerPreferencesWithEmbeddingData {
  createPartnerPreferences: PartnerPreferences_Key;
}

export interface CreatePartnerPreferencesWithEmbeddingVariables {
  workspaceId: UUIDString;
  industries?: string[] | null;
  locations?: string[] | null;
  minEmployeeCount?: number | null;
  maxEmployeeCount?: number | null;
  skillsNeeded?: string[] | null;
  combinedText: string;
}

export interface CreateProfileData {
  createProfile: Profile_Key;
}

export interface CreateProfileVariables {
  name: string;
  bio?: string | null;
  avatarUrl?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
  isDefault?: boolean | null;
}

export interface CreateProfileWithBioData {
  createProfile: Profile_Key;
}

export interface CreateProfileWithBioVariables {
  name: string;
  bio: string;
  avatarUrl?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
  isDefault?: boolean | null;
}

export interface CreateUserData {
  createUser: User_Key;
}

export interface CreateUserVariables {
  email: string;
  displayName?: string | null;
  photoUrl?: string | null;
}

export interface CreateWorkspaceData {
  createWorkspace: Workspace_Key;
}

export interface CreateWorkspaceVariables {
  name: string;
  description?: string | null;
  logoUrl?: string | null;
}

export interface DeclineInvitationData {
  declineInvitation?: WorkspaceInvitation_Key | null;
}

export interface DeclineInvitationVariables {
  invitationId: UUIDString;
}

export interface DeleteProfileData {
  deleteProfile?: Profile_Key | null;
}

export interface DeleteProfileVariables {
  id: UUIDString;
}

export interface DeleteWorkspaceData {
  deleteWorkspace?: Workspace_Key | null;
}

export interface DeleteWorkspaceVariables {
  id: UUIDString;
}

export interface GetAllUsersData {
  users: ({
    id: string;
    email: string;
    displayName?: string | null;
    photoUrl?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & User_Key)[];
}

export interface GetBusinessProfileData {
  businessProfile?: {
    id: UUIDString;
    workspaceId: UUIDString;
    name: string;
    industry?: string | null;
    description?: string | null;
    location?: string | null;
    website?: string | null;
    employeeCount?: number | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & BusinessProfile_Key;
}

export interface GetBusinessProfileVariables {
  workspaceId: UUIDString;
}

export interface GetCurrentUserData {
  user?: {
    id: string;
    email: string;
    displayName?: string | null;
    photoUrl?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & User_Key;
}

export interface GetPartnerPreferencesData {
  partnerPreferences?: {
    id: UUIDString;
    workspaceId: UUIDString;
    industries?: string[] | null;
    locations?: string[] | null;
    minEmployeeCount?: number | null;
    maxEmployeeCount?: number | null;
    skillsNeeded?: string[] | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & PartnerPreferences_Key;
}

export interface GetPartnerPreferencesVariables {
  workspaceId: UUIDString;
}

export interface GetPendingInvitationsData {
  workspaceInvitations: ({
    id: UUIDString;
    email: string;
    role: string;
    status: string;
    createdAt: TimestampString;
    expiresAt?: TimestampString | null;
    workspaceId: UUIDString;
    invitedBy: string;
  } & WorkspaceInvitation_Key)[];
}

export interface GetPendingInvitationsVariables {
  email: string;
}

export interface GetUserData {
  user?: {
    id: string;
    email: string;
    displayName?: string | null;
    photoUrl?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & User_Key;
}

export interface GetUserProfilesData {
  profiles: ({
    id: UUIDString;
    userId: string;
    name: string;
    bio?: string | null;
    avatarUrl?: string | null;
    skills?: string[] | null;
    interests?: string[] | null;
    isDefault: boolean;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Profile_Key)[];
}

export interface GetUserVariables {
  id: string;
}

export interface GetUserWorkspacesData {
  workspaceUsers: ({
    workspace: {
      id: UUIDString;
      name: string;
      description?: string | null;
      logoUrl?: string | null;
      createdBy: string;
      createdAt: TimestampString;
      updatedAt: TimestampString;
    } & Workspace_Key;
  })[];
}

export interface GetUserWorkspacesVariables {
  userId: string;
}

export interface GetWorkspaceData {
  workspace?: {
    id: UUIDString;
    name: string;
    description?: string | null;
    logoUrl?: string | null;
    createdBy: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Workspace_Key;
}

export interface GetWorkspaceInvitationsData {
  workspaceInvitations: ({
    id: UUIDString;
    workspaceId: UUIDString;
    email: string;
    role: string;
    invitedBy: string;
    status: string;
    createdAt: TimestampString;
    expiresAt?: TimestampString | null;
  } & WorkspaceInvitation_Key)[];
}

export interface GetWorkspaceInvitationsVariables {
  workspaceId: UUIDString;
}

export interface GetWorkspaceMembersData {
  workspaceMembers: ({
    role: string;
    joinedAt: TimestampString;
    user: {
      id: string;
      email: string;
      displayName?: string | null;
      photoUrl?: string | null;
    } & User_Key;
      profile?: {
        id: UUIDString;
        name: string;
        avatarUrl?: string | null;
      } & Profile_Key;
  })[];
}

export interface GetWorkspaceMembersVariables {
  workspaceId: UUIDString;
}

export interface GetWorkspaceVariables {
  id: UUIDString;
}

export interface InviteToWorkspaceData {
  inviteToWorkspace: WorkspaceInvitation_Key;
}

export interface InviteToWorkspaceVariables {
  workspaceId: UUIDString;
  email: string;
  role: string;
}

export interface JoinWorkspaceUserData {
  createWorkspaceUser: WorkspaceUser_Key;
}

export interface JoinWorkspaceUserVariables {
  workspaceId: UUIDString;
  userId: string;
  role: string;
}

export interface MatchBusinessToProfilesData {
  businessProfile?: {
    id: UUIDString;
    name: string;
    description?: string | null;
  } & BusinessProfile_Key;
}

export interface MatchBusinessToProfilesVariables {
  businessProfileId: UUIDString;
  limit?: number | null;
}

export interface MatchProfileToBusinessesData {
  profile?: {
    id: UUIDString;
    name: string;
    bio?: string | null;
  } & Profile_Key;
}

export interface MatchProfileToBusinessesVariables {
  profileId: UUIDString;
  limit?: number | null;
}

export interface PartnerPreferences_Key {
  id: UUIDString;
  __typename?: 'PartnerPreferences_Key';
}

export interface Profile_Key {
  id: UUIDString;
  __typename?: 'Profile_Key';
}

export interface ProfilesBySimilarityData {
  profiles_bioEmbedding_similarity: ({
    id: UUIDString;
    userId: string;
    name: string;
    bio?: string | null;
    skills?: string[] | null;
    interests?: string[] | null;
    avatarUrl?: string | null;
  } & Profile_Key)[];
}

export interface ProfilesBySimilarityVariables {
  descriptionText: string;
  limit?: number | null;
}

export interface RemoveWorkspaceMemberData {
  removeWorkspaceMember?: WorkspaceMember_Key | null;
}

export interface RemoveWorkspaceMemberVariables {
  workspaceId: UUIDString;
  userId: string;
}

export interface SearchBusinessProfilesByDescriptionData {
  businessProfiles_descriptionEmbedding_similarity: ({
    id: UUIDString;
    workspaceId: UUIDString;
    name: string;
    industry?: string | null;
    description?: string | null;
    location?: string | null;
    website?: string | null;
    employeeCount?: number | null;
  } & BusinessProfile_Key)[];
}

export interface SearchBusinessProfilesByDescriptionVariables {
  searchText: string;
  limit?: number | null;
}

export interface SearchPartnerPreferencesData {
  partnerPreferencess_combinedEmbedding_similarity: ({
    id: UUIDString;
    workspaceId: UUIDString;
    industries?: string[] | null;
    locations?: string[] | null;
    minEmployeeCount?: number | null;
    maxEmployeeCount?: number | null;
    skillsNeeded?: string[] | null;
  } & PartnerPreferences_Key)[];
}

export interface SearchPartnerPreferencesVariables {
  searchText: string;
  limit?: number | null;
}

export interface SearchProfilesByBioData {
  profiles_bioEmbedding_similarity: ({
    id: UUIDString;
    userId: string;
    name: string;
    bio?: string | null;
    skills?: string[] | null;
    interests?: string[] | null;
    avatarUrl?: string | null;
  } & Profile_Key)[];
}

export interface SearchProfilesByBioVariables {
  searchText: string;
  limit?: number | null;
}

export interface UpdateBusinessProfileData {
  updateBusinessProfile?: BusinessProfile_Key | null;
}

export interface UpdateBusinessProfileVariables {
  id: UUIDString;
  name?: string | null;
  industry?: string | null;
  description?: string | null;
  location?: string | null;
  website?: string | null;
  employeeCount?: number | null;
}

export interface UpdateBusinessProfileWithDescriptionData {
  updateBusinessProfile?: BusinessProfile_Key | null;
}

export interface UpdateBusinessProfileWithDescriptionVariables {
  id: UUIDString;
  name?: string | null;
  industry?: string | null;
  description: string;
  location?: string | null;
  website?: string | null;
  employeeCount?: number | null;
}

export interface UpdatePartnerPreferencesData {
  updatePartnerPreferences?: PartnerPreferences_Key | null;
}

export interface UpdatePartnerPreferencesVariables {
  id: UUIDString;
  industries?: string[] | null;
  locations?: string[] | null;
  minEmployeeCount?: number | null;
  maxEmployeeCount?: number | null;
  skillsNeeded?: string[] | null;
}

export interface UpdatePartnerPreferencesWithEmbeddingData {
  updatePartnerPreferences?: PartnerPreferences_Key | null;
}

export interface UpdatePartnerPreferencesWithEmbeddingVariables {
  id: UUIDString;
  industries?: string[] | null;
  locations?: string[] | null;
  minEmployeeCount?: number | null;
  maxEmployeeCount?: number | null;
  skillsNeeded?: string[] | null;
  combinedText: string;
}

export interface UpdateProfileData {
  updateProfile?: Profile_Key | null;
}

export interface UpdateProfileVariables {
  id: UUIDString;
  name?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
  isDefault?: boolean | null;
}

export interface UpdateProfileWithBioData {
  updateProfile?: Profile_Key | null;
}

export interface UpdateProfileWithBioVariables {
  id: UUIDString;
  name?: string | null;
  bio: string;
  avatarUrl?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
  isDefault?: boolean | null;
}

export interface UpdateUserData {
  updateUser?: User_Key | null;
}

export interface UpdateUserVariables {
  displayName?: string | null;
  photoUrl?: string | null;
}

export interface UpdateWorkspaceData {
  updateWorkspace?: Workspace_Key | null;
}

export interface UpdateWorkspaceMemberData {
  updateWorkspaceMember?: WorkspaceMember_Key | null;
}

export interface UpdateWorkspaceMemberVariables {
  workspaceId: UUIDString;
  userId: string;
  profileId?: UUIDString | null;
  role?: string | null;
}

export interface UpdateWorkspaceVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  logoUrl?: string | null;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

export interface WorkspaceInvitation_Key {
  id: UUIDString;
  __typename?: 'WorkspaceInvitation_Key';
}

export interface WorkspaceMember_Key {
  workspaceId: UUIDString;
  userId: string;
  __typename?: 'WorkspaceMember_Key';
}

export interface WorkspaceUser_Key {
  workspaceId: UUIDString;
  userId: string;
  __typename?: 'WorkspaceUser_Key';
}

export interface Workspace_Key {
  id: UUIDString;
  __typename?: 'Workspace_Key';
}



/* Allow users to create refs without passing in DataConnect */
export function createUserRef(vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createUserRef(dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData,CreateUserVariables>;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData,CreateUserVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateUserRef(vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateUserRef(dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData,UpdateUserVariables>;

export function updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData,UpdateUserVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createProfileRef(vars: CreateProfileVariables): MutationRef<CreateProfileData, CreateProfileVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createProfileRef(dc: DataConnect, vars: CreateProfileVariables): MutationRef<CreateProfileData,CreateProfileVariables>;

export function createProfile(vars: CreateProfileVariables): MutationPromise<CreateProfileData, CreateProfileVariables>;
export function createProfile(dc: DataConnect, vars: CreateProfileVariables): MutationPromise<CreateProfileData,CreateProfileVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createProfileWithBioRef(vars: CreateProfileWithBioVariables): MutationRef<CreateProfileWithBioData, CreateProfileWithBioVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createProfileWithBioRef(dc: DataConnect, vars: CreateProfileWithBioVariables): MutationRef<CreateProfileWithBioData,CreateProfileWithBioVariables>;

export function createProfileWithBio(vars: CreateProfileWithBioVariables): MutationPromise<CreateProfileWithBioData, CreateProfileWithBioVariables>;
export function createProfileWithBio(dc: DataConnect, vars: CreateProfileWithBioVariables): MutationPromise<CreateProfileWithBioData,CreateProfileWithBioVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateProfileRef(vars: UpdateProfileVariables): MutationRef<UpdateProfileData, UpdateProfileVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateProfileRef(dc: DataConnect, vars: UpdateProfileVariables): MutationRef<UpdateProfileData,UpdateProfileVariables>;

export function updateProfile(vars: UpdateProfileVariables): MutationPromise<UpdateProfileData, UpdateProfileVariables>;
export function updateProfile(dc: DataConnect, vars: UpdateProfileVariables): MutationPromise<UpdateProfileData,UpdateProfileVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateProfileWithBioRef(vars: UpdateProfileWithBioVariables): MutationRef<UpdateProfileWithBioData, UpdateProfileWithBioVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateProfileWithBioRef(dc: DataConnect, vars: UpdateProfileWithBioVariables): MutationRef<UpdateProfileWithBioData,UpdateProfileWithBioVariables>;

export function updateProfileWithBio(vars: UpdateProfileWithBioVariables): MutationPromise<UpdateProfileWithBioData, UpdateProfileWithBioVariables>;
export function updateProfileWithBio(dc: DataConnect, vars: UpdateProfileWithBioVariables): MutationPromise<UpdateProfileWithBioData,UpdateProfileWithBioVariables>;


/* Allow users to create refs without passing in DataConnect */
export function deleteProfileRef(vars: DeleteProfileVariables): MutationRef<DeleteProfileData, DeleteProfileVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteProfileRef(dc: DataConnect, vars: DeleteProfileVariables): MutationRef<DeleteProfileData,DeleteProfileVariables>;

export function deleteProfile(vars: DeleteProfileVariables): MutationPromise<DeleteProfileData, DeleteProfileVariables>;
export function deleteProfile(dc: DataConnect, vars: DeleteProfileVariables): MutationPromise<DeleteProfileData,DeleteProfileVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createWorkspaceRef(vars: CreateWorkspaceVariables): MutationRef<CreateWorkspaceData, CreateWorkspaceVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createWorkspaceRef(dc: DataConnect, vars: CreateWorkspaceVariables): MutationRef<CreateWorkspaceData,CreateWorkspaceVariables>;

export function createWorkspace(vars: CreateWorkspaceVariables): MutationPromise<CreateWorkspaceData, CreateWorkspaceVariables>;
export function createWorkspace(dc: DataConnect, vars: CreateWorkspaceVariables): MutationPromise<CreateWorkspaceData,CreateWorkspaceVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateWorkspaceRef(vars: UpdateWorkspaceVariables): MutationRef<UpdateWorkspaceData, UpdateWorkspaceVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateWorkspaceRef(dc: DataConnect, vars: UpdateWorkspaceVariables): MutationRef<UpdateWorkspaceData,UpdateWorkspaceVariables>;

export function updateWorkspace(vars: UpdateWorkspaceVariables): MutationPromise<UpdateWorkspaceData, UpdateWorkspaceVariables>;
export function updateWorkspace(dc: DataConnect, vars: UpdateWorkspaceVariables): MutationPromise<UpdateWorkspaceData,UpdateWorkspaceVariables>;


/* Allow users to create refs without passing in DataConnect */
export function deleteWorkspaceRef(vars: DeleteWorkspaceVariables): MutationRef<DeleteWorkspaceData, DeleteWorkspaceVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteWorkspaceRef(dc: DataConnect, vars: DeleteWorkspaceVariables): MutationRef<DeleteWorkspaceData,DeleteWorkspaceVariables>;

export function deleteWorkspace(vars: DeleteWorkspaceVariables): MutationPromise<DeleteWorkspaceData, DeleteWorkspaceVariables>;
export function deleteWorkspace(dc: DataConnect, vars: DeleteWorkspaceVariables): MutationPromise<DeleteWorkspaceData,DeleteWorkspaceVariables>;


/* Allow users to create refs without passing in DataConnect */
export function joinWorkspaceUserRef(vars: JoinWorkspaceUserVariables): MutationRef<JoinWorkspaceUserData, JoinWorkspaceUserVariables>;
/* Allow users to pass in custom DataConnect instances */
export function joinWorkspaceUserRef(dc: DataConnect, vars: JoinWorkspaceUserVariables): MutationRef<JoinWorkspaceUserData,JoinWorkspaceUserVariables>;

export function joinWorkspaceUser(vars: JoinWorkspaceUserVariables): MutationPromise<JoinWorkspaceUserData, JoinWorkspaceUserVariables>;
export function joinWorkspaceUser(dc: DataConnect, vars: JoinWorkspaceUserVariables): MutationPromise<JoinWorkspaceUserData,JoinWorkspaceUserVariables>;


/* Allow users to create refs without passing in DataConnect */
export function addWorkspaceMemberRef(vars: AddWorkspaceMemberVariables): MutationRef<AddWorkspaceMemberData, AddWorkspaceMemberVariables>;
/* Allow users to pass in custom DataConnect instances */
export function addWorkspaceMemberRef(dc: DataConnect, vars: AddWorkspaceMemberVariables): MutationRef<AddWorkspaceMemberData,AddWorkspaceMemberVariables>;

export function addWorkspaceMember(vars: AddWorkspaceMemberVariables): MutationPromise<AddWorkspaceMemberData, AddWorkspaceMemberVariables>;
export function addWorkspaceMember(dc: DataConnect, vars: AddWorkspaceMemberVariables): MutationPromise<AddWorkspaceMemberData,AddWorkspaceMemberVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateWorkspaceMemberRef(vars: UpdateWorkspaceMemberVariables): MutationRef<UpdateWorkspaceMemberData, UpdateWorkspaceMemberVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateWorkspaceMemberRef(dc: DataConnect, vars: UpdateWorkspaceMemberVariables): MutationRef<UpdateWorkspaceMemberData,UpdateWorkspaceMemberVariables>;

export function updateWorkspaceMember(vars: UpdateWorkspaceMemberVariables): MutationPromise<UpdateWorkspaceMemberData, UpdateWorkspaceMemberVariables>;
export function updateWorkspaceMember(dc: DataConnect, vars: UpdateWorkspaceMemberVariables): MutationPromise<UpdateWorkspaceMemberData,UpdateWorkspaceMemberVariables>;


/* Allow users to create refs without passing in DataConnect */
export function removeWorkspaceMemberRef(vars: RemoveWorkspaceMemberVariables): MutationRef<RemoveWorkspaceMemberData, RemoveWorkspaceMemberVariables>;
/* Allow users to pass in custom DataConnect instances */
export function removeWorkspaceMemberRef(dc: DataConnect, vars: RemoveWorkspaceMemberVariables): MutationRef<RemoveWorkspaceMemberData,RemoveWorkspaceMemberVariables>;

export function removeWorkspaceMember(vars: RemoveWorkspaceMemberVariables): MutationPromise<RemoveWorkspaceMemberData, RemoveWorkspaceMemberVariables>;
export function removeWorkspaceMember(dc: DataConnect, vars: RemoveWorkspaceMemberVariables): MutationPromise<RemoveWorkspaceMemberData,RemoveWorkspaceMemberVariables>;


/* Allow users to create refs without passing in DataConnect */
export function inviteToWorkspaceRef(vars: InviteToWorkspaceVariables): MutationRef<InviteToWorkspaceData, InviteToWorkspaceVariables>;
/* Allow users to pass in custom DataConnect instances */
export function inviteToWorkspaceRef(dc: DataConnect, vars: InviteToWorkspaceVariables): MutationRef<InviteToWorkspaceData,InviteToWorkspaceVariables>;

export function inviteToWorkspace(vars: InviteToWorkspaceVariables): MutationPromise<InviteToWorkspaceData, InviteToWorkspaceVariables>;
export function inviteToWorkspace(dc: DataConnect, vars: InviteToWorkspaceVariables): MutationPromise<InviteToWorkspaceData,InviteToWorkspaceVariables>;


/* Allow users to create refs without passing in DataConnect */
export function acceptInvitationRef(vars: AcceptInvitationVariables): MutationRef<AcceptInvitationData, AcceptInvitationVariables>;
/* Allow users to pass in custom DataConnect instances */
export function acceptInvitationRef(dc: DataConnect, vars: AcceptInvitationVariables): MutationRef<AcceptInvitationData,AcceptInvitationVariables>;

export function acceptInvitation(vars: AcceptInvitationVariables): MutationPromise<AcceptInvitationData, AcceptInvitationVariables>;
export function acceptInvitation(dc: DataConnect, vars: AcceptInvitationVariables): MutationPromise<AcceptInvitationData,AcceptInvitationVariables>;


/* Allow users to create refs without passing in DataConnect */
export function declineInvitationRef(vars: DeclineInvitationVariables): MutationRef<DeclineInvitationData, DeclineInvitationVariables>;
/* Allow users to pass in custom DataConnect instances */
export function declineInvitationRef(dc: DataConnect, vars: DeclineInvitationVariables): MutationRef<DeclineInvitationData,DeclineInvitationVariables>;

export function declineInvitation(vars: DeclineInvitationVariables): MutationPromise<DeclineInvitationData, DeclineInvitationVariables>;
export function declineInvitation(dc: DataConnect, vars: DeclineInvitationVariables): MutationPromise<DeclineInvitationData,DeclineInvitationVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createBusinessProfileRef(vars: CreateBusinessProfileVariables): MutationRef<CreateBusinessProfileData, CreateBusinessProfileVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createBusinessProfileRef(dc: DataConnect, vars: CreateBusinessProfileVariables): MutationRef<CreateBusinessProfileData,CreateBusinessProfileVariables>;

export function createBusinessProfile(vars: CreateBusinessProfileVariables): MutationPromise<CreateBusinessProfileData, CreateBusinessProfileVariables>;
export function createBusinessProfile(dc: DataConnect, vars: CreateBusinessProfileVariables): MutationPromise<CreateBusinessProfileData,CreateBusinessProfileVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createBusinessProfileWithDescriptionRef(vars: CreateBusinessProfileWithDescriptionVariables): MutationRef<CreateBusinessProfileWithDescriptionData, CreateBusinessProfileWithDescriptionVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createBusinessProfileWithDescriptionRef(dc: DataConnect, vars: CreateBusinessProfileWithDescriptionVariables): MutationRef<CreateBusinessProfileWithDescriptionData,CreateBusinessProfileWithDescriptionVariables>;

export function createBusinessProfileWithDescription(vars: CreateBusinessProfileWithDescriptionVariables): MutationPromise<CreateBusinessProfileWithDescriptionData, CreateBusinessProfileWithDescriptionVariables>;
export function createBusinessProfileWithDescription(dc: DataConnect, vars: CreateBusinessProfileWithDescriptionVariables): MutationPromise<CreateBusinessProfileWithDescriptionData,CreateBusinessProfileWithDescriptionVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateBusinessProfileRef(vars: UpdateBusinessProfileVariables): MutationRef<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateBusinessProfileRef(dc: DataConnect, vars: UpdateBusinessProfileVariables): MutationRef<UpdateBusinessProfileData,UpdateBusinessProfileVariables>;

export function updateBusinessProfile(vars: UpdateBusinessProfileVariables): MutationPromise<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;
export function updateBusinessProfile(dc: DataConnect, vars: UpdateBusinessProfileVariables): MutationPromise<UpdateBusinessProfileData,UpdateBusinessProfileVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateBusinessProfileWithDescriptionRef(vars: UpdateBusinessProfileWithDescriptionVariables): MutationRef<UpdateBusinessProfileWithDescriptionData, UpdateBusinessProfileWithDescriptionVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateBusinessProfileWithDescriptionRef(dc: DataConnect, vars: UpdateBusinessProfileWithDescriptionVariables): MutationRef<UpdateBusinessProfileWithDescriptionData,UpdateBusinessProfileWithDescriptionVariables>;

export function updateBusinessProfileWithDescription(vars: UpdateBusinessProfileWithDescriptionVariables): MutationPromise<UpdateBusinessProfileWithDescriptionData, UpdateBusinessProfileWithDescriptionVariables>;
export function updateBusinessProfileWithDescription(dc: DataConnect, vars: UpdateBusinessProfileWithDescriptionVariables): MutationPromise<UpdateBusinessProfileWithDescriptionData,UpdateBusinessProfileWithDescriptionVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createPartnerPreferencesRef(vars: CreatePartnerPreferencesVariables): MutationRef<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createPartnerPreferencesRef(dc: DataConnect, vars: CreatePartnerPreferencesVariables): MutationRef<CreatePartnerPreferencesData,CreatePartnerPreferencesVariables>;

export function createPartnerPreferences(vars: CreatePartnerPreferencesVariables): MutationPromise<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;
export function createPartnerPreferences(dc: DataConnect, vars: CreatePartnerPreferencesVariables): MutationPromise<CreatePartnerPreferencesData,CreatePartnerPreferencesVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createPartnerPreferencesWithEmbeddingRef(vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationRef<CreatePartnerPreferencesWithEmbeddingData, CreatePartnerPreferencesWithEmbeddingVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createPartnerPreferencesWithEmbeddingRef(dc: DataConnect, vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationRef<CreatePartnerPreferencesWithEmbeddingData,CreatePartnerPreferencesWithEmbeddingVariables>;

export function createPartnerPreferencesWithEmbedding(vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationPromise<CreatePartnerPreferencesWithEmbeddingData, CreatePartnerPreferencesWithEmbeddingVariables>;
export function createPartnerPreferencesWithEmbedding(dc: DataConnect, vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationPromise<CreatePartnerPreferencesWithEmbeddingData,CreatePartnerPreferencesWithEmbeddingVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updatePartnerPreferencesRef(vars: UpdatePartnerPreferencesVariables): MutationRef<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updatePartnerPreferencesRef(dc: DataConnect, vars: UpdatePartnerPreferencesVariables): MutationRef<UpdatePartnerPreferencesData,UpdatePartnerPreferencesVariables>;

export function updatePartnerPreferences(vars: UpdatePartnerPreferencesVariables): MutationPromise<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;
export function updatePartnerPreferences(dc: DataConnect, vars: UpdatePartnerPreferencesVariables): MutationPromise<UpdatePartnerPreferencesData,UpdatePartnerPreferencesVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updatePartnerPreferencesWithEmbeddingRef(vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationRef<UpdatePartnerPreferencesWithEmbeddingData, UpdatePartnerPreferencesWithEmbeddingVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updatePartnerPreferencesWithEmbeddingRef(dc: DataConnect, vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationRef<UpdatePartnerPreferencesWithEmbeddingData,UpdatePartnerPreferencesWithEmbeddingVariables>;

export function updatePartnerPreferencesWithEmbedding(vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationPromise<UpdatePartnerPreferencesWithEmbeddingData, UpdatePartnerPreferencesWithEmbeddingVariables>;
export function updatePartnerPreferencesWithEmbedding(dc: DataConnect, vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationPromise<UpdatePartnerPreferencesWithEmbeddingData,UpdatePartnerPreferencesWithEmbeddingVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getAllUsersRef(): QueryRef<GetAllUsersData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function getAllUsersRef(dc: DataConnect): QueryRef<GetAllUsersData,undefined>;

export function getAllUsers(): QueryPromise<GetAllUsersData, undefined>;
export function getAllUsers(dc: DataConnect): QueryPromise<GetAllUsersData,undefined>;


/* Allow users to create refs without passing in DataConnect */
export function getCurrentUserRef(): QueryRef<GetCurrentUserData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function getCurrentUserRef(dc: DataConnect): QueryRef<GetCurrentUserData,undefined>;

export function getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData,undefined>;


/* Allow users to create refs without passing in DataConnect */
export function searchProfilesByBioRef(vars: SearchProfilesByBioVariables): QueryRef<SearchProfilesByBioData, SearchProfilesByBioVariables>;
/* Allow users to pass in custom DataConnect instances */
export function searchProfilesByBioRef(dc: DataConnect, vars: SearchProfilesByBioVariables): QueryRef<SearchProfilesByBioData,SearchProfilesByBioVariables>;

export function searchProfilesByBio(vars: SearchProfilesByBioVariables): QueryPromise<SearchProfilesByBioData, SearchProfilesByBioVariables>;
export function searchProfilesByBio(dc: DataConnect, vars: SearchProfilesByBioVariables): QueryPromise<SearchProfilesByBioData,SearchProfilesByBioVariables>;


/* Allow users to create refs without passing in DataConnect */
export function searchBusinessProfilesByDescriptionRef(vars: SearchBusinessProfilesByDescriptionVariables): QueryRef<SearchBusinessProfilesByDescriptionData, SearchBusinessProfilesByDescriptionVariables>;
/* Allow users to pass in custom DataConnect instances */
export function searchBusinessProfilesByDescriptionRef(dc: DataConnect, vars: SearchBusinessProfilesByDescriptionVariables): QueryRef<SearchBusinessProfilesByDescriptionData,SearchBusinessProfilesByDescriptionVariables>;

export function searchBusinessProfilesByDescription(vars: SearchBusinessProfilesByDescriptionVariables): QueryPromise<SearchBusinessProfilesByDescriptionData, SearchBusinessProfilesByDescriptionVariables>;
export function searchBusinessProfilesByDescription(dc: DataConnect, vars: SearchBusinessProfilesByDescriptionVariables): QueryPromise<SearchBusinessProfilesByDescriptionData,SearchBusinessProfilesByDescriptionVariables>;


/* Allow users to create refs without passing in DataConnect */
export function matchProfileToBusinessesRef(vars: MatchProfileToBusinessesVariables): QueryRef<MatchProfileToBusinessesData, MatchProfileToBusinessesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function matchProfileToBusinessesRef(dc: DataConnect, vars: MatchProfileToBusinessesVariables): QueryRef<MatchProfileToBusinessesData,MatchProfileToBusinessesVariables>;

export function matchProfileToBusinesses(vars: MatchProfileToBusinessesVariables): QueryPromise<MatchProfileToBusinessesData, MatchProfileToBusinessesVariables>;
export function matchProfileToBusinesses(dc: DataConnect, vars: MatchProfileToBusinessesVariables): QueryPromise<MatchProfileToBusinessesData,MatchProfileToBusinessesVariables>;


/* Allow users to create refs without passing in DataConnect */
export function businessProfilesBySimilarityRef(vars: BusinessProfilesBySimilarityVariables): QueryRef<BusinessProfilesBySimilarityData, BusinessProfilesBySimilarityVariables>;
/* Allow users to pass in custom DataConnect instances */
export function businessProfilesBySimilarityRef(dc: DataConnect, vars: BusinessProfilesBySimilarityVariables): QueryRef<BusinessProfilesBySimilarityData,BusinessProfilesBySimilarityVariables>;

export function businessProfilesBySimilarity(vars: BusinessProfilesBySimilarityVariables): QueryPromise<BusinessProfilesBySimilarityData, BusinessProfilesBySimilarityVariables>;
export function businessProfilesBySimilarity(dc: DataConnect, vars: BusinessProfilesBySimilarityVariables): QueryPromise<BusinessProfilesBySimilarityData,BusinessProfilesBySimilarityVariables>;


/* Allow users to create refs without passing in DataConnect */
export function matchBusinessToProfilesRef(vars: MatchBusinessToProfilesVariables): QueryRef<MatchBusinessToProfilesData, MatchBusinessToProfilesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function matchBusinessToProfilesRef(dc: DataConnect, vars: MatchBusinessToProfilesVariables): QueryRef<MatchBusinessToProfilesData,MatchBusinessToProfilesVariables>;

export function matchBusinessToProfiles(vars: MatchBusinessToProfilesVariables): QueryPromise<MatchBusinessToProfilesData, MatchBusinessToProfilesVariables>;
export function matchBusinessToProfiles(dc: DataConnect, vars: MatchBusinessToProfilesVariables): QueryPromise<MatchBusinessToProfilesData,MatchBusinessToProfilesVariables>;


/* Allow users to create refs without passing in DataConnect */
export function profilesBySimilarityRef(vars: ProfilesBySimilarityVariables): QueryRef<ProfilesBySimilarityData, ProfilesBySimilarityVariables>;
/* Allow users to pass in custom DataConnect instances */
export function profilesBySimilarityRef(dc: DataConnect, vars: ProfilesBySimilarityVariables): QueryRef<ProfilesBySimilarityData,ProfilesBySimilarityVariables>;

export function profilesBySimilarity(vars: ProfilesBySimilarityVariables): QueryPromise<ProfilesBySimilarityData, ProfilesBySimilarityVariables>;
export function profilesBySimilarity(dc: DataConnect, vars: ProfilesBySimilarityVariables): QueryPromise<ProfilesBySimilarityData,ProfilesBySimilarityVariables>;


/* Allow users to create refs without passing in DataConnect */
export function searchPartnerPreferencesRef(vars: SearchPartnerPreferencesVariables): QueryRef<SearchPartnerPreferencesData, SearchPartnerPreferencesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function searchPartnerPreferencesRef(dc: DataConnect, vars: SearchPartnerPreferencesVariables): QueryRef<SearchPartnerPreferencesData,SearchPartnerPreferencesVariables>;

export function searchPartnerPreferences(vars: SearchPartnerPreferencesVariables): QueryPromise<SearchPartnerPreferencesData, SearchPartnerPreferencesVariables>;
export function searchPartnerPreferences(dc: DataConnect, vars: SearchPartnerPreferencesVariables): QueryPromise<SearchPartnerPreferencesData,SearchPartnerPreferencesVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getUserRef(vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserRef(dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData,GetUserVariables>;

export function getUser(vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;
export function getUser(dc: DataConnect, vars: GetUserVariables): QueryPromise<GetUserData,GetUserVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getUserProfilesRef(): QueryRef<GetUserProfilesData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function getUserProfilesRef(dc: DataConnect): QueryRef<GetUserProfilesData,undefined>;

export function getUserProfiles(): QueryPromise<GetUserProfilesData, undefined>;
export function getUserProfiles(dc: DataConnect): QueryPromise<GetUserProfilesData,undefined>;


/* Allow users to create refs without passing in DataConnect */
export function getUserWorkspacesRef(vars: GetUserWorkspacesVariables): QueryRef<GetUserWorkspacesData, GetUserWorkspacesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserWorkspacesRef(dc: DataConnect, vars: GetUserWorkspacesVariables): QueryRef<GetUserWorkspacesData,GetUserWorkspacesVariables>;

export function getUserWorkspaces(vars: GetUserWorkspacesVariables): QueryPromise<GetUserWorkspacesData, GetUserWorkspacesVariables>;
export function getUserWorkspaces(dc: DataConnect, vars: GetUserWorkspacesVariables): QueryPromise<GetUserWorkspacesData,GetUserWorkspacesVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getWorkspaceRef(vars: GetWorkspaceVariables): QueryRef<GetWorkspaceData, GetWorkspaceVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getWorkspaceRef(dc: DataConnect, vars: GetWorkspaceVariables): QueryRef<GetWorkspaceData,GetWorkspaceVariables>;

export function getWorkspace(vars: GetWorkspaceVariables): QueryPromise<GetWorkspaceData, GetWorkspaceVariables>;
export function getWorkspace(dc: DataConnect, vars: GetWorkspaceVariables): QueryPromise<GetWorkspaceData,GetWorkspaceVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getWorkspaceMembersRef(vars: GetWorkspaceMembersVariables): QueryRef<GetWorkspaceMembersData, GetWorkspaceMembersVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getWorkspaceMembersRef(dc: DataConnect, vars: GetWorkspaceMembersVariables): QueryRef<GetWorkspaceMembersData,GetWorkspaceMembersVariables>;

export function getWorkspaceMembers(vars: GetWorkspaceMembersVariables): QueryPromise<GetWorkspaceMembersData, GetWorkspaceMembersVariables>;
export function getWorkspaceMembers(dc: DataConnect, vars: GetWorkspaceMembersVariables): QueryPromise<GetWorkspaceMembersData,GetWorkspaceMembersVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getBusinessProfileRef(vars: GetBusinessProfileVariables): QueryRef<GetBusinessProfileData, GetBusinessProfileVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getBusinessProfileRef(dc: DataConnect, vars: GetBusinessProfileVariables): QueryRef<GetBusinessProfileData,GetBusinessProfileVariables>;

export function getBusinessProfile(vars: GetBusinessProfileVariables): QueryPromise<GetBusinessProfileData, GetBusinessProfileVariables>;
export function getBusinessProfile(dc: DataConnect, vars: GetBusinessProfileVariables): QueryPromise<GetBusinessProfileData,GetBusinessProfileVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getPartnerPreferencesRef(vars: GetPartnerPreferencesVariables): QueryRef<GetPartnerPreferencesData, GetPartnerPreferencesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getPartnerPreferencesRef(dc: DataConnect, vars: GetPartnerPreferencesVariables): QueryRef<GetPartnerPreferencesData,GetPartnerPreferencesVariables>;

export function getPartnerPreferences(vars: GetPartnerPreferencesVariables): QueryPromise<GetPartnerPreferencesData, GetPartnerPreferencesVariables>;
export function getPartnerPreferences(dc: DataConnect, vars: GetPartnerPreferencesVariables): QueryPromise<GetPartnerPreferencesData,GetPartnerPreferencesVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getWorkspaceInvitationsRef(vars: GetWorkspaceInvitationsVariables): QueryRef<GetWorkspaceInvitationsData, GetWorkspaceInvitationsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getWorkspaceInvitationsRef(dc: DataConnect, vars: GetWorkspaceInvitationsVariables): QueryRef<GetWorkspaceInvitationsData,GetWorkspaceInvitationsVariables>;

export function getWorkspaceInvitations(vars: GetWorkspaceInvitationsVariables): QueryPromise<GetWorkspaceInvitationsData, GetWorkspaceInvitationsVariables>;
export function getWorkspaceInvitations(dc: DataConnect, vars: GetWorkspaceInvitationsVariables): QueryPromise<GetWorkspaceInvitationsData,GetWorkspaceInvitationsVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getPendingInvitationsRef(vars: GetPendingInvitationsVariables): QueryRef<GetPendingInvitationsData, GetPendingInvitationsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getPendingInvitationsRef(dc: DataConnect, vars: GetPendingInvitationsVariables): QueryRef<GetPendingInvitationsData,GetPendingInvitationsVariables>;

export function getPendingInvitations(vars: GetPendingInvitationsVariables): QueryPromise<GetPendingInvitationsData, GetPendingInvitationsVariables>;
export function getPendingInvitations(dc: DataConnect, vars: GetPendingInvitationsVariables): QueryPromise<GetPendingInvitationsData,GetPendingInvitationsVariables>;


