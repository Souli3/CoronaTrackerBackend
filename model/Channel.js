"use strict";
var escape= require("escape-html");

const FILE_PATH = __dirname +"/../data/channel.json";

class Channel{



    constructor(data){
        this.id = Channel.getNewId();
        
        this.title = escape(data.title);
        this.date= data.date;
        this.user=data.user;
        this.state=data.state;
        this.region=data.region;
        this.subject =data.subject;
        this.userId = data.id_user;


    }
    static get list() {
        let channels = getChannelListFromFile();
        return channels;
      }

    static get(id){
        let channelList = getChannelListFromFile();
        return channelList.find((channel) => channel.id==id);
    }

    static save(){
        let channelList = getChannelListFromFile();
        channelList.push(this);
        saveChannelListToFile(FILE_PATH, channelList);
    }


    static getNewId(){
        let channelList = getChannelListFromFile();
        if( channelList.length === 0) return 1;
        return channelList[channelList.length-1].id+1;
    }
}
    

function getChannelListFromFile(){
        const fs = require("fs");
        if( !fs.existsSync(FILE_PATH)) return [];
        let channelRawData = fs.readFileSync(FILE_PATH);
        let channelList;
        if(channelRawData) channelList=JSON.parse(channelRawData);
        else channelList=[]; 


        return channelList;
}



function saveChannelListToFile(filePath, channelList) {
    const fs = require("fs");
    let data = JSON.stringify(channelList);
    fs.writeFileSync(filePath, data);
}






module.exports = Channel;