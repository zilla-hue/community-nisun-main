import { Session } from '../models/session.model';

export class SessionService {
  async createSession(sessionData: any) {
    const session = new Session(sessionData);
    return await session.save();
  }

  async getSessionById(sessionId: string) {
    return await Session.findById(sessionId).exec();
  }

  async updateSession(sessionId: string, updateData: any) {
    return await Session.findByIdAndUpdate(sessionId, updateData, { new: true }).exec();
  }

  async deleteSession(sessionId: string) {
    return await Session.findByIdAndDelete(sessionId).exec();
  }

  async getAllSessions() {
    return await Session.find().exec();
  }
}
