"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_service_1 = require("../services/comment.service");
const commentService = new comment_service_1.CommentService();
class CommentController {
    async createComment(req, res) {
        try {
            const comment = await commentService.createComment(req.body);
            res.status(201).json(comment);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getCommentById(req, res) {
        try {
            const comment = await commentService.getCommentById(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json(comment);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateComment(req, res) {
        try {
            const updatedComment = await commentService.updateComment(req.params.id, req.body);
            if (!updatedComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json(updatedComment);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteComment(req, res) {
        try {
            const deletedComment = await commentService.deleteComment(req.params.id);
            if (!deletedComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json({ message: 'Comment deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllComments(req, res) {
        try {
            const comments = await commentService.getAllComments();
            res.status(200).json(comments);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.CommentController = CommentController;
