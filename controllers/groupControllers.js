//file imports
const Group = require('../models/Group');
const Post = require('../models/Post');
const User = require('../models/User');

exports.getRoot = (req,res)=> {
  //req.params.name = req.params.name.replace("Group","").trim();
  console.log(req.params.name + " "+req.params.name.length);
  Group.findOne({name:req.params.name+" Group"}).exec()
  .then(group=> {
    if(!group) return res.status(404).send("Page not found");
    else {
      return res.send(group);
    }
  });
};// end route

exports.postNewPost = (req,res) => {
  let groupName = req.prevPath;
  groupName = groupName.replace("/groups/","") + " Group";
  Group.findOne({name:groupName}).exec()
  .then(group => {
    if(!group) return res.status(400).send("No Group found");
    // if group found :
    else {
      const newPost = new Post({author:req.session.userID,text:req.body.text});
      Group.findOneAndUpdate(
        { name: groupName }, 
        { $push: { posts: newPost._id }}
      ).exec()
      .then(group => {
        if(!group) return res.status(500).send("Can't add post");
        else {
          newPost.save()
          .then(() => {return res.send("Post Created")});
        }
      })
      
    }
  })
  
};//end route

exports.postUpdatePost = (req,res) => {
  user_id === post.author
  User.findById
}//end route

exports.deleteDeletePost = (req,res) => {

}//end route