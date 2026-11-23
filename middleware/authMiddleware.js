const jwt = require("jsonwebtoken");

// Authentication Middleware
const authMiddleware = (req, res, next) => {
    try {
        // 1. Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        // 2. Extract token
        const token = authHeader.split(" ")[1];

        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Store user information in request
        req.user = decoded;

        // 5. Allow next operation
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};


// Role-Based Authorization Middleware
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        // Check whether user has an allowed role
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access forbidden. You do not have permission."
            });
        }

        next();
    };
};


module.exports = {
    authMiddleware,
    authorizeRoles
};