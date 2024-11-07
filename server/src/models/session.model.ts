import { Schema, model, Document } from 'mongoose';

export interface ISession extends Document {
  userId: Schema.Types.ObjectId;
  expiresAt: Date;
}

const sessionSchema = new Schema<ISession>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

export const Session = model<ISession>('Session', sessionSchema);
