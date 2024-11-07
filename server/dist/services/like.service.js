"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const like_model_1 = require("../models/like.model");
class LikeService {
    async createLike(likeData) {
        const like = new like_model_1.Like(likeData);
        return await like.save();
    }
    async getLikeById(likeId) {
        return await like_model_1.Like.findById(likeId).exec();
    }
    async updateLike(likeId, updateData) {
        return await like_model_1.Like.findByIdAndUpdate(likeId, updateData, { new: true }).exec();
    }
    async deleteLike(likeId) {
        return await like_model_1.Like.findByIdAndDelete(likeId).exec();
    }
    async getAllLikes() {
        return await like_model_1.Like.find().exec();
    }
}
exports.LikeService = LikeService;
