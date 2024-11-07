import { Schema, model, Document } from 'mongoose';
import { IRole } from './role.model';

enum MembershipStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
  phoneNumber: string;
  role: IRole;
  knowYourMember: boolean;
  membershipStatus: MembershipStatus;
  duesPaid: boolean;
  regPaid: boolean;
  isSubscribed: boolean;
  isOnboarded: boolean;
  isVerified: boolean;
  lastLogin?: Date;
  resetPasswordToken?: string; // Add this for password reset
  resetPasswordExpiresAt?: Date; // Add this for token expiry
  verificationToken?: string; // Add this for email verification
  verificationTokenExpires?: Date; // Add this for token expiry
  additionalDetails?: Schema.Types.ObjectId;
  orders: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  likes: Schema.Types.ObjectId[];
  session: Schema.Types.ObjectId[];
  children: Schema.Types.ObjectId[];
  termsAccepted: boolean; // Track acceptance of Terms and Conditions
  privacyPolicyAccepted: boolean; // Track acceptance of Privacy Policy
}

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  knowYourMember: { type: Boolean, default: false },
  membershipStatus: { type: String, enum: MembershipStatus, default: MembershipStatus.PENDING },
  duesPaid: { type: Boolean, default: false },
  regPaid: { type: Boolean, default: false },
  isSubscribed: { type: Boolean, default: false },
  isOnboarded: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false }, // Email not verified by default
  lastLogin: { type: Date }, // Track the last login time
  resetPasswordToken: { type: String }, // Store the verification token
  resetPasswordExpiresAt: { type: Date }, // Store the expiry of the verification token
  verificationToken: { type: String }, // Store the verification token
  verificationTokenExpires: { type: Date }, // Store the expiry of the verification token
  additionalDetails: { type: Schema.Types.ObjectId, ref: 'AdditionalDetails' },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  session: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
  children: [{ type: Schema.Types.ObjectId, ref: 'Child' }],
  termsAccepted: { type: Boolean, required: true, default: false }, // Terms must be accepted
  privacyPolicyAccepted: { type: Boolean, required: true, default: false }, // Privacy Policy must be accepted
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);
