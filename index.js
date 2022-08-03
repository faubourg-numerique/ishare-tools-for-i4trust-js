const axios = require("axios").default;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.generateIShareJWT = function(config = {}) {
    const date = new Date();
    const time = Math.floor(date.getTime() / 1000);

    const header = {
        alg: "RS256",
        typ: "JWT",
        x5c: config.x5c
    };

    const payload = {
        iss: config.issuer,
        sub: config.subject,
        aud: config.audience,
        iat: time,
        exp: time + 30,
        jti: uuidv4()
    };

    const options = {
        algorithm: "RS256",
        header: header
    };

    return jwt.sign(payload, config.privateKey, options);
};

exports.getAccessToken = async function(config = {}) {
    const url = config.arTokenURL;
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    const options = {
        headers: headers
    };
    var data = {
        grant_type: "client_credentials",
        scope: "iSHARE",
        client_id: config.clientId,
        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: config.iShareJWT
    };
    data = new URLSearchParams(data).toString();

    const response = await axios.post(url, data, options);
    return response.data.access_token;
};

exports.getDelegationToken = async function(config = {}) {
    const url = config.arDelegationURL;
    const headers = {
        "Authorization": `Bearer ${config.accessToken}`,
        "Content-Type": "application/json"
    };
    const options = {
        headers: headers
    };
    const data = config.delegationRequest;

    const response = await axios.post(url, data, options);
    return response.data.delegation_token;
};

exports.createPolicy = async function(config = {}) {
    const url = config.arPolicyURL;
    const headers = {
        "Authorization": `Bearer ${config.accessToken}`,
        "Content-Type": "application/json"
    };
    const options = {
        headers: headers
    };
    const data = config.delegationEvidence;

    await axios.post(url, data, options);
};

exports.decodeJWT = function(encodedJWT) {
    return jwt.decode(encodedJWT);
};
