import { Schema, model, Document } from 'mongoose';

export interface IAdditionalDetails extends Document {
  middleName?: string;
  picture?: string;
  address?: string;
  updatedBy?: string;
  birthDate?: Date;
  gender?: string;
  maritalStatus?: string;
  postcode?: string;
  nationality?: string;
  state?: string;
  occupation?: string;
  lga?: string;
  nokFirstName?: string;
  nokLastName?: string;
  nokEmail?: string;
  nokPhone?: string;
  nokGender?: string;
  nokNationality?: string;
  nokAddress?: string;
  nokPostcode?: string;
  customerId?: string;
}

const additionalDetailsSchema = new Schema<IAdditionalDetails>({
  middleName: { type: String },
  picture: { type: String },
  address: { type: String },
  updatedBy: { type: String },
  birthDate: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  postcode: { type: String },
  nationality: { type: String },
  state: { type: String },
  occupation: { type: String },
  lga: { type: String },
  nokFirstName: { type: String },
  nokLastName: { type: String },
  nokEmail: { type: String, unique: true },
  nokPhone: { type: String },
  nokGender: { type: String },
  nokNationality: { type: String },
  nokAddress: { type: String },
  nokPostcode: { type: String },
  customerId: { type: String, unique: true },
}, { timestamps: true });

export const AdditionalDetails = model<IAdditionalDetails>('AdditionalDetails', additionalDetailsSchema);
