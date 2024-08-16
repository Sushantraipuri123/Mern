const db = require('../models/product.model');

module.exports = {

    createProduct : async (req,res)=>{
        try {
            const CreatorID = req.body.createdBy
            const stringId =  CreatorID.toString();
            const product = await db.create({
                productName:req.body.productName,
                productPrice:req.body.productPrice,
                createdBy:stringId
            })
            res.status(200).json({
                success:true,
                status:200,
                message:"Product created successfully",
                body:product
            })
        } catch (error) {
            console.log("Product not created",error)
        }
    },

    myProducts: async (req, res) => {
        try {
            const userId = req.params.userId;
    
            // Find products where createdBy matches the userId
            const products = await Product.find({ createdBy: userId });
    
            if (!products || products.length === 0) {
                return res.status(404).json({ message: 'No products found for this user' });
            }
    
            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}