import { Schema, model, Document } from 'mongoose';

export interface ISubscription extends Document {
  userId: Schema.Types.ObjectId;
  planId: string;
  price: number;
  startDate: Date;
  endDate: Date;
}

const subscriptionSchema = new Schema<ISubscription>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  planId: { type: String, required: true },
  price: { type: Number, default: 0 },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
}, { timestamps: true });

export const Subscription = model<ISubscription>('Subscription', subscriptionSchema);
