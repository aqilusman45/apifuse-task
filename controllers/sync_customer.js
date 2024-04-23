const {
  getSalesForceAccessToken,
  getSalesforceAccountData,
} = require("../lib/salesforce");
const { getCustomer } = require("../lib/quickbooks");

const syncCustomer = async (req, res, _next) => {
  try {
    const { identifier, platform } = req.body;
    const accessToken = await getSalesForceAccessToken();
    if (platform === "salesforce") {
      // get updated account details from salesforce
      const accoundData = await getSalesforceAccountData(
        accessToken,
        identifier
      );
      if (!accoundData) {
        return res.json({
          message: "Salesforce customer not found!",
        });
      }
      // search for the user in quickbooks
      const { Id } = accoundData;
      const customer = await getCustomer(Id)
      if (!customer) {
        
      }
      //if the user is found in quickbooks update it
      // if the user is not found in quickbooks create a new account
    }

    if (platform === "quickbooks") {
      // search for the user in salesforce
      res.status(404).json({
        message: "record not found.",
      });
      // if the user is found in salesforce update it
      // if the user is not found in salesforce create a new account
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  syncCustomer,
};
