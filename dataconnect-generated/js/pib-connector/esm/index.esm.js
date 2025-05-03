import { getDataConnect, queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'pib',
  service: 'pib',
  location: 'us-central1'
};

export function createUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}
export function updateUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateUser', inputVars);
}
export function updateUser(dcOrVars, vars) {
  return executeMutation(updateUserRef(dcOrVars, vars));
}
export function createProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateProfile', inputVars);
}
export function createProfile(dcOrVars, vars) {
  return executeMutation(createProfileRef(dcOrVars, vars));
}
export function createProfileWithBioRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateProfileWithBio', inputVars);
}
export function createProfileWithBio(dcOrVars, vars) {
  return executeMutation(createProfileWithBioRef(dcOrVars, vars));
}
export function updateProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateProfile', inputVars);
}
export function updateProfile(dcOrVars, vars) {
  return executeMutation(updateProfileRef(dcOrVars, vars));
}
export function updateProfileWithBioRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateProfileWithBio', inputVars);
}
export function updateProfileWithBio(dcOrVars, vars) {
  return executeMutation(updateProfileWithBioRef(dcOrVars, vars));
}
export function deleteProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'DeleteProfile', inputVars);
}
export function deleteProfile(dcOrVars, vars) {
  return executeMutation(deleteProfileRef(dcOrVars, vars));
}
export function createWorkspaceRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateWorkspace', inputVars);
}
export function createWorkspace(dcOrVars, vars) {
  return executeMutation(createWorkspaceRef(dcOrVars, vars));
}
export function updateWorkspaceRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateWorkspace', inputVars);
}
export function updateWorkspace(dcOrVars, vars) {
  return executeMutation(updateWorkspaceRef(dcOrVars, vars));
}
export function deleteWorkspaceRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'DeleteWorkspace', inputVars);
}
export function deleteWorkspace(dcOrVars, vars) {
  return executeMutation(deleteWorkspaceRef(dcOrVars, vars));
}
export function joinWorkspaceUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'JoinWorkspaceUser', inputVars);
}
export function joinWorkspaceUser(dcOrVars, vars) {
  return executeMutation(joinWorkspaceUserRef(dcOrVars, vars));
}
export function addWorkspaceMemberRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'AddWorkspaceMember', inputVars);
}
export function addWorkspaceMember(dcOrVars, vars) {
  return executeMutation(addWorkspaceMemberRef(dcOrVars, vars));
}
export function updateWorkspaceMemberRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateWorkspaceMember', inputVars);
}
export function updateWorkspaceMember(dcOrVars, vars) {
  return executeMutation(updateWorkspaceMemberRef(dcOrVars, vars));
}
export function removeWorkspaceMemberRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'RemoveWorkspaceMember', inputVars);
}
export function removeWorkspaceMember(dcOrVars, vars) {
  return executeMutation(removeWorkspaceMemberRef(dcOrVars, vars));
}
export function inviteToWorkspaceRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'InviteToWorkspace', inputVars);
}
export function inviteToWorkspace(dcOrVars, vars) {
  return executeMutation(inviteToWorkspaceRef(dcOrVars, vars));
}
export function acceptInvitationRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'AcceptInvitation', inputVars);
}
export function acceptInvitation(dcOrVars, vars) {
  return executeMutation(acceptInvitationRef(dcOrVars, vars));
}
export function declineInvitationRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'DeclineInvitation', inputVars);
}
export function declineInvitation(dcOrVars, vars) {
  return executeMutation(declineInvitationRef(dcOrVars, vars));
}
export function createBusinessProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateBusinessProfile', inputVars);
}
export function createBusinessProfile(dcOrVars, vars) {
  return executeMutation(createBusinessProfileRef(dcOrVars, vars));
}
export function createBusinessProfileWithDescriptionRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateBusinessProfileWithDescription', inputVars);
}
export function createBusinessProfileWithDescription(dcOrVars, vars) {
  return executeMutation(createBusinessProfileWithDescriptionRef(dcOrVars, vars));
}
export function updateBusinessProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateBusinessProfile', inputVars);
}
export function updateBusinessProfile(dcOrVars, vars) {
  return executeMutation(updateBusinessProfileRef(dcOrVars, vars));
}
export function updateBusinessProfileWithDescriptionRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateBusinessProfileWithDescription', inputVars);
}
export function updateBusinessProfileWithDescription(dcOrVars, vars) {
  return executeMutation(updateBusinessProfileWithDescriptionRef(dcOrVars, vars));
}
export function createPartnerPreferencesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreatePartnerPreferences', inputVars);
}
export function createPartnerPreferences(dcOrVars, vars) {
  return executeMutation(createPartnerPreferencesRef(dcOrVars, vars));
}
export function createPartnerPreferencesWithEmbeddingRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreatePartnerPreferencesWithEmbedding', inputVars);
}
export function createPartnerPreferencesWithEmbedding(dcOrVars, vars) {
  return executeMutation(createPartnerPreferencesWithEmbeddingRef(dcOrVars, vars));
}
export function updatePartnerPreferencesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdatePartnerPreferences', inputVars);
}
export function updatePartnerPreferences(dcOrVars, vars) {
  return executeMutation(updatePartnerPreferencesRef(dcOrVars, vars));
}
export function updatePartnerPreferencesWithEmbeddingRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdatePartnerPreferencesWithEmbedding', inputVars);
}
export function updatePartnerPreferencesWithEmbedding(dcOrVars, vars) {
  return executeMutation(updatePartnerPreferencesWithEmbeddingRef(dcOrVars, vars));
}
export function createLlmKeyRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateLLMKey', inputVars);
}
export function createLlmKey(dcOrVars, vars) {
  return executeMutation(createLlmKeyRef(dcOrVars, vars));
}
export function updateLlmKeyRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateLLMKey', inputVars);
}
export function updateLlmKey(dcOrVars, vars) {
  return executeMutation(updateLlmKeyRef(dcOrVars, vars));
}
export function deleteLlmKeyRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'DeleteLLMKey', inputVars);
}
export function deleteLlmKey(dcOrVars, vars) {
  return executeMutation(deleteLlmKeyRef(dcOrVars, vars));
}
export function getAllUsersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetAllUsers');
}
export function getAllUsers(dc) {
  return executeQuery(getAllUsersRef(dc));
}
export function getCurrentUserRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetCurrentUser');
}
export function getCurrentUser(dc) {
  return executeQuery(getCurrentUserRef(dc));
}
export function searchProfilesByBioRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'SearchProfilesByBio', inputVars);
}
export function searchProfilesByBio(dcOrVars, vars) {
  return executeQuery(searchProfilesByBioRef(dcOrVars, vars));
}
export function searchBusinessProfilesByDescriptionRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'SearchBusinessProfilesByDescription', inputVars);
}
export function searchBusinessProfilesByDescription(dcOrVars, vars) {
  return executeQuery(searchBusinessProfilesByDescriptionRef(dcOrVars, vars));
}
export function matchProfileToBusinessesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'MatchProfileToBusinesses', inputVars);
}
export function matchProfileToBusinesses(dcOrVars, vars) {
  return executeQuery(matchProfileToBusinessesRef(dcOrVars, vars));
}
export function businessProfilesBySimilarityRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'BusinessProfilesBySimilarity', inputVars);
}
export function businessProfilesBySimilarity(dcOrVars, vars) {
  return executeQuery(businessProfilesBySimilarityRef(dcOrVars, vars));
}
export function matchBusinessToProfilesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'MatchBusinessToProfiles', inputVars);
}
export function matchBusinessToProfiles(dcOrVars, vars) {
  return executeQuery(matchBusinessToProfilesRef(dcOrVars, vars));
}
export function profilesBySimilarityRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'ProfilesBySimilarity', inputVars);
}
export function profilesBySimilarity(dcOrVars, vars) {
  return executeQuery(profilesBySimilarityRef(dcOrVars, vars));
}
export function searchPartnerPreferencesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'SearchPartnerPreferences', inputVars);
}
export function searchPartnerPreferences(dcOrVars, vars) {
  return executeQuery(searchPartnerPreferencesRef(dcOrVars, vars));
}
export function getUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUser', inputVars);
}
export function getUser(dcOrVars, vars) {
  return executeQuery(getUserRef(dcOrVars, vars));
}
export function getUserProfilesRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUserProfiles');
}
export function getUserProfiles(dc) {
  return executeQuery(getUserProfilesRef(dc));
}
export function getUserWorkspacesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUserWorkspaces', inputVars);
}
export function getUserWorkspaces(dcOrVars, vars) {
  return executeQuery(getUserWorkspacesRef(dcOrVars, vars));
}
export function getWorkspaceRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetWorkspace', inputVars);
}
export function getWorkspace(dcOrVars, vars) {
  return executeQuery(getWorkspaceRef(dcOrVars, vars));
}
export function getWorkspaceMembersRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetWorkspaceMembers', inputVars);
}
export function getWorkspaceMembers(dcOrVars, vars) {
  return executeQuery(getWorkspaceMembersRef(dcOrVars, vars));
}
export function getBusinessProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetBusinessProfile', inputVars);
}
export function getBusinessProfile(dcOrVars, vars) {
  return executeQuery(getBusinessProfileRef(dcOrVars, vars));
}
export function getPartnerPreferencesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetPartnerPreferences', inputVars);
}
export function getPartnerPreferences(dcOrVars, vars) {
  return executeQuery(getPartnerPreferencesRef(dcOrVars, vars));
}
export function getWorkspaceInvitationsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetWorkspaceInvitations', inputVars);
}
export function getWorkspaceInvitations(dcOrVars, vars) {
  return executeQuery(getWorkspaceInvitationsRef(dcOrVars, vars));
}
export function getPendingInvitationsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetPendingInvitations', inputVars);
}
export function getPendingInvitations(dcOrVars, vars) {
  return executeQuery(getPendingInvitationsRef(dcOrVars, vars));
}
export function getLlmKeysByEntityRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetLLMKeysByEntity', inputVars);
}
export function getLlmKeysByEntity(dcOrVars, vars) {
  return executeQuery(getLlmKeysByEntityRef(dcOrVars, vars));
}
export function getLlmKeyByProviderAndEntityRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetLLMKeyByProviderAndEntity', inputVars);
}
export function getLlmKeyByProviderAndEntity(dcOrVars, vars) {
  return executeQuery(getLlmKeyByProviderAndEntityRef(dcOrVars, vars));
}
export function getWorkspaceLlmKeyRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetWorkspaceLLMKey', inputVars);
}
export function getWorkspaceLlmKey(dcOrVars, vars) {
  return executeQuery(getWorkspaceLlmKeyRef(dcOrVars, vars));
}
export function getUserLlmKeyRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUserLLMKey', inputVars);
}
export function getUserLlmKey(dcOrVars, vars) {
  return executeQuery(getUserLlmKeyRef(dcOrVars, vars));
}
export function getProfileLlmKeysRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetProfileLLMKeys', inputVars);
}
export function getProfileLlmKeys(dcOrVars, vars) {
  return executeQuery(getProfileLlmKeysRef(dcOrVars, vars));
}
