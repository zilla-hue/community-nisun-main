"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Membership = void 0;
const mongoose_1 = require("mongoose");
const membershipSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    startDate: { type: Date, default: Date.now },
    duesPaid: { type: Number, default: 0 },
    duesDue: { type: Number, default: 0 },
}, { timestamps: true });
exports.Membership = (0, mongoose_1.model)('Membership', membershipSchema);
