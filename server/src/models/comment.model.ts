import { Schema, model, Document } from 'mongoose';

export interface IComment extends Document {
  text: string;
  userId: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
}, { timestamps: true });

export const Comment = model<IComment>('Comment', commentSchema);
