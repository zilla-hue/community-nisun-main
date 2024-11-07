"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Child = void 0;
const mongoose_1 = require("mongoose");
const childSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
}, { timestamps: true });
exports.Child = (0, mongoose_1.model)('Child', childSchema);
