import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import { blacklistToken } from '../utils/auth.util';

const userService = new UserService();

export class UserController {

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      // Improved error handling for duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        const value = error.keyValue[field];
        res.status(400).json({ error: `Duplicate value for field: ${field} with value: ${value}` });
      } else {
        res.status(400).json({ error: error.message });
      }

    }
  }

  async verifyUser(req: Request, res: Response): Promise<void> {
  try {
    // Extract the verification code from req.params instead of req.body
    const { code } = req.params;

    const user = await userService.verifyUser(code);

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
      user,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}


  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ message: 'User deleted successfully' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Login method
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.login(email, password);
      res.status(200).json({ user, token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  

  // Logout method
  async logoutUser(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
      res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
      });
    } catch (error: any) {
      res.status(500).json({ status: 'failed', error: error.message });
    }
  }


  // Activate user
  async activateUser(req: Request, res: Response): Promise<void> {
    try {
      const activatedUser = await userService.activateUser(req.params.id);
      if (!activatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(activatedUser);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Deactivate user
  async deactivateUser(req: Request, res: Response): Promise<void> {
    try {
      const deactivatedUser = await userService.deactivateUser(req.params.id);
      if (!deactivatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(deactivatedUser);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Pend user membership
  async pendUser(req: Request, res: Response): Promise<void> {
    try {
      const pendingUser = await userService.pendUser(req.params.id);
      if (!pendingUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(pendingUser);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update dues paid status
  async updateDuesPaid(req: Request, res: Response): Promise<void> {
    try {
      const { duesPaid } = req.body; // Expecting a boolean value
      const updatedUser = await userService.updateDuesPaid(req.params.id, duesPaid);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update registration paid status
  async updateRegPaid(req: Request, res: Response): Promise<void> {
    try {
      const { regPaid } = req.body;

      console.log('Received regPaid:', regPaid); // Log the incoming value

      const updatedUser = await userService.updateRegPaid(req.params.id, regPaid);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }


  // Update subscription status
  async updateSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { isSubscribed } = req.body; // Expecting a boolean value
      const updatedUser = await userService.updateSubscription(req.params.id, isSubscribed);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update onboarding status
  async updateOnboarding(req: Request, res: Response): Promise<void> {
    try {
      const { isOnboarded } = req.body; // Expecting a boolean value
      const updatedUser = await userService.updateOnboarding(req.params.id, isOnboarded);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async checkAuth(req: AuthenticatedRequest, res: Response): Promise<void> {
    console.log("Authenticated user ID:", req.user.id);

    try {
      const user = await userService.getUserById(req.user.id);
      console.log('Fetched user:', user);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ user }); // Wrap user in a "user" key
      }
    } catch (error: any) {
      console.log('Error fetching user:', error.message);
      res.status(400).json({ error: error.message });
    }
  }


  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const message = await userService.forgotPassword(email);
      res.status(200).json({ message });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const message = await userService.resetPassword(token, password);
      res.status(200).json({ message });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
