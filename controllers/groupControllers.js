//file imports
const Group = require('../models/Group');
const Post = require('../models/Post');
const User = require('../models/User');

exports.getRoot = (req,res)=> {
  //req.params.name = req.params.name.replace("Group","").trim();
  Group.findOne({name:req.params.name+" Group"}).populate('posts').exec()
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

exports.putUpdatePost = (req,res) => {
  //req.body.postID is a hidden input field, dynamically generated when making posts in the front-end. it stores ObjectID
  Post.findById(req.body.postID)
  .exec()
  .then(post => {
    // check if a post with that ID doesn't exist
    if(!post) res.status(403).send("Not Logged In");
    else {
      // check if the user modifying is not the one who made the post
      if(req.session.userID.toString() !== post.author.toString()) res.status(403).send("Not Appropriate User");
      else {
        post.text = req.body.text;
        post.save()
        .then(res.send("Post Updated"));
      }
    }
  }) ;
}//end route

exports.deleteDeletePost = (req,res) => {

}//end route