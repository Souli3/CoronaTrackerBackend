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



module.exports = router;

