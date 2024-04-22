const express = require("express");
const router = express.Router();
const {
  syncSalesforceCustomer,
} = require("../controllers/salesforceQuickBooksSync");

router.get("/sync", syncSalesforceCustomer);

module.exports = router;
