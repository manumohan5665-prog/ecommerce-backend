const express = require("express");
const router = express.Router();

const {
    getMyProfile,
    updateMyProfile
} = require("../controllers/userProfileController");

const {
    authMiddleware
} = require("../middleware/authMiddleware");

// Get logged-in user's profile
router.get("/profile", authMiddleware, getMyProfile);

// Update logged-in user's profile
router.put("/profile", authMiddleware, updateMyProfile);

module.exports = router;