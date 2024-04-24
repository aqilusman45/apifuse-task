const { promisify } = require("util");
const QuickBooks = require("node-quickbooks");
const OAuthClient = require("intuit-oauth");
const { quickbooks } = require("../config");

let accessToken, refreshToken;

const qbo = () => {
  if (!accessToken && !refreshToken) return null;
  return new QuickBooks(
    quickbooks.clientID,
    quickbooks.clientSecret,
    accessToken,
    false,
    quickbooks.realmId,
    true,
    true,
    "70",
    "2.0",
    refreshToken
  );
};

const oauthClient = new OAuthClient({
  clientId: quickbooks.clientID,
  clientSecret: quickbooks.clientSecret,
  environment: "sandbox",
  redirectUri: "http://localhost:3000/callback",
});

const authorizeUri = () => {
  return oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: "intuit-test",
  });
};

const createToken = async (url) => {
  const {
    json: { access_token, refresh_token },
  } = await oauthClient.createToken(url);
  accessToken = access_token;
  refreshToken = refresh_token;
};

const getCustomer = async (Id) => {
  const client = qbo();
  const getCustomerAsync = promisify(client?.getCustomer.bind(client));
  try {
    const res = await getCustomerAsync(Id);
    return res;
  } catch (error) {
    return null;
  }
};

const createCustomer = async (data) => {
  const client = qbo();
  const createCustomerAsync = promisify(client?.createCustomer.bind(client));
  try {
    return await createCustomerAsync(data);
  } catch (error) {
    return null;
  }
};

const getAllCustomers = async () => {
  const client = qbo();
  const getCustomersAsync = promisify(client?.findCustomers.bind(client));
  try {
    return await getCustomersAsync();
  } catch (error) {
    return null;
  }
}

module.exports = {
  oauthClient,
  authorizeUri,
  createToken,
  createCustomer,
  getAllCustomers,
  getCustomer,
};
