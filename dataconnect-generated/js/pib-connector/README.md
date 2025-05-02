# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*GetUser*](#getuser)
  - [*GetUserProfiles*](#getuserprofiles)
  - [*GetUserWorkspaces*](#getuserworkspaces)
  - [*GetWorkspace*](#getworkspace)
  - [*GetWorkspaceMembers*](#getworkspacemembers)
  - [*GetBusinessProfile*](#getbusinessprofile)
  - [*GetPartnerPreferences*](#getpartnerpreferences)
  - [*GetWorkspaceInvitations*](#getworkspaceinvitations)
  - [*GetPendingInvitationsByEmail*](#getpendinginvitationsbyemail)
- [**Mutations**](#mutations)
  - [*UpdateUser*](#updateuser)
  - [*CreateProfile*](#createprofile)
  - [*UpdateProfile*](#updateprofile)
  - [*DeleteProfile*](#deleteprofile)
  - [*CreateWorkspace*](#createworkspace)
  - [*UpdateWorkspace*](#updateworkspace)
  - [*DeleteWorkspace*](#deleteworkspace)
  - [*AddWorkspaceMember*](#addworkspacemember)
  - [*UpdateWorkspaceMember*](#updateworkspacemember)
  - [*RemoveWorkspaceMember*](#removeworkspacemember)
  - [*InviteToWorkspace*](#invitetoworkspace)
  - [*AcceptInvitation*](#acceptinvitation)
  - [*DeclineInvitation*](#declineinvitation)
  - [*CreateBusinessProfile*](#createbusinessprofile)
  - [*UpdateBusinessProfile*](#updatebusinessprofile)
  - [*CreatePartnerPreferences*](#createpartnerpreferences)
  - [*UpdatePartnerPreferences*](#updatepartnerpreferences)

# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `pib`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/pib-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `pib`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/pib-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/pib-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `pib` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@firebasegen/pib-connector';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@firebasegen/pib-connector';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
getUser(vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query requires an argument of type `GetUserVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserVariables {
  id: string;
}
```
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser, GetUserVariables } from '@firebasegen/pib-connector';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser(getUserVars);
// Variables can be defined inline as well.
const { data } = await getUser({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect, getUserVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser(getUserVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef, GetUserVariables } from '@firebasegen/pib-connector';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef(getUserVars);
// Variables can be defined inline as well.
const ref = getUserRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect, getUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetUserProfiles
You can execute the `GetUserProfiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
getUserProfiles(): QueryPromise<GetUserProfilesData, undefined>;

interface GetUserProfilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserProfilesData, undefined>;
}
export const getUserProfilesRef: GetUserProfilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserProfiles(dc: DataConnect): QueryPromise<GetUserProfilesData, undefined>;

interface GetUserProfilesRef {
  ...
  (dc: DataConnect): QueryRef<GetUserProfilesData, undefined>;
}
export const getUserProfilesRef: GetUserProfilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserProfilesRef:
```typescript
const name = getUserProfilesRef.operationName;
console.log(name);
```

### Variables
The `GetUserProfiles` query has no variables.
### Return Type
Recall that executing the `GetUserProfiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserProfilesData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserProfiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserProfiles } from '@firebasegen/pib-connector';


// Call the `getUserProfiles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserProfiles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserProfiles(dataConnect);

console.log(data.profiles);

// Or, you can use the `Promise` API.
getUserProfiles().then((response) => {
  const data = response.data;
  console.log(data.profiles);
});
```

### Using `GetUserProfiles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserProfilesRef } from '@firebasegen/pib-connector';


// Call the `getUserProfilesRef()` function to get a reference to the query.
const ref = getUserProfilesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserProfilesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.profiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.profiles);
});
```

## GetUserWorkspaces
You can execute the `GetUserWorkspaces` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
getUserWorkspaces(): QueryPromise<GetUserWorkspacesData, undefined>;

interface GetUserWorkspacesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserWorkspacesData, undefined>;
}
export const getUserWorkspacesRef: GetUserWorkspacesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserWorkspaces(dc: DataConnect): QueryPromise<GetUserWorkspacesData, undefined>;

interface GetUserWorkspacesRef {
  ...
  (dc: DataConnect): QueryRef<GetUserWorkspacesData, undefined>;
}
export const getUserWorkspacesRef: GetUserWorkspacesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserWorkspacesRef:
```typescript
const name = getUserWorkspacesRef.operationName;
console.log(name);
```

### Variables
The `GetUserWorkspaces` query has no variables.
### Return Type
Recall that executing the `GetUserWorkspaces` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserWorkspacesData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserWorkspacesData {
  workspaceMembers: ({
    workspaceId: UUIDString;
  })[];
}
```
### Using `GetUserWorkspaces`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserWorkspaces } from '@firebasegen/pib-connector';


// Call the `getUserWorkspaces()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserWorkspaces();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserWorkspaces(dataConnect);

console.log(data.workspaceMembers);

// Or, you can use the `Promise` API.
getUserWorkspaces().then((response) => {
  const data = response.data;
  console.log(data.workspaceMembers);
});
```

### Using `GetUserWorkspaces`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserWorkspacesRef } from '@firebasegen/pib-connector';


// Call the `getUserWorkspacesRef()` function to get a reference to the query.
const ref = getUserWorkspacesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserWorkspacesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workspaceMembers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workspaceMembers);
});
```

## GetWorkspace
You can execute the `GetWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
getWorkspace(vars: GetWorkspaceVariables): QueryPromise<GetWorkspaceData, GetWorkspaceVariables>;

interface GetWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkspaceVariables): QueryRef<GetWorkspaceData, GetWorkspaceVariables>;
}
export const getWorkspaceRef: GetWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getWorkspace(dc: DataConnect, vars: GetWorkspaceVariables): QueryPromise<GetWorkspaceData, GetWorkspaceVariables>;

interface GetWorkspaceRef {
  ...
  (dc: DataConnect, vars: GetWorkspaceVariables): QueryRef<GetWorkspaceData, GetWorkspaceVariables>;
}
export const getWorkspaceRef: GetWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getWorkspaceRef:
```typescript
const name = getWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetWorkspace` query requires an argument of type `GetWorkspaceVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetWorkspaceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetWorkspaceData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getWorkspace, GetWorkspaceVariables } from '@firebasegen/pib-connector';

// The `GetWorkspace` query requires an argument of type `GetWorkspaceVariables`:
const getWorkspaceVars: GetWorkspaceVariables = {
  id: ..., 
};

// Call the `getWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getWorkspace(getWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await getWorkspace({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getWorkspace(dataConnect, getWorkspaceVars);

console.log(data.workspace);

// Or, you can use the `Promise` API.
getWorkspace(getWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.workspace);
});
```

### Using `GetWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getWorkspaceRef, GetWorkspaceVariables } from '@firebasegen/pib-connector';

// The `GetWorkspace` query requires an argument of type `GetWorkspaceVariables`:
const getWorkspaceVars: GetWorkspaceVariables = {
  id: ..., 
};

// Call the `getWorkspaceRef()` function to get a reference to the query.
const ref = getWorkspaceRef(getWorkspaceVars);
// Variables can be defined inline as well.
const ref = getWorkspaceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getWorkspaceRef(dataConnect, getWorkspaceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workspace);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workspace);
});
```

## GetWorkspaceMembers
You can execute the `GetWorkspaceMembers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
getWorkspaceMembers(vars: GetWorkspaceMembersVariables): QueryPromise<GetWorkspaceMembersData, GetWorkspaceMembersVariables>;

interface GetWorkspaceMembersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkspaceMembersVariables): QueryRef<GetWorkspaceMembersData, GetWorkspaceMembersVariables>;
}
export const getWorkspaceMembersRef: GetWorkspaceMembersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getWorkspaceMembers(dc: DataConnect, vars: GetWorkspaceMembersVariables): QueryPromise<GetWorkspaceMembersData, GetWorkspaceMembersVariables>;

interface GetWorkspaceMembersRef {
  ...
  (dc: DataConnect, vars: GetWorkspaceMembersVariables): QueryRef<GetWorkspaceMembersData, GetWorkspaceMembersVariables>;
}
export const getWorkspaceMembersRef: GetWorkspaceMembersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getWorkspaceMembersRef:
```typescript
const name = getWorkspaceMembersRef.operationName;
console.log(name);
```

### Variables
The `GetWorkspaceMembers` query requires an argument of type `GetWorkspaceMembersVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetWorkspaceMembersVariables {
  workspaceId: UUIDString;
}
```
### Return Type
Recall that executing the `GetWorkspaceMembers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetWorkspaceMembersData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetWorkspaceMembersData {
  workspaceMembers: ({
    workspaceId: UUIDString;
    userId: string;
    profileId?: UUIDString | null;
    role: string;
    joinedAt: TimestampString;
  } & WorkspaceMember_Key)[];
}
```
### Using `GetWorkspaceMembers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getWorkspaceMembers, GetWorkspaceMembersVariables } from '@firebasegen/pib-connector';

// The `GetWorkspaceMembers` query requires an argument of type `GetWorkspaceMembersVariables`:
const getWorkspaceMembersVars: GetWorkspaceMembersVariables = {
  workspaceId: ..., 
};

// Call the `getWorkspaceMembers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getWorkspaceMembers(getWorkspaceMembersVars);
// Variables can be defined inline as well.
const { data } = await getWorkspaceMembers({ workspaceId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getWorkspaceMembers(dataConnect, getWorkspaceMembersVars);

console.log(data.workspaceMembers);

// Or, you can use the `Promise` API.
getWorkspaceMembers(getWorkspaceMembersVars).then((response) => {
  const data = response.data;
  console.log(data.workspaceMembers);
});
```

### Using `GetWorkspaceMembers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getWorkspaceMembersRef, GetWorkspaceMembersVariables } from '@firebasegen/pib-connector';

// The `GetWorkspaceMembers` query requires an argument of type `GetWorkspaceMembersVariables`:
const getWorkspaceMembersVars: GetWorkspaceMembersVariables = {
  workspaceId: ..., 
};

// Call the `getWorkspaceMembersRef()` function to get a reference to the query.
const ref = getWorkspaceMembersRef(getWorkspaceMembersVars);
// Variables can be defined inline as well.
const ref = getWorkspaceMembersRef({ workspaceId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getWorkspaceMembersRef(dataConnect, getWorkspaceMembersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workspaceMembers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workspaceMembers);
});
```

## GetBusinessProfile
You can execute the `GetBusinessProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
getBusinessProfile(vars: GetBusinessProfileVariables): QueryPromise<GetBusinessProfileData, GetBusinessProfileVariables>;

interface GetBusinessProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBusinessProfileVariables): QueryRef<GetBusinessProfileData, GetBusinessProfileVariables>;
}
export const getBusinessProfileRef: GetBusinessProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getBusinessProfile(dc: DataConnect, vars: GetBusinessProfileVariables): QueryPromise<GetBusinessProfileData, GetBusinessProfileVariables>;

interface GetBusinessProfileRef {
  ...
  (dc: DataConnect, vars: GetBusinessProfileVariables): QueryRef<GetBusinessProfileData, GetBusinessProfileVariables>;
}
export const getBusinessProfileRef: GetBusinessProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getBusinessProfileRef:
```typescript
const name = getBusinessProfileRef.operationName;
console.log(name);
```

### Variables
The `GetBusinessProfile` query requires an argument of type `GetBusinessProfileVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetBusinessProfileVariables {
  workspaceId: UUIDString;
}
```
### Return Type
Recall that executing the `GetBusinessProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetBusinessProfileData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetBusinessProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getBusinessProfile, GetBusinessProfileVariables } from '@firebasegen/pib-connector';

// The `GetBusinessProfile` query requires an argument of type `GetBusinessProfileVariables`:
const getBusinessProfileVars: GetBusinessProfileVariables = {
  workspaceId: ..., 
};

// Call the `getBusinessProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getBusinessProfile(getBusinessProfileVars);
// Variables can be defined inline as well.
const { data } = await getBusinessProfile({ workspaceId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getBusinessProfile(dataConnect, getBusinessProfileVars);

console.log(data.businessProfile);

// Or, you can use the `Promise` API.
getBusinessProfile(getBusinessProfileVars).then((response) => {
  const data = response.data;
  console.log(data.businessProfile);
});
```

### Using `GetBusinessProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getBusinessProfileRef, GetBusinessProfileVariables } from '@firebasegen/pib-connector';

// The `GetBusinessProfile` query requires an argument of type `GetBusinessProfileVariables`:
const getBusinessProfileVars: GetBusinessProfileVariables = {
  workspaceId: ..., 
};

// Call the `getBusinessProfileRef()` function to get a reference to the query.
const ref = getBusinessProfileRef(getBusinessProfileVars);
// Variables can be defined inline as well.
const ref = getBusinessProfileRef({ workspaceId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getBusinessProfileRef(dataConnect, getBusinessProfileVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.businessProfile);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.businessProfile);
});
```

## GetPartnerPreferences
You can execute the `GetPartnerPreferences` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
getPartnerPreferences(vars: GetPartnerPreferencesVariables): QueryPromise<GetPartnerPreferencesData, GetPartnerPreferencesVariables>;

interface GetPartnerPreferencesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPartnerPreferencesVariables): QueryRef<GetPartnerPreferencesData, GetPartnerPreferencesVariables>;
}
export const getPartnerPreferencesRef: GetPartnerPreferencesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPartnerPreferences(dc: DataConnect, vars: GetPartnerPreferencesVariables): QueryPromise<GetPartnerPreferencesData, GetPartnerPreferencesVariables>;

interface GetPartnerPreferencesRef {
  ...
  (dc: DataConnect, vars: GetPartnerPreferencesVariables): QueryRef<GetPartnerPreferencesData, GetPartnerPreferencesVariables>;
}
export const getPartnerPreferencesRef: GetPartnerPreferencesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPartnerPreferencesRef:
```typescript
const name = getPartnerPreferencesRef.operationName;
console.log(name);
```

### Variables
The `GetPartnerPreferences` query requires an argument of type `GetPartnerPreferencesVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPartnerPreferencesVariables {
  workspaceId: UUIDString;
}
```
### Return Type
Recall that executing the `GetPartnerPreferences` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPartnerPreferencesData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPartnerPreferences`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPartnerPreferences, GetPartnerPreferencesVariables } from '@firebasegen/pib-connector';

// The `GetPartnerPreferences` query requires an argument of type `GetPartnerPreferencesVariables`:
const getPartnerPreferencesVars: GetPartnerPreferencesVariables = {
  workspaceId: ..., 
};

// Call the `getPartnerPreferences()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPartnerPreferences(getPartnerPreferencesVars);
// Variables can be defined inline as well.
const { data } = await getPartnerPreferences({ workspaceId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPartnerPreferences(dataConnect, getPartnerPreferencesVars);

console.log(data.partnerPreferences);

// Or, you can use the `Promise` API.
getPartnerPreferences(getPartnerPreferencesVars).then((response) => {
  const data = response.data;
  console.log(data.partnerPreferences);
});
```

### Using `GetPartnerPreferences`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPartnerPreferencesRef, GetPartnerPreferencesVariables } from '@firebasegen/pib-connector';

// The `GetPartnerPreferences` query requires an argument of type `GetPartnerPreferencesVariables`:
const getPartnerPreferencesVars: GetPartnerPreferencesVariables = {
  workspaceId: ..., 
};

// Call the `getPartnerPreferencesRef()` function to get a reference to the query.
const ref = getPartnerPreferencesRef(getPartnerPreferencesVars);
// Variables can be defined inline as well.
const ref = getPartnerPreferencesRef({ workspaceId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPartnerPreferencesRef(dataConnect, getPartnerPreferencesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.partnerPreferences);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.partnerPreferences);
});
```

## GetWorkspaceInvitations
You can execute the `GetWorkspaceInvitations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
getWorkspaceInvitations(vars: GetWorkspaceInvitationsVariables): QueryPromise<GetWorkspaceInvitationsData, GetWorkspaceInvitationsVariables>;

interface GetWorkspaceInvitationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkspaceInvitationsVariables): QueryRef<GetWorkspaceInvitationsData, GetWorkspaceInvitationsVariables>;
}
export const getWorkspaceInvitationsRef: GetWorkspaceInvitationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getWorkspaceInvitations(dc: DataConnect, vars: GetWorkspaceInvitationsVariables): QueryPromise<GetWorkspaceInvitationsData, GetWorkspaceInvitationsVariables>;

interface GetWorkspaceInvitationsRef {
  ...
  (dc: DataConnect, vars: GetWorkspaceInvitationsVariables): QueryRef<GetWorkspaceInvitationsData, GetWorkspaceInvitationsVariables>;
}
export const getWorkspaceInvitationsRef: GetWorkspaceInvitationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getWorkspaceInvitationsRef:
```typescript
const name = getWorkspaceInvitationsRef.operationName;
console.log(name);
```

### Variables
The `GetWorkspaceInvitations` query requires an argument of type `GetWorkspaceInvitationsVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetWorkspaceInvitationsVariables {
  workspaceId: UUIDString;
}
```
### Return Type
Recall that executing the `GetWorkspaceInvitations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetWorkspaceInvitationsData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetWorkspaceInvitations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getWorkspaceInvitations, GetWorkspaceInvitationsVariables } from '@firebasegen/pib-connector';

// The `GetWorkspaceInvitations` query requires an argument of type `GetWorkspaceInvitationsVariables`:
const getWorkspaceInvitationsVars: GetWorkspaceInvitationsVariables = {
  workspaceId: ..., 
};

// Call the `getWorkspaceInvitations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getWorkspaceInvitations(getWorkspaceInvitationsVars);
// Variables can be defined inline as well.
const { data } = await getWorkspaceInvitations({ workspaceId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getWorkspaceInvitations(dataConnect, getWorkspaceInvitationsVars);

console.log(data.workspaceInvitations);

// Or, you can use the `Promise` API.
getWorkspaceInvitations(getWorkspaceInvitationsVars).then((response) => {
  const data = response.data;
  console.log(data.workspaceInvitations);
});
```

### Using `GetWorkspaceInvitations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getWorkspaceInvitationsRef, GetWorkspaceInvitationsVariables } from '@firebasegen/pib-connector';

// The `GetWorkspaceInvitations` query requires an argument of type `GetWorkspaceInvitationsVariables`:
const getWorkspaceInvitationsVars: GetWorkspaceInvitationsVariables = {
  workspaceId: ..., 
};

// Call the `getWorkspaceInvitationsRef()` function to get a reference to the query.
const ref = getWorkspaceInvitationsRef(getWorkspaceInvitationsVars);
// Variables can be defined inline as well.
const ref = getWorkspaceInvitationsRef({ workspaceId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getWorkspaceInvitationsRef(dataConnect, getWorkspaceInvitationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workspaceInvitations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workspaceInvitations);
});
```

## GetPendingInvitationsByEmail
You can execute the `GetPendingInvitationsByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
getPendingInvitationsByEmail(vars: GetPendingInvitationsByEmailVariables): QueryPromise<GetPendingInvitationsByEmailData, GetPendingInvitationsByEmailVariables>;

interface GetPendingInvitationsByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPendingInvitationsByEmailVariables): QueryRef<GetPendingInvitationsByEmailData, GetPendingInvitationsByEmailVariables>;
}
export const getPendingInvitationsByEmailRef: GetPendingInvitationsByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPendingInvitationsByEmail(dc: DataConnect, vars: GetPendingInvitationsByEmailVariables): QueryPromise<GetPendingInvitationsByEmailData, GetPendingInvitationsByEmailVariables>;

interface GetPendingInvitationsByEmailRef {
  ...
  (dc: DataConnect, vars: GetPendingInvitationsByEmailVariables): QueryRef<GetPendingInvitationsByEmailData, GetPendingInvitationsByEmailVariables>;
}
export const getPendingInvitationsByEmailRef: GetPendingInvitationsByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPendingInvitationsByEmailRef:
```typescript
const name = getPendingInvitationsByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetPendingInvitationsByEmail` query requires an argument of type `GetPendingInvitationsByEmailVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPendingInvitationsByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetPendingInvitationsByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPendingInvitationsByEmailData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPendingInvitationsByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPendingInvitationsByEmail, GetPendingInvitationsByEmailVariables } from '@firebasegen/pib-connector';

// The `GetPendingInvitationsByEmail` query requires an argument of type `GetPendingInvitationsByEmailVariables`:
const getPendingInvitationsByEmailVars: GetPendingInvitationsByEmailVariables = {
  email: ..., 
};

// Call the `getPendingInvitationsByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPendingInvitationsByEmail(getPendingInvitationsByEmailVars);
// Variables can be defined inline as well.
const { data } = await getPendingInvitationsByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPendingInvitationsByEmail(dataConnect, getPendingInvitationsByEmailVars);

console.log(data.workspaceInvitations);

// Or, you can use the `Promise` API.
getPendingInvitationsByEmail(getPendingInvitationsByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.workspaceInvitations);
});
```

### Using `GetPendingInvitationsByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPendingInvitationsByEmailRef, GetPendingInvitationsByEmailVariables } from '@firebasegen/pib-connector';

// The `GetPendingInvitationsByEmail` query requires an argument of type `GetPendingInvitationsByEmailVariables`:
const getPendingInvitationsByEmailVars: GetPendingInvitationsByEmailVariables = {
  email: ..., 
};

// Call the `getPendingInvitationsByEmailRef()` function to get a reference to the query.
const ref = getPendingInvitationsByEmailRef(getPendingInvitationsByEmailVars);
// Variables can be defined inline as well.
const ref = getPendingInvitationsByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPendingInvitationsByEmailRef(dataConnect, getPendingInvitationsByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workspaceInvitations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workspaceInvitations);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `pib` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  displayName?: string | null;
  photoUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  updateUser?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@firebasegen/pib-connector';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., // optional
  photoUrl: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ displayName: ..., photoUrl: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.updateUser);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.updateUser);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@firebasegen/pib-connector';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., // optional
  photoUrl: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ displayName: ..., photoUrl: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.updateUser);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.updateUser);
});
```

## CreateProfile
You can execute the `CreateProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
createProfile(vars: CreateProfileVariables): MutationPromise<CreateProfileData, CreateProfileVariables>;

interface CreateProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProfileVariables): MutationRef<CreateProfileData, CreateProfileVariables>;
}
export const createProfileRef: CreateProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProfile(dc: DataConnect, vars: CreateProfileVariables): MutationPromise<CreateProfileData, CreateProfileVariables>;

interface CreateProfileRef {
  ...
  (dc: DataConnect, vars: CreateProfileVariables): MutationRef<CreateProfileData, CreateProfileVariables>;
}
export const createProfileRef: CreateProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProfileRef:
```typescript
const name = createProfileRef.operationName;
console.log(name);
```

### Variables
The `CreateProfile` mutation requires an argument of type `CreateProfileVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProfileVariables {
  name: string;
  bio?: string | null;
  avatarUrl?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
  isDefault?: boolean | null;
}
```
### Return Type
Recall that executing the `CreateProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProfileData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProfileData {
  createProfile: Profile_Key;
}
```
### Using `CreateProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProfile, CreateProfileVariables } from '@firebasegen/pib-connector';

// The `CreateProfile` mutation requires an argument of type `CreateProfileVariables`:
const createProfileVars: CreateProfileVariables = {
  name: ..., 
  bio: ..., // optional
  avatarUrl: ..., // optional
  skills: ..., // optional
  interests: ..., // optional
  isDefault: ..., // optional
};

// Call the `createProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProfile(createProfileVars);
// Variables can be defined inline as well.
const { data } = await createProfile({ name: ..., bio: ..., avatarUrl: ..., skills: ..., interests: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProfile(dataConnect, createProfileVars);

console.log(data.createProfile);

// Or, you can use the `Promise` API.
createProfile(createProfileVars).then((response) => {
  const data = response.data;
  console.log(data.createProfile);
});
```

### Using `CreateProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProfileRef, CreateProfileVariables } from '@firebasegen/pib-connector';

// The `CreateProfile` mutation requires an argument of type `CreateProfileVariables`:
const createProfileVars: CreateProfileVariables = {
  name: ..., 
  bio: ..., // optional
  avatarUrl: ..., // optional
  skills: ..., // optional
  interests: ..., // optional
  isDefault: ..., // optional
};

// Call the `createProfileRef()` function to get a reference to the mutation.
const ref = createProfileRef(createProfileVars);
// Variables can be defined inline as well.
const ref = createProfileRef({ name: ..., bio: ..., avatarUrl: ..., skills: ..., interests: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProfileRef(dataConnect, createProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.createProfile);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.createProfile);
});
```

## UpdateProfile
You can execute the `UpdateProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
updateProfile(vars: UpdateProfileVariables): MutationPromise<UpdateProfileData, UpdateProfileVariables>;

interface UpdateProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProfileVariables): MutationRef<UpdateProfileData, UpdateProfileVariables>;
}
export const updateProfileRef: UpdateProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProfile(dc: DataConnect, vars: UpdateProfileVariables): MutationPromise<UpdateProfileData, UpdateProfileVariables>;

