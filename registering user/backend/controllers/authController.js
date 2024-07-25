var db = require('../models/user.model');

module.exports = {

    createUser : async (req,res)=>{
        try {

            const exsistingUser = await db.findOne({email:req.body.email});

            if(exsistingUser){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"Email already exists",
                })
            }
            
            const user = await  db.create({
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