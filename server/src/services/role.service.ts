import { Role, IRole } from '../models/role.model';

export class RoleService {
  async createRole(data: Partial<IRole>): Promise<IRole> {
    const role = new Role(data);
    return await role.save();
  }

  async getRoleById(roleId: string): Promise<IRole | null> {
    return await Role.findById(roleId);
  }

  async getAllRoles(): Promise<IRole[]> {
    return await Role.find();
  }

  async updateRole(roleId: string, data: Partial<IRole>): Promise<IRole | null> {
    return await Role.findByIdAndUpdate(roleId, data, { new: true });
  }

  async deleteRole(roleId: string): Promise<IRole | null> {
    return await Role.findByIdAndDelete(roleId);
  }

  // Ensure this uses `dashboardView`
  async assignDashboardToRole(roleId: string, dashboardView: string): Promise<IRole | null> {
    return await Role.findByIdAndUpdate(
      roleId,
      { dashboardView }, // Use `dashboardView` instead of `dashboards`
      { new: true }
    );
  }
}
