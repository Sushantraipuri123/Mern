var db = require('../models/user.model');
const bcrypt = require('bcrypt');


module.exports = {
// ======================= user register logic =================
    createUser : async (req,res)=>{
        try {

            const exsistingUser = await db.findOne({email:req.body.email});

            // const existingNumber = await db.findOne({phone:req.body.phone});
            

            if(exsistingUser){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"Email already exists",
                })
            }

            // if(existingNumber){
            //     return res.status(400).json({
            //         success:false,
            //         status:400,
            //         message:"Number already exists",
            //     })
            // }


            // hash the password //

            // const hashedPsssword = await bcrypt.hash(req.body.password , saltRounds);

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
                body:user,
                token : await user.generateToken(),
                userId : user._id.toString()
            })
        } catch (error) {
            console.log(error);
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await db.find();
            res.status(200).json({
                success: true,
                status: 200,
                message: "Users fetched successfully",
                body: user
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                status: 500,
                message: "An error occurred while fetching users",
                error: error.message
            });
        }
    },


// ======================= user login logic =================

loginUser : async (req,res)=>{
    try {
        const {email , password} = req.body;
        const userExist = await db.findOne({email});

        if(!userExist){
            return res.status(404).json({
                success:false,
                status:404,
                message:"Invalid Cridential",
            })
        }

        const user = await  bcrypt.compare(password, userExist.password)

        if(user){
            res.status(200).json({
                success:true,
                status:200,
                message:"Login Sucessfull",
                body:user,
                token : await userExist.generateToken(),
                userId : user._id.toString()
            })
        }else{
            return res.status(401).json({
                success:false,
                status:401,
                message:"Invalid Cridential",
            })  
        }


    } catch (error) {
        res.status(500).json("internal error", error);
    }
}

}