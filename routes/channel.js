"use strict";

let express = require("express");
let router = express.Router();
let Channel = require("../model/Channel.js");
const { authorize } = require("../utils/auth.js");


//Renvoie tout la liste des channels/*
//router.get("/", function(req, res){
//    console.log("test")
//    return res.json(Channel.getChannelListFromFile);
//});

router.post("/", function (req, res, next) {
  console.log("je renvoie la liste des channels "+console.log(Channel.list));
  return res.json({ tableau: Channel.list});
  
});
router.post("/add", authorize,function(req,res){
  console.log("j'enregistre le nv channel");
  let newChannel = new Channel(req.body);
  newChannel.save();
  return res.json(newChannel);
});

router.get("/:titre/:region", function(req,res, next){
  console.log("test "+req.params.titre+" "+req.params.region);
  const channelSearch = Channel.search(req.params.titre,req.params.region);
  if (!channelSearch) return res.status(404).end();
  return res.json(channelSearch);
});


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




 
//Show my channels
router.post("/mychannels", function (req, res, next) {
  console.log("je renvoie mes channels "+req.body.username);
  const channelFound = Channel.mychannels(req.body.username);
  console.log("channelfound::"+channelFound);
  if(!channelFound) return res.status(408).end();

  return res.json({ tableau:channelFound});
  
});


module.exports = router;

