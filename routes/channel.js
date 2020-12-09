"use strict";

let express = require("express");
let router = express.Router();
let Channel = require("../model/Channel.js");


router.post("/hcah", function(req,res, next){
    console.log("*", User);


});

// Delete a channel : DELETE /api/channel/:id
router.delete("/:id", function (req, res) {
  console.log('je supprime le channel'+req.params.id);
  
  const channelDeleted = Channel.delete(req.params.id);//id channel
  if (!channelDeleted) return res.status(404).end();
  return res.json(channelDeleted);
});

router.post("/", function (req, res, next) {
  console.log("je renvoie la liste des channels");
  return res.json({ tableau: Channel.list});
  
});
 
//Show my channels
router.post("/mychannels", function (req, res, next) {
  console.log("je renvoie mes channels "+req.body.username);
  const channelFound = Channel.mychannels(req.body.username);
  console.log("channelfound::"+channelFound);
  if(!channelFound) return res.status(408).end();

  return res.json({ tableau:channelFound});
  
});


module.exports = router;

