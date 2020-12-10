var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
   
        let fs=require('fs');
        let file=fs.readFileSync(__dirname+'/../data/cases.json');
        let data = JSON.parse(file);
   // console.log(data)
    return res.json(data);
});
/**
 * 
 * method pour faire l'update de chaque province selon cas confirm ou rétabli 
 * 
 */

module.exports = router;