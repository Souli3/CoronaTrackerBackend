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

router.post("/", function(req, res, next) {
    console.log("je renvoie la liste des channels " + console.log(Channel.list));
    return res.json({ tableau: Channel.list });

});

router.put("/add", authorize, function(req, res) {
    console.log("j'enregistre le nv channel");
    let newChannel = new Channel(req.body);
    newChannel.save();
    return res.json(newChannel);
});

router.get("/:titre/:region", function(req, res, next) {
    console.log("test " + req.params.titre + " " + req.params.region);
    const channelSearch = Channel.search(req.params.titre, req.params.region);
    if (!channelSearch) return res.status(404).end();
    return res.json(channelSearch);
});


router.post("/hcah", function(req, res, next) {
    console.log("*", User);


});

// Delete a channel : DELETE /api/channel/:id
router.delete("/:id", authorize, function(req, res) {
    console.log('je supprime le channel' + req.params.id);

    const channelDeleted = Channel.delete(req.params.id); //id channel
    if (!channelDeleted) return res.status(404).end();
    return res.json(channelDeleted);
});
/// update channel 
router.put("/", function(req, res, next) {
    console.log('UPDATE channel');
    let channel = req.body.channel;
    console.log(req.body.channel);
    Channel.updateChannel(req.body.channel);
    return res.json({ tableau: Channel.list });

});
// get channel by Id 
router.get("/:id", function(req, res, next) {
    console.log("get channel By Id ", req.params.id);
    let channel = Channel.get(req.params.id);

    return res.json({ channel });
});
// add Message
router.post("/addMessage", authorize, function(req, res, next) {
    console.log("Send message " + req.body.message);
    var idChannel = req.body.idChannel;
    let message = req.body.message;
    let user = req.body.user;
    Channel.saveMessage(idChannel, message, user);
    console.log("he")
    console.log(Channel.getMessages(idChannel))
    let messages = Channel.getMessages(idChannel);
    let owner = Channel.get(idChannel).user;
    console.log(messages);
    return res.json({ messages, owner });

});
/// get Messages
router.post("/allMessages", authorize, function(req, res, next) {
    var idChannel = req.body.idChannel;
    let messages = Channel.getMessages(idChannel);
    let owner = Channel.get(idChannel).user;
    console.log(messages);
    return res.json({ messages, owner });

});




//Show my channels
router.post("/mychannels", authorize, function(req, res, next) {
    console.log("je renvoie mes channels " + req.body.username);
    const channelFound = Channel.mychannels(req.body.username);
    console.log("channelfound::" + channelFound);
    if (!channelFound) return res.status(408).end();

    return res.json({ tableau: channelFound });

});


module.exports = router;