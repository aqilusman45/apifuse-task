const yup = require("yup");

const syncSchema = yup.object().shape({
  identifier: yup.string().required(),
  platform: yup.string().required(),
});

module.exports = {
  syncSchema,
};
