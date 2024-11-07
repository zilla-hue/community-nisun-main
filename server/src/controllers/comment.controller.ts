import { Request, Response } from 'express';
import { CommentService } from '../services/comment.service';

const commentService = new CommentService();

export class CommentController {
  async createComment(req: Request, res: Response) {
    try {
      const comment = await commentService.createComment(req.body);
      res.status(201).json(comment);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCommentById(req: Request, res: Response) {
    try {
      const comment = await commentService.getCommentById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json(comment);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const updatedComment = await commentService.updateComment(req.params.id, req.body);
      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json(updatedComment);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const deletedComment = await commentService.deleteComment(req.params.id);
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllComments(req: Request, res: Response) {
    try {
      const comments = await commentService.getAllComments();
      res.status(200).json(comments);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
