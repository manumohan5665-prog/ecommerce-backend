const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/authentication");

// Signup API
router.post("/signup", signup);

module.exports = router;