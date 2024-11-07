import { Schema, model, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  dashboardView: string; // Define different views based on role
}

const roleSchema = new Schema<IRole>({
  name: { type: String, unique: true, required: true },
  dashboardView: { type: String, required: true }, // Example: 'adminView', 'userView', etc.
}, { timestamps: true });

export const Role = model<IRole>('Role', roleSchema);
