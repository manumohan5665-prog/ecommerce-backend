const express = require("express");
const router = express.Router();

const {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    getUserById
} = require("../controllers/userProfileController");

const {
    authMiddleware,
    authorizeRoles
} = require("../middleware/authMiddleware");

// Get logged-in user's profile
router.get("/profile", authMiddleware, getMyProfile);

// Update logged-in user's profile
router.put("/profile", authMiddleware, updateMyProfile);

// Admin: Get all users
router.get("/", authMiddleware, authorizeRoles("admin"), getAllUsers);

// Admin: Get user by ID
router.get("/:id", authMiddleware, authorizeRoles("admin"), getUserById);

module.exports = router;