const express = require("express");
const router = express.Router();

const {
    createProduct,
    getAllProducts
} = require("../controllers/productController");
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

// Get All Products (Public)
router.get(
    "/",
    getAllProducts
);

module.exports = router;