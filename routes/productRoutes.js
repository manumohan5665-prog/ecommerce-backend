const express = require("express");
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById
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

// Get Single Product (Public)
router.get("/:id", getProductById);

module.exports = router;