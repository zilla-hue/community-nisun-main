import { Request, Response } from 'express';
import { SpouseRequestService } from '../services/spouse-request.service';

const spouseRequestService = new SpouseRequestService();

export class SpouseRequestController {
  async createSpouseRequest(req: Request, res: Response) {
    try {
      const spouseRequest = await spouseRequestService.createSpouseRequest(req.body);
      res.status(201).json(spouseRequest);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSpouseRequestById(req: Request, res: Response) {
    try {
      const spouseRequest = await spouseRequestService.getSpouseRequestById(req.params.id);
      if (!spouseRequest) {
        return res.status(404).json({ message: 'Spouse request not found' });
      }
      res.status(200).json(spouseRequest);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSpouseRequest(req: Request, res: Response) {
    try {
      const updatedSpouseRequest = await spouseRequestService.updateSpouseRequest(req.params.id, req.body);
      if (!updatedSpouseRequest) {
        return res.status(404).json({ message: 'Spouse request not found' });
      }
      res.status(200).json(updatedSpouseRequest);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteSpouseRequest(req: Request, res: Response) {
    try {
      const deletedSpouseRequest = await spouseRequestService.deleteSpouseRequest(req.params.id);
      if (!deletedSpouseRequest) {
        return res.status(404).json({ message: 'Spouse request not found' });
      }
      res.status(200).json({ message: 'Spouse request deleted successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllSpouseRequests(req: Request, res: Response) {
    try {
      const spouseRequests = await spouseRequestService.getAllSpouseRequests();
      res.status(200).json(spouseRequests);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
