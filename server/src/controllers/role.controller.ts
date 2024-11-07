import { Request, Response } from 'express';
import { RoleService } from '../services/role.service';

const roleService = new RoleService();

export class RoleController {

  // Create a new role
  async createRole(req: Request, res: Response): Promise<void> {
    try {
      const role = await roleService.createRole(req.body);
      res.status(201).json(role);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get a role by ID
  async getRoleById(req: Request, res: Response): Promise<void> {
    try {
      const role = await roleService.getRoleById(req.params.id);
      if (!role) {
        res.status(404).json({ message: 'Role not found' });
      } else {
        res.status(200).json(role);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all roles
  async getAllRoles(req: Request, res: Response): Promise<void> {
    try {
      const roles = await roleService.getAllRoles();
      res.status(200).json(roles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a role by ID
  async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const updatedRole = await roleService.updateRole(req.params.id, req.body);
      if (!updatedRole) {
        res.status(404).json({ message: 'Role not found' });
      } else {
        res.status(200).json(updatedRole);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a role by ID
  async deleteRole(req: Request, res: Response): Promise<void> {
    try {
      const deletedRole = await roleService.deleteRole(req.params.id);
      if (!deletedRole) {
        res.status(404).json({ message: 'Role not found' });
      } else {
        res.status(200).json({ message: 'Role deleted successfully' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Assign a dashboard view to a role
  async assignDashboardToRole(req: Request, res: Response): Promise<void> {
    try {
      const { dashboardView } = req.body; // Extracting dashboard view from request body
      const updatedRole = await roleService.assignDashboardToRole(req.params.id, dashboardView);
      if (!updatedRole) {
        res.status(404).json({ message: 'Role not found' });
      } else {
        res.status(200).json(updatedRole);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
