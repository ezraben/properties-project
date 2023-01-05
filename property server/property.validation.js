const Joi = require("Joi");

//img, price, description, address

const priceRole = {
  price: Joi.number().min(650000).max(999000000).required(),
};

const descriptionRole = {
  description: Joi.string().min(6).max(255).trim().required(),
};
const addressRole = {
  address: Joi.string().min(6).max(255).trim().required(),
};
const imgRole = {
  img: Joi.string(),
};

const propertySchema = Joi.object({
  ...priceRole,
  ...descriptionRole,
  ...addressRole,
  ...imgRole,
});

const validatePropertySchema = (data) => {
  return propertySchema.validateAsync(data, { abortEarly: false });
};

module.exports = { validatePropertySchema };