interface UpdateProfileRef {
  ...
  (dc: DataConnect, vars: UpdateProfileVariables): MutationRef<UpdateProfileData, UpdateProfileVariables>;
}
export const updateProfileRef: UpdateProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProfileRef:
```typescript
const name = updateProfileRef.operationName;
console.log(name);
```

### Variables
The `UpdateProfile` mutation requires an argument of type `UpdateProfileVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProfileVariables {
  id: UUIDString;
  name?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
  isDefault?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdateProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProfileData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProfileData {
  updateProfile?: Profile_Key | null;
}
```
### Using `UpdateProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProfile, UpdateProfileVariables } from '@firebasegen/pib-connector';

// The `UpdateProfile` mutation requires an argument of type `UpdateProfileVariables`:
const updateProfileVars: UpdateProfileVariables = {
  id: ..., 
  name: ..., // optional
  bio: ..., // optional
  avatarUrl: ..., // optional
  skills: ..., // optional
  interests: ..., // optional
  isDefault: ..., // optional
};

// Call the `updateProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProfile(updateProfileVars);
// Variables can be defined inline as well.
const { data } = await updateProfile({ id: ..., name: ..., bio: ..., avatarUrl: ..., skills: ..., interests: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProfile(dataConnect, updateProfileVars);

console.log(data.updateProfile);

// Or, you can use the `Promise` API.
updateProfile(updateProfileVars).then((response) => {
  const data = response.data;
  console.log(data.updateProfile);
});
```

### Using `UpdateProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProfileRef, UpdateProfileVariables } from '@firebasegen/pib-connector';

// The `UpdateProfile` mutation requires an argument of type `UpdateProfileVariables`:
const updateProfileVars: UpdateProfileVariables = {
  id: ..., 
  name: ..., // optional
  bio: ..., // optional
  avatarUrl: ..., // optional
  skills: ..., // optional
  interests: ..., // optional
  isDefault: ..., // optional
};

// Call the `updateProfileRef()` function to get a reference to the mutation.
const ref = updateProfileRef(updateProfileVars);
// Variables can be defined inline as well.
const ref = updateProfileRef({ id: ..., name: ..., bio: ..., avatarUrl: ..., skills: ..., interests: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProfileRef(dataConnect, updateProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.updateProfile);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.updateProfile);
});
```

## DeleteProfile
You can execute the `DeleteProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
deleteProfile(vars: DeleteProfileVariables): MutationPromise<DeleteProfileData, DeleteProfileVariables>;

