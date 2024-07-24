var db = require('../models/user.models');

module.exports = {
    createUSer : async (req,res)=>{
        try {
            const user = new db.create({
                username:req.body.username,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password
            });

            res.status(200).json({
                success:true,
                status:200,
                message:"User Created ",
                body:user
            })
        } catch (error) {
            console.log(error);
        }
    }
}