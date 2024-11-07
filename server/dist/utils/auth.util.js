"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenBlacklisted = exports.blacklistToken = exports.generateResetOrVerificationToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const secretKey = process.env.JWT_SECRET || 'fallbacksecret';
// In-memory blacklist (consider using a database for persistence)
const tokenBlacklist = new Set();
// Generates JWT token for user authentication
const generateToken = (userId, role) => {
    const payload = { id: userId, role: role };
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if ((0, exports.isTokenBlacklisted)(token)) {
            throw new Error('Token is blacklisted');
        }
        return decoded;
    }
    catch (error) {
        console.error('Token verification error:', error.message);
        return null;
    }
};
exports.verifyToken = verifyToken;
// Generates a secure random token and expiration time
const generateResetOrVerificationToken = () => {
    const token = crypto_1.default.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour expiration time
    return { token, expiresAt };
};
exports.generateResetOrVerificationToken = generateResetOrVerificationToken;
// Blacklist a token
const blacklistToken = (token) => {
    tokenBlacklist.add(token);
};
exports.blacklistToken = blacklistToken;
// Check if a token is blacklisted
const isTokenBlacklisted = (token) => {
    return tokenBlacklist.has(token);
};
exports.isTokenBlacklisted = isTokenBlacklisted;
