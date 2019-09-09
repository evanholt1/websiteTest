// npm imports
const Joi = require('@hapi/joi');

// file imports
const User = require('../models/User');
const userValidation = require('../config/joi/userValidation');

exports.postSignup = (req,res) => {
  const {error,value} = Joi.validate(req.body,userValidation.signupValidationSchema);
  if(error) {
    res.status(400).send(error.details[0].message);
  } else {
    const new_user = new User(value);
    new_user.save()
    .then(() => {
      res.send("New User Created");
    })
    .catch(err => {
      res.send(err.message.split(/:/)[1]+" is already taken");
    });
  }
};

exports.postLogin = (req,res) => {
  const {error} = Joi.validate(req.body,userValidation.loginValidationSchema);
  if(error) {
    res.status(400).send(error.details[0].message);
  } else {
    User.findOne(req.body,{},{ runValidators: true, context: 'query' })
    .then(user => {
      if(!user) {
        res.status(400).send("User not Found");
      } else {
        req.session.userID = user._id;
        return res.send("Logged in as "+user.username);
      }
    })
  }
};

exports.postLogout = (req,res) => {
  if(!req.session.userID) {
    res.status(401).redirect('/login');
  } else {
    User.findOne(req.session.userID,{},{ runValidators: true, context: 'query' })
    .then(user => {
      if(!user) {
        res.status(400).send("Can't log out");
      } else {
        res.write("Logged out from "+user.username);
        req.session.destroy();
        return res.end();
      }
    })
  }
};