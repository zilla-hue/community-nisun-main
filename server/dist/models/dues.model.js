"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dues = void 0;
const mongoose_1 = require("mongoose");
const duesSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    isArchived: { type: Boolean, default: false },
}, { timestamps: true });
exports.Dues = (0, mongoose_1.model)('Dues', duesSchema);
