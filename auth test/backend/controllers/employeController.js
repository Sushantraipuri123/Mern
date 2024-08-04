var db = require('../models/user.model');

module.exports={
    createEmploye : async(req,res)=>{
       try {
        const employe = await db.create({
            employename:req.body.employename,
            employeid:req.body.employeid,
        })

        res.status(200).json({
            success:true,
            status:200,
            message:"employe Created ",
            body:employe
        })
       } catch (error) {
        console.log(error);
        
       }
    }
}