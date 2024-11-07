import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
  mediaUrl?: string;
  mediaType?: string;
  text: string;
  userId: Schema.Types.ObjectId;
  likes: number;
  isPublic: boolean;
}

const postSchema = new Schema<IPost>({
  mediaUrl: { type: String },
  mediaType: { type: String },
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: false },
}, { timestamps: true });

export const Post = model<IPost>('Post', postSchema);
