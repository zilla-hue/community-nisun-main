"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpouseRequestController = void 0;
const spouse_request_service_1 = require("../services/spouse-request.service");
const spouseRequestService = new spouse_request_service_1.SpouseRequestService();
class SpouseRequestController {
    async createSpouseRequest(req, res) {
        try {
            const spouseRequest = await spouseRequestService.createSpouseRequest(req.body);
            res.status(201).json(spouseRequest);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getSpouseRequestById(req, res) {
        try {
            const spouseRequest = await spouseRequestService.getSpouseRequestById(req.params.id);
            if (!spouseRequest) {
                return res.status(404).json({ message: 'Spouse request not found' });
            }
            res.status(200).json(spouseRequest);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateSpouseRequest(req, res) {
        try {
            const updatedSpouseRequest = await spouseRequestService.updateSpouseRequest(req.params.id, req.body);
            if (!updatedSpouseRequest) {
                return res.status(404).json({ message: 'Spouse request not found' });
            }
            res.status(200).json(updatedSpouseRequest);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteSpouseRequest(req, res) {
        try {
            const deletedSpouseRequest = await spouseRequestService.deleteSpouseRequest(req.params.id);
            if (!deletedSpouseRequest) {
                return res.status(404).json({ message: 'Spouse request not found' });
            }
            res.status(200).json({ message: 'Spouse request deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllSpouseRequests(req, res) {
        try {
            const spouseRequests = await spouseRequestService.getAllSpouseRequests();
            res.status(200).json(spouseRequests);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.SpouseRequestController = SpouseRequestController;
