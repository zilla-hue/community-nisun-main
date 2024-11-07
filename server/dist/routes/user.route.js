"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const userController = new user_controller_1.UserController();
const userRouter = (0, express_1.Router)();
// User Routes
userRouter.post('/register', userController.createUser.bind(userController)); // Register a new user
userRouter.get('/verify/:token', userController.verifyUser); // Verify the user
userRouter.get('/:id', auth_middleware_1.authMiddleware, userController.getUserById.bind(userController)); // Get user by ID (auth required)
userRouter.put('/:id', auth_middleware_1.authMiddleware, userController.updateUser.bind(userController)); // Update user details (auth required)
userRouter.delete('/:id', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(), userController.deleteUser.bind(userController)); // Delete user (auth required)
userRouter.get('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), userController.getAllUsers.bind(userController)); // Get all users (auth required)
// Activation/Deactivation Routes
userRouter.put('/:id/activate', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), userController.activateUser.bind(userController)); // Activate user
userRouter.put('/:id/deactivate', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), userController.deactivateUser.bind(userController)); // Deactivate user
userRouter.put('/:id/pend', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), userController.pendUser.bind(userController)); // Pend user membership
// Update Status Routes
userRouter.put('/:id/dues', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), userController.updateDuesPaid.bind(userController)); // Update dues paid status
userRouter.put('/:id/reg-paid', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), userController.updateRegPaid.bind(userController)); // Update registration paid status
userRouter.put('/:id/subscription', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), userController.updateSubscription.bind(userController)); // Update subscription status
userRouter.put('/:id/onboarding', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), userController.updateOnboarding.bind(userController)); // Update onboarding status
// Auth Routes
userRouter.post('/login', userController.login.bind(userController)); // User login
userRouter.post('/:id/logout', auth_middleware_1.authMiddleware, userController.logoutUser.bind(userController)); // User logout (auth required)
exports.default = userRouter;
