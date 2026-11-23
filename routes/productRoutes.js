const express = require("express");
const router = express.Router();

const { createProduct } = require("../controllers/productController");

const {
  authMiddleware,
  authorizeRoles
} = require("../middleware/authMiddleware");

// Create Product (Admin only)
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createProduct
);

module.exports = router;