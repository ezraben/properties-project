const Joi = require("Joi");

//img, price, description, address

// const imgRole = {
//   img: Joi.string(),
// };
const priceRole = {
  price: Joi.number().min(5).max(999000000).required(),
};

const descriptionRole = {
  description: Joi.string().min(6).max(255).trim().required(),
};
const addressRole = {
  address: Joi.string().min(6).max(255).trim().required(),
};

const propertySchema = Joi.object({
  // ...imgRole,
  ...priceRole,
  ...descriptionRole,
  ...addressRole,
});

const validatePropertySchema = (data) => {
  return propertySchema.validateAsync(data, { abortEarly: false });
};

module.exports = { validatePropertySchema };
