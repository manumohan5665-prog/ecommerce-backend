const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authenticationRoutes = require("./routes/authenticationRoutes");
const {
    authMiddleware,
    authorizeRoles
} = require("./middleware/authMiddleware");
const productRoutes = require("./routes/productRoutes");

const connectDB = require("./config/dbConnection");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authenticationRoutes);
app.use("/api/products", productRoutes);

// Protected test route
app.get("/api/test-protected", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "You have accessed a protected route!",
        user: req.user
    });
});

// Admin-only test route
app.get(
    "/api/test-admin",
    authMiddleware,
    authorizeRoles("admin"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome Admin!"
        });
    }
);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "E-Commerce Backend API is running!"
    });
});

// Start server after database connection
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();