import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  duesId: Schema.Types.ObjectId;
  price: number;
  isPaid: boolean;
  size?: string;
  orderDate: Date;
  shippingAddressId?: string;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  duesId: { type: Schema.Types.ObjectId, ref: 'Dues', required: true },
  price: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  size: { type: String },
  orderDate: { type: Date, default: Date.now },
  shippingAddressId: { type: String },
}, { timestamps: true });

export const Order = model<IOrder>('Order', orderSchema);
