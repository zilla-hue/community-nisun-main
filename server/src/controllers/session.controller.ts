import { Request, Response } from 'express';
import { SessionService } from '../services/session.service';

const sessionService = new SessionService();

export class SessionController {
  async createSession(req: Request, res: Response) {
    try {
      const session = await sessionService.createSession(req.body);
      res.status(201).json(session);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSessionById(req: Request, res: Response) {
    try {
      const session = await sessionService.getSessionById(req.params.id);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      res.status(200).json(session);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSession(req: Request, res: Response) {
    try {
      const updatedSession = await sessionService.updateSession(req.params.id, req.body);
      if (!updatedSession) {
        return res.status(404).json({ message: 'Session not found' });
      }
      res.status(200).json(updatedSession);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteSession(req: Request, res: Response) {
    try {
      const deletedSession = await sessionService.deleteSession(req.params.id);
      if (!deletedSession) {
        return res.status(404).json({ message: 'Session not found' });
      }
      res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllSessions(req: Request, res: Response) {
    try {
      const sessions = await sessionService.getAllSessions();
      res.status(200).json(sessions);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
