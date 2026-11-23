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


// Get product recommendations based on customer's previous orders
const getProductRecommendations = async (req, res) => {
  try {
    // Get the customer's previous orders
    const orders = await Order.find({
      user: req.user.id,
      status: { $ne: "cancelled" }
    });

    if (orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No order history available for recommendations",
        recommendations: []
      });
    }

    // Collect product IDs purchased by the customer
    const purchasedProductIds = [
      ...new Set(
        orders.flatMap(order =>
          order.items.map(item => item.product.toString())
        )
      )
    ];

    // Find other customers' orders containing those products
    const relatedOrders = await Order.find({
      user: { $ne: req.user.id },
      status: { $ne: "cancelled" },
      "items.product": { $in: purchasedProductIds }
    });

    // Collect related product IDs
    const recommendedIds = [
      ...new Set(
        relatedOrders.flatMap(order =>
          order.items.map(item => item.product.toString())
        )
      )
    ].filter(id => !purchasedProductIds.includes(id));

    // Find recommended products
    const recommendations = await Product.find({
      _id: { $in: recommendedIds },
      stock: { $gt: 0 }
    }).limit(10);

    return res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations
    });

  } catch (error) {
    console.error("Product Recommendations Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  getDashboardAnalytics,
  getProductRecommendations
};