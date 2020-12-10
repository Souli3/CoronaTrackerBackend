// "use strict";
var escape = require("escape-html");

const FILE_PATH = __dirname +"/../data/channel.json";

class Channel{



    constructor(data){
        
        this.id = Channel.getNewId();

        this.title = escape(data.title);

        //this.date= data.date;
        this.user=data.user;
        this.state=data.state;
        this.region=data.region;
        this.subject =escape(data.subject);
        
        
        this.userId = "1";



        var currentTime = new Date();
        // retourne le mois 0-11 donc +1
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        
        this.date=year+"-"+month+"-"+day;
    }

    static get list() {
        
        let channels = getChannelListFromFile();
        console.log("er");
        return channels;
    }

    static get(id) {
        let channelList = getChannelListFromFile();
        return channelList.find((channel) => channel.id == id);
    }

    save(){

        let channelList = getChannelListFromFile();
        
        channelList.push(this);
        console.log(this.region);
        updateRegion(this.region,"ouvert");
        saveChannelListToFile(FILE_PATH, channelList);
    
    }
    static mychannels(username) {
        console.log("mychannels::" + username);
        let channelList = getChannelListFromFile();
        // console.log("channellist" + channelList);

        let mychannels = [];

        for (let index = 0; index < channelList.length; index++) {
            if (channelList[index].user === username) {
                mychannels.push(channelList[index]);
            }
        }
        console.log("mychannels" + mychannels);
        return mychannels;
    }
    static getNewId() {
        let channelList = getChannelListFromFile();
        if (channelList.length === 0) return 1;
        return channelList[channelList.length - 1].id + 1;
    }

    static updateChannel(channel){
        let list= getChannelListFromFile();
        list.map(element => {
            if(element.id==channel.id){
                element.subject=channel.sujet;
                element.title=channel.title;
                element.date=channel.date;
                element.region=channel.region;
                if("ferme"==channel.etat)
                updateRegion(channel.region,"ferme")
                element.state=channel.etat;
            }
        });
        saveChannelListToFile(FILE_PATH,list);
    }
     
    static delete(id) {
        let channelList = getChannelListFromFile(FILE_PATH);
        const index = channelList.findIndex((channelList) => channelList.id == id);
        if (index < 0) return;
        const itemRemoved = { ...channelList[index] };

        channelList.splice(index, 1);
        saveChannelListToFile(FILE_PATH, channelList);

        console.log("bien supprimeeeeeeeeeeeeee");
        return itemRemoved;
    }
}
    
function updateRegion(region,etat){
    console.log("eSQSAVE");
    let fs=require('fs');
    
        let file=fs.readFileSync(__dirname+'/../data/cases.json');
        let data = JSON.parse(file).board;
       
        for (let index = 0; index < data.length ;index++) {
            
            if(data[index].region==region){
                console.log("eSQSAVE");
             if(etat==="ouvert"){
                 data[index]["ouvert"]++;
            }
            else {data[index]["ferme"]++;
             data[index]["ouvert"]--;
            }
            }
  }
               
  data=JSON.stringify(data).concat("}");
  data="{\"board\":".concat(data);
  fs.writeFileSync(__dirname+'/../data/cases.json',data)
}
   

// function getChannelListFromFileById(username) {
//     console.log('dans getchannellistfromfilebyid');
//     const fs = require("fs");
//     if (!fs.existsSync(FILE_PATH)) return [];
//     let channelRawData = fs.readFileSync(FILE_PATH);
//     let channelList;
//     if (channelRawData) channelList = JSON.parse(channelRawData);
//     else channelList = [];
//     let myList;
//     channelList.forEach(element => {
//         if (element.user === username) {
//             myList.push(element);
//         }
//     });

//     return myList;
// }


function getChannelListFromFile() {
    const fs = require("fs");
    console.log("p1");

    if (!fs.existsSync(FILE_PATH)) return [];
    let channelRawData = fs.readFileSync(FILE_PATH);
    let channelList;
    if (channelRawData) channelList = JSON.parse(channelRawData);
    else channelList = [];
    console.log("p2");
    return channelList;
}



function saveChannelListToFile(filePath, channelList) {
    const fs = require("fs");
    let data = JSON.stringify(channelList);
    fs.writeFileSync(filePath, data);
}


module.exports = Channel;