interface DeleteProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProfileVariables): MutationRef<DeleteProfileData, DeleteProfileVariables>;
}
export const deleteProfileRef: DeleteProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProfile(dc: DataConnect, vars: DeleteProfileVariables): MutationPromise<DeleteProfileData, DeleteProfileVariables>;

interface DeleteProfileRef {
  ...
  (dc: DataConnect, vars: DeleteProfileVariables): MutationRef<DeleteProfileData, DeleteProfileVariables>;
}
export const deleteProfileRef: DeleteProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProfileRef:
```typescript
const name = deleteProfileRef.operationName;
console.log(name);
```

### Variables
The `DeleteProfile` mutation requires an argument of type `DeleteProfileVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProfileVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProfileData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProfileData {
  deleteProfile?: Profile_Key | null;
}
```
### Using `DeleteProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProfile, DeleteProfileVariables } from '@firebasegen/pib-connector';

// The `DeleteProfile` mutation requires an argument of type `DeleteProfileVariables`:
const deleteProfileVars: DeleteProfileVariables = {
  id: ..., 
};

// Call the `deleteProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProfile(deleteProfileVars);
// Variables can be defined inline as well.
const { data } = await deleteProfile({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProfile(dataConnect, deleteProfileVars);

console.log(data.deleteProfile);

// Or, you can use the `Promise` API.
deleteProfile(deleteProfileVars).then((response) => {
  const data = response.data;
  console.log(data.deleteProfile);
});
```

### Using `DeleteProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProfileRef, DeleteProfileVariables } from '@firebasegen/pib-connector';

// The `DeleteProfile` mutation requires an argument of type `DeleteProfileVariables`:
const deleteProfileVars: DeleteProfileVariables = {
  id: ..., 
};

// Call the `deleteProfileRef()` function to get a reference to the mutation.
const ref = deleteProfileRef(deleteProfileVars);
// Variables can be defined inline as well.
const ref = deleteProfileRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProfileRef(dataConnect, deleteProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.deleteProfile);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.deleteProfile);
});
```

## CreateWorkspace
You can execute the `CreateWorkspace` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
createWorkspace(vars: CreateWorkspaceVariables): MutationPromise<CreateWorkspaceData, CreateWorkspaceVariables>;

interface CreateWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWorkspaceVariables): MutationRef<CreateWorkspaceData, CreateWorkspaceVariables>;
}
export const createWorkspaceRef: CreateWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createWorkspace(dc: DataConnect, vars: CreateWorkspaceVariables): MutationPromise<CreateWorkspaceData, CreateWorkspaceVariables>;

interface CreateWorkspaceRef {
  ...
  (dc: DataConnect, vars: CreateWorkspaceVariables): MutationRef<CreateWorkspaceData, CreateWorkspaceVariables>;
}
export const createWorkspaceRef: CreateWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createWorkspaceRef:
```typescript
const name = createWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `CreateWorkspace` mutation requires an argument of type `CreateWorkspaceVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateWorkspaceVariables {
  name: string;
  description?: string | null;
  logoUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreateWorkspace` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateWorkspaceData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateWorkspaceData {
  createWorkspace: Workspace_Key;
}
```
### Using `CreateWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createWorkspace, CreateWorkspaceVariables } from '@firebasegen/pib-connector';

