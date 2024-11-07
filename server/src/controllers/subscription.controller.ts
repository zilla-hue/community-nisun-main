import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscription.service';

const subscriptionService = new SubscriptionService();

export class SubscriptionController {
  async createSubscription(req: Request, res: Response) {
    try {
      const subscription = await subscriptionService.createSubscription(req.body);
      res.status(201).json(subscription);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSubscriptionById(req: Request, res: Response) {
    try {
      const subscription = await subscriptionService.getSubscriptionById(req.params.id);
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
      res.status(200).json(subscription);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSubscription(req: Request, res: Response) {
    try {
      const updatedSubscription = await subscriptionService.updateSubscription(req.params.id, req.body);
      if (!updatedSubscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
      res.status(200).json(updatedSubscription);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteSubscription(req: Request, res: Response) {
    try {
      const deletedSubscription = await subscriptionService.deleteSubscription(req.params.id);
      if (!deletedSubscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
      res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllSubscriptions(req: Request, res: Response) {
    try {
      const subscriptions = await subscriptionService.getAllSubscriptions();
      res.status(200).json(subscriptions);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
