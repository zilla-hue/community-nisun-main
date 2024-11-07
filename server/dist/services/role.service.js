"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const role_model_1 = require("../models/role.model");
class RoleService {
    async createRole(data) {
        const role = new role_model_1.Role(data);
        return await role.save();
    }
    async getRoleById(roleId) {
        return await role_model_1.Role.findById(roleId);
    }
    async getAllRoles() {
        return await role_model_1.Role.find();
    }
    async updateRole(roleId, data) {
        return await role_model_1.Role.findByIdAndUpdate(roleId, data, { new: true });
    }
    async deleteRole(roleId) {
        return await role_model_1.Role.findByIdAndDelete(roleId);
    }
    // Ensure this uses `dashboardView`
    async assignDashboardToRole(roleId, dashboardView) {
        return await role_model_1.Role.findByIdAndUpdate(roleId, { dashboardView }, // Use `dashboardView` instead of `dashboards`
        { new: true });
    }
}
exports.RoleService = RoleService;
