"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    duesId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Dues', required: true },
    price: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    size: { type: String },
    orderDate: { type: Date, default: Date.now },
    shippingAddressId: { type: String },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
