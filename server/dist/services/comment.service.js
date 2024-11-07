"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const comment_model_1 = require("../models/comment.model");
class CommentService {
    async createComment(commentData) {
        const comment = new comment_model_1.Comment(commentData);
        return await comment.save();
    }
    async getCommentById(commentId) {
        return await comment_model_1.Comment.findById(commentId).exec();
    }
    async updateComment(commentId, updateData) {
        return await comment_model_1.Comment.findByIdAndUpdate(commentId, updateData, { new: true }).exec();
    }
    async deleteComment(commentId) {
        return await comment_model_1.Comment.findByIdAndDelete(commentId).exec();
    }
    async getAllComments() {
        return await comment_model_1.Comment.find().exec();
    }
}
exports.CommentService = CommentService;
