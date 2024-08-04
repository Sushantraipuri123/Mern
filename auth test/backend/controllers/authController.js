var db = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports ={
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
           
            const user = await db.create({
                username:req.body.username,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password
            })

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

    loginUser : async (req,res)=>{
        try {
            const {email, password} = req.body

            const userExist = await db.findOne({email})

            if(!userExist){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"invalid credentials"
                })
            }

                const isPasswordMatch = await bcrypt.compare(password , userExist.password)

                if(isPasswordMatch){
                    //generate token 
                    const token = await userExist.generateToken();
                    return res.status(200).json({ 
                        success: true,
                        status: 200,
                        message: "Login Successful",
                        token: token,
                        userId: userExist._id.toString()
                    });
                }  else {
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        message: "Invalid Credentials",
                    });
                }
                
        } catch (error) {
            return res.status(500).json({
                success: false,
                status: 500,
                message: "Internal Server Error",
                error: error.message // Or error.toString() if you prefer
            });
        }
    },

     findUser : async (req, res) => {
        try {
            const user = await db.findOne({
                email: req.body.email
            });
            
            if (user) {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "User found",
                    body: user
                });
            }else{
                return res.status(400).json({message:"user not found"})
            }
          
        } catch (error) {
            console.error("Error finding user", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}