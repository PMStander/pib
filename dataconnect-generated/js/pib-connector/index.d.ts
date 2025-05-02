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
    userId: string;
    profileId?: UUIDString | null;
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

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface CreateProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProfileVariables): MutationRef<CreateProfileData, CreateProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProfileVariables): MutationRef<CreateProfileData, CreateProfileVariables>;
  operationName: string;
}
export const createProfileRef: CreateProfileRef;

export function createProfile(vars: CreateProfileVariables): MutationPromise<CreateProfileData, CreateProfileVariables>;
export function createProfile(dc: DataConnect, vars: CreateProfileVariables): MutationPromise<CreateProfileData, CreateProfileVariables>;

interface CreateProfileWithBioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProfileWithBioVariables): MutationRef<CreateProfileWithBioData, CreateProfileWithBioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProfileWithBioVariables): MutationRef<CreateProfileWithBioData, CreateProfileWithBioVariables>;
  operationName: string;
}
export const createProfileWithBioRef: CreateProfileWithBioRef;

export function createProfileWithBio(vars: CreateProfileWithBioVariables): MutationPromise<CreateProfileWithBioData, CreateProfileWithBioVariables>;
export function createProfileWithBio(dc: DataConnect, vars: CreateProfileWithBioVariables): MutationPromise<CreateProfileWithBioData, CreateProfileWithBioVariables>;

interface UpdateProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProfileVariables): MutationRef<UpdateProfileData, UpdateProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProfileVariables): MutationRef<UpdateProfileData, UpdateProfileVariables>;
  operationName: string;
}
export const updateProfileRef: UpdateProfileRef;

export function updateProfile(vars: UpdateProfileVariables): MutationPromise<UpdateProfileData, UpdateProfileVariables>;
export function updateProfile(dc: DataConnect, vars: UpdateProfileVariables): MutationPromise<UpdateProfileData, UpdateProfileVariables>;

interface UpdateProfileWithBioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProfileWithBioVariables): MutationRef<UpdateProfileWithBioData, UpdateProfileWithBioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProfileWithBioVariables): MutationRef<UpdateProfileWithBioData, UpdateProfileWithBioVariables>;
  operationName: string;
}
export const updateProfileWithBioRef: UpdateProfileWithBioRef;

export function updateProfileWithBio(vars: UpdateProfileWithBioVariables): MutationPromise<UpdateProfileWithBioData, UpdateProfileWithBioVariables>;
export function updateProfileWithBio(dc: DataConnect, vars: UpdateProfileWithBioVariables): MutationPromise<UpdateProfileWithBioData, UpdateProfileWithBioVariables>;

interface DeleteProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProfileVariables): MutationRef<DeleteProfileData, DeleteProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProfileVariables): MutationRef<DeleteProfileData, DeleteProfileVariables>;
  operationName: string;
}
export const deleteProfileRef: DeleteProfileRef;

export function deleteProfile(vars: DeleteProfileVariables): MutationPromise<DeleteProfileData, DeleteProfileVariables>;
export function deleteProfile(dc: DataConnect, vars: DeleteProfileVariables): MutationPromise<DeleteProfileData, DeleteProfileVariables>;

interface CreateWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWorkspaceVariables): MutationRef<CreateWorkspaceData, CreateWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateWorkspaceVariables): MutationRef<CreateWorkspaceData, CreateWorkspaceVariables>;
  operationName: string;
}
export const createWorkspaceRef: CreateWorkspaceRef;

export function createWorkspace(vars: CreateWorkspaceVariables): MutationPromise<CreateWorkspaceData, CreateWorkspaceVariables>;
export function createWorkspace(dc: DataConnect, vars: CreateWorkspaceVariables): MutationPromise<CreateWorkspaceData, CreateWorkspaceVariables>;

interface UpdateWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWorkspaceVariables): MutationRef<UpdateWorkspaceData, UpdateWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateWorkspaceVariables): MutationRef<UpdateWorkspaceData, UpdateWorkspaceVariables>;
  operationName: string;
}
export const updateWorkspaceRef: UpdateWorkspaceRef;

