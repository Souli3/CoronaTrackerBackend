"use strict";


let express = require("express");
let router = express.Router();
let Region = require("../model/Region.js");
const { authorize } = require("../utils/auth.js");



router.get("/", function(req, res, next) {
    return res.json({tableau:Region.list});
});



module.exports=router;