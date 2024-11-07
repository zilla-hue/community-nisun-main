"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalDetailsService = void 0;
const additional_details_model_1 = require("../models/additional-details.model");
class AdditionalDetailsService {
    // Create new additional details
    async createAdditionalDetails(detailsData) {
        // Validate that the required fields are provided
        if (!detailsData.nokEmail || detailsData.nokEmail === null) {
            throw new Error('Next of Kin email is required and cannot be null.');
        }
        // Create a new AdditionalDetails document
        const additionalDetails = new additional_details_model_1.AdditionalDetails(detailsData);
        return await additionalDetails.save();
    }
    // Get additional details by ID
    async getAdditionalDetailsById(detailsId) {
        const details = await additional_details_model_1.AdditionalDetails.findById(detailsId).exec();
        if (!details) {
            throw new Error(`Additional details not found for ID: ${detailsId}`);
        }
        return details;
    }
    // Update additional details by ID
    async updateAdditionalDetails(detailsId, updateData) {
        const updatedDetails = await additional_details_model_1.AdditionalDetails.findByIdAndUpdate(detailsId, updateData, { new: true }).exec();
        if (!updatedDetails) {
            throw new Error(`Additional details not found for ID: ${detailsId}`);
        }
        return updatedDetails;
    }
    // Delete additional details by ID
    async deleteAdditionalDetails(detailsId) {
        const deletedDetails = await additional_details_model_1.AdditionalDetails.findByIdAndDelete(detailsId).exec();
        if (!deletedDetails) {
            throw new Error(`Additional details not found for ID: ${detailsId}`);
        }
        return deletedDetails;
    }
    // Get all additional details
    async getAllAdditionalDetails() {
        return await additional_details_model_1.AdditionalDetails.find().exec();
    }
    // Optional: Get additional details by user ID
    async getAdditionalDetailsByUserId(userId) {
        const details = await additional_details_model_1.AdditionalDetails.findOne({ userId }).exec();
        if (!details) {
            throw new Error(`No additional details found for user ID: ${userId}`);
        }
        return details;
    }
}
exports.AdditionalDetailsService = AdditionalDetailsService;