export function updateWorkspace(vars: UpdateWorkspaceVariables): MutationPromise<UpdateWorkspaceData, UpdateWorkspaceVariables>;
export function updateWorkspace(dc: DataConnect, vars: UpdateWorkspaceVariables): MutationPromise<UpdateWorkspaceData, UpdateWorkspaceVariables>;

interface DeleteWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWorkspaceVariables): MutationRef<DeleteWorkspaceData, DeleteWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteWorkspaceVariables): MutationRef<DeleteWorkspaceData, DeleteWorkspaceVariables>;
  operationName: string;
}
export const deleteWorkspaceRef: DeleteWorkspaceRef;

export function deleteWorkspace(vars: DeleteWorkspaceVariables): MutationPromise<DeleteWorkspaceData, DeleteWorkspaceVariables>;
export function deleteWorkspace(dc: DataConnect, vars: DeleteWorkspaceVariables): MutationPromise<DeleteWorkspaceData, DeleteWorkspaceVariables>;

interface JoinWorkspaceUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: JoinWorkspaceUserVariables): MutationRef<JoinWorkspaceUserData, JoinWorkspaceUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: JoinWorkspaceUserVariables): MutationRef<JoinWorkspaceUserData, JoinWorkspaceUserVariables>;
  operationName: string;
}
export const joinWorkspaceUserRef: JoinWorkspaceUserRef;

export function joinWorkspaceUser(vars: JoinWorkspaceUserVariables): MutationPromise<JoinWorkspaceUserData, JoinWorkspaceUserVariables>;
export function joinWorkspaceUser(dc: DataConnect, vars: JoinWorkspaceUserVariables): MutationPromise<JoinWorkspaceUserData, JoinWorkspaceUserVariables>;

interface AddWorkspaceMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddWorkspaceMemberVariables): MutationRef<AddWorkspaceMemberData, AddWorkspaceMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddWorkspaceMemberVariables): MutationRef<AddWorkspaceMemberData, AddWorkspaceMemberVariables>;
  operationName: string;
}
export const addWorkspaceMemberRef: AddWorkspaceMemberRef;

export function addWorkspaceMember(vars: AddWorkspaceMemberVariables): MutationPromise<AddWorkspaceMemberData, AddWorkspaceMemberVariables>;
export function addWorkspaceMember(dc: DataConnect, vars: AddWorkspaceMemberVariables): MutationPromise<AddWorkspaceMemberData, AddWorkspaceMemberVariables>;

interface UpdateWorkspaceMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWorkspaceMemberVariables): MutationRef<UpdateWorkspaceMemberData, UpdateWorkspaceMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateWorkspaceMemberVariables): MutationRef<UpdateWorkspaceMemberData, UpdateWorkspaceMemberVariables>;
  operationName: string;
}
export const updateWorkspaceMemberRef: UpdateWorkspaceMemberRef;

export function updateWorkspaceMember(vars: UpdateWorkspaceMemberVariables): MutationPromise<UpdateWorkspaceMemberData, UpdateWorkspaceMemberVariables>;
export function updateWorkspaceMember(dc: DataConnect, vars: UpdateWorkspaceMemberVariables): MutationPromise<UpdateWorkspaceMemberData, UpdateWorkspaceMemberVariables>;

interface RemoveWorkspaceMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveWorkspaceMemberVariables): MutationRef<RemoveWorkspaceMemberData, RemoveWorkspaceMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveWorkspaceMemberVariables): MutationRef<RemoveWorkspaceMemberData, RemoveWorkspaceMemberVariables>;
  operationName: string;
}
export const removeWorkspaceMemberRef: RemoveWorkspaceMemberRef;

export function removeWorkspaceMember(vars: RemoveWorkspaceMemberVariables): MutationPromise<RemoveWorkspaceMemberData, RemoveWorkspaceMemberVariables>;
export function removeWorkspaceMember(dc: DataConnect, vars: RemoveWorkspaceMemberVariables): MutationPromise<RemoveWorkspaceMemberData, RemoveWorkspaceMemberVariables>;

interface InviteToWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InviteToWorkspaceVariables): MutationRef<InviteToWorkspaceData, InviteToWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InviteToWorkspaceVariables): MutationRef<InviteToWorkspaceData, InviteToWorkspaceVariables>;
  operationName: string;
}
export const inviteToWorkspaceRef: InviteToWorkspaceRef;

