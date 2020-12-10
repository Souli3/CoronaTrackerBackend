"use strict";

let express = require("express");
let router = express.Router();
let Channel = require("../model/Channel.js");


//Renvoie tout la liste des channels/*
//router.get("/", function(req, res){
//    console.log("test")
//    return res.json(Channel.getChannelListFromFile);
//});

router.post("/hcah", function(req,res, next){
    console.log("*", User);


});


router.post("/", function (req, res, next) {
  console.log("je renvoie la liste des channels");
  return res.json({ tableau: Channel.list});
  
});
/// update channel 
router.put("/",function(req,res,next){
  console.log('UPDATE channel');
  let channel=req.body.channel;
  console.log(req.body.channel);
  Channel.updateChannel(req.body.channel);
return res.json({ tableau: Channel.list});
});
// get channel by Id 
router.get("/:id", function(req,res, next){
  console.log("get channel By Id ",req.params.id);
  let channel=Channel.get(req.params.id);
  
return res.json({channel});
});


module.exports = router;

