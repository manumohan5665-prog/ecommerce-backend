const Order = require("../models/order");
const Product = require("../models/product");
const mongoose = require("mongoose");

const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress } = req.body;

        // Validate request body
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one product is required"
            });
        }

        if (!shippingAddress || !shippingAddress.trim()) {
            return res.status(400).json({
                success: false,
                message: "Shipping address is required"
            });
        }

        let totalAmount = 0;
        const orderItems = [];

        // Validate products and calculate total
        for (const item of items) {
            if (!mongoose.Types.ObjectId.isValid(item.product)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product ID"
                });
            }

            if (!Number.isInteger(item.quantity) || item.quantity < 1) {
                return res.status(400).json({
                    success: false,
                    message: "Quantity must be a positive integer"
                });
            }

            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`
                });
            }

            const itemTotal = product.price * item.quantity;
            totalAmount += itemTotal;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        // Save order
        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            totalAmount,
            shippingAddress
        });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.error("Create Order Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};