"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const subscription_model_1 = require("../models/subscription.model");
class SubscriptionService {
    async createSubscription(subscriptionData) {
        const subscription = new subscription_model_1.Subscription(subscriptionData);
        return await subscription.save();
    }
    async getSubscriptionById(subscriptionId) {
        return await subscription_model_1.Subscription.findById(subscriptionId).exec();
    }
    async updateSubscription(subscriptionId, updateData) {
        return await subscription_model_1.Subscription.findByIdAndUpdate(subscriptionId, updateData, { new: true }).exec();
    }
    async deleteSubscription(subscriptionId) {
        return await subscription_model_1.Subscription.findByIdAndDelete(subscriptionId).exec();
    }
    async getAllSubscriptions() {
        return await subscription_model_1.Subscription.find().exec();
    }
}
exports.SubscriptionService = SubscriptionService;
