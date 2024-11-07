"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const role_service_1 = require("../services/role.service");
const roleService = new role_service_1.RoleService();
class RoleController {
    // Create a new role
    async createRole(req, res) {
        try {
            const role = await roleService.createRole(req.body);
            res.status(201).json(role);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Get a role by ID
    async getRoleById(req, res) {
        try {
            const role = await roleService.getRoleById(req.params.id);
            if (!role) {
                res.status(404).json({ message: 'Role not found' });
            }
            else {
                res.status(200).json(role);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Get all roles
    async getAllRoles(req, res) {
        try {
            const roles = await roleService.getAllRoles();
            res.status(200).json(roles);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Update a role by ID
    async updateRole(req, res) {
        try {
            const updatedRole = await roleService.updateRole(req.params.id, req.body);
            if (!updatedRole) {
                res.status(404).json({ message: 'Role not found' });
            }
            else {
                res.status(200).json(updatedRole);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Delete a role by ID
    async deleteRole(req, res) {
        try {
            const deletedRole = await roleService.deleteRole(req.params.id);
            if (!deletedRole) {
                res.status(404).json({ message: 'Role not found' });
            }
            else {
                res.status(200).json({ message: 'Role deleted successfully' });
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Assign a dashboard view to a role
    async assignDashboardToRole(req, res) {
        try {
            const { dashboardView } = req.body; // Extracting dashboard view from request body
            const updatedRole = await roleService.assignDashboardToRole(req.params.id, dashboardView);
            if (!updatedRole) {
                res.status(404).json({ message: 'Role not found' });
            }
            else {
                res.status(200).json(updatedRole);
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.RoleController = RoleController;
