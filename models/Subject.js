const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const subjectSchema = new Schema({
  name:{
    type:String,
    required:true,
    unique:true,
    min:2,
    max:60
  },
  group:{
    type:mongoose.Schema.Types.ObjectId,
    unique:true,
    ref:'Group'
  }
});

subjectSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Subject',subjectSchema);