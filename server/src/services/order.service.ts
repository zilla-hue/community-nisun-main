import { Order } from '../models/order.model';

export class OrderService {
  async createOrder(orderData: any) {
    const order = new Order(orderData);
    return await order.save();
  }

  async getOrderById(orderId: string) {
    return await Order.findById(orderId).exec();
  }

  async updateOrder(orderId: string, updateData: any) {
    return await Order.findByIdAndUpdate(orderId, updateData, { new: true }).exec();
  }

  async deleteOrder(orderId: string) {
    return await Order.findByIdAndDelete(orderId).exec();
  }

  async getAllOrders() {
    return await Order.find().exec();
  }
}
