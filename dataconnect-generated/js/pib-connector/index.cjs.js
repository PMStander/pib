const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'pib',
  service: 'pib',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const updateUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUser', inputVars);
}
updateUserRef.operationName = 'UpdateUser';
exports.updateUserRef = updateUserRef;

exports.updateUser = function updateUser(dcOrVars, vars) {
  return executeMutation(updateUserRef(dcOrVars, vars));
};

const createProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProfile', inputVars);
}
createProfileRef.operationName = 'CreateProfile';
exports.createProfileRef = createProfileRef;

exports.createProfile = function createProfile(dcOrVars, vars) {
  return executeMutation(createProfileRef(dcOrVars, vars));
};

const createProfileWithBioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProfileWithBio', inputVars);
}
createProfileWithBioRef.operationName = 'CreateProfileWithBio';
exports.createProfileWithBioRef = createProfileWithBioRef;

exports.createProfileWithBio = function createProfileWithBio(dcOrVars, vars) {
  return executeMutation(createProfileWithBioRef(dcOrVars, vars));
};

const updateProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProfile', inputVars);
}
updateProfileRef.operationName = 'UpdateProfile';
exports.updateProfileRef = updateProfileRef;

exports.updateProfile = function updateProfile(dcOrVars, vars) {
  return executeMutation(updateProfileRef(dcOrVars, vars));
};

const updateProfileWithBioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProfileWithBio', inputVars);
}
updateProfileWithBioRef.operationName = 'UpdateProfileWithBio';
exports.updateProfileWithBioRef = updateProfileWithBioRef;

exports.updateProfileWithBio = function updateProfileWithBio(dcOrVars, vars) {
  return executeMutation(updateProfileWithBioRef(dcOrVars, vars));
};

const deleteProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProfile', inputVars);
}
deleteProfileRef.operationName = 'DeleteProfile';
exports.deleteProfileRef = deleteProfileRef;

exports.deleteProfile = function deleteProfile(dcOrVars, vars) {
  return executeMutation(deleteProfileRef(dcOrVars, vars));
};

const createWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateWorkspace', inputVars);
}
createWorkspaceRef.operationName = 'CreateWorkspace';
exports.createWorkspaceRef = createWorkspaceRef;

exports.createWorkspace = function createWorkspace(dcOrVars, vars) {
  return executeMutation(createWorkspaceRef(dcOrVars, vars));
};

const updateWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateWorkspace', inputVars);
}
updateWorkspaceRef.operationName = 'UpdateWorkspace';
exports.updateWorkspaceRef = updateWorkspaceRef;

exports.updateWorkspace = function updateWorkspace(dcOrVars, vars) {
  return executeMutation(updateWorkspaceRef(dcOrVars, vars));
};

const deleteWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteWorkspace', inputVars);
}
deleteWorkspaceRef.operationName = 'DeleteWorkspace';
exports.deleteWorkspaceRef = deleteWorkspaceRef;

exports.deleteWorkspace = function deleteWorkspace(dcOrVars, vars) {
  return executeMutation(deleteWorkspaceRef(dcOrVars, vars));
};

const addWorkspaceMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddWorkspaceMember', inputVars);
}
addWorkspaceMemberRef.operationName = 'AddWorkspaceMember';
exports.addWorkspaceMemberRef = addWorkspaceMemberRef;

exports.addWorkspaceMember = function addWorkspaceMember(dcOrVars, vars) {
  return executeMutation(addWorkspaceMemberRef(dcOrVars, vars));
};

const updateWorkspaceMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateWorkspaceMember', inputVars);
}
updateWorkspaceMemberRef.operationName = 'UpdateWorkspaceMember';
exports.updateWorkspaceMemberRef = updateWorkspaceMemberRef;

exports.updateWorkspaceMember = function updateWorkspaceMember(dcOrVars, vars) {
  return executeMutation(updateWorkspaceMemberRef(dcOrVars, vars));
};

const removeWorkspaceMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveWorkspaceMember', inputVars);
}
removeWorkspaceMemberRef.operationName = 'RemoveWorkspaceMember';
exports.removeWorkspaceMemberRef = removeWorkspaceMemberRef;

exports.removeWorkspaceMember = function removeWorkspaceMember(dcOrVars, vars) {
  return executeMutation(removeWorkspaceMemberRef(dcOrVars, vars));
};

const inviteToWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InviteToWorkspace', inputVars);
}
inviteToWorkspaceRef.operationName = 'InviteToWorkspace';
exports.inviteToWorkspaceRef = inviteToWorkspaceRef;

exports.inviteToWorkspace = function inviteToWorkspace(dcOrVars, vars) {
  return executeMutation(inviteToWorkspaceRef(dcOrVars, vars));
};

const acceptInvitationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AcceptInvitation', inputVars);
}
acceptInvitationRef.operationName = 'AcceptInvitation';
exports.acceptInvitationRef = acceptInvitationRef;

exports.acceptInvitation = function acceptInvitation(dcOrVars, vars) {
  return executeMutation(acceptInvitationRef(dcOrVars, vars));
};

const declineInvitationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeclineInvitation', inputVars);
}
declineInvitationRef.operationName = 'DeclineInvitation';
exports.declineInvitationRef = declineInvitationRef;

exports.declineInvitation = function declineInvitation(dcOrVars, vars) {
  return executeMutation(declineInvitationRef(dcOrVars, vars));
};

const createBusinessProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBusinessProfile', inputVars);
}
createBusinessProfileRef.operationName = 'CreateBusinessProfile';
exports.createBusinessProfileRef = createBusinessProfileRef;

exports.createBusinessProfile = function createBusinessProfile(dcOrVars, vars) {
  return executeMutation(createBusinessProfileRef(dcOrVars, vars));
};

const createBusinessProfileWithDescriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBusinessProfileWithDescription', inputVars);
}
createBusinessProfileWithDescriptionRef.operationName = 'CreateBusinessProfileWithDescription';
exports.createBusinessProfileWithDescriptionRef = createBusinessProfileWithDescriptionRef;

exports.createBusinessProfileWithDescription = function createBusinessProfileWithDescription(dcOrVars, vars) {
  return executeMutation(createBusinessProfileWithDescriptionRef(dcOrVars, vars));
};

const updateBusinessProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBusinessProfile', inputVars);
}
updateBusinessProfileRef.operationName = 'UpdateBusinessProfile';
exports.updateBusinessProfileRef = updateBusinessProfileRef;

exports.updateBusinessProfile = function updateBusinessProfile(dcOrVars, vars) {
  return executeMutation(updateBusinessProfileRef(dcOrVars, vars));
};

const updateBusinessProfileWithDescriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBusinessProfileWithDescription', inputVars);
}
updateBusinessProfileWithDescriptionRef.operationName = 'UpdateBusinessProfileWithDescription';
exports.updateBusinessProfileWithDescriptionRef = updateBusinessProfileWithDescriptionRef;

exports.updateBusinessProfileWithDescription = function updateBusinessProfileWithDescription(dcOrVars, vars) {
  return executeMutation(updateBusinessProfileWithDescriptionRef(dcOrVars, vars));
};

const createPartnerPreferencesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePartnerPreferences', inputVars);
}
createPartnerPreferencesRef.operationName = 'CreatePartnerPreferences';
exports.createPartnerPreferencesRef = createPartnerPreferencesRef;

exports.createPartnerPreferences = function createPartnerPreferences(dcOrVars, vars) {
  return executeMutation(createPartnerPreferencesRef(dcOrVars, vars));
};

const createPartnerPreferencesWithEmbeddingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePartnerPreferencesWithEmbedding', inputVars);
}
createPartnerPreferencesWithEmbeddingRef.operationName = 'CreatePartnerPreferencesWithEmbedding';
exports.createPartnerPreferencesWithEmbeddingRef = createPartnerPreferencesWithEmbeddingRef;

exports.createPartnerPreferencesWithEmbedding = function createPartnerPreferencesWithEmbedding(dcOrVars, vars) {
  return executeMutation(createPartnerPreferencesWithEmbeddingRef(dcOrVars, vars));
};

const updatePartnerPreferencesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePartnerPreferences', inputVars);
}
updatePartnerPreferencesRef.operationName = 'UpdatePartnerPreferences';
exports.updatePartnerPreferencesRef = updatePartnerPreferencesRef;

exports.updatePartnerPreferences = function updatePartnerPreferences(dcOrVars, vars) {
  return executeMutation(updatePartnerPreferencesRef(dcOrVars, vars));
};

const updatePartnerPreferencesWithEmbeddingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePartnerPreferencesWithEmbedding', inputVars);
}
updatePartnerPreferencesWithEmbeddingRef.operationName = 'UpdatePartnerPreferencesWithEmbedding';
exports.updatePartnerPreferencesWithEmbeddingRef = updatePartnerPreferencesWithEmbeddingRef;

