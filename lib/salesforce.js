const axios = require("axios");
const qs = require("qs");
const { salesforce } = require("../config");

const getSalesForceAccessToken = async () => {
  const data = qs.stringify({
    grant_type: "password",
    client_id: salesforce.clientID,
    client_secret: salesforce.clientSecret,
    username: salesforce.username,
    password: salesforce.password,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://${salesforce.organsation}.my.salesforce.com/services/oauth2/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        "BrowserId=wn_vIwDLEe-KkgkfRLRLdg; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1",
    },
    data: data,
  };

  try {
    const res = await axios.request(config);
    return res.data.access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  getSalesForceAccessToken,
};
