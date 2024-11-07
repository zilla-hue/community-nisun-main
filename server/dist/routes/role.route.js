"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware"); // Import auth middleware
const role_middleware_1 = require("../middlewares/role.middleware"); // Import role middleware
const roleController = new role_controller_1.RoleController();
const roleRouter = (0, express_1.Router)();
// Beicraft routes
// roleRouter.post('/8791/beicraft', roleController.createRole.bind(roleController)); // Create a new role
// Role Routes
roleRouter.post('/:id/new-role', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), roleController.createRole.bind(roleController)); // Create a new role
roleRouter.get('/:id', auth_middleware_1.authMiddleware, roleController.getRoleById.bind(roleController)); // Get role by ID (auth required)
roleRouter.get('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(), roleController.getAllRoles.bind(roleController)); // Get all roles (admin role required)
roleRouter.put('/:id', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(), roleController.updateRole.bind(roleController)); // Update a role by ID (admin role required)
roleRouter.delete('/:id', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(), roleController.deleteRole.bind(roleController)); // Delete a role by ID (admin role required)
roleRouter.put('/:id/dashboard', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(), roleController.assignDashboardToRole.bind(roleController)); // Assign a dashboard view to a role (admin role required)
exports.default = roleRouter;
