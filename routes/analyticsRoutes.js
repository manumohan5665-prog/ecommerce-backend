const express = require("express");
const router = express.Router();

const {
  getDashboardAnalytics,
  getProductRecommendations,
  exportRecommendationDataset
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

// Admin: Export recommendation dataset
router.get(
  "/dataset",
  authMiddleware,
  authorizeRoles("admin"),
  exportRecommendationDataset
);

// Export router
module.exports = router;