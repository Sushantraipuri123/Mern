const db = require('../models/product.model');
const uploadFile = require('../cloudinary/Cloudinary');

module.exports = {
    createProduct: async (req, res) => {
        try {
            const productImageLocalPath = req.files?.productImage[0]?.path; // Make sure you're using req.file for a single file

            if (!productImageLocalPath) {
                return res.status(400).json({ message: 'Product image is required' });
            }

            // Upload to Cloudinary
            const productImage = await uploadFile(productImageLocalPath);

            if (!productImage) {
                return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
            }

            // Create product in database
            const product = await db.create({
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productImage: productImage.url,  // Accessing the URL from Cloudinary result
                createdBy: req.body.createdBy
            });

            res.status(200).json({
                success: true,
                status: 200,
                message: "Product created successfully",
                body: product
            });
        } catch (error) {
            console.error("Product not created:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    myProducts: async (req, res) => {
        try {
            const userId = req.params.userId;

            // Find products where createdBy matches the userId
            const products = await db.find({ createdBy: userId });

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
