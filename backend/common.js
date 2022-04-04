// This js hold all common function that are used in different backend js

let User = require("./models/user.model");
// Converting UserId to corresponding ObjectId
var getUserObjectId = async(userId)=>{
    var writerId = ""
    try{
        const response = await User.findOne({userId:userId});
        if (response !=null){writerId = response._id}
    }catch(err){
        console.log(err)
    }
    return writerId;
}

// Obtaining username from userId
const getUsername = async (userId) => {
    const username = "";
    try{
        const response = await User.findOne({userId:userId});
        if (response != null) 
            {username = response.username}
    } catch(err) {
        console.log(err);
    }
    return username;
}

module.exports = getUserObjectId