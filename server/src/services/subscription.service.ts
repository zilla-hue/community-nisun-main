import { Subscription } from '../models/subscription.model';

export class SubscriptionService {
  async createSubscription(subscriptionData: any) {
    const subscription = new Subscription(subscriptionData);
    return await subscription.save();
  }

  async getSubscriptionById(subscriptionId: string) {
    return await Subscription.findById(subscriptionId).exec();
  }

  async updateSubscription(subscriptionId: string, updateData: any) {
    return await Subscription.findByIdAndUpdate(subscriptionId, updateData, { new: true }).exec();
  }

  async deleteSubscription(subscriptionId: string) {
    return await Subscription.findByIdAndDelete(subscriptionId).exec();
  }

  async getAllSubscriptions() {
    return await Subscription.find().exec();
  }
}
