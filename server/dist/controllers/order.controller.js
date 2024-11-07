"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("../services/order.service");
const orderService = new order_service_1.OrderService();
class OrderController {
    async createOrder(req, res) {
        try {
            const order = await orderService.createOrder(req.body);
            res.status(201).json(order);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getOrderById(req, res) {
        try {
            const order = await orderService.getOrderById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateOrder(req, res) {
        try {
            const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(updatedOrder);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteOrder(req, res) {
        try {
            const deletedOrder = await orderService.deleteOrder(req.params.id);
            if (!deletedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json({ message: 'Order deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllOrders(req, res) {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json(orders);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.OrderController = OrderController;
