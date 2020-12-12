



const FILE_PATH = __dirname + "/../data/Region.json";

class Region {



    constructor() {
       
    }



    static get list(){
        
        let regionList = getRegionListFromFile();
        return regionList;
    }



















}



function getRegionListFromFile() {
    const fs = require("fs");
    if (!fs.existsSync(FILE_PATH)) return [];
    let regionRawData = fs.readFileSync(FILE_PATH);
    let regionList;
    if (regionRawData) regionList = JSON.parse(regionRawData);
    else regionList = [];
    return regionList;
}
















module.exports = Region;