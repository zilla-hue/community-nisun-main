import { Request, Response } from 'express';
import { DuesService } from '../services/dues.service';

const duesService = new DuesService();

export class DuesController {
  async createDues(req: Request, res: Response) {
    try {
      const dues = await duesService.createDues(req.body);
      res.status(201).json(dues);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getDuesById(req: Request, res: Response) {
    try {
      const dues = await duesService.getDuesById(req.params.id);
      if (!dues) {
        return res.status(404).json({ message: 'Dues not found' });
      }
      res.status(200).json(dues);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateDues(req: Request, res: Response) {
    try {
      const updatedDues = await duesService.updateDues(req.params.id, req.body);
      if (!updatedDues) {
        return res.status(404).json({ message: 'Dues not found' });
      }
      res.status(200).json(updatedDues);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteDues(req: Request, res: Response) {
    try {
      const deletedDues = await duesService.deleteDues(req.params.id);
      if (!deletedDues) {
        return res.status(404).json({ message: 'Dues not found' });
      }
      res.status(200).json({ message: 'Dues deleted successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllDues(req: Request, res: Response) {
    try {
      const dues = await duesService.getAllDues();
      res.status(200).json(dues);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
