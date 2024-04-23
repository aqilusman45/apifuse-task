const express = require("express");
const router = express.Router();
const {
  syncCustomer,
} = require("../controllers/sync_customer");
const { validateSyncRequest } = require("../middlewares/sync_middleware");

router.post("/sync", validateSyncRequest, syncCustomer);

module.exports = router;
