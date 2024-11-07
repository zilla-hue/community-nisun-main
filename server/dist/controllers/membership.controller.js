"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipController = void 0;
const membership_service_1 = require("../services/membership.service");
const membershipService = new membership_service_1.MembershipService();
class MembershipController {
    async createMembership(req, res) {
        try {
            const membership = await membershipService.createMembership(req.body);
            res.status(201).json(membership);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getMembershipById(req, res) {
        try {
            const membership = await membershipService.getMembershipById(req.params.id);
            if (!membership) {
                return res.status(404).json({ message: 'Membership not found' });
            }
            res.status(200).json(membership);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateMembership(req, res) {
        try {
            const updatedMembership = await membershipService.updateMembership(req.params.id, req.body);
            if (!updatedMembership) {
                return res.status(404).json({ message: 'Membership not found' });
            }
            res.status(200).json(updatedMembership);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteMembership(req, res) {
        try {
            const deletedMembership = await membershipService.deleteMembership(req.params.id);
            if (!deletedMembership) {
                return res.status(404).json({ message: 'Membership not found' });
            }
            res.status(200).json({ message: 'Membership deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllMemberships(req, res) {
        try {
            const memberships = await membershipService.getAllMemberships();
            res.status(200).json(memberships);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.MembershipController = MembershipController;
