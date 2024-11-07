"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeController = void 0;
const like_service_1 = require("../services/like.service");
const likeService = new like_service_1.LikeService();
class LikeController {
    async createLike(req, res) {
        try {
            const like = await likeService.createLike(req.body);
            res.status(201).json(like);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getLikeById(req, res) {
        try {
            const like = await likeService.getLikeById(req.params.id);
            if (!like) {
                return res.status(404).json({ message: 'Like not found' });
            }
            res.status(200).json(like);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateLike(req, res) {
        try {
            const updatedLike = await likeService.updateLike(req.params.id, req.body);
            if (!updatedLike) {
                return res.status(404).json({ message: 'Like not found' });
            }
            res.status(200).json(updatedLike);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteLike(req, res) {
        try {
            const deletedLike = await likeService.deleteLike(req.params.id);
            if (!deletedLike) {
                return res.status(404).json({ message: 'Like not found' });
            }
            res.status(200).json({ message: 'Like deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllLikes(req, res) {
        try {
            const likes = await likeService.getAllLikes();
            res.status(200).json(likes);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.LikeController = LikeController;