// The `CreateWorkspace` mutation requires an argument of type `CreateWorkspaceVariables`:
const createWorkspaceVars: CreateWorkspaceVariables = {
  name: ..., 
  description: ..., // optional
  logoUrl: ..., // optional
};

// Call the `createWorkspace()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createWorkspace(createWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await createWorkspace({ name: ..., description: ..., logoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createWorkspace(dataConnect, createWorkspaceVars);

console.log(data.createWorkspace);

// Or, you can use the `Promise` API.
createWorkspace(createWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.createWorkspace);
});
```

### Using `CreateWorkspace`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createWorkspaceRef, CreateWorkspaceVariables } from '@firebasegen/pib-connector';

// The `CreateWorkspace` mutation requires an argument of type `CreateWorkspaceVariables`:
const createWorkspaceVars: CreateWorkspaceVariables = {
  name: ..., 
  description: ..., // optional
  logoUrl: ..., // optional
};

// Call the `createWorkspaceRef()` function to get a reference to the mutation.
const ref = createWorkspaceRef(createWorkspaceVars);
// Variables can be defined inline as well.
const ref = createWorkspaceRef({ name: ..., description: ..., logoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createWorkspaceRef(dataConnect, createWorkspaceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.createWorkspace);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.createWorkspace);
});
```

## UpdateWorkspace
You can execute the `UpdateWorkspace` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
updateWorkspace(vars: UpdateWorkspaceVariables): MutationPromise<UpdateWorkspaceData, UpdateWorkspaceVariables>;

interface UpdateWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWorkspaceVariables): MutationRef<UpdateWorkspaceData, UpdateWorkspaceVariables>;
}
export const updateWorkspaceRef: UpdateWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateWorkspace(dc: DataConnect, vars: UpdateWorkspaceVariables): MutationPromise<UpdateWorkspaceData, UpdateWorkspaceVariables>;

interface UpdateWorkspaceRef {
  ...
  (dc: DataConnect, vars: UpdateWorkspaceVariables): MutationRef<UpdateWorkspaceData, UpdateWorkspaceVariables>;
}
export const updateWorkspaceRef: UpdateWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateWorkspaceRef:
```typescript
const name = updateWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `UpdateWorkspace` mutation requires an argument of type `UpdateWorkspaceVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateWorkspaceVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  logoUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpdateWorkspace` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateWorkspaceData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateWorkspaceData {
  updateWorkspace?: Workspace_Key | null;
}
```
### Using `UpdateWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateWorkspace, UpdateWorkspaceVariables } from '@firebasegen/pib-connector';

// The `UpdateWorkspace` mutation requires an argument of type `UpdateWorkspaceVariables`:
const updateWorkspaceVars: UpdateWorkspaceVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  logoUrl: ..., // optional
};

// Call the `updateWorkspace()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateWorkspace(updateWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await updateWorkspace({ id: ..., name: ..., description: ..., logoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateWorkspace(dataConnect, updateWorkspaceVars);

console.log(data.updateWorkspace);

// Or, you can use the `Promise` API.
updateWorkspace(updateWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.updateWorkspace);
});
```

### Using `UpdateWorkspace`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateWorkspaceRef, UpdateWorkspaceVariables } from '@firebasegen/pib-connector';

// The `UpdateWorkspace` mutation requires an argument of type `UpdateWorkspaceVariables`:
const updateWorkspaceVars: UpdateWorkspaceVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  logoUrl: ..., // optional
};

// Call the `updateWorkspaceRef()` function to get a reference to the mutation.
const ref = updateWorkspaceRef(updateWorkspaceVars);
// Variables can be defined inline as well.
const ref = updateWorkspaceRef({ id: ..., name: ..., description: ..., logoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateWorkspaceRef(dataConnect, updateWorkspaceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.updateWorkspace);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.updateWorkspace);
});
```

