const {
  getSalesForceAccessToken,
  getSaleforceAccounts,
  createSalesforceAccount,
} = require("../lib/salesforce");
const { createCustomer, getAllCustomers } = require("../lib/quickbooks");

const syncCustomer = async (req, res, _next) => {
  try {
    const { platform } = req.body;
    const accessToken = await getSalesForceAccessToken();
    if (platform === "salesforce") {
      const { records } = await getSaleforceAccounts(accessToken);
      if (!records) {
        return res.json({
          message: "Salesforce accounts not found!",
        });
      }
      const qbCustomers = await Promise.all(
        records.map(async ({ Name, BillingAddress }) => {
          const {
            city = "",
            country = "",
            postalCode = "",
            state = "",
            street = "",
          } = BillingAddress ?? {};
          return await createCustomer({
            DisplayName: Name,
            BillAddr: {
              CountrySubDivisionCode: state,
              City: city,
              PostalCode: postalCode,
              Line1: street,
              Country: country,
            },
          });
        })
      );
      res.json({
        synced_customers: qbCustomers.filter(Boolean),
      });
    }

    if (platform === "quickbooks") {
      const data = await getAllCustomers();
      const {
        QueryResponse: { Customer: customers },
      } = data;
      const accounts = await Promise.all(
        customers.map(async (customer) => {
          const { DisplayName } = customer;
          return await createSalesforceAccount(accessToken, {
            Name: DisplayName,
          });
        })
      );
      res.json({
        accounts,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  syncCustomer,
};
