import { Child } from '../models/child.model';

export class ChildService {
  async createChild(childData: any) {
    const child = new Child(childData);
    return await child.save();
  }

  async getChildById(childId: string) {
    return await Child.findById(childId).exec();
  }

  async updateChild(childId: string, updateData: any) {
    return await Child.findByIdAndUpdate(childId, updateData, { new: true }).exec();
  }

  async deleteChild(childId: string) {
    return await Child.findByIdAndDelete(childId).exec();
  }

  async getAllChildren() {
    return await Child.find().exec();
  }
}
