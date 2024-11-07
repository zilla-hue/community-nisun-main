"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuesController = void 0;
const dues_service_1 = require("../services/dues.service");
const duesService = new dues_service_1.DuesService();
class DuesController {
    async createDues(req, res) {
        try {
            const dues = await duesService.createDues(req.body);
            res.status(201).json(dues);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getDuesById(req, res) {
        try {
            const dues = await duesService.getDuesById(req.params.id);
            if (!dues) {
                return res.status(404).json({ message: 'Dues not found' });
            }
            res.status(200).json(dues);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateDues(req, res) {
        try {
            const updatedDues = await duesService.updateDues(req.params.id, req.body);
            if (!updatedDues) {
                return res.status(404).json({ message: 'Dues not found' });
            }
            res.status(200).json(updatedDues);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteDues(req, res) {
        try {
            const deletedDues = await duesService.deleteDues(req.params.id);
            if (!deletedDues) {
                return res.status(404).json({ message: 'Dues not found' });
            }
            res.status(200).json({ message: 'Dues deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllDues(req, res) {
        try {
            const dues = await duesService.getAllDues();
            res.status(200).json(dues);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.DuesController = DuesController;
