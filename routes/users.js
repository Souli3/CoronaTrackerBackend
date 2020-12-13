var express = require("express");
var router = express.Router();
var User = require("../model/User.js");
var Channel = require("../model/Channel.js");
let { authorize, signAsynchronous } = require("../utils/auth");
const jwt = require("jsonwebtoken");
const jwtSecret = "jkjJ1235Ohno!";
const LIFETIME_JWT = 24 * 60 * 60 * 1000; // 10;// in seconds // 24 * 60 * 60 * 1000 = 24h 

/* GET user list : secure the route with JWT authorization */
router.get("/", authorize, function(req, res, next) {
    return res.json(User.list);
});

/* POST user data for authentication */
router.post("/login", function(req, res, next) {
    let user = new User(req.body.email, req.body.email, req.body.password);
    //console.log("POST users/login:", User.list);
    user.checkCredentials(req.body.email, req.body.password).then((match) => {
        if (match) {
            jwt.sign({username:user.username}, jwtSecret, { expiresIn: LIFETIME_JWT }, (err, token) => {
                if (err) {
                    //console.error("POST users/ :", err);
                    return res.status(500).send(err.message);
                }
                //console.log("POST users/ token:", token);
                return res.json({username:user.username, token });
            });
        } else {
            //console.log("POST users/login Error:", "Unauthentified");
            return res.status(401).send("bad email/password");
        }
    })
});
/// update user 
router.patch("/", authorize, function(req, res) {
    const userUpdated = User.updateUser(req.body.username, req.body);

    if (!userUpdated) return res.status(404).end();

    return res.json(userUpdated);
});
/* POST a new user */
router.post("/", function(req, res, next) {
    if (User.isUser(req.body.pseudo, req.body.email))
        return res.status(409).end();
    if ((req.body.password !== req.body.confpassword))
        return res.status(408).end();
    let newUser = new User(req.body.pseudo, req.body.email, req.body.password, req.body.name, req.body.fname);
    newUser.save().then(() => {
        //console.log("afterRegisterOp:", User.list);
        jwt.sign({ username: newUser.username }, jwtSecret, { expiresIn: LIFETIME_JWT }, (err, token) => {
            if (err) {
                //console.error("POST users/ :", err);
                return res.status(500).send(err.message);
            }
            console.log("POST users/ token:", token);
            return res.json({ username: newUser.username, token });
        });
    });
});
// router.get("/:username",authorize ,function (req, res, next) {
//   console.log('dans le get/'+req.params);
//   const userFound = User.getUserFromList(req.params.username);
//   if (userFound) {
//     return res.json(userFound); 
//   } else {
//     return res.status(404).send("ressource not found");
//   }
// });

/* My Account - getuserObject with username*/
router.post("/useracc", authorize, function(req, res, next) {
    //console.log('dans le post userobj/' + req.body.username);
    const userFound = User.getUserFromList(req.body.username);
    const channelCount = Channel.mychannels(req.body.username).length;

    const useracc = [userFound, channelCount];
    if (userFound) {
        return res.send({ user: useracc });
    } else {
        return res.status(404).send("ressource not found");
    }
});



/* Delete user  */
router.delete("/delete", authorize, function(req, res, next) {

    User.deleteUserFromList(req.body.username);
    //console.log(User.list());

    return res.json(req.body.username);
});

module.exports = router;