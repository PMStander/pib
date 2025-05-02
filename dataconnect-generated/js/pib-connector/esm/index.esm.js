import { getDataConnect, queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'pib',
  service: 'pib',
  location: 'us-central1'
};

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
export function getUserWorkspacesRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUserWorkspaces');
}
export function getUserWorkspaces(dc) {
  return executeQuery(getUserWorkspacesRef(dc));
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
export function getPendingInvitationsByEmailRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetPendingInvitationsByEmail', inputVars);
}
export function getPendingInvitationsByEmail(dcOrVars, vars) {
  return executeQuery(getPendingInvitationsByEmailRef(dcOrVars, vars));
}
