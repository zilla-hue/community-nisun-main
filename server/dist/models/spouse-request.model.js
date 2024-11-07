"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpouseRequest = void 0;
const mongoose_1 = require("mongoose");
const spouseRequestSchema = new mongoose_1.Schema({
    senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: 'PENDING' },
}, { timestamps: true });
exports.SpouseRequest = (0, mongoose_1.model)('SpouseRequest', spouseRequestSchema);
