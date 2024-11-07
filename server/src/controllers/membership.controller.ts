import { Request, Response } from 'express';
import { MembershipService } from '../services/membership.service';

const membershipService = new MembershipService();

export class MembershipController {
  async createMembership(req: Request, res: Response) {
    try {
      const membership = await membershipService.createMembership(req.body);
      res.status(201).json(membership);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getMembershipById(req: Request, res: Response) {
    try {
      const membership = await membershipService.getMembershipById(req.params.id);
      if (!membership) {
        return res.status(404).json({ message: 'Membership not found' });
      }
      res.status(200).json(membership);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateMembership(req: Request, res: Response) {
    try {
      const updatedMembership = await membershipService.updateMembership(req.params.id, req.body);
      if (!updatedMembership) {
        return res.status(404).json({ message: 'Membership not found' });
      }
      res.status(200).json(updatedMembership);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteMembership(req: Request, res: Response) {
    try {
      const deletedMembership = await membershipService.deleteMembership(req.params.id);
      if (!deletedMembership) {
        return res.status(404).json({ message: 'Membership not found' });
      }
      res.status(200).json({ message: 'Membership deleted successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllMemberships(req: Request, res: Response) {
    try {
      const memberships = await membershipService.getAllMemberships();
      res.status(200).json(memberships);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
