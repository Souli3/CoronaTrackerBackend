var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
    console.log("heloo");
    
        let fs=require('fs');
        let file=fs.readFileSync(__dirname+'/../data/cases.json');
        let data = JSON.parse(file);;   
        updateProvince("Brussels","CasConfirme")
   // console.log(data)
    return res.json(data);
});
/**
 * 
 * method pour faire l'update de chaque province selon cas confirm ou rétabli 
 * 
 */
updateProvince=(province ,caseAVerify)=>{
    let fs=require('fs');
        let file=fs.readFileSync(__dirname+'/../data/cases.json');
        let data = JSON.parse(file).board;
        
        for (let index = 0; index < data.length ;index++) {
            
            if(data[index].province==province){
                console.log("hey")

             if(caseAVerify==="CasConfirme"){
                 data[index]["CasConfirme"]++;
            }
            else {data[index]["Rétabli"]++;
             data[index]["CasConfirme"]--;
            }
            }
  }
  data=JSON.stringify(data).concat("}");
  data="{\"board\":".concat(data);
  fs.writeFileSync(__dirname+'/../data/cases.json',data)
}
module.exports = router;