const Joi = require("Joi");

const firstNameRole = {
  firstName: Joi.string().min(2).max(255).trim().alphanum().required(),
};
const lastNameRole = {
  lastName: Joi.string().min(2).max(255).trim().alphanum().required(),
};

const emailRole = {
  email: Joi.string().email().min(6).max(255).trim().required(),
};
const passwordRole = {
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
};
const confirmPasswordRole = {
  confirmPassword: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
};


const phoneRole = {
  phone: Joi.string().min(3).max(255).trim(),
};

const isAdminRole = {
  isAdmin: Joi.boolean().required(),
};

const signupSchema = Joi.object({
  ...firstNameRole,
  ...lastNameRole,
  ...emailRole,
  ...passwordRole,
  ...confirmPasswordRole,

  ...phoneRole,
  ...isAdminRole,
});

const loginSchema = Joi.object({
  ...emailRole,
  ...passwordRole,
});

const forgetPasswordSchema = Joi.object({
  ...emailRole,
});
const recoveryPasswordSchema = Joi.object({
  ...passwordRole,
});
const recoveryPasswordValidateEmailSchema = Joi.object({
  ...emailRole,
});

const validateSignupSchema = (data) => {
  return signupSchema.validateAsync(data, { abortEarly: false });
};

const validateLoginSchema = (data) => {
  return loginSchema.validateAsync(data, { abortEarly: false });
};
const validateForgetPasswordSchemaSchema = (data) => {
  return forgetPasswordSchema.validateAsync(data, { abortEarly: false });
};
const validateRecoveryPasswordSchema = (data) => {
  return recoveryPasswordSchema.validateAsync(data, { abortEarly: false });
};
const validateRecoveryPasswordValidateEmailSchema = (data) => {
  return recoveryPasswordValidateEmailSchema.validateAsync(data, {
    abortEarly: false,
  });
};

module.exports = {
  validateSignupSchema,
  validateLoginSchema,
  validateForgetPasswordSchemaSchema,
  validateRecoveryPasswordSchema,
  validateRecoveryPasswordValidateEmailSchema,
};
