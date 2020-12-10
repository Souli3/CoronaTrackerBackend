"use strict";

let express = require("express");
let router = express.Router();
let Channel = require("../model/Channel.js");

let { authorize, signAsynchronous } = require("../utils/auth");


//Renvoie tout la liste des channels/*
//router.get("/", function(req, res){
//    console.log("test")
//    return res.json(Channel.getChannelListFromFile);
//});

router.post("/", function (req, res, next) {
  console.log("je renvoie la liste des channels "+console.log(Channel.list));
  return res.json({ tableau: Channel.list});
  
});
router.post("/add",authorize ,function(req,res){
  console.log("j'enregistre le nv channel");
  let newChannel = new Channel(req.body);
  newChannel.save();
  return res.json(newChannel);
});



router.post("/hcah", function(req,res, next){
    console.log("*", User);


});

// Delete a channel : DELETE /api/channel/:id
router.delete("/:id",authorize, function (req, res) {
  console.log('je supprime le channel'+req.params.id);
  
  const channelDeleted = Channel.delete(req.params.id);//id channel
  if (!channelDeleted) return res.status(404).end();
  return res.json(channelDeleted);
});

 
//Show my channels
router.post("/mychannels",authorize, function (req, res, next) {
  console.log("je renvoie mes channels "+req.body.username);
  const channelFound = Channel.mychannels(req.body.username);
  console.log("channelfound::"+channelFound);
  if(!channelFound) return res.status(408).end();

  return res.json({ tableau:channelFound});
  
});


module.exports = router;

