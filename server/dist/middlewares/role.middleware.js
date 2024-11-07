"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const user_model_1 = require("../models/user.model"); // Import User model
const roleMiddleware = (requiredRoles = []) => {
    return async (req, res, next) => {
        try {
            const userId = req.user?.id; // Get user ID from the request
            console.log(`userId: ${userId}`);
            if (!userId) {
                res.status(401).json({ error: 'Unauthorized: No user logged in' });
                return;
            }
            const user = await user_model_1.User.findById(userId).populate('role'); // Fetch the user with the role
            if (!user || !user.role) {
                res.status(403).json({ error: 'Access denied: User not found or no role assigned' });
                return;
            }
            const hasRole = requiredRoles.includes(user.role.name); // Check if user's role matches
            if (!hasRole) {
                res.status(403).json({ error: 'Access denied: Insufficient permissions' });
                return;
            }
            return next(); // User has the required role
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    };
};
exports.roleMiddleware = roleMiddleware;