export function inviteToWorkspace(vars: InviteToWorkspaceVariables): MutationPromise<InviteToWorkspaceData, InviteToWorkspaceVariables>;
export function inviteToWorkspace(dc: DataConnect, vars: InviteToWorkspaceVariables): MutationPromise<InviteToWorkspaceData, InviteToWorkspaceVariables>;

interface AcceptInvitationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AcceptInvitationVariables): MutationRef<AcceptInvitationData, AcceptInvitationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AcceptInvitationVariables): MutationRef<AcceptInvitationData, AcceptInvitationVariables>;
  operationName: string;
}
export const acceptInvitationRef: AcceptInvitationRef;

export function acceptInvitation(vars: AcceptInvitationVariables): MutationPromise<AcceptInvitationData, AcceptInvitationVariables>;
export function acceptInvitation(dc: DataConnect, vars: AcceptInvitationVariables): MutationPromise<AcceptInvitationData, AcceptInvitationVariables>;

interface DeclineInvitationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeclineInvitationVariables): MutationRef<DeclineInvitationData, DeclineInvitationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeclineInvitationVariables): MutationRef<DeclineInvitationData, DeclineInvitationVariables>;
  operationName: string;
}
export const declineInvitationRef: DeclineInvitationRef;

export function declineInvitation(vars: DeclineInvitationVariables): MutationPromise<DeclineInvitationData, DeclineInvitationVariables>;
export function declineInvitation(dc: DataConnect, vars: DeclineInvitationVariables): MutationPromise<DeclineInvitationData, DeclineInvitationVariables>;

interface CreateBusinessProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBusinessProfileVariables): MutationRef<CreateBusinessProfileData, CreateBusinessProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBusinessProfileVariables): MutationRef<CreateBusinessProfileData, CreateBusinessProfileVariables>;
  operationName: string;
}
export const createBusinessProfileRef: CreateBusinessProfileRef;

export function createBusinessProfile(vars: CreateBusinessProfileVariables): MutationPromise<CreateBusinessProfileData, CreateBusinessProfileVariables>;
export function createBusinessProfile(dc: DataConnect, vars: CreateBusinessProfileVariables): MutationPromise<CreateBusinessProfileData, CreateBusinessProfileVariables>;

interface CreateBusinessProfileWithDescriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBusinessProfileWithDescriptionVariables): MutationRef<CreateBusinessProfileWithDescriptionData, CreateBusinessProfileWithDescriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBusinessProfileWithDescriptionVariables): MutationRef<CreateBusinessProfileWithDescriptionData, CreateBusinessProfileWithDescriptionVariables>;
  operationName: string;
}
export const createBusinessProfileWithDescriptionRef: CreateBusinessProfileWithDescriptionRef;

export function createBusinessProfileWithDescription(vars: CreateBusinessProfileWithDescriptionVariables): MutationPromise<CreateBusinessProfileWithDescriptionData, CreateBusinessProfileWithDescriptionVariables>;
export function createBusinessProfileWithDescription(dc: DataConnect, vars: CreateBusinessProfileWithDescriptionVariables): MutationPromise<CreateBusinessProfileWithDescriptionData, CreateBusinessProfileWithDescriptionVariables>;

interface UpdateBusinessProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBusinessProfileVariables): MutationRef<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateBusinessProfileVariables): MutationRef<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;
  operationName: string;
}
export const updateBusinessProfileRef: UpdateBusinessProfileRef;

export function updateBusinessProfile(vars: UpdateBusinessProfileVariables): MutationPromise<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;
export function updateBusinessProfile(dc: DataConnect, vars: UpdateBusinessProfileVariables): MutationPromise<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;

interface UpdateBusinessProfileWithDescriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBusinessProfileWithDescriptionVariables): MutationRef<UpdateBusinessProfileWithDescriptionData, UpdateBusinessProfileWithDescriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateBusinessProfileWithDescriptionVariables): MutationRef<UpdateBusinessProfileWithDescriptionData, UpdateBusinessProfileWithDescriptionVariables>;
  operationName: string;
}
export const updateBusinessProfileWithDescriptionRef: UpdateBusinessProfileWithDescriptionRef;

