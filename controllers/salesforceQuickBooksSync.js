const { getSalesForceAccessToken } = require("../lib/salesforce");

const syncSalesforceCustomer = async (_req, res, _next) => {
  const access_token = await getSalesForceAccessToken();
  res.json({
    access_token,
  });
};

module.exports = {
  syncSalesforceCustomer,
};
