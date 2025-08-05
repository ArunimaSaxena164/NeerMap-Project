const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .min(2)
    .max(30)
    .required()
    .messages({
      'string.pattern.base': 'Username can only contain letters and spaces',
      'string.min': 'Username must be at least 2 characters long',
      'string.max': 'Username must be at most 30 characters long',
      'any.required': 'Username is required',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required',
    }),
});


const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});


const resourceSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  city: Joi.string().min(2).required(),
  type: Joi.string().valid("Dam", "Lake", "River", "Well", "Pond", "Other").optional(),
  nature: Joi.string().valid("Natural", "Man-made").optional(),
  suitability: Joi.string().valid("Drinking", "Irrigation", "Bathing", "Washing", "Other").optional(),
  description: Joi.string().max(300).allow(""),
  geometry: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array().items(
      Joi.number().min(-180).max(180), // longitude
      Joi.number().min(-90).max(90)    // latitude
    ).length(2).required()
  }).required(),
});

const reviewSchema = Joi.object({
  resource: Joi.string().length(24).hex().required(), // MongoDB ObjectId
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(300).allow(""),
});

module.exports = {
  registerSchema,
  loginSchema,
  resourceSchema,
  reviewSchema,
};
