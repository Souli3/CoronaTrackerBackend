"strict mode";
const bcrypt = require("bcrypt");
const { connect } = require("http2");
const saltRounds = 10;
const myPlaintextPassword = "145OkyayNo668Pass";
const FILE_PATH = __dirname + "/../data/users.json";

class User {
    constructor(username, email, password, name, fname, confpassword) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
        this.fname = fname;
        this.confpassword = confpassword;
    };

    /* return a promise with async / await */
    async save() {
        let userList = getUserListFromFile(FILE_PATH);
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);


        console.log("save:", this.email, this.name, this.fname);
        userList.push({
            username: this.email,
            email: this.email,
            name: this.name,
            fname: this.fname,
            password: hashedPassword,
        });
        saveUserListToFile(FILE_PATH, userList);
        return true;
    };

    /* return a promise with classic promise syntax*/
    checkCredentials(email, password) {
        if (!email || !password) return false;
        let userFound = User.getUserFromList(email);
        console.log("User::checkCredentials:", userFound, " password:", password);
        if (!userFound) return Promise.resolve(false);
        //try {
        console.log("checkCredentials:prior to await");
        // return the promise
        return bcrypt
            .compare(password, userFound.password)
            .then((match) => match)
            .catch((err) => err);
    };

    static get list() {
        let userList = getUserListFromFile(FILE_PATH);
        return userList;
    };

    static isUser(username) {
        const userFound = User.getUserFromList(username);
        console.log("User::isUser:", userFound);
        return userFound !== undefined;
    };


    static updateUser(old, newData) { // old = username ,, newData=fname,name,username
        console.log('dans le static updateUser de la class');
        let usersList = getUserListFromFile(FILE_PATH);

        if (!newData) return;
        let userUpdated;
        for (let index = 0; index < usersList.length; index++) {
            if (usersList[index].email === old) {
                usersList[index].fname = escape(newData.fname);
                usersList[index].name = escape(newData.name);
                userUpdated = usersList[index];
                break;
            }
        }

        saveUserListToFile(FILE_PATH, usersList);
        return userUpdated;
    };



    static getUserFromList(username) {
        const userList = getUserListFromFile(FILE_PATH);
        for (let index = 0; index < userList.length; index++) {
            if (userList[index].username === username) return userList[index];
        }
        return;
    };
    static deleteUserFromList(username) {
        let userList = getUserListFromFile(FILE_PATH);
        for (let index = 0; index < userList.length; index++) {

            if (userList[index].username === username) {
                delete userList[index];
                saveUserListToFile(FILE_PATH, userList);
            }
        }
        return;
    };

};

function getUserListFromFile(filePath) {
    const fs = require("fs");
    if (!fs.existsSync(filePath)) return [];
    let userListRawData = fs.readFileSync(filePath);
    let userList;
    if (userListRawData) userList = JSON.parse(userListRawData);
    else userList = [];
    return userList;
};

function saveUserListToFile(filePath, userList) {
    const fs = require("fs");
    let data = userList.filter(element => { return element !== null });
    data = JSON.stringify(data);
    fs.writeFileSync(filePath, data);

};

module.exports = User;