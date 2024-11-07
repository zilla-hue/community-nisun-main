"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetTokenService = void 0;
const password_reset_token_model_1 = require("../models/password-reset-token.model");
class PasswordResetTokenService {
    async createToken(tokenData) {
        const token = new password_reset_token_model_1.PasswordResetToken(tokenData);
        return await token.save();
    }
    async getTokenById(tokenId) {
        return await password_reset_token_model_1.PasswordResetToken.findById(tokenId).exec();
    }
    async updateToken(tokenId, updateData) {
        return await password_reset_token_model_1.PasswordResetToken.findByIdAndUpdate(tokenId, updateData, { new: true }).exec();
    }
    async deleteToken(tokenId) {
        return await password_reset_token_model_1.PasswordResetToken.findByIdAndDelete(tokenId).exec();
    }
    async getAllTokens() {
        return await password_reset_token_model_1.PasswordResetToken.find().exec();
    }
}
exports.PasswordResetTokenService = PasswordResetTokenService;
