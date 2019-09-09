const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const groupSchema = new Schema({
  name:{
    type:String,
    min:2,
    max:60,
    unique:true,
    required:true
  },
  memberCount:{
    type: Number,
    default:0
  },
  posts: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post',
  }]
});

groupSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Group',groupSchema);