"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBooleanField = void 0;
const validateBooleanField = (field, fieldName) => {
    if (typeof field === 'string') {
        if (field.toLowerCase() === 'true') {
            field = true;
        }
        else if (field.toLowerCase() === 'false') {
            field = false;
        }
        else {
            throw new Error(`${fieldName} must be a boolean value`);
        }
    }
    if (typeof field !== 'boolean') {
        throw new Error(`${fieldName} must be a boolean value`);
    }
};
exports.validateBooleanField = validateBooleanField;
