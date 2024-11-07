"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const auth_util_1 = require("../utils/auth.util");
const userService = new user_service_1.UserService();
class UserController {
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            // Improved error handling for duplicate key error
            if (error.code === 11000) {
                const field = Object.keys(error.keyValue)[0];
                const value = error.keyValue[field];
                res.status(400).json({ error: `Duplicate value for field: ${field} with value: ${value}` });
            }
            else {
                res.status(400).json({ error: error.message });
            }
        }
    }
    async verifyUser(req, res) {
        try {
            const user = await userService.verifyUser(req.params.token);
            res.status(200).json({
                status: 'success',
                message: 'Email verified successfully',
                user,
            });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            else {
                res.status(200).json(user);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateUser(req, res) {
        try {
            const updatedUser = await userService.updateUser(req.params.id, req.body);
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
            }
            else {
                res.status(200).json(updatedUser);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteUser(req, res) {
        try {
            const deletedUser = await userService.deleteUser(req.params.id);
            if (!deletedUser) {
                res.status(404).json({ message: 'User not found' });
            }
            else {
                res.status(200).json({ message: 'User deleted successfully' });
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Login method
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await userService.login(email, password);
            res.status(200).json({ user, token });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Logout method
    async logoutUser(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the header
            if (token) {
                (0, auth_util_1.blacklistToken)(token); // Blacklist the token
            }
            res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
            res.status(200).json({
                status: 'success',
                message: 'Logged out successfully',
            });
        }
        catch (error) {
            res.status(500).json({ status: 'failed', error: error.message });
        }
    }
    // Activate user
    async activateUser(req, res) {
        try {
            const activatedUser = await userService.activateUser(req.params.id);
            if (!activatedUser) {
                res.status(404).json({ message: 'User not found' });
            }
            else {
                res.status(200).json(activatedUser);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Deactivate user
    async deactivateUser(req, res) {
        try {
            const deactivatedUser = await userService.deactivateUser(req.params.id);
            if (!deactivatedUser) {
                res.status(404).json({ message: 'User not found' });
            }
            else {
                res.status(200).json(deactivatedUser);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Pend user membership
    async pendUser(req, res) {
        try {
            const pendingUser = await userService.pendUser(req.params.id);
            if (!pendingUser) {
                res.status(404).json({ message: 'User not found' });
            }
            else {
                res.status(200).json(pendingUser);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Update dues paid status
    async updateDuesPaid(req, res) {
        try {
            const { duesPaid } = req.body; // Expecting a boolean value
            const updatedUser = await userService.updateDuesPaid(req.params.id, duesPaid);
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
            }
            else {
                res.status(200).json(updatedUser);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Update registration paid status
    async updateRegPaid(req, res) {
        try {
            const { regPaid } = req.body;
            console.log('Received regPaid:', regPaid); // Log the incoming value
            const updatedUser = await userService.updateRegPaid(req.params.id, regPaid);
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
            }
            else {
                res.status(200).json(updatedUser);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Update subscription status
    async updateSubscription(req, res) {
        try {
            const { isSubscribed } = req.body; // Expecting a boolean value
            const updatedUser = await userService.updateSubscription(req.params.id, isSubscribed);
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
            }
            else {
                res.status(200).json(updatedUser);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Update onboarding status
    async updateOnboarding(req, res) {
        try {
            const { isOnboarded } = req.body; // Expecting a boolean value
            const updatedUser = await userService.updateOnboarding(req.params.id, isOnboarded);
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
            }
            else {
                res.status(200).json(updatedUser);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.UserController = UserController;
