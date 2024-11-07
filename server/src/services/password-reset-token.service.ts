import { PasswordResetToken } from '../models/password-reset-token.model';

export class PasswordResetTokenService {
  async createToken(tokenData: any) {
    const token = new PasswordResetToken(tokenData);
    return await token.save();
  }

  async getTokenById(tokenId: string) {
    return await PasswordResetToken.findById(tokenId).exec();
  }

  async updateToken(tokenId: string, updateData: any) {
    return await PasswordResetToken.findByIdAndUpdate(tokenId, updateData, { new: true }).exec();
  }

  async deleteToken(tokenId: string) {
    return await PasswordResetToken.findByIdAndDelete(tokenId).exec();
  }

  async getAllTokens() {
    return await PasswordResetToken.find().exec();
  }
}
