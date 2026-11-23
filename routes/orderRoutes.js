const express = require("express");
const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} = require("../controllers/orderController");

const {
    authMiddleware,
    authorizeRoles
} = require("../middleware/authMiddleware");


// User: Create a new order
router.post(
    "/",
    authMiddleware,
    createOrder
);

// User: Get their own orders
router.get(
    "/my-orders",
    authMiddleware,
    getMyOrders
);

// Admin: Get all orders
router.get(
    "/",
    authMiddleware,
    authorizeRoles("admin"),
    getAllOrders
);


// Get a specific order by ID
router.get(
  "/:id",
  authMiddleware,
  getOrderById
);

// Admin: Update order status
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateOrderStatus
);

// Admin: Delete an order
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteOrder
);

// Export router
module.exports = router;
