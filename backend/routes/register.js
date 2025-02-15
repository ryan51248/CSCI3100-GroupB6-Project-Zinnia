const router = require('express').Router();
const bcrypt = require('bcrypt')
let User = require("../models/user.model")
const mongoose = require("mongoose");
let Token = require("../models/token.model")
const crypto = require('crypto');
const nodemailer = require('nodemailer');




//1. register [done]
//2. send email
//3. email verification

//register
//input: username, email, password
router.post("/register", async (req,res) => {
    //console.log(req.body)
    
    //check existed username or email 
    const userExisted = await User.findOne({username: req.body.username})
    if (userExisted != null) return res.status(400).json({msg: "username existed."})

    const emailExisted = await User.findOne({email: req.body.email})
    if (emailExisted != null) return res.status(400).json({msg: "email existed."})

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    //assign user id
    var currentId = 1;
    User.findOne().sort({userId:-1}).exec(function(err,user){
        if(user!=null){currentId= user.userId +1}
        User.create({
            _id: new mongoose.Types.ObjectId(),
            userId: currentId,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            photo: req.body.photo
        },function(err, results){
            if (err){
                res.json(Object.keys(err.keyPattern))
            }else{
                //res.json("Account created ")
                //console.log("created")

                //generate token
                var token = new Token({
                    _id: results._id,
                    token: crypto.randomBytes(16).toString('hex')
                })
                token.save ((err) => {
                    if(err){ 
                        return res.json({msg: "token fail"})
                        //return res.status(500).send({msg: err.message});
                    }

                    //send verification email
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: process.env.AUTH_EMAIL,
                            pass: process.env.AUTH_PASSWORD
                        }
                    })
            
                    var mailOptions = { 
                        from: process.env.AUTH_EMAIL, 
                        to: results.email,
                        //to: "leoleung337.jp@gmail.com", 
                        subject: 'Account Verification Link', 
                        text: 'Hello '+',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/localhost:8080\/verify\/' + results.email + '\/' + token.token + '\n\nThank You!\n' };
                        transporter.sendMail(mailOptions, function (err) {
                        if (err) { 
                            return res.status(500).json({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                         }
                        return res.status(200).json({msg:'A verification email has been sent to ' + results.email + '. It will be expire after one day. If you not get verification Email click on resend token.'});
                    });
                })
            } 
            
        })
    })
   

})


/* router.post("/register", async (req, res) =>{


        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(req.body)
        //var currentId = 1;
        //User.findOne().sort({userId:-1})
        //if(User!=null){currentId= User.userId +1}
        User.create({
            //userId: currentId,
            userId: req.body.userId,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })
        res.json("Account created ")
        console.log("created")
    
}) */


module.exports = router;