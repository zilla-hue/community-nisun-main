"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_service_1 = require("../services/post.service");
const postService = new post_service_1.PostService();
class PostController {
    async createPost(req, res) {
        try {
            const post = await postService.createPost(req.body);
            res.status(201).json(post);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getPostById(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(post);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updatePost(req, res) {
        try {
            const updatedPost = await postService.updatePost(req.params.id, req.body);
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(updatedPost);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deletePost(req, res) {
        try {
            const deletedPost = await postService.deletePost(req.params.id);
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ message: 'Post deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllPosts(req, res) {
        try {
            const posts = await postService.getAllPosts();
            res.status(200).json(posts);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.PostController = PostController;
