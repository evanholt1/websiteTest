//file imports
const Group = require('../models/Group');

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