import { Request, Response } from 'express';
import { LikeService } from '../services/like.service';

const likeService = new LikeService();

export class LikeController {
  async createLike(req: Request, res: Response) {
    try {
      const like = await likeService.createLike(req.body);
      res.status(201).json(like);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getLikeById(req: Request, res: Response) {
    try {
      const like = await likeService.getLikeById(req.params.id);
      if (!like) {
        return res.status(404).json({ message: 'Like not found' });
      }
      res.status(200).json(like);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateLike(req: Request, res: Response) {
    try {
      const updatedLike = await likeService.updateLike(req.params.id, req.body);
      if (!updatedLike) {
        return res.status(404).json({ message: 'Like not found' });
      }
      res.status(200).json(updatedLike);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteLike(req: Request, res: Response) {
    try {
      const deletedLike = await likeService.deleteLike(req.params.id);
      if (!deletedLike) {
        return res.status(404).json({ message: 'Like not found' });
      }
      res.status(200).json({ message: 'Like deleted successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllLikes(req: Request, res: Response) {
    try {
      const likes = await likeService.getAllLikes();
      res.status(200).json(likes);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
