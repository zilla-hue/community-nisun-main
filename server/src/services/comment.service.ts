import { Comment } from '../models/comment.model';

export class CommentService {
  async createComment(commentData: any) {
    const comment = new Comment(commentData);
    return await comment.save();
  }

  async getCommentById(commentId: string) {
    return await Comment.findById(commentId).exec();
  }

  async updateComment(commentId: string, updateData: any) {
    return await Comment.findByIdAndUpdate(commentId, updateData, { new: true }).exec();
  }

  async deleteComment(commentId: string) {
    return await Comment.findByIdAndDelete(commentId).exec();
  }

  async getAllComments() {
    return await Comment.find().exec();
  }
}
