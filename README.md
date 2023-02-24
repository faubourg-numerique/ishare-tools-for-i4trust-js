# iShare Tools For i4Trust JS

This repository is a javascript library designed to manage [iShare](https://dev.ishare.eu/index.html) compliant tokens and requests.<br>
It has been developped by FIWARE iHub / DIH Faubourg Numérique, in the context of the CO2-Mute experimentation, supported by the H2020 project [i4Trust](https://i4trust.org/).

## Getting Started

### Installation

Install the library

```
npm install git+https://github.com/faubourg-numerique/ishare-tools-for-i4trust-js
```

Include the library in your project

```js
const iShareToolsForI4Trust = require("ishare-tools-for-i4trust");
```

## Usage

### Generate iShare JWT

```js
const iShareJWT = iShareToolsForI4Trust.generateIShareJWT(config);
```

Structure of the **config** object:

| Name       | Type         | Example                                                     |
|------------|--------------|-------------------------------------------------------------|
| issuer     | string       | EU.EORI.FR00000000000000                                    |
| subject    | string       | EU.EORI.FR00000000000000                                    |
| audience   | string/array | EU.EORI.FR00000000000000                                    |
| x5c        | array        | ["...", "...", "..."]                                       |
| privateKey | string       | -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY----- |


### Get access token

```js
const accessToken = await iShareToolsForI4Trust.getAccessToken(config);
```

Structure of the **config** object:

| Name       | Type   | Example                      |
|------------|--------|------------------------------|
| arTokenURL | string | https://example/oauth2/token |
| clientId   | string | EU.EORI.FR00000000000000     |
| iShareJWT  | string | ...                          |

### Get delegation token

```js
const delegationToken = await iShareToolsForI4Trust.getDelegationToken(config);
```

Structure of the **config** object:

| Name              | Type   | Example                           |
|-------------------|--------|-----------------------------------|
| arDelegationURL   | string | https://example.com/ar/delegation |
| delegationRequest | object | { delegationRequest: ... }        |
| accessToken       | string | ...                               |

<hr>

### Create policy

```js
await iShareToolsForI4Trust.createPolicy(config);
```

Structure of the **config** object:

| Name               | Type   | Example                       |
|--------------------|--------|-------------------------------|
| arPolicyURL        | string | https://example.com/ar/policy |
| delegationEvidence | object | { delegationEvidence: ... }   |
| accessToken        | string | ...                           |

### Decode JWT

```js
const decodedJWT = iShareToolsForI4Trust.decodeJWT(encodedJWT);
```
