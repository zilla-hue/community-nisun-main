import { Schema, model, Document } from 'mongoose';

export interface IPasswordResetToken extends Document {
  email: string;
  token: string;
  expires: Date;
}

const passwordResetTokenSchema = new Schema<IPasswordResetToken>({
  email: { type: String, required: true },
  token: { type: String, unique: true, required: true },
  expires: { type: Date, required: true },
}, { timestamps: true });

export const PasswordResetToken = model<IPasswordResetToken>('PasswordResetToken', passwordResetTokenSchema);
