"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
const subscription_service_1 = require("../services/subscription.service");
const subscriptionService = new subscription_service_1.SubscriptionService();
class SubscriptionController {
    async createSubscription(req, res) {
        try {
            const subscription = await subscriptionService.createSubscription(req.body);
            res.status(201).json(subscription);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getSubscriptionById(req, res) {
        try {
            const subscription = await subscriptionService.getSubscriptionById(req.params.id);
            if (!subscription) {
                return res.status(404).json({ message: 'Subscription not found' });
            }
            res.status(200).json(subscription);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateSubscription(req, res) {
        try {
            const updatedSubscription = await subscriptionService.updateSubscription(req.params.id, req.body);
            if (!updatedSubscription) {
                return res.status(404).json({ message: 'Subscription not found' });
            }
            res.status(200).json(updatedSubscription);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteSubscription(req, res) {
        try {
            const deletedSubscription = await subscriptionService.deleteSubscription(req.params.id);
            if (!deletedSubscription) {
                return res.status(404).json({ message: 'Subscription not found' });
            }
            res.status(200).json({ message: 'Subscription deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllSubscriptions(req, res) {
        try {
            const subscriptions = await subscriptionService.getAllSubscriptions();
            res.status(200).json(subscriptions);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.SubscriptionController = SubscriptionController;
