const { authorizeUri, createToken } = require("../lib/quickbooks");

const authUri = async (req, res, _next) => {
  res.redirect(authorizeUri());
};

const getToken = async (req, res, next) => {
  await createToken(req.url);
  res.send("");
};

module.exports = {
  authUri,
  getToken
};
