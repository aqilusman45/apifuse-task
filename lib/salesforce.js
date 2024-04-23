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

const isSalesforceAccountExist = async (accessToken, accountId) => {
  const soqlQuery = `SELECT Id, Name FROM Account WHERE Id = \'${accountId}\'`;
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://${salesforce.organsation}.my.salesforce.com/services/data/v52.0/query?q=${soqlQuery}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const {
      data: { records },
    } = await axios.request(config);

    if (records.length) {
      const [account] = records;
      return account;
    }
    return null;
  } catch (error) {
    throw new Error(error);
  }
};

const getSalesforceAccountData = async (accessToken, Id) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://${salesforce.organsation}.my.salesforce.com/services/data/v52.0/sobjects/Account/${Id}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const { data } = await axios.request(config);
    return data
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getSalesForceAccessToken,
  getSalesforceAccountData,
  isSalesforceAccountExist,
};
