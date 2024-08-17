var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        // required: true
    },
    productPrice:{
        type: Number,
        // required: true
    },
    productImage:{
        type: String,
        // required: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{timestamps: true});

// Ensure creatorName and creatorId are populated from the User document
productSchema.pre('save', async function(next) {
    if (this.isModified('createdBy')) {
        const user = await mongoose.model('User').findById(this.createdBy);
        if (user) {
            console.log('User Data:', user); // Log user data here
            this.creatorName = user.username; 
            this.creatorId = user._id;
        }
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);