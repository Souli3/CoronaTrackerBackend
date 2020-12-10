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
    static updateChannel(channel){
        let list= getChannelListFromFile();
        list.map(element => {
            console.log(channel.id==element.id)
            if(element.id==channel.id){
                element.subject=channel.sujet;
                element.title=channel.title;
                element.date=channel.date;
                element.region=channel.region;
                element.state=channel.etat;
            }
        });
        saveChannelListToFile(FILE_PATH,list);
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