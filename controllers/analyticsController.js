const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

const getDashboardAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        const pendingOrders = await Order.countDocuments({
            status: "pending"
        });

        const revenueResult = await Order.aggregate([
            {
                $match: {
                    status: { $ne: "cancelled" }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ]);

        const totalRevenue = revenueResult.length > 0
            ? revenueResult[0].totalRevenue
            : 0;

        return res.status(200).json({
            success: true,
            analytics: {
                totalUsers,
                totalProducts,
                totalOrders,
                pendingOrders,
                totalRevenue
            }
        });

    } catch (error) {
        console.error("Dashboard Analytics Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};