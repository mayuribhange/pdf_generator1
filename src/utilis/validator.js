const Joi = require("joi");

const pdfGeneratorValidator = () => {
  const ValidatesResult = Joi.object().keys({
    registerId: Joi.string().required().messages({
      "any.required": "Register id is required",
    }),
    email: Joi.string().required().messages({
      "any.required": "email is required",
    }),
    phoneNo: Joi.string().required().messages({
      "any.required": "phoneNo is required",
    }),
    address: Joi.string().required().messages({
      "any.required": "address is required",
    }),
    district: Joi.string().required().messages({
      "any.required": "district is required",
    }),
    state: Joi.string().required().messages({
      "any.required": "state is required",
    }),
    country: Joi.string().required().messages({
      "any.required": "country is required",
    }),
    name: Joi.string().required().messages({
      "any.required": "name is required",
    }),
    appriciationText: Joi.string().required().messages({
      "any.required": "appriciationText is required",
    }),
    dob: Joi.date().required().messages({
      "any.required": "dob is required",
    }),
    gender: Joi.string()
      .valid("Male", "male", "female", "Female", "Other", "other")
      .required()
      .messages({
        "any.required": "gender is required",
      }),
    bloodGroup: Joi.string().required().messages({
      "any.required": "bloodGroup is required",
    }),
    pinCode: Joi.number().required().messages({
      "any.required": "pinCode is required",
    }),
    lastName: Joi.string().required().messages({
      "any.required": "lastName is required",
    }),
  });
  return ValidatesResult;
};

module.exports = pdfGeneratorValidator;
