import { Dues } from '../models/dues.model';

export class DuesService {
  async createDues(duesData: any) {
    const dues = new Dues(duesData);
    return await dues.save();
  }

  async getDuesById(duesId: string) {
    return await Dues.findById(duesId).exec();
  }

  async updateDues(duesId: string, updateData: any) {
    return await Dues.findByIdAndUpdate(duesId, updateData, { new: true }).exec();
  }

  async deleteDues(duesId: string) {
    return await Dues.findByIdAndDelete(duesId).exec();
  }

  async getAllDues() {
    return await Dues.find().exec();
  }
}
