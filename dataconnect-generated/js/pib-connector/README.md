# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*SearchProfilesByBio*](#searchprofilesbybio)
  - [*SearchBusinessProfilesByDescription*](#searchbusinessprofilesbydescription)
  - [*MatchProfileToBusinesses*](#matchprofiletobusinesses)
  - [*MatchBusinessToProfiles*](#matchbusinesstoprofiles)
  - [*SearchPartnerPreferences*](#searchpartnerpreferences)
  - [*GetUser*](#getuser)
  - [*GetUserProfiles*](#getuserprofiles)
  - [*GetUserWorkspaces*](#getuserworkspaces)
  - [*GetWorkspace*](#getworkspace)
  - [*GetWorkspaceMembers*](#getworkspacemembers)
  - [*GetBusinessProfile*](#getbusinessprofile)
  - [*GetPartnerPreferences*](#getpartnerpreferences)
  - [*GetWorkspaceInvitations*](#getworkspaceinvitations)
  - [*GetPendingInvitations*](#getpendinginvitations)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*CreateProfile*](#createprofile)
  - [*CreateProfileWithBio*](#createprofilewithbio)
  - [*UpdateProfile*](#updateprofile)
  - [*UpdateProfileWithBio*](#updateprofilewithbio)
  - [*DeleteProfile*](#deleteprofile)
  - [*CreateWorkspace*](#createworkspace)
  - [*UpdateWorkspace*](#updateworkspace)
  - [*DeleteWorkspace*](#deleteworkspace)
  - [*JoinWorkspaceUser*](#joinworkspaceuser)
  - [*AddWorkspaceMember*](#addworkspacemember)
  - [*UpdateWorkspaceMember*](#updateworkspacemember)
  - [*RemoveWorkspaceMember*](#removeworkspacemember)
  - [*InviteToWorkspace*](#invitetoworkspace)
  - [*AcceptInvitation*](#acceptinvitation)
  - [*DeclineInvitation*](#declineinvitation)
  - [*CreateBusinessProfile*](#createbusinessprofile)
  - [*CreateBusinessProfileWithDescription*](#createbusinessprofilewithdescription)
  - [*UpdateBusinessProfile*](#updatebusinessprofile)
  - [*UpdateBusinessProfileWithDescription*](#updatebusinessprofilewithdescription)
  - [*CreatePartnerPreferences*](#createpartnerpreferences)
  - [*CreatePartnerPreferencesWithEmbedding*](#createpartnerpreferenceswithembedding)
  - [*UpdatePartnerPreferences*](#updatepartnerpreferences)
  - [*UpdatePartnerPreferencesWithEmbedding*](#updatepartnerpreferenceswithembedding)

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

## SearchProfilesByBio
You can execute the `SearchProfilesByBio` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
searchProfilesByBio(vars: SearchProfilesByBioVariables): QueryPromise<SearchProfilesByBioData, SearchProfilesByBioVariables>;

interface SearchProfilesByBioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchProfilesByBioVariables): QueryRef<SearchProfilesByBioData, SearchProfilesByBioVariables>;
}
export const searchProfilesByBioRef: SearchProfilesByBioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchProfilesByBio(dc: DataConnect, vars: SearchProfilesByBioVariables): QueryPromise<SearchProfilesByBioData, SearchProfilesByBioVariables>;

interface SearchProfilesByBioRef {
  ...
  (dc: DataConnect, vars: SearchProfilesByBioVariables): QueryRef<SearchProfilesByBioData, SearchProfilesByBioVariables>;
}
export const searchProfilesByBioRef: SearchProfilesByBioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchProfilesByBioRef:
```typescript
const name = searchProfilesByBioRef.operationName;
console.log(name);
```

### Variables
The `SearchProfilesByBio` query requires an argument of type `SearchProfilesByBioVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchProfilesByBioVariables {
  searchText: string;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `SearchProfilesByBio` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchProfilesByBioData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `SearchProfilesByBio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchProfilesByBio, SearchProfilesByBioVariables } from '@firebasegen/pib-connector';

// The `SearchProfilesByBio` query requires an argument of type `SearchProfilesByBioVariables`:
const searchProfilesByBioVars: SearchProfilesByBioVariables = {
  searchText: ..., 
  limit: ..., // optional
};

// Call the `searchProfilesByBio()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchProfilesByBio(searchProfilesByBioVars);
// Variables can be defined inline as well.
const { data } = await searchProfilesByBio({ searchText: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchProfilesByBio(dataConnect, searchProfilesByBioVars);

console.log(data.profiles_bioEmbedding_similarity);

// Or, you can use the `Promise` API.
searchProfilesByBio(searchProfilesByBioVars).then((response) => {
  const data = response.data;
  console.log(data.profiles_bioEmbedding_similarity);
});
```

### Using `SearchProfilesByBio`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchProfilesByBioRef, SearchProfilesByBioVariables } from '@firebasegen/pib-connector';

// The `SearchProfilesByBio` query requires an argument of type `SearchProfilesByBioVariables`:
const searchProfilesByBioVars: SearchProfilesByBioVariables = {
  searchText: ..., 
  limit: ..., // optional
};

// Call the `searchProfilesByBioRef()` function to get a reference to the query.
const ref = searchProfilesByBioRef(searchProfilesByBioVars);
// Variables can be defined inline as well.
const ref = searchProfilesByBioRef({ searchText: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchProfilesByBioRef(dataConnect, searchProfilesByBioVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.profiles_bioEmbedding_similarity);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.profiles_bioEmbedding_similarity);
});
```

## SearchBusinessProfilesByDescription
You can execute the `SearchBusinessProfilesByDescription` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
searchBusinessProfilesByDescription(vars: SearchBusinessProfilesByDescriptionVariables): QueryPromise<SearchBusinessProfilesByDescriptionData, SearchBusinessProfilesByDescriptionVariables>;

interface SearchBusinessProfilesByDescriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchBusinessProfilesByDescriptionVariables): QueryRef<SearchBusinessProfilesByDescriptionData, SearchBusinessProfilesByDescriptionVariables>;
}
export const searchBusinessProfilesByDescriptionRef: SearchBusinessProfilesByDescriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchBusinessProfilesByDescription(dc: DataConnect, vars: SearchBusinessProfilesByDescriptionVariables): QueryPromise<SearchBusinessProfilesByDescriptionData, SearchBusinessProfilesByDescriptionVariables>;

interface SearchBusinessProfilesByDescriptionRef {
  ...
  (dc: DataConnect, vars: SearchBusinessProfilesByDescriptionVariables): QueryRef<SearchBusinessProfilesByDescriptionData, SearchBusinessProfilesByDescriptionVariables>;
}
export const searchBusinessProfilesByDescriptionRef: SearchBusinessProfilesByDescriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchBusinessProfilesByDescriptionRef:
```typescript
const name = searchBusinessProfilesByDescriptionRef.operationName;
console.log(name);
```

### Variables
The `SearchBusinessProfilesByDescription` query requires an argument of type `SearchBusinessProfilesByDescriptionVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchBusinessProfilesByDescriptionVariables {
  searchText: string;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `SearchBusinessProfilesByDescription` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchBusinessProfilesByDescriptionData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `SearchBusinessProfilesByDescription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchBusinessProfilesByDescription, SearchBusinessProfilesByDescriptionVariables } from '@firebasegen/pib-connector';

// The `SearchBusinessProfilesByDescription` query requires an argument of type `SearchBusinessProfilesByDescriptionVariables`:
const searchBusinessProfilesByDescriptionVars: SearchBusinessProfilesByDescriptionVariables = {
  searchText: ..., 
  limit: ..., // optional
};

// Call the `searchBusinessProfilesByDescription()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchBusinessProfilesByDescription(searchBusinessProfilesByDescriptionVars);
// Variables can be defined inline as well.
const { data } = await searchBusinessProfilesByDescription({ searchText: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchBusinessProfilesByDescription(dataConnect, searchBusinessProfilesByDescriptionVars);

console.log(data.businessProfiles_descriptionEmbedding_similarity);

// Or, you can use the `Promise` API.
searchBusinessProfilesByDescription(searchBusinessProfilesByDescriptionVars).then((response) => {
  const data = response.data;
  console.log(data.businessProfiles_descriptionEmbedding_similarity);
});
```

### Using `SearchBusinessProfilesByDescription`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchBusinessProfilesByDescriptionRef, SearchBusinessProfilesByDescriptionVariables } from '@firebasegen/pib-connector';

// The `SearchBusinessProfilesByDescription` query requires an argument of type `SearchBusinessProfilesByDescriptionVariables`:
const searchBusinessProfilesByDescriptionVars: SearchBusinessProfilesByDescriptionVariables = {
  searchText: ..., 
  limit: ..., // optional
};

// Call the `searchBusinessProfilesByDescriptionRef()` function to get a reference to the query.
const ref = searchBusinessProfilesByDescriptionRef(searchBusinessProfilesByDescriptionVars);
// Variables can be defined inline as well.
const ref = searchBusinessProfilesByDescriptionRef({ searchText: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchBusinessProfilesByDescriptionRef(dataConnect, searchBusinessProfilesByDescriptionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.businessProfiles_descriptionEmbedding_similarity);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.businessProfiles_descriptionEmbedding_similarity);
});
```

## MatchProfileToBusinesses
You can execute the `MatchProfileToBusinesses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
matchProfileToBusinesses(vars: MatchProfileToBusinessesVariables): QueryPromise<MatchProfileToBusinessesData, MatchProfileToBusinessesVariables>;

interface MatchProfileToBusinessesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MatchProfileToBusinessesVariables): QueryRef<MatchProfileToBusinessesData, MatchProfileToBusinessesVariables>;
}
export const matchProfileToBusinessesRef: MatchProfileToBusinessesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
matchProfileToBusinesses(dc: DataConnect, vars: MatchProfileToBusinessesVariables): QueryPromise<MatchProfileToBusinessesData, MatchProfileToBusinessesVariables>;

interface MatchProfileToBusinessesRef {
  ...
  (dc: DataConnect, vars: MatchProfileToBusinessesVariables): QueryRef<MatchProfileToBusinessesData, MatchProfileToBusinessesVariables>;
}
export const matchProfileToBusinessesRef: MatchProfileToBusinessesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the matchProfileToBusinessesRef:
```typescript
const name = matchProfileToBusinessesRef.operationName;
console.log(name);
```

### Variables
The `MatchProfileToBusinesses` query requires an argument of type `MatchProfileToBusinessesVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MatchProfileToBusinessesVariables {
  profileId: UUIDString;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `MatchProfileToBusinesses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MatchProfileToBusinessesData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MatchProfileToBusinessesData {
  profile?: {
    id: UUIDString;
    name: string;
    bio?: string | null;
  } & Profile_Key;
}
```
### Using `MatchProfileToBusinesses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, matchProfileToBusinesses, MatchProfileToBusinessesVariables } from '@firebasegen/pib-connector';

// The `MatchProfileToBusinesses` query requires an argument of type `MatchProfileToBusinessesVariables`:
const matchProfileToBusinessesVars: MatchProfileToBusinessesVariables = {
  profileId: ..., 
  limit: ..., // optional
};

// Call the `matchProfileToBusinesses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await matchProfileToBusinesses(matchProfileToBusinessesVars);
// Variables can be defined inline as well.
const { data } = await matchProfileToBusinesses({ profileId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await matchProfileToBusinesses(dataConnect, matchProfileToBusinessesVars);

console.log(data.profile);

// Or, you can use the `Promise` API.
matchProfileToBusinesses(matchProfileToBusinessesVars).then((response) => {
  const data = response.data;
  console.log(data.profile);
});
```

### Using `MatchProfileToBusinesses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, matchProfileToBusinessesRef, MatchProfileToBusinessesVariables } from '@firebasegen/pib-connector';

// The `MatchProfileToBusinesses` query requires an argument of type `MatchProfileToBusinessesVariables`:
const matchProfileToBusinessesVars: MatchProfileToBusinessesVariables = {
  profileId: ..., 
  limit: ..., // optional
};

// Call the `matchProfileToBusinessesRef()` function to get a reference to the query.
const ref = matchProfileToBusinessesRef(matchProfileToBusinessesVars);
// Variables can be defined inline as well.
const ref = matchProfileToBusinessesRef({ profileId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = matchProfileToBusinessesRef(dataConnect, matchProfileToBusinessesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.profile);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.profile);
});
```

## MatchBusinessToProfiles
You can execute the `MatchBusinessToProfiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
matchBusinessToProfiles(vars: MatchBusinessToProfilesVariables): QueryPromise<MatchBusinessToProfilesData, MatchBusinessToProfilesVariables>;

interface MatchBusinessToProfilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MatchBusinessToProfilesVariables): QueryRef<MatchBusinessToProfilesData, MatchBusinessToProfilesVariables>;
}
export const matchBusinessToProfilesRef: MatchBusinessToProfilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
matchBusinessToProfiles(dc: DataConnect, vars: MatchBusinessToProfilesVariables): QueryPromise<MatchBusinessToProfilesData, MatchBusinessToProfilesVariables>;

interface MatchBusinessToProfilesRef {
  ...
  (dc: DataConnect, vars: MatchBusinessToProfilesVariables): QueryRef<MatchBusinessToProfilesData, MatchBusinessToProfilesVariables>;
}
export const matchBusinessToProfilesRef: MatchBusinessToProfilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the matchBusinessToProfilesRef:
```typescript
const name = matchBusinessToProfilesRef.operationName;
console.log(name);
```

### Variables
The `MatchBusinessToProfiles` query requires an argument of type `MatchBusinessToProfilesVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MatchBusinessToProfilesVariables {
  businessProfileId: UUIDString;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `MatchBusinessToProfiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MatchBusinessToProfilesData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MatchBusinessToProfilesData {
  businessProfile?: {
    id: UUIDString;
    name: string;
    description?: string | null;
  } & BusinessProfile_Key;
}
```
### Using `MatchBusinessToProfiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, matchBusinessToProfiles, MatchBusinessToProfilesVariables } from '@firebasegen/pib-connector';

// The `MatchBusinessToProfiles` query requires an argument of type `MatchBusinessToProfilesVariables`:
const matchBusinessToProfilesVars: MatchBusinessToProfilesVariables = {
  businessProfileId: ..., 
  limit: ..., // optional
};

// Call the `matchBusinessToProfiles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await matchBusinessToProfiles(matchBusinessToProfilesVars);
// Variables can be defined inline as well.
const { data } = await matchBusinessToProfiles({ businessProfileId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await matchBusinessToProfiles(dataConnect, matchBusinessToProfilesVars);

console.log(data.businessProfile);

// Or, you can use the `Promise` API.
matchBusinessToProfiles(matchBusinessToProfilesVars).then((response) => {
  const data = response.data;
  console.log(data.businessProfile);
});
```

### Using `MatchBusinessToProfiles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, matchBusinessToProfilesRef, MatchBusinessToProfilesVariables } from '@firebasegen/pib-connector';

// The `MatchBusinessToProfiles` query requires an argument of type `MatchBusinessToProfilesVariables`:
const matchBusinessToProfilesVars: MatchBusinessToProfilesVariables = {
  businessProfileId: ..., 
  limit: ..., // optional
};

// Call the `matchBusinessToProfilesRef()` function to get a reference to the query.
const ref = matchBusinessToProfilesRef(matchBusinessToProfilesVars);
// Variables can be defined inline as well.
const ref = matchBusinessToProfilesRef({ businessProfileId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = matchBusinessToProfilesRef(dataConnect, matchBusinessToProfilesVars);

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

## SearchPartnerPreferences
You can execute the `SearchPartnerPreferences` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
searchPartnerPreferences(vars: SearchPartnerPreferencesVariables): QueryPromise<SearchPartnerPreferencesData, SearchPartnerPreferencesVariables>;

interface SearchPartnerPreferencesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchPartnerPreferencesVariables): QueryRef<SearchPartnerPreferencesData, SearchPartnerPreferencesVariables>;
}
export const searchPartnerPreferencesRef: SearchPartnerPreferencesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchPartnerPreferences(dc: DataConnect, vars: SearchPartnerPreferencesVariables): QueryPromise<SearchPartnerPreferencesData, SearchPartnerPreferencesVariables>;

interface SearchPartnerPreferencesRef {
  ...
  (dc: DataConnect, vars: SearchPartnerPreferencesVariables): QueryRef<SearchPartnerPreferencesData, SearchPartnerPreferencesVariables>;
}
export const searchPartnerPreferencesRef: SearchPartnerPreferencesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchPartnerPreferencesRef:
```typescript
const name = searchPartnerPreferencesRef.operationName;
console.log(name);
```

### Variables
The `SearchPartnerPreferences` query requires an argument of type `SearchPartnerPreferencesVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchPartnerPreferencesVariables {
  searchText: string;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `SearchPartnerPreferences` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchPartnerPreferencesData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `SearchPartnerPreferences`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchPartnerPreferences, SearchPartnerPreferencesVariables } from '@firebasegen/pib-connector';

// The `SearchPartnerPreferences` query requires an argument of type `SearchPartnerPreferencesVariables`:
const searchPartnerPreferencesVars: SearchPartnerPreferencesVariables = {
  searchText: ..., 
  limit: ..., // optional
};

// Call the `searchPartnerPreferences()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchPartnerPreferences(searchPartnerPreferencesVars);
// Variables can be defined inline as well.
const { data } = await searchPartnerPreferences({ searchText: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchPartnerPreferences(dataConnect, searchPartnerPreferencesVars);

console.log(data.partnerPreferencess_combinedEmbedding_similarity);

// Or, you can use the `Promise` API.
searchPartnerPreferences(searchPartnerPreferencesVars).then((response) => {
  const data = response.data;
  console.log(data.partnerPreferencess_combinedEmbedding_similarity);
});
```

### Using `SearchPartnerPreferences`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchPartnerPreferencesRef, SearchPartnerPreferencesVariables } from '@firebasegen/pib-connector';

// The `SearchPartnerPreferences` query requires an argument of type `SearchPartnerPreferencesVariables`:
const searchPartnerPreferencesVars: SearchPartnerPreferencesVariables = {
  searchText: ..., 
  limit: ..., // optional
};

// Call the `searchPartnerPreferencesRef()` function to get a reference to the query.
const ref = searchPartnerPreferencesRef(searchPartnerPreferencesVars);
// Variables can be defined inline as well.
const ref = searchPartnerPreferencesRef({ searchText: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchPartnerPreferencesRef(dataConnect, searchPartnerPreferencesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.partnerPreferencess_combinedEmbedding_similarity);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.partnerPreferencess_combinedEmbedding_similarity);
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
getUserWorkspaces(vars: GetUserWorkspacesVariables): QueryPromise<GetUserWorkspacesData, GetUserWorkspacesVariables>;

interface GetUserWorkspacesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserWorkspacesVariables): QueryRef<GetUserWorkspacesData, GetUserWorkspacesVariables>;
}
export const getUserWorkspacesRef: GetUserWorkspacesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserWorkspaces(dc: DataConnect, vars: GetUserWorkspacesVariables): QueryPromise<GetUserWorkspacesData, GetUserWorkspacesVariables>;

interface GetUserWorkspacesRef {
  ...
  (dc: DataConnect, vars: GetUserWorkspacesVariables): QueryRef<GetUserWorkspacesData, GetUserWorkspacesVariables>;
}
export const getUserWorkspacesRef: GetUserWorkspacesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserWorkspacesRef:
```typescript
const name = getUserWorkspacesRef.operationName;
console.log(name);
```

### Variables
The `GetUserWorkspaces` query requires an argument of type `GetUserWorkspacesVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserWorkspacesVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetUserWorkspaces` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserWorkspacesData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserWorkspaces`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserWorkspaces, GetUserWorkspacesVariables } from '@firebasegen/pib-connector';

// The `GetUserWorkspaces` query requires an argument of type `GetUserWorkspacesVariables`:
const getUserWorkspacesVars: GetUserWorkspacesVariables = {
  userId: ..., 
};

// Call the `getUserWorkspaces()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserWorkspaces(getUserWorkspacesVars);
// Variables can be defined inline as well.
const { data } = await getUserWorkspaces({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserWorkspaces(dataConnect, getUserWorkspacesVars);

console.log(data.workspaceUsers);

// Or, you can use the `Promise` API.
getUserWorkspaces(getUserWorkspacesVars).then((response) => {
  const data = response.data;
  console.log(data.workspaceUsers);
});
```

### Using `GetUserWorkspaces`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserWorkspacesRef, GetUserWorkspacesVariables } from '@firebasegen/pib-connector';

// The `GetUserWorkspaces` query requires an argument of type `GetUserWorkspacesVariables`:
const getUserWorkspacesVars: GetUserWorkspacesVariables = {
  userId: ..., 
};

// Call the `getUserWorkspacesRef()` function to get a reference to the query.
const ref = getUserWorkspacesRef(getUserWorkspacesVars);
// Variables can be defined inline as well.
const ref = getUserWorkspacesRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserWorkspacesRef(dataConnect, getUserWorkspacesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workspaceUsers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workspaceUsers);
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
    role: string;
    joinedAt: TimestampString;
    userId: string;
    profileId?: UUIDString | null;
  })[];
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

## GetPendingInvitations
You can execute the `GetPendingInvitations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
getPendingInvitations(vars: GetPendingInvitationsVariables): QueryPromise<GetPendingInvitationsData, GetPendingInvitationsVariables>;

interface GetPendingInvitationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPendingInvitationsVariables): QueryRef<GetPendingInvitationsData, GetPendingInvitationsVariables>;
}
export const getPendingInvitationsRef: GetPendingInvitationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPendingInvitations(dc: DataConnect, vars: GetPendingInvitationsVariables): QueryPromise<GetPendingInvitationsData, GetPendingInvitationsVariables>;

interface GetPendingInvitationsRef {
  ...
  (dc: DataConnect, vars: GetPendingInvitationsVariables): QueryRef<GetPendingInvitationsData, GetPendingInvitationsVariables>;
}
export const getPendingInvitationsRef: GetPendingInvitationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPendingInvitationsRef:
```typescript
const name = getPendingInvitationsRef.operationName;
console.log(name);
```

### Variables
The `GetPendingInvitations` query requires an argument of type `GetPendingInvitationsVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPendingInvitationsVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetPendingInvitations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPendingInvitationsData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPendingInvitations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPendingInvitations, GetPendingInvitationsVariables } from '@firebasegen/pib-connector';

// The `GetPendingInvitations` query requires an argument of type `GetPendingInvitationsVariables`:
const getPendingInvitationsVars: GetPendingInvitationsVariables = {
  email: ..., 
};

// Call the `getPendingInvitations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPendingInvitations(getPendingInvitationsVars);
// Variables can be defined inline as well.
const { data } = await getPendingInvitations({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPendingInvitations(dataConnect, getPendingInvitationsVars);

console.log(data.workspaceInvitations);

// Or, you can use the `Promise` API.
getPendingInvitations(getPendingInvitationsVars).then((response) => {
  const data = response.data;
  console.log(data.workspaceInvitations);
});
```

### Using `GetPendingInvitations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPendingInvitationsRef, GetPendingInvitationsVariables } from '@firebasegen/pib-connector';

// The `GetPendingInvitations` query requires an argument of type `GetPendingInvitationsVariables`:
const getPendingInvitationsVars: GetPendingInvitationsVariables = {
  email: ..., 
};

// Call the `getPendingInvitationsRef()` function to get a reference to the query.
const ref = getPendingInvitationsRef(getPendingInvitationsVars);
// Variables can be defined inline as well.
const ref = getPendingInvitationsRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPendingInvitationsRef(dataConnect, getPendingInvitationsVars);

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

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  email: string;
  displayName?: string | null;
  photoUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  createUser: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@firebasegen/pib-connector';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  displayName: ..., // optional
  photoUrl: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ email: ..., displayName: ..., photoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.createUser);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.createUser);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@firebasegen/pib-connector';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  displayName: ..., // optional
  photoUrl: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ email: ..., displayName: ..., photoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.createUser);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.createUser);
});
```

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

## CreateProfileWithBio
You can execute the `CreateProfileWithBio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
createProfileWithBio(vars: CreateProfileWithBioVariables): MutationPromise<CreateProfileWithBioData, CreateProfileWithBioVariables>;

interface CreateProfileWithBioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProfileWithBioVariables): MutationRef<CreateProfileWithBioData, CreateProfileWithBioVariables>;
}
export const createProfileWithBioRef: CreateProfileWithBioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProfileWithBio(dc: DataConnect, vars: CreateProfileWithBioVariables): MutationPromise<CreateProfileWithBioData, CreateProfileWithBioVariables>;

interface CreateProfileWithBioRef {
  ...
  (dc: DataConnect, vars: CreateProfileWithBioVariables): MutationRef<CreateProfileWithBioData, CreateProfileWithBioVariables>;
}
export const createProfileWithBioRef: CreateProfileWithBioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProfileWithBioRef:
```typescript
const name = createProfileWithBioRef.operationName;
console.log(name);
```

### Variables
The `CreateProfileWithBio` mutation requires an argument of type `CreateProfileWithBioVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProfileWithBioVariables {
  name: string;
  bio: string;
  avatarUrl?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
  isDefault?: boolean | null;
}
```
### Return Type
Recall that executing the `CreateProfileWithBio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProfileWithBioData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProfileWithBioData {
  createProfile: Profile_Key;
}
```
### Using `CreateProfileWithBio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProfileWithBio, CreateProfileWithBioVariables } from '@firebasegen/pib-connector';

// The `CreateProfileWithBio` mutation requires an argument of type `CreateProfileWithBioVariables`:
const createProfileWithBioVars: CreateProfileWithBioVariables = {
  name: ..., 
  bio: ..., 
  avatarUrl: ..., // optional
  skills: ..., // optional
  interests: ..., // optional
  isDefault: ..., // optional
};

// Call the `createProfileWithBio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProfileWithBio(createProfileWithBioVars);
// Variables can be defined inline as well.
const { data } = await createProfileWithBio({ name: ..., bio: ..., avatarUrl: ..., skills: ..., interests: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProfileWithBio(dataConnect, createProfileWithBioVars);

console.log(data.createProfile);

// Or, you can use the `Promise` API.
createProfileWithBio(createProfileWithBioVars).then((response) => {
  const data = response.data;
  console.log(data.createProfile);
});
```

### Using `CreateProfileWithBio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProfileWithBioRef, CreateProfileWithBioVariables } from '@firebasegen/pib-connector';

// The `CreateProfileWithBio` mutation requires an argument of type `CreateProfileWithBioVariables`:
const createProfileWithBioVars: CreateProfileWithBioVariables = {
  name: ..., 
  bio: ..., 
  avatarUrl: ..., // optional
  skills: ..., // optional
  interests: ..., // optional
  isDefault: ..., // optional
};

// Call the `createProfileWithBioRef()` function to get a reference to the mutation.
const ref = createProfileWithBioRef(createProfileWithBioVars);
// Variables can be defined inline as well.
const ref = createProfileWithBioRef({ name: ..., bio: ..., avatarUrl: ..., skills: ..., interests: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProfileWithBioRef(dataConnect, createProfileWithBioVars);

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

## UpdateProfileWithBio
You can execute the `UpdateProfileWithBio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
updateProfileWithBio(vars: UpdateProfileWithBioVariables): MutationPromise<UpdateProfileWithBioData, UpdateProfileWithBioVariables>;

interface UpdateProfileWithBioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProfileWithBioVariables): MutationRef<UpdateProfileWithBioData, UpdateProfileWithBioVariables>;
}
export const updateProfileWithBioRef: UpdateProfileWithBioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProfileWithBio(dc: DataConnect, vars: UpdateProfileWithBioVariables): MutationPromise<UpdateProfileWithBioData, UpdateProfileWithBioVariables>;

interface UpdateProfileWithBioRef {
  ...
  (dc: DataConnect, vars: UpdateProfileWithBioVariables): MutationRef<UpdateProfileWithBioData, UpdateProfileWithBioVariables>;
}
export const updateProfileWithBioRef: UpdateProfileWithBioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProfileWithBioRef:
```typescript
const name = updateProfileWithBioRef.operationName;
console.log(name);
```

### Variables
The `UpdateProfileWithBio` mutation requires an argument of type `UpdateProfileWithBioVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProfileWithBioVariables {
  id: UUIDString;
  name?: string | null;
  bio: string;
  avatarUrl?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
  isDefault?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdateProfileWithBio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProfileWithBioData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProfileWithBioData {
  updateProfile?: Profile_Key | null;
}
```
### Using `UpdateProfileWithBio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProfileWithBio, UpdateProfileWithBioVariables } from '@firebasegen/pib-connector';

// The `UpdateProfileWithBio` mutation requires an argument of type `UpdateProfileWithBioVariables`:
const updateProfileWithBioVars: UpdateProfileWithBioVariables = {
  id: ..., 
  name: ..., // optional
  bio: ..., 
  avatarUrl: ..., // optional
  skills: ..., // optional
  interests: ..., // optional
  isDefault: ..., // optional
};

// Call the `updateProfileWithBio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProfileWithBio(updateProfileWithBioVars);
// Variables can be defined inline as well.
const { data } = await updateProfileWithBio({ id: ..., name: ..., bio: ..., avatarUrl: ..., skills: ..., interests: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProfileWithBio(dataConnect, updateProfileWithBioVars);

console.log(data.updateProfile);

// Or, you can use the `Promise` API.
updateProfileWithBio(updateProfileWithBioVars).then((response) => {
  const data = response.data;
  console.log(data.updateProfile);
});
```

### Using `UpdateProfileWithBio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProfileWithBioRef, UpdateProfileWithBioVariables } from '@firebasegen/pib-connector';

// The `UpdateProfileWithBio` mutation requires an argument of type `UpdateProfileWithBioVariables`:
const updateProfileWithBioVars: UpdateProfileWithBioVariables = {
  id: ..., 
  name: ..., // optional
  bio: ..., 
  avatarUrl: ..., // optional
  skills: ..., // optional
  interests: ..., // optional
  isDefault: ..., // optional
};

// Call the `updateProfileWithBioRef()` function to get a reference to the mutation.
const ref = updateProfileWithBioRef(updateProfileWithBioVars);
// Variables can be defined inline as well.
const ref = updateProfileWithBioRef({ id: ..., name: ..., bio: ..., avatarUrl: ..., skills: ..., interests: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProfileWithBioRef(dataConnect, updateProfileWithBioVars);

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

## JoinWorkspaceUser
You can execute the `JoinWorkspaceUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
joinWorkspaceUser(vars: JoinWorkspaceUserVariables): MutationPromise<JoinWorkspaceUserData, JoinWorkspaceUserVariables>;

interface JoinWorkspaceUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: JoinWorkspaceUserVariables): MutationRef<JoinWorkspaceUserData, JoinWorkspaceUserVariables>;
}
export const joinWorkspaceUserRef: JoinWorkspaceUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
joinWorkspaceUser(dc: DataConnect, vars: JoinWorkspaceUserVariables): MutationPromise<JoinWorkspaceUserData, JoinWorkspaceUserVariables>;

interface JoinWorkspaceUserRef {
  ...
  (dc: DataConnect, vars: JoinWorkspaceUserVariables): MutationRef<JoinWorkspaceUserData, JoinWorkspaceUserVariables>;
}
export const joinWorkspaceUserRef: JoinWorkspaceUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the joinWorkspaceUserRef:
```typescript
const name = joinWorkspaceUserRef.operationName;
console.log(name);
```

### Variables
The `JoinWorkspaceUser` mutation requires an argument of type `JoinWorkspaceUserVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface JoinWorkspaceUserVariables {
  workspaceId: UUIDString;
  userId: string;
  role: string;
}
```
### Return Type
Recall that executing the `JoinWorkspaceUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `JoinWorkspaceUserData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface JoinWorkspaceUserData {
  createWorkspaceUser: WorkspaceUser_Key;
}
```
### Using `JoinWorkspaceUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, joinWorkspaceUser, JoinWorkspaceUserVariables } from '@firebasegen/pib-connector';

// The `JoinWorkspaceUser` mutation requires an argument of type `JoinWorkspaceUserVariables`:
const joinWorkspaceUserVars: JoinWorkspaceUserVariables = {
  workspaceId: ..., 
  userId: ..., 
  role: ..., 
};

// Call the `joinWorkspaceUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await joinWorkspaceUser(joinWorkspaceUserVars);
// Variables can be defined inline as well.
const { data } = await joinWorkspaceUser({ workspaceId: ..., userId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await joinWorkspaceUser(dataConnect, joinWorkspaceUserVars);

console.log(data.createWorkspaceUser);

// Or, you can use the `Promise` API.
joinWorkspaceUser(joinWorkspaceUserVars).then((response) => {
  const data = response.data;
  console.log(data.createWorkspaceUser);
});
```

### Using `JoinWorkspaceUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, joinWorkspaceUserRef, JoinWorkspaceUserVariables } from '@firebasegen/pib-connector';

// The `JoinWorkspaceUser` mutation requires an argument of type `JoinWorkspaceUserVariables`:
const joinWorkspaceUserVars: JoinWorkspaceUserVariables = {
  workspaceId: ..., 
  userId: ..., 
  role: ..., 
};

// Call the `joinWorkspaceUserRef()` function to get a reference to the mutation.
const ref = joinWorkspaceUserRef(joinWorkspaceUserVars);
// Variables can be defined inline as well.
const ref = joinWorkspaceUserRef({ workspaceId: ..., userId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = joinWorkspaceUserRef(dataConnect, joinWorkspaceUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.createWorkspaceUser);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.createWorkspaceUser);
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

## CreateBusinessProfileWithDescription
You can execute the `CreateBusinessProfileWithDescription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
createBusinessProfileWithDescription(vars: CreateBusinessProfileWithDescriptionVariables): MutationPromise<CreateBusinessProfileWithDescriptionData, CreateBusinessProfileWithDescriptionVariables>;

interface CreateBusinessProfileWithDescriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBusinessProfileWithDescriptionVariables): MutationRef<CreateBusinessProfileWithDescriptionData, CreateBusinessProfileWithDescriptionVariables>;
}
export const createBusinessProfileWithDescriptionRef: CreateBusinessProfileWithDescriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBusinessProfileWithDescription(dc: DataConnect, vars: CreateBusinessProfileWithDescriptionVariables): MutationPromise<CreateBusinessProfileWithDescriptionData, CreateBusinessProfileWithDescriptionVariables>;

interface CreateBusinessProfileWithDescriptionRef {
  ...
  (dc: DataConnect, vars: CreateBusinessProfileWithDescriptionVariables): MutationRef<CreateBusinessProfileWithDescriptionData, CreateBusinessProfileWithDescriptionVariables>;
}
export const createBusinessProfileWithDescriptionRef: CreateBusinessProfileWithDescriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBusinessProfileWithDescriptionRef:
```typescript
const name = createBusinessProfileWithDescriptionRef.operationName;
console.log(name);
```

### Variables
The `CreateBusinessProfileWithDescription` mutation requires an argument of type `CreateBusinessProfileWithDescriptionVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateBusinessProfileWithDescriptionVariables {
  workspaceId: UUIDString;
  name: string;
  industry?: string | null;
  description: string;
  location?: string | null;
  website?: string | null;
  employeeCount?: number | null;
}
```
### Return Type
Recall that executing the `CreateBusinessProfileWithDescription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBusinessProfileWithDescriptionData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBusinessProfileWithDescriptionData {
  createBusinessProfile: BusinessProfile_Key;
}
```
### Using `CreateBusinessProfileWithDescription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBusinessProfileWithDescription, CreateBusinessProfileWithDescriptionVariables } from '@firebasegen/pib-connector';

// The `CreateBusinessProfileWithDescription` mutation requires an argument of type `CreateBusinessProfileWithDescriptionVariables`:
const createBusinessProfileWithDescriptionVars: CreateBusinessProfileWithDescriptionVariables = {
  workspaceId: ..., 
  name: ..., 
  industry: ..., // optional
  description: ..., 
  location: ..., // optional
  website: ..., // optional
  employeeCount: ..., // optional
};

// Call the `createBusinessProfileWithDescription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBusinessProfileWithDescription(createBusinessProfileWithDescriptionVars);
// Variables can be defined inline as well.
const { data } = await createBusinessProfileWithDescription({ workspaceId: ..., name: ..., industry: ..., description: ..., location: ..., website: ..., employeeCount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBusinessProfileWithDescription(dataConnect, createBusinessProfileWithDescriptionVars);

console.log(data.createBusinessProfile);

// Or, you can use the `Promise` API.
createBusinessProfileWithDescription(createBusinessProfileWithDescriptionVars).then((response) => {
  const data = response.data;
  console.log(data.createBusinessProfile);
});
```

### Using `CreateBusinessProfileWithDescription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBusinessProfileWithDescriptionRef, CreateBusinessProfileWithDescriptionVariables } from '@firebasegen/pib-connector';

// The `CreateBusinessProfileWithDescription` mutation requires an argument of type `CreateBusinessProfileWithDescriptionVariables`:
const createBusinessProfileWithDescriptionVars: CreateBusinessProfileWithDescriptionVariables = {
  workspaceId: ..., 
  name: ..., 
  industry: ..., // optional
  description: ..., 
  location: ..., // optional
  website: ..., // optional
  employeeCount: ..., // optional
};

// Call the `createBusinessProfileWithDescriptionRef()` function to get a reference to the mutation.
const ref = createBusinessProfileWithDescriptionRef(createBusinessProfileWithDescriptionVars);
// Variables can be defined inline as well.
const ref = createBusinessProfileWithDescriptionRef({ workspaceId: ..., name: ..., industry: ..., description: ..., location: ..., website: ..., employeeCount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBusinessProfileWithDescriptionRef(dataConnect, createBusinessProfileWithDescriptionVars);

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

## UpdateBusinessProfileWithDescription
You can execute the `UpdateBusinessProfileWithDescription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
updateBusinessProfileWithDescription(vars: UpdateBusinessProfileWithDescriptionVariables): MutationPromise<UpdateBusinessProfileWithDescriptionData, UpdateBusinessProfileWithDescriptionVariables>;

interface UpdateBusinessProfileWithDescriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBusinessProfileWithDescriptionVariables): MutationRef<UpdateBusinessProfileWithDescriptionData, UpdateBusinessProfileWithDescriptionVariables>;
}
export const updateBusinessProfileWithDescriptionRef: UpdateBusinessProfileWithDescriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateBusinessProfileWithDescription(dc: DataConnect, vars: UpdateBusinessProfileWithDescriptionVariables): MutationPromise<UpdateBusinessProfileWithDescriptionData, UpdateBusinessProfileWithDescriptionVariables>;

interface UpdateBusinessProfileWithDescriptionRef {
  ...
  (dc: DataConnect, vars: UpdateBusinessProfileWithDescriptionVariables): MutationRef<UpdateBusinessProfileWithDescriptionData, UpdateBusinessProfileWithDescriptionVariables>;
}
export const updateBusinessProfileWithDescriptionRef: UpdateBusinessProfileWithDescriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateBusinessProfileWithDescriptionRef:
```typescript
const name = updateBusinessProfileWithDescriptionRef.operationName;
console.log(name);
```

### Variables
The `UpdateBusinessProfileWithDescription` mutation requires an argument of type `UpdateBusinessProfileWithDescriptionVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateBusinessProfileWithDescriptionVariables {
  id: UUIDString;
  name?: string | null;
  industry?: string | null;
  description: string;
  location?: string | null;
  website?: string | null;
  employeeCount?: number | null;
}
```
### Return Type
Recall that executing the `UpdateBusinessProfileWithDescription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateBusinessProfileWithDescriptionData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateBusinessProfileWithDescriptionData {
  updateBusinessProfile?: BusinessProfile_Key | null;
}
```
### Using `UpdateBusinessProfileWithDescription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateBusinessProfileWithDescription, UpdateBusinessProfileWithDescriptionVariables } from '@firebasegen/pib-connector';

// The `UpdateBusinessProfileWithDescription` mutation requires an argument of type `UpdateBusinessProfileWithDescriptionVariables`:
const updateBusinessProfileWithDescriptionVars: UpdateBusinessProfileWithDescriptionVariables = {
  id: ..., 
  name: ..., // optional
  industry: ..., // optional
  description: ..., 
  location: ..., // optional
  website: ..., // optional
  employeeCount: ..., // optional
};

// Call the `updateBusinessProfileWithDescription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateBusinessProfileWithDescription(updateBusinessProfileWithDescriptionVars);
// Variables can be defined inline as well.
const { data } = await updateBusinessProfileWithDescription({ id: ..., name: ..., industry: ..., description: ..., location: ..., website: ..., employeeCount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateBusinessProfileWithDescription(dataConnect, updateBusinessProfileWithDescriptionVars);

console.log(data.updateBusinessProfile);

// Or, you can use the `Promise` API.
updateBusinessProfileWithDescription(updateBusinessProfileWithDescriptionVars).then((response) => {
  const data = response.data;
  console.log(data.updateBusinessProfile);
});
```

### Using `UpdateBusinessProfileWithDescription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateBusinessProfileWithDescriptionRef, UpdateBusinessProfileWithDescriptionVariables } from '@firebasegen/pib-connector';

// The `UpdateBusinessProfileWithDescription` mutation requires an argument of type `UpdateBusinessProfileWithDescriptionVariables`:
const updateBusinessProfileWithDescriptionVars: UpdateBusinessProfileWithDescriptionVariables = {
  id: ..., 
  name: ..., // optional
  industry: ..., // optional
  description: ..., 
  location: ..., // optional
  website: ..., // optional
  employeeCount: ..., // optional
};

// Call the `updateBusinessProfileWithDescriptionRef()` function to get a reference to the mutation.
const ref = updateBusinessProfileWithDescriptionRef(updateBusinessProfileWithDescriptionVars);
// Variables can be defined inline as well.
const ref = updateBusinessProfileWithDescriptionRef({ id: ..., name: ..., industry: ..., description: ..., location: ..., website: ..., employeeCount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateBusinessProfileWithDescriptionRef(dataConnect, updateBusinessProfileWithDescriptionVars);

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

## CreatePartnerPreferencesWithEmbedding
You can execute the `CreatePartnerPreferencesWithEmbedding` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
createPartnerPreferencesWithEmbedding(vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationPromise<CreatePartnerPreferencesWithEmbeddingData, CreatePartnerPreferencesWithEmbeddingVariables>;

interface CreatePartnerPreferencesWithEmbeddingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationRef<CreatePartnerPreferencesWithEmbeddingData, CreatePartnerPreferencesWithEmbeddingVariables>;
}
export const createPartnerPreferencesWithEmbeddingRef: CreatePartnerPreferencesWithEmbeddingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPartnerPreferencesWithEmbedding(dc: DataConnect, vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationPromise<CreatePartnerPreferencesWithEmbeddingData, CreatePartnerPreferencesWithEmbeddingVariables>;

interface CreatePartnerPreferencesWithEmbeddingRef {
  ...
  (dc: DataConnect, vars: CreatePartnerPreferencesWithEmbeddingVariables): MutationRef<CreatePartnerPreferencesWithEmbeddingData, CreatePartnerPreferencesWithEmbeddingVariables>;
}
export const createPartnerPreferencesWithEmbeddingRef: CreatePartnerPreferencesWithEmbeddingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPartnerPreferencesWithEmbeddingRef:
```typescript
const name = createPartnerPreferencesWithEmbeddingRef.operationName;
console.log(name);
```

### Variables
The `CreatePartnerPreferencesWithEmbedding` mutation requires an argument of type `CreatePartnerPreferencesWithEmbeddingVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePartnerPreferencesWithEmbeddingVariables {
  workspaceId: UUIDString;
  industries?: string[] | null;
  locations?: string[] | null;
  minEmployeeCount?: number | null;
  maxEmployeeCount?: number | null;
  skillsNeeded?: string[] | null;
  combinedText: string;
}
```
### Return Type
Recall that executing the `CreatePartnerPreferencesWithEmbedding` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePartnerPreferencesWithEmbeddingData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePartnerPreferencesWithEmbeddingData {
  createPartnerPreferences: PartnerPreferences_Key;
}
```
### Using `CreatePartnerPreferencesWithEmbedding`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPartnerPreferencesWithEmbedding, CreatePartnerPreferencesWithEmbeddingVariables } from '@firebasegen/pib-connector';

// The `CreatePartnerPreferencesWithEmbedding` mutation requires an argument of type `CreatePartnerPreferencesWithEmbeddingVariables`:
const createPartnerPreferencesWithEmbeddingVars: CreatePartnerPreferencesWithEmbeddingVariables = {
  workspaceId: ..., 
  industries: ..., // optional
  locations: ..., // optional
  minEmployeeCount: ..., // optional
  maxEmployeeCount: ..., // optional
  skillsNeeded: ..., // optional
  combinedText: ..., 
};

// Call the `createPartnerPreferencesWithEmbedding()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPartnerPreferencesWithEmbedding(createPartnerPreferencesWithEmbeddingVars);
// Variables can be defined inline as well.
const { data } = await createPartnerPreferencesWithEmbedding({ workspaceId: ..., industries: ..., locations: ..., minEmployeeCount: ..., maxEmployeeCount: ..., skillsNeeded: ..., combinedText: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPartnerPreferencesWithEmbedding(dataConnect, createPartnerPreferencesWithEmbeddingVars);

console.log(data.createPartnerPreferences);

// Or, you can use the `Promise` API.
createPartnerPreferencesWithEmbedding(createPartnerPreferencesWithEmbeddingVars).then((response) => {
  const data = response.data;
  console.log(data.createPartnerPreferences);
});
```

### Using `CreatePartnerPreferencesWithEmbedding`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPartnerPreferencesWithEmbeddingRef, CreatePartnerPreferencesWithEmbeddingVariables } from '@firebasegen/pib-connector';

// The `CreatePartnerPreferencesWithEmbedding` mutation requires an argument of type `CreatePartnerPreferencesWithEmbeddingVariables`:
const createPartnerPreferencesWithEmbeddingVars: CreatePartnerPreferencesWithEmbeddingVariables = {
  workspaceId: ..., 
  industries: ..., // optional
  locations: ..., // optional
  minEmployeeCount: ..., // optional
  maxEmployeeCount: ..., // optional
  skillsNeeded: ..., // optional
  combinedText: ..., 
};

// Call the `createPartnerPreferencesWithEmbeddingRef()` function to get a reference to the mutation.
const ref = createPartnerPreferencesWithEmbeddingRef(createPartnerPreferencesWithEmbeddingVars);
// Variables can be defined inline as well.
const ref = createPartnerPreferencesWithEmbeddingRef({ workspaceId: ..., industries: ..., locations: ..., minEmployeeCount: ..., maxEmployeeCount: ..., skillsNeeded: ..., combinedText: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPartnerPreferencesWithEmbeddingRef(dataConnect, createPartnerPreferencesWithEmbeddingVars);

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

## UpdatePartnerPreferencesWithEmbedding
You can execute the `UpdatePartnerPreferencesWithEmbedding` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [pib-connector/index.d.ts](./index.d.ts):
```typescript
updatePartnerPreferencesWithEmbedding(vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationPromise<UpdatePartnerPreferencesWithEmbeddingData, UpdatePartnerPreferencesWithEmbeddingVariables>;

interface UpdatePartnerPreferencesWithEmbeddingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationRef<UpdatePartnerPreferencesWithEmbeddingData, UpdatePartnerPreferencesWithEmbeddingVariables>;
}
export const updatePartnerPreferencesWithEmbeddingRef: UpdatePartnerPreferencesWithEmbeddingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePartnerPreferencesWithEmbedding(dc: DataConnect, vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationPromise<UpdatePartnerPreferencesWithEmbeddingData, UpdatePartnerPreferencesWithEmbeddingVariables>;

interface UpdatePartnerPreferencesWithEmbeddingRef {
  ...
  (dc: DataConnect, vars: UpdatePartnerPreferencesWithEmbeddingVariables): MutationRef<UpdatePartnerPreferencesWithEmbeddingData, UpdatePartnerPreferencesWithEmbeddingVariables>;
}
export const updatePartnerPreferencesWithEmbeddingRef: UpdatePartnerPreferencesWithEmbeddingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePartnerPreferencesWithEmbeddingRef:
```typescript
const name = updatePartnerPreferencesWithEmbeddingRef.operationName;
console.log(name);
```

### Variables
The `UpdatePartnerPreferencesWithEmbedding` mutation requires an argument of type `UpdatePartnerPreferencesWithEmbeddingVariables`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePartnerPreferencesWithEmbeddingVariables {
  id: UUIDString;
  industries?: string[] | null;
  locations?: string[] | null;
  minEmployeeCount?: number | null;
  maxEmployeeCount?: number | null;
  skillsNeeded?: string[] | null;
  combinedText: string;
}
```
### Return Type
Recall that executing the `UpdatePartnerPreferencesWithEmbedding` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePartnerPreferencesWithEmbeddingData`, which is defined in [pib-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePartnerPreferencesWithEmbeddingData {
  updatePartnerPreferences?: PartnerPreferences_Key | null;
}
```
### Using `UpdatePartnerPreferencesWithEmbedding`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePartnerPreferencesWithEmbedding, UpdatePartnerPreferencesWithEmbeddingVariables } from '@firebasegen/pib-connector';

// The `UpdatePartnerPreferencesWithEmbedding` mutation requires an argument of type `UpdatePartnerPreferencesWithEmbeddingVariables`:
const updatePartnerPreferencesWithEmbeddingVars: UpdatePartnerPreferencesWithEmbeddingVariables = {
  id: ..., 
  industries: ..., // optional
  locations: ..., // optional
  minEmployeeCount: ..., // optional
  maxEmployeeCount: ..., // optional
  skillsNeeded: ..., // optional
  combinedText: ..., 
};

// Call the `updatePartnerPreferencesWithEmbedding()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePartnerPreferencesWithEmbedding(updatePartnerPreferencesWithEmbeddingVars);
// Variables can be defined inline as well.
const { data } = await updatePartnerPreferencesWithEmbedding({ id: ..., industries: ..., locations: ..., minEmployeeCount: ..., maxEmployeeCount: ..., skillsNeeded: ..., combinedText: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePartnerPreferencesWithEmbedding(dataConnect, updatePartnerPreferencesWithEmbeddingVars);

console.log(data.updatePartnerPreferences);

// Or, you can use the `Promise` API.
updatePartnerPreferencesWithEmbedding(updatePartnerPreferencesWithEmbeddingVars).then((response) => {
  const data = response.data;
  console.log(data.updatePartnerPreferences);
});
```

### Using `UpdatePartnerPreferencesWithEmbedding`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePartnerPreferencesWithEmbeddingRef, UpdatePartnerPreferencesWithEmbeddingVariables } from '@firebasegen/pib-connector';

// The `UpdatePartnerPreferencesWithEmbedding` mutation requires an argument of type `UpdatePartnerPreferencesWithEmbeddingVariables`:
const updatePartnerPreferencesWithEmbeddingVars: UpdatePartnerPreferencesWithEmbeddingVariables = {
  id: ..., 
  industries: ..., // optional
  locations: ..., // optional
  minEmployeeCount: ..., // optional
  maxEmployeeCount: ..., // optional
  skillsNeeded: ..., // optional
  combinedText: ..., 
};

// Call the `updatePartnerPreferencesWithEmbeddingRef()` function to get a reference to the mutation.
const ref = updatePartnerPreferencesWithEmbeddingRef(updatePartnerPreferencesWithEmbeddingVars);
// Variables can be defined inline as well.
const ref = updatePartnerPreferencesWithEmbeddingRef({ id: ..., industries: ..., locations: ..., minEmployeeCount: ..., maxEmployeeCount: ..., skillsNeeded: ..., combinedText: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePartnerPreferencesWithEmbeddingRef(dataConnect, updatePartnerPreferencesWithEmbeddingVars);

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

