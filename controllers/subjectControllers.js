// npm imports
const Joi = require('@hapi/joi');

// file imports
const Subject = require('../models/Subject');
const Group = require('../models/Group');
const subjectValidation = require('../config/joi/subjectValidation');

exports.getRoot = (req,res) => {
  Subject.find().exec()
  .then(subjectArray => {
    if(!subjectArray) return res.send("No Subjects are available.");
    // if subjects are found & returned :
    else {
      Group.find().exec()
      .then(groupArray => {
        if(!groupArray) return res.send("No Groups are available.");
        // if groups are found & returned :
        else {
          if(subjectArray.length !== groupArray.length) return res.status(500).send("Server Matching Error");
          else {
            for(let i =0;i<subjectArray.length;i++) 
              res.write(subjectArray[i].name + " || "+groupArray[i].name+"\n");
            return res.end();
          }
        }
      });// group .then()
    }
  });//subject .then()
};//end route

exports.postCreate = (req,res) => {
  // validate the subject-name & group-name
  // this route accepts a form of 'name' and makes a new subject, and a group for it
  const {error,value} = Joi.validate(req.body,subjectValidation.creationSchema);
  if(error) res.status(400).send(error.details[0].message);
  // if Input Validation Successful:
  else {
    value.name = value.name.trim();
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

exports.postUpdate = (req,res) => {
  const {error,value} = Joi.validate(req.body,subjectValidation.updationSchema);
  if(error) res.status(400).send(error.details[0].message);
  // if Input Validation Successful:
  else {
    value.oldName = value.oldName.trim();
    value.newName = value.newName.trim();
    Subject.findOne({name:value.oldName})
    .then(subject => {
      if(!subject) res.status(400).send("No subject found");
      // if subject found:
      else {
        Group.findById(subject.group)
        .then(group => {
          if(!group) res.status(500).send("Operation Failed Internally");
          // if group found:
          else {
            subject.name = value.newName;
            group.name = value.newName + " Group";
            subject.save()
            .then(()=> {
              group.save()
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

exports.deleteDelete = (req,res) => {
  const {error,value} = Joi.validate(req.body,subjectValidation.creationSchema);
  if(error) res.status(400).send(error.details[0].message);
  // if Input Validation Successful:
  else {
    value.name = value.name.trim();
    // if Validation Successful:
    Group.deleteOne({name:value.name + " Group"}).exec()
    .then(groupDeletion=> {
      if(groupDeletion.deletedCount === 0) return res.status(400).send("No Subject (group) with that name");
      // if group deleted:
      else {
        Subject.deleteOne({name:value.name}).exec()
        .then(result=> {
          if(result.deletedCount === 0) {
            return res.status(400).send("No Subject (group) with that name");
          } else {
            return res.send("Subject Deleted");
          }
        });// end subject .then()
      }
    });// end group .then()
  }
};// end route