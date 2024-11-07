import { AdditionalDetails } from '../models/additional-details.model';

export class AdditionalDetailsService {
  // Create new additional details
  async createAdditionalDetails(detailsData: any) {
    // Validate that the required fields are provided
    if (!detailsData.nokEmail || detailsData.nokEmail === null) {
      throw new Error('Next of Kin email is required and cannot be null.');
    }

    // Create a new AdditionalDetails document
    const additionalDetails = new AdditionalDetails(detailsData);
    return await additionalDetails.save();
  }

  // Get additional details by ID
  async getAdditionalDetailsById(detailsId: string) {
    const details = await AdditionalDetails.findById(detailsId).exec();
    if (!details) {
      throw new Error(`Additional details not found for ID: ${detailsId}`);
    }
    return details;
  }

  // Update additional details by ID
  async updateAdditionalDetails(detailsId: string, updateData: any) {
    const updatedDetails = await AdditionalDetails.findByIdAndUpdate(detailsId, updateData, { new: true }).exec();
    if (!updatedDetails) {
      throw new Error(`Additional details not found for ID: ${detailsId}`);
    }
    return updatedDetails;
  }

  // Delete additional details by ID
  async deleteAdditionalDetails(detailsId: string) {
    const deletedDetails = await AdditionalDetails.findByIdAndDelete(detailsId).exec();
    if (!deletedDetails) {
      throw new Error(`Additional details not found for ID: ${detailsId}`);
    }
    return deletedDetails;
  }

  // Get all additional details
  async getAllAdditionalDetails() {
    return await AdditionalDetails.find().exec();
  }

  // Optional: Get additional details by user ID
  async getAdditionalDetailsByUserId(userId: string) {
    const details = await AdditionalDetails.findOne({ userId }).exec();
    if (!details) {
      throw new Error(`No additional details found for user ID: ${userId}`);
    }
    return details;
  }
}