## DeleteWorkspace
You can execute the `DeleteWorkspace` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
deleteWorkspace(vars: DeleteWorkspaceVariables): MutationPromise<DeleteWorkspaceData, DeleteWorkspaceVariables>;

interface DeleteWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWorkspaceVariables): MutationRef<DeleteWorkspaceData, DeleteWorkspaceVariables>;
}
export const deleteWorkspaceRef: DeleteWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteWorkspace(dc: DataConnect, vars: DeleteWorkspaceVariables): MutationPromise<DeleteWorkspaceData, DeleteWorkspaceVariables>;

interface DeleteWorkspaceRef {
  ...
  (dc: DataConnect, vars: DeleteWorkspaceVariables): MutationRef<DeleteWorkspaceData, DeleteWorkspaceVariables>;
}
export const deleteWorkspaceRef: DeleteWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteWorkspaceRef:
```typescript
const name = deleteWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `DeleteWorkspace` mutation requires an argument of type `DeleteWorkspaceVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteWorkspaceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteWorkspace` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteWorkspaceData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteWorkspaceData {
  deleteWorkspace?: Workspace_Key | null;
}
```
### Using `DeleteWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteWorkspace, DeleteWorkspaceVariables } from '@firebasegen/pib-connector';

// The `DeleteWorkspace` mutation requires an argument of type `DeleteWorkspaceVariables`:
const deleteWorkspaceVars: DeleteWorkspaceVariables = {
  id: ..., 
};

// Call the `deleteWorkspace()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteWorkspace(deleteWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await deleteWorkspace({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteWorkspace(dataConnect, deleteWorkspaceVars);

console.log(data.deleteWorkspace);

// Or, you can use the `Promise` API.
deleteWorkspace(deleteWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.deleteWorkspace);
});
```

### Using `DeleteWorkspace`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteWorkspaceRef, DeleteWorkspaceVariables } from '@firebasegen/pib-connector';

// The `DeleteWorkspace` mutation requires an argument of type `DeleteWorkspaceVariables`:
const deleteWorkspaceVars: DeleteWorkspaceVariables = {
  id: ..., 
};

// Call the `deleteWorkspaceRef()` function to get a reference to the mutation.
const ref = deleteWorkspaceRef(deleteWorkspaceVars);
// Variables can be defined inline as well.
const ref = deleteWorkspaceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteWorkspaceRef(dataConnect, deleteWorkspaceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.deleteWorkspace);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.deleteWorkspace);
});
```

## AddWorkspaceMember
You can execute the `AddWorkspaceMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
addWorkspaceMember(vars: AddWorkspaceMemberVariables): MutationPromise<AddWorkspaceMemberData, AddWorkspaceMemberVariables>;

interface AddWorkspaceMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddWorkspaceMemberVariables): MutationRef<AddWorkspaceMemberData, AddWorkspaceMemberVariables>;
}
export const addWorkspaceMemberRef: AddWorkspaceMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addWorkspaceMember(dc: DataConnect, vars: AddWorkspaceMemberVariables): MutationPromise<AddWorkspaceMemberData, AddWorkspaceMemberVariables>;

interface AddWorkspaceMemberRef {
  ...
  (dc: DataConnect, vars: AddWorkspaceMemberVariables): MutationRef<AddWorkspaceMemberData, AddWorkspaceMemberVariables>;
}
export const addWorkspaceMemberRef: AddWorkspaceMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addWorkspaceMemberRef:
```typescript
const name = addWorkspaceMemberRef.operationName;
console.log(name);
```

### Variables
The `AddWorkspaceMember` mutation requires an argument of type `AddWorkspaceMemberVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddWorkspaceMemberVariables {
  workspaceId: UUIDString;
  userId: string;
  profileId?: UUIDString | null;
  role: string;
}
```
### Return Type
Recall that executing the `AddWorkspaceMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddWorkspaceMemberData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddWorkspaceMemberData {
  addWorkspaceMember: WorkspaceMember_Key;
}
```
### Using `AddWorkspaceMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addWorkspaceMember, AddWorkspaceMemberVariables } from '@firebasegen/pib-connector';

// The `AddWorkspaceMember` mutation requires an argument of type `AddWorkspaceMemberVariables`:
const addWorkspaceMemberVars: AddWorkspaceMemberVariables = {
  workspaceId: ..., 
  userId: ..., 
  profileId: ..., // optional
  role: ..., 
};

// Call the `addWorkspaceMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addWorkspaceMember(addWorkspaceMemberVars);
// Variables can be defined inline as well.
const { data } = await addWorkspaceMember({ workspaceId: ..., userId: ..., profileId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addWorkspaceMember(dataConnect, addWorkspaceMemberVars);

console.log(data.addWorkspaceMember);

// Or, you can use the `Promise` API.
addWorkspaceMember(addWorkspaceMemberVars).then((response) => {
  const data = response.data;
  console.log(data.addWorkspaceMember);
});
```

### Using `AddWorkspaceMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addWorkspaceMemberRef, AddWorkspaceMemberVariables } from '@firebasegen/pib-connector';

// The `AddWorkspaceMember` mutation requires an argument of type `AddWorkspaceMemberVariables`:
const addWorkspaceMemberVars: AddWorkspaceMemberVariables = {
  workspaceId: ..., 
  userId: ..., 
  profileId: ..., // optional
  role: ..., 
};

// Call the `addWorkspaceMemberRef()` function to get a reference to the mutation.
const ref = addWorkspaceMemberRef(addWorkspaceMemberVars);
// Variables can be defined inline as well.
const ref = addWorkspaceMemberRef({ workspaceId: ..., userId: ..., profileId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addWorkspaceMemberRef(dataConnect, addWorkspaceMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.addWorkspaceMember);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.addWorkspaceMember);
});
```

## UpdateWorkspaceMember
You can execute the `UpdateWorkspaceMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
updateWorkspaceMember(vars: UpdateWorkspaceMemberVariables): MutationPromise<UpdateWorkspaceMemberData, UpdateWorkspaceMemberVariables>;

interface UpdateWorkspaceMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWorkspaceMemberVariables): MutationRef<UpdateWorkspaceMemberData, UpdateWorkspaceMemberVariables>;
}
export const updateWorkspaceMemberRef: UpdateWorkspaceMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateWorkspaceMember(dc: DataConnect, vars: UpdateWorkspaceMemberVariables): MutationPromise<UpdateWorkspaceMemberData, UpdateWorkspaceMemberVariables>;

interface UpdateWorkspaceMemberRef {
  ...
  (dc: DataConnect, vars: UpdateWorkspaceMemberVariables): MutationRef<UpdateWorkspaceMemberData, UpdateWorkspaceMemberVariables>;
}
export const updateWorkspaceMemberRef: UpdateWorkspaceMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateWorkspaceMemberRef:
```typescript
const name = updateWorkspaceMemberRef.operationName;
console.log(name);
```

### Variables
The `UpdateWorkspaceMember` mutation requires an argument of type `UpdateWorkspaceMemberVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateWorkspaceMemberVariables {
  workspaceId: UUIDString;
  userId: string;
  profileId?: UUIDString | null;
  role?: string | null;
}
```
### Return Type
Recall that executing the `UpdateWorkspaceMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateWorkspaceMemberData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateWorkspaceMemberData {
  updateWorkspaceMember?: WorkspaceMember_Key | null;
}
```
### Using `UpdateWorkspaceMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateWorkspaceMember, UpdateWorkspaceMemberVariables } from '@firebasegen/pib-connector';

// The `UpdateWorkspaceMember` mutation requires an argument of type `UpdateWorkspaceMemberVariables`:
const updateWorkspaceMemberVars: UpdateWorkspaceMemberVariables = {
  workspaceId: ..., 
  userId: ..., 
  profileId: ..., // optional
  role: ..., // optional
};