exports.updatePartnerPreferencesWithEmbedding = function updatePartnerPreferencesWithEmbedding(dcOrVars, vars) {
  return executeMutation(updatePartnerPreferencesWithEmbeddingRef(dcOrVars, vars));
};

const getCurrentUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}
getCurrentUserRef.operationName = 'GetCurrentUser';
exports.getCurrentUserRef = getCurrentUserRef;

exports.getCurrentUser = function getCurrentUser(dc) {
  return executeQuery(getCurrentUserRef(dc));
};

const searchProfilesByBioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchProfilesByBio', inputVars);
}
searchProfilesByBioRef.operationName = 'SearchProfilesByBio';
exports.searchProfilesByBioRef = searchProfilesByBioRef;

exports.searchProfilesByBio = function searchProfilesByBio(dcOrVars, vars) {
  return executeQuery(searchProfilesByBioRef(dcOrVars, vars));
};

const getUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUser', inputVars);
}
getUserRef.operationName = 'GetUser';
exports.getUserRef = getUserRef;

exports.getUser = function getUser(dcOrVars, vars) {
  return executeQuery(getUserRef(dcOrVars, vars));
};

const getUserProfilesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserProfiles');
}
getUserProfilesRef.operationName = 'GetUserProfiles';
exports.getUserProfilesRef = getUserProfilesRef;

exports.getUserProfiles = function getUserProfiles(dc) {
  return executeQuery(getUserProfilesRef(dc));
};

const getUserWorkspacesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserWorkspaces');
}
getUserWorkspacesRef.operationName = 'GetUserWorkspaces';
exports.getUserWorkspacesRef = getUserWorkspacesRef;

exports.getUserWorkspaces = function getUserWorkspaces(dc) {
  return executeQuery(getUserWorkspacesRef(dc));
};

const getWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetWorkspace', inputVars);
}
getWorkspaceRef.operationName = 'GetWorkspace';
exports.getWorkspaceRef = getWorkspaceRef;

exports.getWorkspace = function getWorkspace(dcOrVars, vars) {
  return executeQuery(getWorkspaceRef(dcOrVars, vars));
};

const getWorkspaceMembersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetWorkspaceMembers', inputVars);
}
getWorkspaceMembersRef.operationName = 'GetWorkspaceMembers';
exports.getWorkspaceMembersRef = getWorkspaceMembersRef;

exports.getWorkspaceMembers = function getWorkspaceMembers(dcOrVars, vars) {
  return executeQuery(getWorkspaceMembersRef(dcOrVars, vars));
};

const getBusinessProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetBusinessProfile', inputVars);
}
getBusinessProfileRef.operationName = 'GetBusinessProfile';
exports.getBusinessProfileRef = getBusinessProfileRef;

exports.getBusinessProfile = function getBusinessProfile(dcOrVars, vars) {
  return executeQuery(getBusinessProfileRef(dcOrVars, vars));
};

const getPartnerPreferencesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPartnerPreferences', inputVars);
}
getPartnerPreferencesRef.operationName = 'GetPartnerPreferences';
exports.getPartnerPreferencesRef = getPartnerPreferencesRef;

exports.getPartnerPreferences = function getPartnerPreferences(dcOrVars, vars) {
  return executeQuery(getPartnerPreferencesRef(dcOrVars, vars));
};

const getWorkspaceInvitationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetWorkspaceInvitations', inputVars);
}
getWorkspaceInvitationsRef.operationName = 'GetWorkspaceInvitations';
exports.getWorkspaceInvitationsRef = getWorkspaceInvitationsRef;

exports.getWorkspaceInvitations = function getWorkspaceInvitations(dcOrVars, vars) {
  return executeQuery(getWorkspaceInvitationsRef(dcOrVars, vars));
};

const getPendingInvitationsByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPendingInvitationsByEmail', inputVars);
}
getPendingInvitationsByEmailRef.operationName = 'GetPendingInvitationsByEmail';
exports.getPendingInvitationsByEmailRef = getPendingInvitationsByEmailRef;

exports.getPendingInvitationsByEmail = function getPendingInvitationsByEmail(dcOrVars, vars) {
  return executeQuery(getPendingInvitationsByEmailRef(dcOrVars, vars));
};
