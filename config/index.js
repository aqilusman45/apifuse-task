require("dotenv").config();

const {
  SF_CLIENT_ID,
  SF_CLIENT_SECRET,
  SF_SECURITY_TOKEN,
  SF_USERNAME,
  SF_PASSWORD,
  SF_ORG,
  QB_CLIENT_ID,
  QB_CLIENT_SECRET,
  QB_REALM_ID,
  QB_AUTH_CODE,
} = process.env;

module.exports = {
  salesforce: {
    clientID: SF_CLIENT_ID,
    clientSecret: SF_CLIENT_SECRET,
    securityToken: SF_SECURITY_TOKEN,
    username: SF_USERNAME,
    password: SF_PASSWORD,
    organsation: SF_ORG,
  },
  quickbooks: {
    clientID: QB_CLIENT_ID,
    clientSecret: QB_CLIENT_SECRET,
    realmId: QB_REALM_ID,
    authCode: QB_AUTH_CODE,
  },
};
