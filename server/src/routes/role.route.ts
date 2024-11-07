import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';
import { authMiddleware } from '../middlewares/auth.middleware'; // Import auth middleware
import { roleMiddleware } from '../middlewares/role.middleware'; // Import role middleware

const roleController = new RoleController();
const roleRouter = Router();

// Beicraft routes
// roleRouter.post('/8791/beicraft', roleController.createRole.bind(roleController)); // Create a new role

// Role Routes
roleRouter.post('/:id/new-role', authMiddleware, roleMiddleware(['Admin']), roleController.createRole.bind(roleController)); // Create a new role
roleRouter.get('/:id', authMiddleware, roleController.getRoleById.bind(roleController)); // Get role by ID (auth required)
roleRouter.get('/', authMiddleware, roleMiddleware(), roleController.getAllRoles.bind(roleController)); // Get all roles (admin role required)
roleRouter.put('/:id', authMiddleware, roleMiddleware(), roleController.updateRole.bind(roleController)); // Update a role by ID (admin role required)
roleRouter.delete('/:id', authMiddleware, roleMiddleware(), roleController.deleteRole.bind(roleController)); // Delete a role by ID (admin role required)
roleRouter.put('/:id/dashboard', authMiddleware, roleMiddleware(), roleController.assignDashboardToRole.bind(roleController)); // Assign a dashboard view to a role (admin role required)

export default roleRouter;
