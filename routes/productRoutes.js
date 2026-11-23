const express = require("express");
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
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

// Update Product (Admin only)
router.put(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    updateProduct
);

// Delete Product (Admin only)
router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    deleteProduct
);

module.exports = router;