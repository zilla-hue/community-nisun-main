"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalDetailsController = void 0;
const additional_details_service_1 = require("../services/additional-details.service");
const additionalDetailsService = new additional_details_service_1.AdditionalDetailsService();
class AdditionalDetailsController {
    // Create new additional details
    async createAdditionalDetails(req, res) {
        try {
            const additionalDetails = await additionalDetailsService.createAdditionalDetails(req.body);
            res.status(201).json(additionalDetails);
        }
        catch (error) {
            // Improved error handling for missing required fields
            res.status(400).json({ error: error.message });
        }
    }
    // Get additional details by ID
    async getAdditionalDetailsById(req, res) {
        try {
            const details = await additionalDetailsService.getAdditionalDetailsById(req.params.id);
            res.status(200).json(details);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    // Update additional details by ID
    async updateAdditionalDetails(req, res) {
        try {
            const updatedDetails = await additionalDetailsService.updateAdditionalDetails(req.params.id, req.body);
            res.status(200).json(updatedDetails);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    // Delete additional details by ID
    async deleteAdditionalDetails(req, res) {
        try {
            await additionalDetailsService.deleteAdditionalDetails(req.params.id);
            res.status(200).json({ message: 'Additional details deleted successfully' });
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    // Get all additional details
    async getAllAdditionalDetails(req, res) {
        try {
            const details = await additionalDetailsService.getAllAdditionalDetails();
            res.status(200).json(details);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Optional: Get additional details by user ID
    async getAdditionalDetailsByUserId(req, res) {
        try {
            const details = await additionalDetailsService.getAdditionalDetailsByUserId(req.params.userId);
            res.status(200).json(details);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}
exports.AdditionalDetailsController = AdditionalDetailsController;
