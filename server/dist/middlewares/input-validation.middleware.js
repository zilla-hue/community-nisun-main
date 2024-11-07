"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDues = void 0;
const joi_1 = __importDefault(require("joi"));
const duesSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    isArchived: joi_1.default.boolean().default(false),
});
const validateDues = (req, res, next) => {
    const { error } = duesSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return; // Ensure the function returns void after sending the response
    }
    next(); // Call next if validation passes
};
exports.validateDues = validateDues;
