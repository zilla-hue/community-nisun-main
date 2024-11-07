"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipService = void 0;
const membership_model_1 = require("../models/membership.model");
class MembershipService {
    async createMembership(membershipData) {
        const membership = new membership_model_1.Membership(membershipData);
        return await membership.save();
    }
    async getMembershipById(membershipId) {
        return await membership_model_1.Membership.findById(membershipId).exec();
    }
    async updateMembership(membershipId, updateData) {
        return await membership_model_1.Membership.findByIdAndUpdate(membershipId, updateData, { new: true }).exec();
    }
    async deleteMembership(membershipId) {
        return await membership_model_1.Membership.findByIdAndDelete(membershipId).exec();
    }
    async getAllMemberships() {
        return await membership_model_1.Membership.find().exec();
    }
}
exports.MembershipService = MembershipService;