export function updateBusinessProfileWithDescription(vars: UpdateBusinessProfileWithDescriptionVariables): MutationPromise<UpdateBusinessProfileWithDescriptionData, UpdateBusinessProfileWithDescriptionVariables>;
export function updateBusinessProfileWithDescription(dc: DataConnect, vars: UpdateBusinessProfileWithDescriptionVariables): MutationPromise<UpdateBusinessProfileWithDescriptionData, UpdateBusinessProfileWithDescriptionVariables>;

interface CreatePartnerPreferencesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePartnerPreferencesVariables): MutationRef<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePartnerPreferencesVariables): MutationRef<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;
  operationName: string;
}
export const createPartnerPreferencesRef: CreatePartnerPreferencesRef;

export function createPartnerPreferences(vars: CreatePartnerPreferencesVariables): MutationPromise<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;
export function createPartnerPreferences(dc: DataConnect, vars: CreatePartnerPreferencesVariables): MutationPromise<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;

interface CreatePartnerPreferencesWithEmbeddingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationRef<CreatePartnerPreferencesWithEmbeddingData, CreatePartnerPreferencesWithEmbeddingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationRef<CreatePartnerPreferencesWithEmbeddingData, CreatePartnerPreferencesWithEmbeddingVariables>;
  operationName: string;
}
export const createPartnerPreferencesWithEmbeddingRef: CreatePartnerPreferencesWithEmbeddingRef;

export function createPartnerPreferencesWithEmbedding(vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationPromise<CreatePartnerPreferencesWithEmbeddingData, CreatePartnerPreferencesWithEmbeddingVariables>;
export function createPartnerPreferencesWithEmbedding(dc: DataConnect, vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationPromise<CreatePartnerPreferencesWithEmbeddingData, CreatePartnerPreferencesWithEmbeddingVariables>;

interface UpdatePartnerPreferencesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePartnerPreferencesVariables): MutationRef<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePartnerPreferencesVariables): MutationRef<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;
  operationName: string;
}
export const updatePartnerPreferencesRef: UpdatePartnerPreferencesRef;

export function updatePartnerPreferences(vars: UpdatePartnerPreferencesVariables): MutationPromise<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;
export function updatePartnerPreferences(dc: DataConnect, vars: UpdatePartnerPreferencesVariables): MutationPromise<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;

interface UpdatePartnerPreferencesWithEmbeddingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationRef<UpdatePartnerPreferencesWithEmbeddingData, UpdatePartnerPreferencesWithEmbeddingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationRef<UpdatePartnerPreferencesWithEmbeddingData, UpdatePartnerPreferencesWithEmbeddingVariables>;
  operationName: string;
}
export const updatePartnerPreferencesWithEmbeddingRef: UpdatePartnerPreferencesWithEmbeddingRef;

export function updatePartnerPreferencesWithEmbedding(vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationPromise<UpdatePartnerPreferencesWithEmbeddingData, UpdatePartnerPreferencesWithEmbeddingVariables>;
export function updatePartnerPreferencesWithEmbedding(dc: DataConnect, vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationPromise<UpdatePartnerPreferencesWithEmbeddingData, UpdatePartnerPreferencesWithEmbeddingVariables>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData, undefined>;

interface SearchProfilesByBioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchProfilesByBioVariables): QueryRef<SearchProfilesByBioData, SearchProfilesByBioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SearchProfilesByBioVariables): QueryRef<SearchProfilesByBioData, SearchProfilesByBioVariables>;
  operationName: string;
}
export const searchProfilesByBioRef: SearchProfilesByBioRef;

export function searchProfilesByBio(vars: SearchProfilesByBioVariables): QueryPromise<SearchProfilesByBioData, SearchProfilesByBioVariables>;
export function searchProfilesByBio(dc: DataConnect, vars: SearchProfilesByBioVariables): QueryPromise<SearchProfilesByBioData, SearchProfilesByBioVariables>;

interface SearchBusinessProfilesByDescriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchBusinessProfilesByDescriptionVariables): QueryRef<SearchBusinessProfilesByDescriptionData, SearchBusinessProfilesByDescriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SearchBusinessProfilesByDescriptionVariables): QueryRef<SearchBusinessProfilesByDescriptionData, SearchBusinessProfilesByDescriptionVariables>;
  operationName: string;
}
export const searchBusinessProfilesByDescriptionRef: SearchBusinessProfilesByDescriptionRef;

export function searchBusinessProfilesByDescription(vars: SearchBusinessProfilesByDescriptionVariables): QueryPromise<SearchBusinessProfilesByDescriptionData, SearchBusinessProfilesByDescriptionVariables>;
export function searchBusinessProfilesByDescription(dc: DataConnect, vars: SearchBusinessProfilesByDescriptionVariables): QueryPromise<SearchBusinessProfilesByDescriptionData, SearchBusinessProfilesByDescriptionVariables>;

interface MatchProfileToBusinessesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: MatchProfileToBusinessesVariables): QueryRef<MatchProfileToBusinessesData, MatchProfileToBusinessesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: MatchProfileToBusinessesVariables): QueryRef<MatchProfileToBusinessesData, MatchProfileToBusinessesVariables>;
  operationName: string;
}
export const matchProfileToBusinessesRef: MatchProfileToBusinessesRef;

export function matchProfileToBusinesses(vars: MatchProfileToBusinessesVariables): QueryPromise<MatchProfileToBusinessesData, MatchProfileToBusinessesVariables>;
export function matchProfileToBusinesses(dc: DataConnect, vars: MatchProfileToBusinessesVariables): QueryPromise<MatchProfileToBusinessesData, MatchProfileToBusinessesVariables>;

interface MatchBusinessToProfilesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: MatchBusinessToProfilesVariables): QueryRef<MatchBusinessToProfilesData, MatchBusinessToProfilesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: MatchBusinessToProfilesVariables): QueryRef<MatchBusinessToProfilesData, MatchBusinessToProfilesVariables>;
  operationName: string;
}
export const matchBusinessToProfilesRef: MatchBusinessToProfilesRef;

export function matchBusinessToProfiles(vars: MatchBusinessToProfilesVariables): QueryPromise<MatchBusinessToProfilesData, MatchBusinessToProfilesVariables>;
export function matchBusinessToProfiles(dc: DataConnect, vars: MatchBusinessToProfilesVariables): QueryPromise<MatchBusinessToProfilesData, MatchBusinessToProfilesVariables>;

interface SearchPartnerPreferencesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchPartnerPreferencesVariables): QueryRef<SearchPartnerPreferencesData, SearchPartnerPreferencesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SearchPartnerPreferencesVariables): QueryRef<SearchPartnerPreferencesData, SearchPartnerPreferencesVariables>;
  operationName: string;
}
export const searchPartnerPreferencesRef: SearchPartnerPreferencesRef;

export function searchPartnerPreferences(vars: SearchPartnerPreferencesVariables): QueryPromise<SearchPartnerPreferencesData, SearchPartnerPreferencesVariables>;
export function searchPartnerPreferences(dc: DataConnect, vars: SearchPartnerPreferencesVariables): QueryPromise<SearchPartnerPreferencesData, SearchPartnerPreferencesVariables>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;
export function getUser(dc: DataConnect, vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserProfilesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserProfilesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserProfilesData, undefined>;
  operationName: string;
}
export const getUserProfilesRef: GetUserProfilesRef;

export function getUserProfiles(): QueryPromise<GetUserProfilesData, undefined>;
export function getUserProfiles(dc: DataConnect): QueryPromise<GetUserProfilesData, undefined>;

interface GetUserWorkspacesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserWorkspacesVariables): QueryRef<GetUserWorkspacesData, GetUserWorkspacesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserWorkspacesVariables): QueryRef<GetUserWorkspacesData, GetUserWorkspacesVariables>;
  operationName: string;
}
export const getUserWorkspacesRef: GetUserWorkspacesRef;

export function getUserWorkspaces(vars: GetUserWorkspacesVariables): QueryPromise<GetUserWorkspacesData, GetUserWorkspacesVariables>;
export function getUserWorkspaces(dc: DataConnect, vars: GetUserWorkspacesVariables): QueryPromise<GetUserWorkspacesData, GetUserWorkspacesVariables>;

