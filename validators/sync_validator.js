const yup = require("yup");

const syncSchema = yup.object().shape({
  platform: yup.string().required(),
});

module.exports = {
  syncSchema,
};
