const { getDataConnect, queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'pib',
  service: 'pib',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

function updateUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateUser', inputVars);
}
exports.updateUserRef = updateUserRef;
exports.updateUser = function updateUser(dcOrVars, vars) {
  return executeMutation(updateUserRef(dcOrVars, vars));
};

function createProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateProfile', inputVars);
}
exports.createProfileRef = createProfileRef;
exports.createProfile = function createProfile(dcOrVars, vars) {
  return executeMutation(createProfileRef(dcOrVars, vars));
};

function updateProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateProfile', inputVars);
}
exports.updateProfileRef = updateProfileRef;
exports.updateProfile = function updateProfile(dcOrVars, vars) {
  return executeMutation(updateProfileRef(dcOrVars, vars));
};

function deleteProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'DeleteProfile', inputVars);
}
exports.deleteProfileRef = deleteProfileRef;
exports.deleteProfile = function deleteProfile(dcOrVars, vars) {
  return executeMutation(deleteProfileRef(dcOrVars, vars));
};

function createWorkspaceRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateWorkspace', inputVars);
}
exports.createWorkspaceRef = createWorkspaceRef;
exports.createWorkspace = function createWorkspace(dcOrVars, vars) {
  return executeMutation(createWorkspaceRef(dcOrVars, vars));
};

function updateWorkspaceRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateWorkspace', inputVars);
}
exports.updateWorkspaceRef = updateWorkspaceRef;
exports.updateWorkspace = function updateWorkspace(dcOrVars, vars) {
  return executeMutation(updateWorkspaceRef(dcOrVars, vars));
};

function deleteWorkspaceRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'DeleteWorkspace', inputVars);
}
exports.deleteWorkspaceRef = deleteWorkspaceRef;
exports.deleteWorkspace = function deleteWorkspace(dcOrVars, vars) {
  return executeMutation(deleteWorkspaceRef(dcOrVars, vars));
};

function addWorkspaceMemberRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'AddWorkspaceMember', inputVars);
}
exports.addWorkspaceMemberRef = addWorkspaceMemberRef;
exports.addWorkspaceMember = function addWorkspaceMember(dcOrVars, vars) {
  return executeMutation(addWorkspaceMemberRef(dcOrVars, vars));
};

function updateWorkspaceMemberRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateWorkspaceMember', inputVars);
}
exports.updateWorkspaceMemberRef = updateWorkspaceMemberRef;
exports.updateWorkspaceMember = function updateWorkspaceMember(dcOrVars, vars) {
  return executeMutation(updateWorkspaceMemberRef(dcOrVars, vars));
};

function removeWorkspaceMemberRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'RemoveWorkspaceMember', inputVars);
}
exports.removeWorkspaceMemberRef = removeWorkspaceMemberRef;
exports.removeWorkspaceMember = function removeWorkspaceMember(dcOrVars, vars) {
  return executeMutation(removeWorkspaceMemberRef(dcOrVars, vars));
};

function inviteToWorkspaceRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'InviteToWorkspace', inputVars);
}
exports.inviteToWorkspaceRef = inviteToWorkspaceRef;
exports.inviteToWorkspace = function inviteToWorkspace(dcOrVars, vars) {
  return executeMutation(inviteToWorkspaceRef(dcOrVars, vars));
};

function acceptInvitationRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'AcceptInvitation', inputVars);
}
exports.acceptInvitationRef = acceptInvitationRef;
exports.acceptInvitation = function acceptInvitation(dcOrVars, vars) {
  return executeMutation(acceptInvitationRef(dcOrVars, vars));
};

function declineInvitationRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'DeclineInvitation', inputVars);
}
exports.declineInvitationRef = declineInvitationRef;
exports.declineInvitation = function declineInvitation(dcOrVars, vars) {
  return executeMutation(declineInvitationRef(dcOrVars, vars));
};

function createBusinessProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateBusinessProfile', inputVars);
}
exports.createBusinessProfileRef = createBusinessProfileRef;
exports.createBusinessProfile = function createBusinessProfile(dcOrVars, vars) {
  return executeMutation(createBusinessProfileRef(dcOrVars, vars));
};

function updateBusinessProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdateBusinessProfile', inputVars);
}
exports.updateBusinessProfileRef = updateBusinessProfileRef;
exports.updateBusinessProfile = function updateBusinessProfile(dcOrVars, vars) {
  return executeMutation(updateBusinessProfileRef(dcOrVars, vars));
};

function createPartnerPreferencesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreatePartnerPreferences', inputVars);
}
exports.createPartnerPreferencesRef = createPartnerPreferencesRef;
exports.createPartnerPreferences = function createPartnerPreferences(dcOrVars, vars) {
  return executeMutation(createPartnerPreferencesRef(dcOrVars, vars));
};

function updatePartnerPreferencesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpdatePartnerPreferences', inputVars);
}
exports.updatePartnerPreferencesRef = updatePartnerPreferencesRef;
exports.updatePartnerPreferences = function updatePartnerPreferences(dcOrVars, vars) {
  return executeMutation(updatePartnerPreferencesRef(dcOrVars, vars));
};

function getCurrentUserRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetCurrentUser');
}
exports.getCurrentUserRef = getCurrentUserRef;
exports.getCurrentUser = function getCurrentUser(dc) {
  return executeQuery(getCurrentUserRef(dc));
};

function getUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUser', inputVars);
}
exports.getUserRef = getUserRef;
exports.getUser = function getUser(dcOrVars, vars) {
  return executeQuery(getUserRef(dcOrVars, vars));
};

function getUserProfilesRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUserProfiles');
}
exports.getUserProfilesRef = getUserProfilesRef;
exports.getUserProfiles = function getUserProfiles(dc) {
  return executeQuery(getUserProfilesRef(dc));
};

function getUserWorkspacesRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUserWorkspaces');
}
exports.getUserWorkspacesRef = getUserWorkspacesRef;
exports.getUserWorkspaces = function getUserWorkspaces(dc) {
  return executeQuery(getUserWorkspacesRef(dc));
};

function getWorkspaceRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetWorkspace', inputVars);
}
exports.getWorkspaceRef = getWorkspaceRef;
exports.getWorkspace = function getWorkspace(dcOrVars, vars) {
  return executeQuery(getWorkspaceRef(dcOrVars, vars));
};

function getWorkspaceMembersRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetWorkspaceMembers', inputVars);
}
exports.getWorkspaceMembersRef = getWorkspaceMembersRef;
exports.getWorkspaceMembers = function getWorkspaceMembers(dcOrVars, vars) {
  return executeQuery(getWorkspaceMembersRef(dcOrVars, vars));
};

function getBusinessProfileRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetBusinessProfile', inputVars);
}
exports.getBusinessProfileRef = getBusinessProfileRef;
exports.getBusinessProfile = function getBusinessProfile(dcOrVars, vars) {
  return executeQuery(getBusinessProfileRef(dcOrVars, vars));
};

function getPartnerPreferencesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetPartnerPreferences', inputVars);
}
exports.getPartnerPreferencesRef = getPartnerPreferencesRef;
exports.getPartnerPreferences = function getPartnerPreferences(dcOrVars, vars) {
  return executeQuery(getPartnerPreferencesRef(dcOrVars, vars));
};

function getWorkspaceInvitationsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetWorkspaceInvitations', inputVars);
}
exports.getWorkspaceInvitationsRef = getWorkspaceInvitationsRef;
exports.getWorkspaceInvitations = function getWorkspaceInvitations(dcOrVars, vars) {
  return executeQuery(getWorkspaceInvitationsRef(dcOrVars, vars));
};

function getPendingInvitationsByEmailRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetPendingInvitationsByEmail', inputVars);
}
exports.getPendingInvitationsByEmailRef = getPendingInvitationsByEmailRef;
exports.getPendingInvitationsByEmail = function getPendingInvitationsByEmail(dcOrVars, vars) {
  return executeQuery(getPendingInvitationsByEmailRef(dcOrVars, vars));
};

