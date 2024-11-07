import { SpouseRequest } from '../models/spouse-request.model';

export class SpouseRequestService {
  async createSpouseRequest(spouseRequestData: any) {
    const spouseRequest = new SpouseRequest(spouseRequestData);
    return await spouseRequest.save();
  }

  async getSpouseRequestById(spouseRequestId: string) {
    return await SpouseRequest.findById(spouseRequestId).exec();
  }

  async updateSpouseRequest(spouseRequestId: string, updateData: any) {
    return await SpouseRequest.findByIdAndUpdate(spouseRequestId, updateData, { new: true }).exec();
  }

  async deleteSpouseRequest(spouseRequestId: string) {
    return await SpouseRequest.findByIdAndDelete(spouseRequestId).exec();
  }

  async getAllSpouseRequests() {
    return await SpouseRequest.find().exec();
  }
}
