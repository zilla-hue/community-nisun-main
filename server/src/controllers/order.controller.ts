import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

const orderService = new OrderService();

export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(updatedOrder);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const deletedOrder = await orderService.deleteOrder(req.params.id);
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
