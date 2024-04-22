require("dotenv").config();

const {
  SF_CLIENT_ID,
  SF_CLIENT_SECRET,
  SF_SECURITY_TOKEN,
  SF_USERNAME,
  SF_PASSWORD,
  SF_ORG,
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
};
