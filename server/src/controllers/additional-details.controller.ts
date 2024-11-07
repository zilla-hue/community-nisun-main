import { Request, Response } from 'express';
import { AdditionalDetailsService } from '../services/additional-details.service';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

const additionalDetailsService = new AdditionalDetailsService();

export class AdditionalDetailsController {

  // Create new additional details
  async createAdditionalDetails(req: Request, res: Response): Promise<void> {
    try {
      const additionalDetails = await additionalDetailsService.createAdditionalDetails(req.body);
      res.status(201).json(additionalDetails);
    } catch (error: any) {
      // Improved error handling for missing required fields
      res.status(400).json({ error: error.message });
    }
  }

  // Get additional details by ID
  async getAdditionalDetailsById(req: Request, res: Response): Promise<void> {
    try {
      const details = await additionalDetailsService.getAdditionalDetailsById(req.params.id);
      res.status(200).json(details);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // Update additional details by ID
  async updateAdditionalDetails(req: Request, res: Response): Promise<void> {
    try {
      const updatedDetails = await additionalDetailsService.updateAdditionalDetails(req.params.id, req.body);
      res.status(200).json(updatedDetails);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // Delete additional details by ID
  async deleteAdditionalDetails(req: Request, res: Response): Promise<void> {
    try {
      await additionalDetailsService.deleteAdditionalDetails(req.params.id);
      res.status(200).json({ message: 'Additional details deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // Get all additional details
  async getAllAdditionalDetails(req: Request, res: Response): Promise<void> {
    try {
      const details = await additionalDetailsService.getAllAdditionalDetails();
      res.status(200).json(details);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Optional: Get additional details by user ID
  async getAdditionalDetailsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const details = await additionalDetailsService.getAdditionalDetailsByUserId(req.params.userId);
      res.status(200).json(details);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
