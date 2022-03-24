const router = require('express').Router();
let User = require("../models/user.model")
let Token = require("../models/token.model")



router.get("/verify/:email/:token", (req, res) => {
    Token.findOne({token: req.params.token}, (err, token) => {
        if (!token){
            return res.status(400).send({msg: "Wrong Token!"})
        }
        else{
            User.findOne({_id: token._id, email: req.params.email}, (err, user) => {
                if(!user){
                    return res.status(401).send({msg: "We cannot find this user for verfication. Please register!"})
                }
                else if (user.isVerified){
                    return res.status(200).send('User has been already verified. Please Login');
                }
                else{
                    user.isVerified = true;
                    user.save(() => {
                        if (err){
                            return res.status(500).send({msg: err.message});
                        }
                        else{
                            return res.status(200).send('Your account has been successfully verified');

                        }
                    })
                }
            })
        }
    })
})

module.exports = router;