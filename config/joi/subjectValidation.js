const Joi = require('@hapi/joi');

exports.createSubjectValidationSchema = {
  name:Joi.string().min(2).max(60).required(),
};

exports.updateSubjectNameValidationSchema = {
  oldName:Joi.string().min(2).max(60).required(),
  newName:Joi.string().min(2).max(60).required()
};
