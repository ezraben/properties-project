const Joi = require("Joi");

const priceRole = {
  price: Joi.number().min(400000).max(999000000).required(),
};

const descriptionRole = {
  description: Joi.string().min(6).max(255).trim().required(),
};
const cityRole = {
  city: Joi.string().min(2).max(255).trim().required(),
};
const addressRole = {
  address: Joi.string().min(6).max(255).trim().required(),
};
const imgRole = {
  img: Joi.string(),
};
const extraInfoRole = {
  extraInfo: Joi.string().min(6).max(255).trim().required(),
};

const propertySchema = Joi.object({
  ...priceRole,
  ...descriptionRole,
  ...cityRole,
  ...addressRole,
  ...imgRole,
  ...extraInfoRole,
});

const validatePropertySchema = (data) => {
  return propertySchema.validateAsync(data, { abortEarly: false });
};

module.exports = { validatePropertySchema };
