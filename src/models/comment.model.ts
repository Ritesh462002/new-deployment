import { Schema, model, Document, Types } from "mongoose";
export interface CommentDocument extends Document {
    postId: Types.ObjectId;
    author: string;
    content: string;
    createdAt: Date;
}

const commentSchema = new Schema<CommentDocument>({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    }
},
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: false
        }
    }
)

export const CommentModel = model<CommentDocument>("Comment", commentSchema);