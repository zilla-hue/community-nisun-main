import { Request, Response } from 'express';
import { PostService } from '../services/post.service';

const postService = new PostService();

export class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const post = await postService.createPost(req.body);
      res.status(201).json(post);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const post = await postService.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const updatedPost = await postService.updatePost(req.params.id, req.body);
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(updatedPost);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const deletedPost = await postService.deletePost(req.params.id);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await postService.getAllPosts();
      res.status(200).json(posts);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
