import { Schema, model, Document } from 'mongoose';

export interface IChild extends Document {
  userId: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

const childSchema = new Schema<IChild>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
}, { timestamps: true });

export const Child = model<IChild>('Child', childSchema);
