const Joi = require('@hapi/joi');

exports.signupValidationSchema = {
  username:Joi.string().min(4).max(100).required(),
  email:Joi.string().min(4).max(100).required().email(),
  password:Joi.string().min(4).max(512).required()
};

exports.loginValidationSchema = {
  email:Joi.string().min(4).max(100).required().email(),
  password:Joi.string().min(4).max(512).required()
};