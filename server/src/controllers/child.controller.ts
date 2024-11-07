import { Request, Response } from 'express';
import { ChildService } from '../services/child.service';

const childService = new ChildService();

export class ChildController {
  async createChild(req: Request, res: Response) {
    try {
      const child = await childService.createChild(req.body);
      res.status(201).json(child);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getChildById(req: Request, res: Response) {
    try {
      const child = await childService.getChildById(req.params.id);
      if (!child) {
        return res.status(404).json({ message: 'Child not found' });
      }
      res.status(200).json(child);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateChild(req: Request, res: Response) {
    try {
      const updatedChild = await childService.updateChild(req.params.id, req.body);
      if (!updatedChild) {
        return res.status(404).json({ message: 'Child not found' });
      }
      res.status(200).json(updatedChild);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteChild(req: Request, res: Response) {
    try {
      const deletedChild = await childService.deleteChild(req.params.id);
      if (!deletedChild) {
        return res.status(404).json({ message: 'Child not found' });
      }
      res.status(200).json({ message: 'Child deleted successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllChildren(req: Request, res: Response) {
    try {
      const children = await childService.getAllChildren();
      res.status(200).json(children);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
