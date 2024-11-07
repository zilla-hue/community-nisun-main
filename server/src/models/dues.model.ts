import { Schema, model, Document } from 'mongoose';

export interface IDues extends Document {
  name: string;
  price: number;
  isArchived: boolean;
}

const duesSchema = new Schema<IDues>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isArchived: { type: Boolean, default: false },
}, { timestamps: true });

export const Dues = model<IDues>('Dues', duesSchema);
