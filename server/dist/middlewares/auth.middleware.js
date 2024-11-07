"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_util_1 = require("../utils/auth.util");
// Middleware to check authentication and decode JWT token
const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).json({ status: 'failed', message: 'Authorization header missing' });
        return;
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ status: 'failed', message: 'Token missing' });
        return;
    }
    const decodedUser = (0, auth_util_1.verifyToken)(token); // Try to verify the token
    if (!decodedUser) {
        res.status(401).json({ status: 'failed', message: 'Token verification failed' });
        return;
    }
    // Check if the token is blacklisted
    if ((0, auth_util_1.isTokenBlacklisted)(token)) {
        res.status(401).json({ status: 'failed', message: 'Token is blacklisted' });
        return;
    }
    req.user = decodedUser; // Attach user data to request
    next(); // Proceed to the next middleware/route
};
exports.authMiddleware = authMiddleware;
