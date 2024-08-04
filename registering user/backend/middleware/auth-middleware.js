const jwt =  require('jsonwebtoken')
const User = require('../models/user.model')
const authMiddleware = async (req, res, next) =>{
    const token = req.header('Authorization');

    if(!token){
       return res
       .status(401)
       .json({message:"unaitherized token"})
    }

    console.log("token from auth middleware0", token);

    const jwtToken = token.replace('brearer',"").trim();

    try {
        
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY )

        const userData = await User.findOne({email:isVerified.email}).select({password:0})
        console.log(userData );
        
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        
        next()
    } catch (error) {
        return res
       .status(401)
       .json({message:"unaitherized token"})
    }
    
}

module.exports = authMiddleware