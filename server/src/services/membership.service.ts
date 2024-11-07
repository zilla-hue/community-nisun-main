import { Membership } from '../models/membership.model';

export class MembershipService {
  async createMembership(membershipData: any) {
    const membership = new Membership(membershipData);
    return await membership.save();
  }

  async getMembershipById(membershipId: string) {
    return await Membership.findById(membershipId).exec();
  }

  async updateMembership(membershipId: string, updateData: any) {
    return await Membership.findByIdAndUpdate(membershipId, updateData, { new: true }).exec();
  }

  async deleteMembership(membershipId: string) {
    return await Membership.findByIdAndDelete(membershipId).exec();
  }

  async getAllMemberships() {
    return await Membership.find().exec();
  }
}
