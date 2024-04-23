const express = require("express");
const router = express.Router();
const { authUri, getToken } = require("../controllers/qb_auth");

router.get("/auth-uri", authUri);
router.get("/callback", getToken);

module.exports = router;
