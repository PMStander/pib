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

export interface GetPendingInvitationsByEmailData {
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

export interface GetPendingInvitationsByEmailVariables {
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
  workspaceMembers: ({
    workspaceId: UUIDString;
  })[];
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
    workspaceId: UUIDString;
    userId: string;
    profileId?: UUIDString | null;
    role: string;
    joinedAt: TimestampString;
  } & WorkspaceMember_Key)[];
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

export interface Workspace_Key {
  id: UUIDString;
  __typename?: 'Workspace_Key';
}



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
export function updateProfileRef(vars: UpdateProfileVariables): MutationRef<UpdateProfileData, UpdateProfileVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateProfileRef(dc: DataConnect, vars: UpdateProfileVariables): MutationRef<UpdateProfileData,UpdateProfileVariables>;

export function updateProfile(vars: UpdateProfileVariables): MutationPromise<UpdateProfileData, UpdateProfileVariables>;
export function updateProfile(dc: DataConnect, vars: UpdateProfileVariables): MutationPromise<UpdateProfileData,UpdateProfileVariables>;


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
export function updateBusinessProfileRef(vars: UpdateBusinessProfileVariables): MutationRef<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateBusinessProfileRef(dc: DataConnect, vars: UpdateBusinessProfileVariables): MutationRef<UpdateBusinessProfileData,UpdateBusinessProfileVariables>;

export function updateBusinessProfile(vars: UpdateBusinessProfileVariables): MutationPromise<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;
export function updateBusinessProfile(dc: DataConnect, vars: UpdateBusinessProfileVariables): MutationPromise<UpdateBusinessProfileData,UpdateBusinessProfileVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createPartnerPreferencesRef(vars: CreatePartnerPreferencesVariables): MutationRef<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createPartnerPreferencesRef(dc: DataConnect, vars: CreatePartnerPreferencesVariables): MutationRef<CreatePartnerPreferencesData,CreatePartnerPreferencesVariables>;

export function createPartnerPreferences(vars: CreatePartnerPreferencesVariables): MutationPromise<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;
export function createPartnerPreferences(dc: DataConnect, vars: CreatePartnerPreferencesVariables): MutationPromise<CreatePartnerPreferencesData,CreatePartnerPreferencesVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updatePartnerPreferencesRef(vars: UpdatePartnerPreferencesVariables): MutationRef<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updatePartnerPreferencesRef(dc: DataConnect, vars: UpdatePartnerPreferencesVariables): MutationRef<UpdatePartnerPreferencesData,UpdatePartnerPreferencesVariables>;

export function updatePartnerPreferences(vars: UpdatePartnerPreferencesVariables): MutationPromise<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;
export function updatePartnerPreferences(dc: DataConnect, vars: UpdatePartnerPreferencesVariables): MutationPromise<UpdatePartnerPreferencesData,UpdatePartnerPreferencesVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getCurrentUserRef(): QueryRef<GetCurrentUserData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function getCurrentUserRef(dc: DataConnect): QueryRef<GetCurrentUserData,undefined>;

export function getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData,undefined>;


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
export function getUserWorkspacesRef(): QueryRef<GetUserWorkspacesData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function getUserWorkspacesRef(dc: DataConnect): QueryRef<GetUserWorkspacesData,undefined>;

export function getUserWorkspaces(): QueryPromise<GetUserWorkspacesData, undefined>;
export function getUserWorkspaces(dc: DataConnect): QueryPromise<GetUserWorkspacesData,undefined>;


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
export function getPendingInvitationsByEmailRef(vars: GetPendingInvitationsByEmailVariables): QueryRef<GetPendingInvitationsByEmailData, GetPendingInvitationsByEmailVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getPendingInvitationsByEmailRef(dc: DataConnect, vars: GetPendingInvitationsByEmailVariables): QueryRef<GetPendingInvitationsByEmailData,GetPendingInvitationsByEmailVariables>;

export function getPendingInvitationsByEmail(vars: GetPendingInvitationsByEmailVariables): QueryPromise<GetPendingInvitationsByEmailData, GetPendingInvitationsByEmailVariables>;
export function getPendingInvitationsByEmail(dc: DataConnect, vars: GetPendingInvitationsByEmailVariables): QueryPromise<GetPendingInvitationsByEmailData,GetPendingInvitationsByEmailVariables>;