interface GetWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkspaceVariables): QueryRef<GetWorkspaceData, GetWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetWorkspaceVariables): QueryRef<GetWorkspaceData, GetWorkspaceVariables>;
  operationName: string;
}
export const getWorkspaceRef: GetWorkspaceRef;

export function getWorkspace(vars: GetWorkspaceVariables): QueryPromise<GetWorkspaceData, GetWorkspaceVariables>;
export function getWorkspace(dc: DataConnect, vars: GetWorkspaceVariables): QueryPromise<GetWorkspaceData, GetWorkspaceVariables>;

interface GetWorkspaceMembersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkspaceMembersVariables): QueryRef<GetWorkspaceMembersData, GetWorkspaceMembersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetWorkspaceMembersVariables): QueryRef<GetWorkspaceMembersData, GetWorkspaceMembersVariables>;
  operationName: string;
}
export const getWorkspaceMembersRef: GetWorkspaceMembersRef;

export function getWorkspaceMembers(vars: GetWorkspaceMembersVariables): QueryPromise<GetWorkspaceMembersData, GetWorkspaceMembersVariables>;
export function getWorkspaceMembers(dc: DataConnect, vars: GetWorkspaceMembersVariables): QueryPromise<GetWorkspaceMembersData, GetWorkspaceMembersVariables>;

interface GetBusinessProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBusinessProfileVariables): QueryRef<GetBusinessProfileData, GetBusinessProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetBusinessProfileVariables): QueryRef<GetBusinessProfileData, GetBusinessProfileVariables>;
  operationName: string;
}
export const getBusinessProfileRef: GetBusinessProfileRef;

export function getBusinessProfile(vars: GetBusinessProfileVariables): QueryPromise<GetBusinessProfileData, GetBusinessProfileVariables>;
export function getBusinessProfile(dc: DataConnect, vars: GetBusinessProfileVariables): QueryPromise<GetBusinessProfileData, GetBusinessProfileVariables>;

interface GetPartnerPreferencesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPartnerPreferencesVariables): QueryRef<GetPartnerPreferencesData, GetPartnerPreferencesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPartnerPreferencesVariables): QueryRef<GetPartnerPreferencesData, GetPartnerPreferencesVariables>;
  operationName: string;
}
export const getPartnerPreferencesRef: GetPartnerPreferencesRef;

export function getPartnerPreferences(vars: GetPartnerPreferencesVariables): QueryPromise<GetPartnerPreferencesData, GetPartnerPreferencesVariables>;
export function getPartnerPreferences(dc: DataConnect, vars: GetPartnerPreferencesVariables): QueryPromise<GetPartnerPreferencesData, GetPartnerPreferencesVariables>;

interface GetWorkspaceInvitationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkspaceInvitationsVariables): QueryRef<GetWorkspaceInvitationsData, GetWorkspaceInvitationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetWorkspaceInvitationsVariables): QueryRef<GetWorkspaceInvitationsData, GetWorkspaceInvitationsVariables>;
  operationName: string;
}
export const getWorkspaceInvitationsRef: GetWorkspaceInvitationsRef;

export function getWorkspaceInvitations(vars: GetWorkspaceInvitationsVariables): QueryPromise<GetWorkspaceInvitationsData, GetWorkspaceInvitationsVariables>;
export function getWorkspaceInvitations(dc: DataConnect, vars: GetWorkspaceInvitationsVariables): QueryPromise<GetWorkspaceInvitationsData, GetWorkspaceInvitationsVariables>;

interface GetPendingInvitationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPendingInvitationsVariables): QueryRef<GetPendingInvitationsData, GetPendingInvitationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPendingInvitationsVariables): QueryRef<GetPendingInvitationsData, GetPendingInvitationsVariables>;
  operationName: string;
}
export const getPendingInvitationsRef: GetPendingInvitationsRef;

export function getPendingInvitations(vars: GetPendingInvitationsVariables): QueryPromise<GetPendingInvitationsData, GetPendingInvitationsVariables>;
export function getPendingInvitations(dc: DataConnect, vars: GetPendingInvitationsVariables): QueryPromise<GetPendingInvitationsData, GetPendingInvitationsVariables>;

