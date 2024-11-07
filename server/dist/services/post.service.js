"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const post_model_1 = require("../models/post.model");
class PostService {
    async createPost(postData) {
        const post = new post_model_1.Post(postData);
        return await post.save();
    }
    async getPostById(postId) {
        return await post_model_1.Post.findById(postId).exec();
    }
    async updatePost(postId, updateData) {
        return await post_model_1.Post.findByIdAndUpdate(postId, updateData, { new: true }).exec();
    }
    async deletePost(postId) {
        return await post_model_1.Post.findByIdAndDelete(postId).exec();
    }
    async getAllPosts() {
        return await post_model_1.Post.find().exec();
    }
}
exports.PostService = PostService;