// Call the `updateWorkspaceMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateWorkspaceMember(updateWorkspaceMemberVars);
// Variables can be defined inline as well.
const { data } = await updateWorkspaceMember({ workspaceId: ..., userId: ..., profileId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateWorkspaceMember(dataConnect, updateWorkspaceMemberVars);

console.log(data.updateWorkspaceMember);

// Or, you can use the `Promise` API.
updateWorkspaceMember(updateWorkspaceMemberVars).then((response) => {
  const data = response.data;
  console.log(data.updateWorkspaceMember);
});
```

### Using `UpdateWorkspaceMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateWorkspaceMemberRef, UpdateWorkspaceMemberVariables } from '@firebasegen/pib-connector';

// The `UpdateWorkspaceMember` mutation requires an argument of type `UpdateWorkspaceMemberVariables`:
const updateWorkspaceMemberVars: UpdateWorkspaceMemberVariables = {
  workspaceId: ..., 
  userId: ..., 
  profileId: ..., // optional
  role: ..., // optional
};

// Call the `updateWorkspaceMemberRef()` function to get a reference to the mutation.
const ref = updateWorkspaceMemberRef(updateWorkspaceMemberVars);
// Variables can be defined inline as well.
const ref = updateWorkspaceMemberRef({ workspaceId: ..., userId: ..., profileId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateWorkspaceMemberRef(dataConnect, updateWorkspaceMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.updateWorkspaceMember);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.updateWorkspaceMember);
});
```

## RemoveWorkspaceMember
You can execute the `RemoveWorkspaceMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
removeWorkspaceMember(vars: RemoveWorkspaceMemberVariables): MutationPromise<RemoveWorkspaceMemberData, RemoveWorkspaceMemberVariables>;

interface RemoveWorkspaceMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveWorkspaceMemberVariables): MutationRef<RemoveWorkspaceMemberData, RemoveWorkspaceMemberVariables>;
}
export const removeWorkspaceMemberRef: RemoveWorkspaceMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeWorkspaceMember(dc: DataConnect, vars: RemoveWorkspaceMemberVariables): MutationPromise<RemoveWorkspaceMemberData, RemoveWorkspaceMemberVariables>;

interface RemoveWorkspaceMemberRef {
  ...
  (dc: DataConnect, vars: RemoveWorkspaceMemberVariables): MutationRef<RemoveWorkspaceMemberData, RemoveWorkspaceMemberVariables>;
}
export const removeWorkspaceMemberRef: RemoveWorkspaceMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeWorkspaceMemberRef:
```typescript
const name = removeWorkspaceMemberRef.operationName;
console.log(name);
```

### Variables
The `RemoveWorkspaceMember` mutation requires an argument of type `RemoveWorkspaceMemberVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveWorkspaceMemberVariables {
  workspaceId: UUIDString;
  userId: string;
}
```
### Return Type
Recall that executing the `RemoveWorkspaceMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveWorkspaceMemberData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveWorkspaceMemberData {
  removeWorkspaceMember?: WorkspaceMember_Key | null;
}
```
### Using `RemoveWorkspaceMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeWorkspaceMember, RemoveWorkspaceMemberVariables } from '@firebasegen/pib-connector';

// The `RemoveWorkspaceMember` mutation requires an argument of type `RemoveWorkspaceMemberVariables`:
const removeWorkspaceMemberVars: RemoveWorkspaceMemberVariables = {
  workspaceId: ..., 
  userId: ..., 
};

// Call the `removeWorkspaceMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeWorkspaceMember(removeWorkspaceMemberVars);
// Variables can be defined inline as well.
const { data } = await removeWorkspaceMember({ workspaceId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeWorkspaceMember(dataConnect, removeWorkspaceMemberVars);

console.log(data.removeWorkspaceMember);

// Or, you can use the `Promise` API.
removeWorkspaceMember(removeWorkspaceMemberVars).then((response) => {
  const data = response.data;
  console.log(data.removeWorkspaceMember);
});
```

### Using `RemoveWorkspaceMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeWorkspaceMemberRef, RemoveWorkspaceMemberVariables } from '@firebasegen/pib-connector';

// The `RemoveWorkspaceMember` mutation requires an argument of type `RemoveWorkspaceMemberVariables`:
const removeWorkspaceMemberVars: RemoveWorkspaceMemberVariables = {
  workspaceId: ..., 
  userId: ..., 
};

// Call the `removeWorkspaceMemberRef()` function to get a reference to the mutation.
const ref = removeWorkspaceMemberRef(removeWorkspaceMemberVars);
// Variables can be defined inline as well.
const ref = removeWorkspaceMemberRef({ workspaceId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeWorkspaceMemberRef(dataConnect, removeWorkspaceMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.removeWorkspaceMember);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.removeWorkspaceMember);
});
```

## InviteToWorkspace
You can execute the `InviteToWorkspace` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
inviteToWorkspace(vars: InviteToWorkspaceVariables): MutationPromise<InviteToWorkspaceData, InviteToWorkspaceVariables>;

interface InviteToWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InviteToWorkspaceVariables): MutationRef<InviteToWorkspaceData, InviteToWorkspaceVariables>;
}
export const inviteToWorkspaceRef: InviteToWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
inviteToWorkspace(dc: DataConnect, vars: InviteToWorkspaceVariables): MutationPromise<InviteToWorkspaceData, InviteToWorkspaceVariables>;

interface InviteToWorkspaceRef {
  ...
  (dc: DataConnect, vars: InviteToWorkspaceVariables): MutationRef<InviteToWorkspaceData, InviteToWorkspaceVariables>;
}
export const inviteToWorkspaceRef: InviteToWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the inviteToWorkspaceRef:
```typescript
const name = inviteToWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `InviteToWorkspace` mutation requires an argument of type `InviteToWorkspaceVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InviteToWorkspaceVariables {
  workspaceId: UUIDString;
  email: string;
  role: string;
}
```
### Return Type
Recall that executing the `InviteToWorkspace` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InviteToWorkspaceData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InviteToWorkspaceData {
  inviteToWorkspace: WorkspaceInvitation_Key;
}
```
### Using `InviteToWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, inviteToWorkspace, InviteToWorkspaceVariables } from '@firebasegen/pib-connector';

// The `InviteToWorkspace` mutation requires an argument of type `InviteToWorkspaceVariables`:
const inviteToWorkspaceVars: InviteToWorkspaceVariables = {
  workspaceId: ..., 
  email: ..., 
  role: ..., 
};

// Call the `inviteToWorkspace()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await inviteToWorkspace(inviteToWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await inviteToWorkspace({ workspaceId: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await inviteToWorkspace(dataConnect, inviteToWorkspaceVars);

console.log(data.inviteToWorkspace);

// Or, you can use the `Promise` API.
inviteToWorkspace(inviteToWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.inviteToWorkspace);
});
```

### Using `InviteToWorkspace`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, inviteToWorkspaceRef, InviteToWorkspaceVariables } from '@firebasegen/pib-connector';

// The `InviteToWorkspace` mutation requires an argument of type `InviteToWorkspaceVariables`:
const inviteToWorkspaceVars: InviteToWorkspaceVariables = {
  workspaceId: ..., 
  email: ..., 
  role: ..., 
};

// Call the `inviteToWorkspaceRef()` function to get a reference to the mutation.
const ref = inviteToWorkspaceRef(inviteToWorkspaceVars);
// Variables can be defined inline as well.
const ref = inviteToWorkspaceRef({ workspaceId: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = inviteToWorkspaceRef(dataConnect, inviteToWorkspaceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.inviteToWorkspace);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.inviteToWorkspace);
});
```

## AcceptInvitation
You can execute the `AcceptInvitation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
acceptInvitation(vars: AcceptInvitationVariables): MutationPromise<AcceptInvitationData, AcceptInvitationVariables>;

interface AcceptInvitationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AcceptInvitationVariables): MutationRef<AcceptInvitationData, AcceptInvitationVariables>;
}
export const acceptInvitationRef: AcceptInvitationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
acceptInvitation(dc: DataConnect, vars: AcceptInvitationVariables): MutationPromise<AcceptInvitationData, AcceptInvitationVariables>;

interface AcceptInvitationRef {
  ...
  (dc: DataConnect, vars: AcceptInvitationVariables): MutationRef<AcceptInvitationData, AcceptInvitationVariables>;
}
export const acceptInvitationRef: AcceptInvitationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the acceptInvitationRef:
```typescript
const name = acceptInvitationRef.operationName;
console.log(name);
```

### Variables
The `AcceptInvitation` mutation requires an argument of type `AcceptInvitationVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AcceptInvitationVariables {
  invitationId: UUIDString;
}
```
### Return Type
Recall that executing the `AcceptInvitation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AcceptInvitationData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AcceptInvitationData {
  acceptInvitation?: WorkspaceInvitation_Key | null;
}
```
### Using `AcceptInvitation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, acceptInvitation, AcceptInvitationVariables } from '@firebasegen/pib-connector';

// The `AcceptInvitation` mutation requires an argument of type `AcceptInvitationVariables`:
const acceptInvitationVars: AcceptInvitationVariables = {
  invitationId: ..., 
};

