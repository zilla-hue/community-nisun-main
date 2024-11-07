
import { Response, NextFunction } from 'express';
import { User } from '../models/user.model'; // Import User model
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

export const roleMiddleware = (requiredRoles: string[] = []) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id; // Get user ID from the request
      console.log(`userId: ${userId}`);
      

      if (!userId) {
         res.status(401).json({ error: 'Unauthorized: No user logged in' });
        return;
      }

      const user = await User.findById(userId).populate('role'); // Fetch the user with the role

      if (!user || !user.role) {
         res.status(403).json({ error: 'Access denied: User not found or no role assigned' });
        return;
      }

      const hasRole = requiredRoles.includes(user.role.name); // Check if user's role matches

      if (!hasRole) {
         res.status(403).json({ error: 'Access denied: Insufficient permissions' });
        return;
      }

      return next(); // User has the required role
    } catch (error) {
      console.error(error);
       res.status(500).json({ error: 'Internal server error' });
      return;
    }
  };
};
