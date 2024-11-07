"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildController = void 0;
const child_service_1 = require("../services/child.service");
const childService = new child_service_1.ChildService();
class ChildController {
    async createChild(req, res) {
        try {
            const child = await childService.createChild(req.body);
            res.status(201).json(child);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getChildById(req, res) {
        try {
            const child = await childService.getChildById(req.params.id);
            if (!child) {
                return res.status(404).json({ message: 'Child not found' });
            }
            res.status(200).json(child);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateChild(req, res) {
        try {
            const updatedChild = await childService.updateChild(req.params.id, req.body);
            if (!updatedChild) {
                return res.status(404).json({ message: 'Child not found' });
            }
            res.status(200).json(updatedChild);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteChild(req, res) {
        try {
            const deletedChild = await childService.deleteChild(req.params.id);
            if (!deletedChild) {
                return res.status(404).json({ message: 'Child not found' });
            }
            res.status(200).json({ message: 'Child deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllChildren(req, res) {
        try {
            const children = await childService.getAllChildren();
            res.status(200).json(children);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.ChildController = ChildController;
