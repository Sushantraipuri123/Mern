var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    })
    ;


    // ===============used pre function as a middlewere function to hash my pass word 
    
    userSchema.pre('save', async function(next){
       console.log('pre data', this);

       if(!this.isModified('password')){
            return next();
       }

       const user = this;
       const saltRounds = 10;
       const hashedPsssword = await bcrypt.hash(user.password , saltRounds);
       user.password = hashedPsssword;
    })

    // ===============used pre function as a middlewere function to generate jwt tokken

   userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userID: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
    process.env.JWT_SECRET_KEY,
        { expiresIn: '30d' }  //  expiry time
    )
    } catch (error) {
        console.log(error);
        throw new Error('Failed to generate token')
    }
   }



module.exports = mongoose.model('User', userSchema);