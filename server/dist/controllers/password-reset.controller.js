"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetController = void 0;
const password_reset_token_service_1 = require("../services/password-reset-token.service");
const passwordResetService = new password_reset_token_service_1.PasswordResetTokenService();
class PasswordResetController {
    async createPasswordReset(req, res) {
        try {
            const passwordReset = await passwordResetService.createToken(req.body);
            res.status(201).json(passwordReset);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getPasswordResetById(req, res) {
        try {
            const passwordReset = await passwordResetService.getTokenById(req.params.id);
            if (!passwordReset) {
                return res.status(404).json({ message: 'Password reset request not found' });
            }
            res.status(200).json(passwordReset);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updatePasswordReset(req, res) {
        try {
            const updatedPasswordReset = await passwordResetService.updateToken(req.params.id, req.body);
            if (!updatedPasswordReset) {
                return res.status(404).json({ message: 'Password reset request not found' });
            }
            res.status(200).json(updatedPasswordReset);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deletePasswordReset(req, res) {
        try {
            const deletedPasswordReset = await passwordResetService.deleteToken(req.params.id);
            if (!deletedPasswordReset) {
                return res.status(404).json({ message: 'Password reset request not found' });
            }
            res.status(200).json({ message: 'Password reset request deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllPasswordResets(req, res) {
        try {
            const passwordResets = await passwordResetService.getAllTokens();
            res.status(200).json(passwordResets);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.PasswordResetController = PasswordResetController;