// Call the `acceptInvitation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await acceptInvitation(acceptInvitationVars);
// Variables can be defined inline as well.
const { data } = await acceptInvitation({ invitationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await acceptInvitation(dataConnect, acceptInvitationVars);

console.log(data.acceptInvitation);

// Or, you can use the `Promise` API.
acceptInvitation(acceptInvitationVars).then((response) => {
  const data = response.data;
  console.log(data.acceptInvitation);
});
```

### Using `AcceptInvitation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, acceptInvitationRef, AcceptInvitationVariables } from '@firebasegen/pib-connector';

// The `AcceptInvitation` mutation requires an argument of type `AcceptInvitationVariables`:
const acceptInvitationVars: AcceptInvitationVariables = {
  invitationId: ..., 
};

// Call the `acceptInvitationRef()` function to get a reference to the mutation.
const ref = acceptInvitationRef(acceptInvitationVars);
// Variables can be defined inline as well.
const ref = acceptInvitationRef({ invitationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = acceptInvitationRef(dataConnect, acceptInvitationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.acceptInvitation);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.acceptInvitation);
});
```

## DeclineInvitation
You can execute the `DeclineInvitation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
declineInvitation(vars: DeclineInvitationVariables): MutationPromise<DeclineInvitationData, DeclineInvitationVariables>;

interface DeclineInvitationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeclineInvitationVariables): MutationRef<DeclineInvitationData, DeclineInvitationVariables>;
}
export const declineInvitationRef: DeclineInvitationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
declineInvitation(dc: DataConnect, vars: DeclineInvitationVariables): MutationPromise<DeclineInvitationData, DeclineInvitationVariables>;

interface DeclineInvitationRef {
  ...
  (dc: DataConnect, vars: DeclineInvitationVariables): MutationRef<DeclineInvitationData, DeclineInvitationVariables>;
}
export const declineInvitationRef: DeclineInvitationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the declineInvitationRef:
```typescript
const name = declineInvitationRef.operationName;
console.log(name);
```

### Variables
The `DeclineInvitation` mutation requires an argument of type `DeclineInvitationVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeclineInvitationVariables {
  invitationId: UUIDString;
}
```
### Return Type
Recall that executing the `DeclineInvitation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeclineInvitationData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeclineInvitationData {
  declineInvitation?: WorkspaceInvitation_Key | null;
}
```
### Using `DeclineInvitation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, declineInvitation, DeclineInvitationVariables } from '@firebasegen/pib-connector';

// The `DeclineInvitation` mutation requires an argument of type `DeclineInvitationVariables`:
const declineInvitationVars: DeclineInvitationVariables = {
  invitationId: ..., 
};

// Call the `declineInvitation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await declineInvitation(declineInvitationVars);
// Variables can be defined inline as well.
const { data } = await declineInvitation({ invitationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await declineInvitation(dataConnect, declineInvitationVars);

console.log(data.declineInvitation);

// Or, you can use the `Promise` API.
declineInvitation(declineInvitationVars).then((response) => {
  const data = response.data;
  console.log(data.declineInvitation);
});
```

### Using `DeclineInvitation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, declineInvitationRef, DeclineInvitationVariables } from '@firebasegen/pib-connector';

// The `DeclineInvitation` mutation requires an argument of type `DeclineInvitationVariables`:
const declineInvitationVars: DeclineInvitationVariables = {
  invitationId: ..., 
};

// Call the `declineInvitationRef()` function to get a reference to the mutation.
const ref = declineInvitationRef(declineInvitationVars);
// Variables can be defined inline as well.
const ref = declineInvitationRef({ invitationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = declineInvitationRef(dataConnect, declineInvitationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.declineInvitation);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.declineInvitation);
});
```

## CreateBusinessProfile
You can execute the `CreateBusinessProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
createBusinessProfile(vars: CreateBusinessProfileVariables): MutationPromise<CreateBusinessProfileData, CreateBusinessProfileVariables>;

interface CreateBusinessProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBusinessProfileVariables): MutationRef<CreateBusinessProfileData, CreateBusinessProfileVariables>;
}
export const createBusinessProfileRef: CreateBusinessProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBusinessProfile(dc: DataConnect, vars: CreateBusinessProfileVariables): MutationPromise<CreateBusinessProfileData, CreateBusinessProfileVariables>;

interface CreateBusinessProfileRef {
  ...
  (dc: DataConnect, vars: CreateBusinessProfileVariables): MutationRef<CreateBusinessProfileData, CreateBusinessProfileVariables>;
}
export const createBusinessProfileRef: CreateBusinessProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBusinessProfileRef:
```typescript
const name = createBusinessProfileRef.operationName;
console.log(name);
```

### Variables
The `CreateBusinessProfile` mutation requires an argument of type `CreateBusinessProfileVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateBusinessProfileVariables {
  workspaceId: UUIDString;
  name: string;
  industry?: string | null;
  description?: string | null;
  location?: string | null;
  website?: string | null;
  employeeCount?: number | null;
}
```
### Return Type
Recall that executing the `CreateBusinessProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBusinessProfileData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBusinessProfileData {
  createBusinessProfile: BusinessProfile_Key;
}
```
### Using `CreateBusinessProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBusinessProfile, CreateBusinessProfileVariables } from '@firebasegen/pib-connector';

// The `CreateBusinessProfile` mutation requires an argument of type `CreateBusinessProfileVariables`:
const createBusinessProfileVars: CreateBusinessProfileVariables = {
  workspaceId: ..., 
  name: ..., 
  industry: ..., // optional
  description: ..., // optional
  location: ..., // optional
  website: ..., // optional
  employeeCount: ..., // optional
};

// Call the `createBusinessProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBusinessProfile(createBusinessProfileVars);
// Variables can be defined inline as well.
const { data } = await createBusinessProfile({ workspaceId: ..., name: ..., industry: ..., description: ..., location: ..., website: ..., employeeCount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBusinessProfile(dataConnect, createBusinessProfileVars);

console.log(data.createBusinessProfile);

// Or, you can use the `Promise` API.
createBusinessProfile(createBusinessProfileVars).then((response) => {
  const data = response.data;
  console.log(data.createBusinessProfile);
});
```

### Using `CreateBusinessProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBusinessProfileRef, CreateBusinessProfileVariables } from '@firebasegen/pib-connector';

// The `CreateBusinessProfile` mutation requires an argument of type `CreateBusinessProfileVariables`:
const createBusinessProfileVars: CreateBusinessProfileVariables = {
  workspaceId: ..., 
  name: ..., 
  industry: ..., // optional
  description: ..., // optional
  location: ..., // optional
  website: ..., // optional
  employeeCount: ..., // optional
};

// Call the `createBusinessProfileRef()` function to get a reference to the mutation.
const ref = createBusinessProfileRef(createBusinessProfileVars);
// Variables can be defined inline as well.
const ref = createBusinessProfileRef({ workspaceId: ..., name: ..., industry: ..., description: ..., location: ..., website: ..., employeeCount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBusinessProfileRef(dataConnect, createBusinessProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.createBusinessProfile);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.createBusinessProfile);
});
```

## UpdateBusinessProfile
You can execute the `UpdateBusinessProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
updateBusinessProfile(vars: UpdateBusinessProfileVariables): MutationPromise<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;

interface UpdateBusinessProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBusinessProfileVariables): MutationRef<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;
}
export const updateBusinessProfileRef: UpdateBusinessProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateBusinessProfile(dc: DataConnect, vars: UpdateBusinessProfileVariables): MutationPromise<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;

interface UpdateBusinessProfileRef {
  ...
  (dc: DataConnect, vars: UpdateBusinessProfileVariables): MutationRef<UpdateBusinessProfileData, UpdateBusinessProfileVariables>;
}
export const updateBusinessProfileRef: UpdateBusinessProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateBusinessProfileRef:
```typescript
const name = updateBusinessProfileRef.operationName;
console.log(name);
```

### Variables
The `UpdateBusinessProfile` mutation requires an argument of type `UpdateBusinessProfileVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateBusinessProfileVariables {
  id: UUIDString;
  name?: string | null;
  industry?: string | null;
  description?: string | null;
  location?: string | null;
  website?: string | null;
  employeeCount?: number | null;
}
```
### Return Type
Recall that executing the `UpdateBusinessProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateBusinessProfileData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateBusinessProfileData {
  updateBusinessProfile?: BusinessProfile_Key | null;
}
```
### Using `UpdateBusinessProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateBusinessProfile, UpdateBusinessProfileVariables } from '@firebasegen/pib-connector';

// The `UpdateBusinessProfile` mutation requires an argument of type `UpdateBusinessProfileVariables`:
const updateBusinessProfileVars: UpdateBusinessProfileVariables = {
  id: ..., 
  name: ..., // optional
  industry: ..., // optional
  description: ..., // optional
  location: ..., // optional
  website: ..., // optional
  employeeCount: ..., // optional
};

