const express = require("express");
const router = express.Router();

const {
  getDashboardAnalytics,
  getProductRecommendations
} = require("../controllers/analyticsController");

const {
  authMiddleware,
  authorizeRoles
} = require("../middleware/authMiddleware");


// Admin: Get dashboard analytics
router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("admin"),
  getDashboardAnalytics
);

// User: Get personalized product recommendations
router.get(
  "/recommendations",
  authMiddleware,
  getProductRecommendations
);

// Export router
module.exports = router;