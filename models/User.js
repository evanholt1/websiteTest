const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('mongoose-type-email');
const uniqueValidator = require('mongoose-unique-validator');

const Group = require('./Group');

const UserSchema = new Schema({
  email:{
    type:mongoose.SchemaTypes.Email,
    unique:true,
    required:true,
    minlength:4,
    maxlength:100
  },
  username:{
    type:String,
    unique:true,
    required:true,
    minlength:4,
    maxlength:100
  },
  password: {
    type:String,
    required:true,
    minlength:4,
    maxlength:512
  },
  groups: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Group'
  }],
  subjects:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Subject'
  }]
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',UserSchema);