// Call the `updateBusinessProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateBusinessProfile(updateBusinessProfileVars);
// Variables can be defined inline as well.
const { data } = await updateBusinessProfile({ id: ..., name: ..., industry: ..., description: ..., location: ..., website: ..., employeeCount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateBusinessProfile(dataConnect, updateBusinessProfileVars);

console.log(data.updateBusinessProfile);

// Or, you can use the `Promise` API.
updateBusinessProfile(updateBusinessProfileVars).then((response) => {
  const data = response.data;
  console.log(data.updateBusinessProfile);
});
```

### Using `UpdateBusinessProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateBusinessProfileRef, UpdateBusinessProfileVariables } from '@firebasegen/pib-connector';

// The `UpdateBusinessProfile` mutation requires an argument of type `UpdateBusinessProfileVariables`:
const updateBusinessProfileVars: UpdateBusinessProfileVariables = {
  id: ..., 
  name: ..., // optional
  industry: ..., // optional
  description: ..., // optional
  location: ..., // optional
  website: ..., // optional
  employeeCount: ..., // optional
};

// Call the `updateBusinessProfileRef()` function to get a reference to the mutation.
const ref = updateBusinessProfileRef(updateBusinessProfileVars);
// Variables can be defined inline as well.
const ref = updateBusinessProfileRef({ id: ..., name: ..., industry: ..., description: ..., location: ..., website: ..., employeeCount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateBusinessProfileRef(dataConnect, updateBusinessProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.updateBusinessProfile);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.updateBusinessProfile);
});
```

## CreatePartnerPreferences
You can execute the `CreatePartnerPreferences` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
createPartnerPreferences(vars: CreatePartnerPreferencesVariables): MutationPromise<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;

interface CreatePartnerPreferencesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePartnerPreferencesVariables): MutationRef<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;
}
export const createPartnerPreferencesRef: CreatePartnerPreferencesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPartnerPreferences(dc: DataConnect, vars: CreatePartnerPreferencesVariables): MutationPromise<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;

interface CreatePartnerPreferencesRef {
  ...
  (dc: DataConnect, vars: CreatePartnerPreferencesVariables): MutationRef<CreatePartnerPreferencesData, CreatePartnerPreferencesVariables>;
}
export const createPartnerPreferencesRef: CreatePartnerPreferencesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPartnerPreferencesRef:
```typescript
const name = createPartnerPreferencesRef.operationName;
console.log(name);
```

### Variables
The `CreatePartnerPreferences` mutation requires an argument of type `CreatePartnerPreferencesVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePartnerPreferencesVariables {
  workspaceId: UUIDString;
  industries?: string[] | null;
  locations?: string[] | null;
  minEmployeeCount?: number | null;
  maxEmployeeCount?: number | null;
  skillsNeeded?: string[] | null;
}
```
### Return Type
Recall that executing the `CreatePartnerPreferences` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePartnerPreferencesData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePartnerPreferencesData {
  createPartnerPreferences: PartnerPreferences_Key;
}
```
### Using `CreatePartnerPreferences`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPartnerPreferences, CreatePartnerPreferencesVariables } from '@firebasegen/pib-connector';

// The `CreatePartnerPreferences` mutation requires an argument of type `CreatePartnerPreferencesVariables`:
const createPartnerPreferencesVars: CreatePartnerPreferencesVariables = {
  workspaceId: ..., 
  industries: ..., // optional
  locations: ..., // optional
  minEmployeeCount: ..., // optional
  maxEmployeeCount: ..., // optional
  skillsNeeded: ..., // optional
};

// Call the `createPartnerPreferences()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPartnerPreferences(createPartnerPreferencesVars);
// Variables can be defined inline as well.
const { data } = await createPartnerPreferences({ workspaceId: ..., industries: ..., locations: ..., minEmployeeCount: ..., maxEmployeeCount: ..., skillsNeeded: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPartnerPreferences(dataConnect, createPartnerPreferencesVars);

console.log(data.createPartnerPreferences);

// Or, you can use the `Promise` API.
createPartnerPreferences(createPartnerPreferencesVars).then((response) => {
  const data = response.data;
  console.log(data.createPartnerPreferences);
});
```

### Using `CreatePartnerPreferences`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPartnerPreferencesRef, CreatePartnerPreferencesVariables } from '@firebasegen/pib-connector';

// The `CreatePartnerPreferences` mutation requires an argument of type `CreatePartnerPreferencesVariables`:
const createPartnerPreferencesVars: CreatePartnerPreferencesVariables = {
  workspaceId: ..., 
  industries: ..., // optional
  locations: ..., // optional
  minEmployeeCount: ..., // optional
  maxEmployeeCount: ..., // optional
  skillsNeeded: ..., // optional
};

// Call the `createPartnerPreferencesRef()` function to get a reference to the mutation.
const ref = createPartnerPreferencesRef(createPartnerPreferencesVars);
// Variables can be defined inline as well.
const ref = createPartnerPreferencesRef({ workspaceId: ..., industries: ..., locations: ..., minEmployeeCount: ..., maxEmployeeCount: ..., skillsNeeded: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPartnerPreferencesRef(dataConnect, createPartnerPreferencesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.createPartnerPreferences);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.createPartnerPreferences);
});
```

## UpdatePartnerPreferences
You can execute the `UpdatePartnerPreferences` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
updatePartnerPreferences(vars: UpdatePartnerPreferencesVariables): MutationPromise<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;

interface UpdatePartnerPreferencesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePartnerPreferencesVariables): MutationRef<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;
}
export const updatePartnerPreferencesRef: UpdatePartnerPreferencesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePartnerPreferences(dc: DataConnect, vars: UpdatePartnerPreferencesVariables): MutationPromise<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;

interface UpdatePartnerPreferencesRef {
  ...
  (dc: DataConnect, vars: UpdatePartnerPreferencesVariables): MutationRef<UpdatePartnerPreferencesData, UpdatePartnerPreferencesVariables>;
}
export const updatePartnerPreferencesRef: UpdatePartnerPreferencesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePartnerPreferencesRef:
```typescript
const name = updatePartnerPreferencesRef.operationName;
console.log(name);
```

### Variables
The `UpdatePartnerPreferences` mutation requires an argument of type `UpdatePartnerPreferencesVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePartnerPreferencesVariables {
  id: UUIDString;
  industries?: string[] | null;
  locations?: string[] | null;
  minEmployeeCount?: number | null;
  maxEmployeeCount?: number | null;
  skillsNeeded?: string[] | null;
}
```
### Return Type
Recall that executing the `UpdatePartnerPreferences` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePartnerPreferencesData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePartnerPreferencesData {
  updatePartnerPreferences?: PartnerPreferences_Key | null;
}
```
### Using `UpdatePartnerPreferences`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePartnerPreferences, UpdatePartnerPreferencesVariables } from '@firebasegen/pib-connector';

// The `UpdatePartnerPreferences` mutation requires an argument of type `UpdatePartnerPreferencesVariables`:
const updatePartnerPreferencesVars: UpdatePartnerPreferencesVariables = {
  id: ..., 
  industries: ..., // optional
  locations: ..., // optional
  minEmployeeCount: ..., // optional
  maxEmployeeCount: ..., // optional
  skillsNeeded: ..., // optional
};

// Call the `updatePartnerPreferences()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePartnerPreferences(updatePartnerPreferencesVars);
// Variables can be defined inline as well.
const { data } = await updatePartnerPreferences({ id: ..., industries: ..., locations: ..., minEmployeeCount: ..., maxEmployeeCount: ..., skillsNeeded: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePartnerPreferences(dataConnect, updatePartnerPreferencesVars);

console.log(data.updatePartnerPreferences);

// Or, you can use the `Promise` API.
updatePartnerPreferences(updatePartnerPreferencesVars).then((response) => {
  const data = response.data;
  console.log(data.updatePartnerPreferences);
});
```

### Using `UpdatePartnerPreferences`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePartnerPreferencesRef, UpdatePartnerPreferencesVariables } from '@firebasegen/pib-connector';

// The `UpdatePartnerPreferences` mutation requires an argument of type `UpdatePartnerPreferencesVariables`:
const updatePartnerPreferencesVars: UpdatePartnerPreferencesVariables = {
  id: ..., 
  industries: ..., // optional
  locations: ..., // optional
  minEmployeeCount: ..., // optional
  maxEmployeeCount: ..., // optional
  skillsNeeded: ..., // optional
};

// Call the `updatePartnerPreferencesRef()` function to get a reference to the mutation.
const ref = updatePartnerPreferencesRef(updatePartnerPreferencesVars);
// Variables can be defined inline as well.
const ref = updatePartnerPreferencesRef({ id: ..., industries: ..., locations: ..., minEmployeeCount: ..., maxEmployeeCount: ..., skillsNeeded: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePartnerPreferencesRef(dataConnect, updatePartnerPreferencesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.updatePartnerPreferences);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.updatePartnerPreferences);
});
```

