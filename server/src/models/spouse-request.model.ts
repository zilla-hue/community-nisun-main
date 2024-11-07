import { Schema, model, Document } from 'mongoose';

export interface ISpouseRequest extends Document {
  senderId: Schema.Types.ObjectId;
  receiverId: Schema.Types.ObjectId;
  status: string;
}

const spouseRequestSchema = new Schema<ISpouseRequest>({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'PENDING' },
}, { timestamps: true });

export const SpouseRequest = model<ISpouseRequest>('SpouseRequest', spouseRequestSchema);
