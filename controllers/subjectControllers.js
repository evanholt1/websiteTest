// npm imports
const Joi = require('@hapi/joi');

// file imports
const Subject = require('../models/Subject');
const Group = require('../models/Group');
const subjectValidation = require('../config/joi/subjectValidation');

exports.postCreate = (req,res) => {
  // validate the subject-name & group-name
  // this route accepts a form of 'name' and makes a new subject, and a group for it
  const {error,value} = Joi.validate(req.body,subjectValidation.createSubjectValidationSchema);
  if(error) {
    res.status(400).send(error.details[0].message);
  } else {
    // Create a new group first and save it
    const newGroup = new Group({name:value.name + " Group",memberCount:0,posts:[]});
    newGroup.save()
    .then(() => {
      // Create a new subject, with an ObjectID to that group
      const newSubject = new Subject({name:value.name,group:newGroup._id});
      newSubject.save()
      .then(res.send("New Subject (and it's group) Created"))
      .catch(err=> {
        res.status(500);
        console.log(err);
      });
    })
    .catch(err => {
      res.status(500);
      console.log(err);
    });
    
  }
};// end route

exports.postUpdateTitle = (req,res) => {
  const {error,value} = Joi.validate(req.body,subjectValidation.updateSubjectNameValidationSchema);
  if(error) {
    res.status(400).send(error.details[0].message);
  } else {
    Subject.findOne({name:value.oldName})
    .then(subject => {
      if(!subject) res.status(400).send("No subject found");
      // if subject found:
      else {
        Group.findById(subject.group)
        .then(group => {
          if(!group) res.status(500).send("Operation Failed Internally");
          // if group found
          else {
            subject.name = value.newName;
            group.name = value.newName + " Group";
            subject.save()
            .then(()=> {
              group.save()
              // finish response
              .then(()=> {
                return res.send("Name Changed Successfully")
              })
              .catch(err=> {
                return res.send("A group already exists with that name");
              })
            })
            .catch(err=>{
              return res.send("A Subject already exists with that name");
            });
          }
        })
        .catch(err=>{
          return res.send("Error. Consult an adminstrator");
        });
      }
    })
    .catch(err=>{
      return res.send("Error. Consult an adminstrator");
    });
  }
};// end route
