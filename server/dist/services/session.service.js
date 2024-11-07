"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const session_model_1 = require("../models/session.model");
class SessionService {
    async createSession(sessionData) {
        const session = new session_model_1.Session(sessionData);
        return await session.save();
    }
    async getSessionById(sessionId) {
        return await session_model_1.Session.findById(sessionId).exec();
    }
    async updateSession(sessionId, updateData) {
        return await session_model_1.Session.findByIdAndUpdate(sessionId, updateData, { new: true }).exec();
    }
    async deleteSession(sessionId) {
        return await session_model_1.Session.findByIdAndDelete(sessionId).exec();
    }
    async getAllSessions() {
        return await session_model_1.Session.find().exec();
    }
}
exports.SessionService = SessionService;
