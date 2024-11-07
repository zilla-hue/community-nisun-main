"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalDetails = void 0;
const mongoose_1 = require("mongoose");
const additionalDetailsSchema = new mongoose_1.Schema({
    middleName: { type: String },
    picture: { type: String },
    address: { type: String },
    updatedBy: { type: String },
    birthDate: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    postcode: { type: String },
    nationality: { type: String },
    state: { type: String },
    occupation: { type: String },
    lga: { type: String },
    nokFirstName: { type: String },
    nokLastName: { type: String },
    nokEmail: { type: String, unique: true },
    nokPhone: { type: String },
    nokGender: { type: String },
    nokNationality: { type: String },
    nokAddress: { type: String },
    nokPostcode: { type: String },
    customerId: { type: String, unique: true },
}, { timestamps: true });
exports.AdditionalDetails = (0, mongoose_1.model)('AdditionalDetails', additionalDetailsSchema);
