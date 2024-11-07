"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetToken = void 0;
const mongoose_1 = require("mongoose");
const passwordResetTokenSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    token: { type: String, unique: true, required: true },
    expires: { type: Date, required: true },
}, { timestamps: true });
exports.PasswordResetToken = (0, mongoose_1.model)('PasswordResetToken', passwordResetTokenSchema);
