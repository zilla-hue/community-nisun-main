import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { roleMiddleware } from '../middlewares/role.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const userController = new UserController();
const userRouter = Router();

// Auth Routes
userRouter.get('/check-auth', authMiddleware, userController.checkAuth.bind(userController)); // Check authentication
userRouter.post('/login', userController.login.bind(userController)); // User login
userRouter.post('/logout', userController.logoutUser.bind(userController)); // User logout (auth required)
userRouter.post('/forgot-password', userController.forgotPassword.bind(userController)); // Forgot password
userRouter.post('/reset-password/:token', userController.resetPassword.bind(userController)); // Reset password

// User Routes
userRouter.post('/register', userController.createUser.bind(userController)); // Register a new user
userRouter.post('/verify/:code', userController.verifyUser.bind(userController)); // Verify the user
userRouter.get('/:id', authMiddleware, userController.getUserById.bind(userController)); // Get user by ID (auth required)
userRouter.put('/:id', authMiddleware, userController.updateUser.bind(userController)); // Update user details (auth required)
userRouter.delete('/:id', authMiddleware, roleMiddleware(), userController.deleteUser.bind(userController)); // Delete user (auth required)
userRouter.get('/', authMiddleware, roleMiddleware(['Admin']), userController.getAllUsers.bind(userController)); // Get all users (auth required)

// Activation/Deactivation Routes
userRouter.put('/:id/activate', authMiddleware, roleMiddleware(['Admin']), userController.activateUser.bind(userController)); // Activate user
userRouter.put('/:id/deactivate', authMiddleware, roleMiddleware(['Admin']), userController.deactivateUser.bind(userController)); // Deactivate user
userRouter.put('/:id/pend', authMiddleware, roleMiddleware(['Admin']), userController.pendUser.bind(userController)); // Pend user membership

// Update Status Routes
userRouter.put('/:id/dues', authMiddleware, roleMiddleware(['Admin']), userController.updateDuesPaid.bind(userController)); // Update dues paid status
userRouter.put('/:id/reg-paid', authMiddleware, roleMiddleware(['Admin']), userController.updateRegPaid.bind(userController)); // Update registration paid status
userRouter.put('/:id/subscription', authMiddleware, roleMiddleware(['Admin']), userController.updateSubscription.bind(userController)); // Update subscription status
userRouter.put('/:id/onboarding', authMiddleware, roleMiddleware(['Admin']), userController.updateOnboarding.bind(userController)); // Update onboarding status


// New Auth Routes


export default userRouter;
