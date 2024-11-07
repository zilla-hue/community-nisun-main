import { Like } from '../models/like.model';

export class LikeService {
  async createLike(likeData: any) {
    const like = new Like(likeData);
    return await like.save();
  }

  async getLikeById(likeId: string) {
    return await Like.findById(likeId).exec();
  }

  async updateLike(likeId: string, updateData: any) {
    return await Like.findByIdAndUpdate(likeId, updateData, { new: true }).exec();
  }

  async deleteLike(likeId: string) {
    return await Like.findByIdAndDelete(likeId).exec();
  }

  async getAllLikes() {
    return await Like.find().exec();
  }
}
