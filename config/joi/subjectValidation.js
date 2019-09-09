const Joi = require('@hapi/joi');

exports.creationSchema = {
  name:Joi.string().min(2).max(60).required(),
};

exports.updationSchema = {
  oldName:Joi.string().min(2).max(60).required(),
  newName:Joi.string().min(2).max(60).required()
};
