const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  text:{
    type:String,
    required:true
  },
  lastUpdated:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('Post',postSchema);