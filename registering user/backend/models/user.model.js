var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

module.exports = mongoose.model('User', userSchema);