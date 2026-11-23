const Product = require("../models/product");

// Create Product Controller
const createProduct = async (req, res) => {
    try {
        // 1. Get product details from request body
        const {
            name,
            description,
            price,
            category,
            stock,
            image
        } = req.body;

        // 2. Validate required fields
        if (!name || !description || price === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, description, price and category"
            });
        }

        // 3. Create product in MongoDB
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image
        });

        // 4. Send response
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error("Create Product Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Get All Products Controller
const getAllProducts = async (req, res) => {
    try {
        // Retrieve all products from MongoDB
        const products = await Product.find();

        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        console.error("Get Products Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


const mongoose = require("mongoose");

// Get Single Product Controller
const getProductById = async (req, res) => {
    try {
        // 1. Get product ID from URL
        const { id } = req.params;

        // 2. Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        // 3. Find product in MongoDB
        const product = await Product.findById(id);

        // 4. Check whether product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // 5. Send product response
        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.error("Get Product Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = { createProduct, getAllProducts, getProductById };