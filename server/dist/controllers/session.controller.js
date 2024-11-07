"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
const session_service_1 = require("../services/session.service");
const sessionService = new session_service_1.SessionService();
class SessionController {
    async createSession(req, res) {
        try {
            const session = await sessionService.createSession(req.body);
            res.status(201).json(session);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getSessionById(req, res) {
        try {
            const session = await sessionService.getSessionById(req.params.id);
            if (!session) {
                return res.status(404).json({ message: 'Session not found' });
            }
            res.status(200).json(session);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateSession(req, res) {
        try {
            const updatedSession = await sessionService.updateSession(req.params.id, req.body);
            if (!updatedSession) {
                return res.status(404).json({ message: 'Session not found' });
            }
            res.status(200).json(updatedSession);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteSession(req, res) {
        try {
            const deletedSession = await sessionService.deleteSession(req.params.id);
            if (!deletedSession) {
                return res.status(404).json({ message: 'Session not found' });
            }
            res.status(200).json({ message: 'Session deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllSessions(req, res) {
        try {
            const sessions = await sessionService.getAllSessions();
            res.status(200).json(sessions);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.SessionController = SessionController;
