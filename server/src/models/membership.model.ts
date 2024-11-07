import { Schema, model, Document } from 'mongoose';

export interface IMembership extends Document {
  userId: Schema.Types.ObjectId;
  startDate: Date;
  duesPaid: number;
  duesDue: number;
}

const membershipSchema = new Schema<IMembership>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  startDate: { type: Date, default: Date.now },
  duesPaid: { type: Number, default: 0 },
  duesDue: { type: Number, default: 0 },
}, { timestamps: true });

export const Membership = model<IMembership>('Membership', membershipSchema);
