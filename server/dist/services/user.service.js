"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const role_model_1 = require("../models/role.model"); // Import Role model
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_util_1 = require("../utils/auth.util");
const email_util_1 = require("../utils/email.util"); // Import the email utility for sending verification
const crypto_1 = __importDefault(require("crypto")); // For generating verification tokens
class UserService {
    async createUser(userData) {
        // Check if phoneNumber is provided and not null
        if (!userData.phoneNumber || userData.phoneNumber === null) {
            throw new Error('Phone number is required and cannot be null.');
        }
        // Check if the email already exists in the database
        const existingUser = await user_model_1.User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error(`Email ${userData.email} already exists.`);
        }
        // Hash the password before saving the user
        const saltRounds = 10;
        const hashedPassword = await bcryptjs_1.default.hash(userData.hashedPassword, saltRounds);
        // Generate a verification token
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        const verificationTokenExpires = Date.now() + 3600000; // Token expires in 1 hour
        // Create a new user with the hashed password and verification token
        const user = new user_model_1.User({
            ...userData,
            hashedPassword: hashedPassword,
            isVerified: false, // Set to false initially
            verificationToken,
            verificationTokenExpires,
        });
        // Save the user
        await user.save();
        // Send verification email
        await (0, email_util_1.sendVerificationEmail)(user.email, verificationToken);
        return user;
    }
    async getUserById(userId) {
        return await user_model_1.User.findById(userId).exec();
    }
    async updateUser(userId, updateData) {
        return await user_model_1.User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    }
    async deleteUser(userId) {
        return await user_model_1.User.findByIdAndDelete(userId).exec();
    }
    async getAllUsers() {
        return await user_model_1.User.find().exec();
    }
    // Login method
    async login(email, password) {
        const user = await user_model_1.User.findOne({ email }).exec();
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        if (!user.isVerified) {
            throw new Error('Please verify your email to login.');
        }
        // Fetch the role name from the Role model
        const userRole = await role_model_1.Role.findById(user.role);
        if (!userRole) {
            throw new Error('User role not found');
        }
        const token = (0, auth_util_1.generateToken)(user.id.toString(), userRole.name);
        return { user, token };
    }
    // Assign role by name
    async assignRole(userId, roleName) {
        const role = await role_model_1.Role.findOne({ name: roleName });
        if (!role) {
            throw new Error(`Role ${roleName} not found`);
        }
        return await user_model_1.User.findByIdAndUpdate(userId, { role: role._id }, { new: true }).exec();
    }
    // Activate a user
    async activateUser(userId) {
        return await user_model_1.User.findByIdAndUpdate(userId, { membershipStatus: 'ACTIVE' }, { new: true }).exec();
    }
    // Deactivate a user
    async deactivateUser(userId) {
        return await user_model_1.User.findByIdAndUpdate(userId, { membershipStatus: 'INACTIVE' }, { new: true }).exec();
    }
    // Pend a user's membership
    async pendUser(userId) {
        return await user_model_1.User.findByIdAndUpdate(userId, { membershipStatus: 'PENDING' }, { new: true }).exec();
    }
    // Update dues paid status
    async updateDuesPaid(userId, duesPaid) {
        return await user_model_1.User.findByIdAndUpdate(userId, { duesPaid }, { new: true }).exec();
    }
    // Update registration paid status
    async updateRegPaid(userId, regPaid) {
        // Proceed with the update if validation passes
        return await user_model_1.User.findByIdAndUpdate(userId, { regPaid: regPaid }, { new: true }).exec();
    }
    // Update subscription status
    async updateSubscription(userId, isSubscribed) {
        return await user_model_1.User.findByIdAndUpdate(userId, { isSubscribed }, { new: true }).exec();
    }
    // Update onboarding status
    async updateOnboarding(userId, isOnboarded) {
        return await user_model_1.User.findByIdAndUpdate(userId, { isOnboarded }, { new: true }).exec();
    }
    async verifyUser(token) {
        const user = await user_model_1.User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: new Date() }, // Token is still valid
        }).exec();
        if (!user) {
            throw new Error('Invalid or expired token.');
        }
        // Update user status to verified
        user.isVerified = true;
        user.verificationToken = undefined; // Remove the token
        user.verificationTokenExpires = undefined; // Remove token expiry
        await user.save();
        return user;
    }
}
exports.UserService = UserService;
