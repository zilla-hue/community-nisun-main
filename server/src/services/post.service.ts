import { Post } from '../models/post.model';

export class PostService {
  async createPost(postData: any) {
    const post = new Post(postData);
    return await post.save();
  }

  async getPostById(postId: string) {
    return await Post.findById(postId).exec();
  }

  async updatePost(postId: string, updateData: any) {
    return await Post.findByIdAndUpdate(postId, updateData, { new: true }).exec();
  }

  async deletePost(postId: string) {
    return await Post.findByIdAndDelete(postId).exec();
  }

  async getAllPosts() {
    return await Post.find().exec();
  }
}
