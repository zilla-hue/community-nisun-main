"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const mongoose_1 = require("mongoose");
const subscriptionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    planId: { type: String, required: true },
    price: { type: Number, default: 0 },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
}, { timestamps: true });
exports.Subscription = (0, mongoose_1.model)('Subscription', subscriptionSchema);
