const { syncSchema } = require("../validators/sync_validator");

const validateSyncRequest = async (req, res, next) => {
  try {
    req.body = await syncSchema.validate(req.body);
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

module.exports = {
  validateSyncRequest,
};
