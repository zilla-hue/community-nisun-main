import { Request, Response } from 'express';
import { PasswordResetTokenService } from '../services/password-reset-token.service';

const passwordResetService = new PasswordResetTokenService();

export class PasswordResetController {
  async createPasswordReset(req: Request, res: Response) {
    try {
      const passwordReset = await passwordResetService.createToken(req.body);
      res.status(201).json(passwordReset);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPasswordResetById(req: Request, res: Response) {
    try {
      const passwordReset = await passwordResetService.getTokenById(req.params.id);
      if (!passwordReset) {
        return res.status(404).json({ message: 'Password reset request not found' });
      }
      res.status(200).json(passwordReset);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updatePasswordReset(req: Request, res: Response) {
    try {
      const updatedPasswordReset = await passwordResetService.updateToken(req.params.id, req.body);
      if (!updatedPasswordReset) {
        return res.status(404).json({ message: 'Password reset request not found' });
      }
      res.status(200).json(updatedPasswordReset);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletePasswordReset(req: Request, res: Response) {
    try {
      const deletedPasswordReset = await passwordResetService.deleteToken(req.params.id);
      if (!deletedPasswordReset) {
        return res.status(404).json({ message: 'Password reset request not found' });
      }
      res.status(200).json({ message: 'Password reset request deleted successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllPasswordResets(req: Request, res: Response) {
    try {
      const passwordResets = await passwordResetService.getAllTokens();
      res.status(200).json(passwordResets);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
