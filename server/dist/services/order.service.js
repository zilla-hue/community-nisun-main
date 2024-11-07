"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_model_1 = require("../models/order.model");
class OrderService {
    async createOrder(orderData) {
        const order = new order_model_1.Order(orderData);
        return await order.save();
    }
    async getOrderById(orderId) {
        return await order_model_1.Order.findById(orderId).exec();
    }
    async updateOrder(orderId, updateData) {
        return await order_model_1.Order.findByIdAndUpdate(orderId, updateData, { new: true }).exec();
    }
    async deleteOrder(orderId) {
        return await order_model_1.Order.findByIdAndDelete(orderId).exec();
    }
    async getAllOrders() {
        return await order_model_1.Order.find().exec();
    }
}
exports.OrderService = OrderService;
